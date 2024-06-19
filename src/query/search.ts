import { intArg } from 'nexus'
import { Context } from '../context'
import { ObjectDefinitionBlock } from 'nexus/dist/core'

export const users = (t: ObjectDefinitionBlock<'Query'>) =>
  t.nonNull.field('users', {
    type: 'UserResult',
    args: {
      pageSize: intArg({
        default: 20,
      }),
      current: intArg({
        default: 0,
      }),
    },
    resolve: async (_parent, args, context: Context) => {
      const data = await context.prisma.user.findMany({
        take: args.pageSize || undefined,
        skip: (args.pageSize || 20) * (args.current || 0) || undefined,
      })
      const total = await context.prisma.user.count()
      return { data, total }
    },
  })

export const products = (t: ObjectDefinitionBlock<'Query'>) =>
  t.nonNull.field('getProducts', {
    type: 'ProductResult',
    args: {
      pageSize: intArg({
        default: 20,
      }),
      current: intArg({
        default: 0,
      }),
    },
    resolve: async (_parent, args, context: Context) => {
      console.log(args, 'args')
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
