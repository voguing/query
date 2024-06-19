import { objectType } from 'nexus'

export const UserResult = objectType({
  name: 'UserResult',
  definition(t) {
    t.list.field('data', { type: 'User' })
    t.int('total')
  },
})
