import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { BookResolver } from "./resolvers/BookResolver";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

async function main() {
   await createConnection()
  const schema = await buildSchema({
      resolvers: [BookResolver],
      authChecker: ({ context: {req} }) => {
      
        if(req.User.userById) {
          return true
        }

        return false; 
      }
  })
  const server = new ApolloServer({ schema, plugins:[
    ApolloServerPluginLandingPageGraphQLPlayground()
  ] })
  await server.listen(4000)
  console.log(" 🚀 Server has started!")
}

main()