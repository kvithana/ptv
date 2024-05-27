import { ApolloServer } from "@apollo/server"
import { ApolloArmor } from "@escape.tech/graphql-armor"
import { schema } from "./schema"

const armor = new ApolloArmor({
  maxDepth: {
    n: 10,
  },
})

export const server = new ApolloServer({
  schema,
  introspection: true,
  ...armor.protect(),
})
