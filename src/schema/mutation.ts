import { list, nonNull, objectType, stringArg } from 'nexus'
import { Context } from '../context'

export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.nonNull.field('createProduct', {
      type: 'Product',
      args: {
        title: nonNull(stringArg()),
        description: stringArg(),
        category: nonNull(stringArg()),
        image: stringArg(),
        skus: nonNull(list(nonNull('SkuCreateInput'))),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.product.create({
          data: {
            title: args.title,
            description: args.description,
            image: args.image,
            status: 'DRAFT',
            category: args.category as any,
            skus: {
              createMany: {
                // @ts-ignore
                data: args.skus.map((sku) => ({
                  name: sku.name,
                  price: sku.price,
                  stock: sku.stock,
                  hc: sku.hc,
                })),
              },
            },
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
