import { objectType } from 'nexus'

export const Product = objectType({
  name: 'Product',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('title')
    t.string('description')
    t.string('image')
    t.int('stock')
    t.int('minPrice')
    t.int('maxPrice')
    t.int('soldHc')
    t.nonNull.string('status')
    t.nonNull.string('category')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  },
})
