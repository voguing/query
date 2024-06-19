import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.string('name')
    t.nonNull.string('username')
    t.string('phone')
    t.string('avatar')
    t.nonNull.date('createdAt')

    // t.nonNull.list.nonNull.field('posts', {
    //   type: 'Post',
    //   resolve: (parent, _, context: Context) => {
    //     return context.prisma.user
    //       .findUnique({
    //         where: { id: parent.id || undefined },
    //       })
    //       .posts()
    //       .then((posts) => posts || [])
    //   },
    // })
  },
})

export const Product = objectType({
  name: 'Product',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('title')
    t.string('description')
    t.string('image')
    t.nonNull.string('status')
    t.nonNull.string('category')
    t.nonNull.date('createdAt')
    t.nonNull.date('updatedAt')
  },
})
