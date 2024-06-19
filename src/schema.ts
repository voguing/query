import { makeSchema, objectType, asNexusMethod } from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import * as result from './query/result'
import * as model from './query/model'
import * as create from './query/create'
import * as search from './query/search'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

export const ProductResult = objectType({
  name: 'ProductResult',
  definition(t) {
    t.list.field('data', { type: 'Product' })
    t.int('total')
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    search.users(t)
    search.products(t)
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    create.createProduct(t)
    create.signupUser(t)
  },
})

export const schema = makeSchema({
  types: [
    Query,
    Mutation,
    DateTime,
    ...Object.values(model),
    ...Object.values(result),
    ProductResult,
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
