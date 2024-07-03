import { DateTimeResolver } from 'graphql-scalars'
import { asNexusMethod, makeSchema } from 'nexus'
import path from 'path'
import * as query from './schema/index'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

export const schema = makeSchema({
  types: [DateTime, query],
  outputs: {
    schema: path.join(process.cwd(), '/schema.graphql'),
    typegen: path.join(process.cwd(), 'src', 'generated', '/nexus.ts'),
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
