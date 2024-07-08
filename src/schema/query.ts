import { max, min } from 'lodash'
import { intArg, objectType } from 'nexus'
import { AllNexusOutputTypeDefs, GetGen, NexusMetaType } from 'nexus/dist/core'
import { Context } from '../context'

const paginationArgs = {
  current: intArg({
    default: 0,
  }),
  pageSize: intArg({
    default: 20,
  }),
}

const resultList: Array<
  GetGen<'allOutputTypes', string> | AllNexusOutputTypeDefs | NexusMetaType
> = ['User', 'Product', 'Order']

export const results = resultList.map((result) => {
  return objectType({
    name: result + 'Result',
    definition(t) {
      t.list.field('data', { type: result })
      t.int('total')
    },
  })
})

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.field('users', {
      type: 'UserResult',
      args: {
        ...paginationArgs,
      },
      resolve: async (_parent, args, context: Context) => {
        const data = await context.prisma.user.findMany({
          take: args.pageSize || undefined,
          skip: (args.pageSize || 20) * (args.current || 0) || undefined,
          orderBy: {
            createdAt: 'desc',
          },
        })
        const total = await context.prisma.user.count()
        return { data, total }
      },
    })
    t.nonNull.field('products', {
      type: 'ProductResult',
      args: {
        ...paginationArgs,
      },
      resolve: async (_parent, args, context: Context) => {
        const data = await context.prisma.product.findMany({
          take: args.pageSize || undefined,
          skip: (args.pageSize || 20) * (args.current || 0) || undefined,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            skus: {
              select: {
                stock: true,
                price: true,
              },
            },
          },
        })
        const total = await context.prisma.product.count()
        return {
          data: data.map((product) => {
            const minPrice = min(product.skus.map((sku) => sku.price))
            const maxPrice = max(product.skus.map((sku) => sku.price))
            return {
              ...product,
              stock: product.skus.reduce((acc, sku) => acc + sku.stock, 0),
              minPrice,
              maxPrice,
              soldHc: 0,
              skus: undefined,
            }
          }),
          total,
        }
      },
    })
    t.nonNull.field('orders', {
      type: 'OrderResult',
      args: {
        ...paginationArgs,
      },
      resolve: async (_parent, args, context: Context) => {
        const data = await context.prisma.order.findMany({
          take: args.pageSize || undefined,
          skip: (args.pageSize || 20) * (args.current || 0) || undefined,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            sku: {
              include: {
                product: true,
              },
            },
            user: true,
          },
        })
        const total = await context.prisma.product.count()
        return {
          data: data.map((order) => {
            const { sku } = order
            const { product } = sku
            return {
              ...order,
              product,
              sku,
            }
          }),
          total,
        }
      },
    })
  },
})
