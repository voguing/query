import { inputObjectType } from 'nexus'

export const SkuCreateInput = inputObjectType({
  name: 'SkuCreateInput',
  definition(t) {
    t.nonNull.string('name')
    t.nonNull.int('price')
    t.nonNull.int('stock')
    t.nonNull.int('hc')
  },
})
