import { objectType } from 'nexus'

export const Order = objectType({
  name: 'Order',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('orderNo')
    t.string('paymentNo')
    t.nonNull.float('amount')
    t.nonNull.int('userId')
    t.nonNull.field('user', { type: 'User' })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.int('skuId')
    t.nonNull.string('status')
    t.nonNull.field('product', { type: 'Product' })
    t.nonNull.field('sku', { type: 'Sku' })
  },
})
