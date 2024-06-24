import { nonNull, stringArg, objectType } from 'nexus'
import { Context } from '../context'
import { ObjectDefinitionBlock } from 'nexus/dist/core'

export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.nonNull.field('createProduct', {
      type: 'Product',
      args: {
        title: nonNull(stringArg()),
        description: stringArg(),
        image: stringArg(),
        category: nonNull(stringArg()),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.product.create({
          data: {
            title: args.title,
            description: args.description,
            image: args.image,
            status: 'DRAFT',
            category: args.category as any,
          },
        })
      },
    })

    t.nonNull.field('signupUser', {
      type: 'User',
      args: {
        username: nonNull(stringArg()),
        name: stringArg(),
        password: nonNull(stringArg()),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.user.create({
          data: {
            name: args.name,
            username: args.username,
            password: args.password,
          },
        })
      },
    })
  },
})
