import { intArg, objectType } from 'nexus'
import { Context } from '../context'
import { AllNexusOutputTypeDefs, GetGen, NexusMetaType } from 'nexus/dist/core'

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
> = ['User', 'Product']

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
        })
        const total = await context.prisma.product.count()
        return {
          data,
          total,
        }
      },
    })
  },
})
