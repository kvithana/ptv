declare module "*.graphql" {
  const typeDefs: import("graphql").DocumentNode
  export default typeDefs
}
