import { inputObjectType, objectType } from 'nexus'

export const SkuCreateInput = inputObjectType({
  name: 'SkuCreateInput',
  definition(t) {
    t.nonNull.string('name')
    t.nonNull.int('price')
    t.nonNull.int('stock')
    t.nonNull.int('hc')
  },
})

export const Sku = objectType({
  name: 'Sku',
  definition(t) {
    t.nonNull.string('name')
    t.nonNull.int('price')
    t.nonNull.int('stock')
    t.nonNull.int('hc')
  },
})
