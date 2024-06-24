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
  },
})
