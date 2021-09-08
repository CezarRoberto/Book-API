import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { BookResolver } from "./resolvers/BookResolver";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { UserResolver } from "./resolvers/UserResolver";
import express from "express";
import cookieParser from "cookie-parser";
import { responsePathAsArray } from "graphql";
import { verify } from "jsonwebtoken";
import { User } from "./models/UserEntity";
import { createAccessToken, createRefreshToken } from "./Auth/auth";
import { sendRefreshToken } from "./Auth/sendRefreshToken";

async function main() {
  
  const app = express()
  app.use(cookieParser())

  // Refreshing TOKEN 
  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jid
    if(!token) {
      return res.send({ok: false, accessToken: ''})
    }
    let payload: any = null;
    try {
     payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
    } catch(err) {
      console.log(err)
    }

    const user = await User.findOne({id: payload.userId})

    if (!user) {
      return  res.send({ok: false, accessToken: ''})
    }
    
    if(user.tokenVersion !== payload.tokenVersion) {
      return  res.send({ok: false, accessToken: ''})
    }
    
  sendRefreshToken(res, createRefreshToken(user));

    return res.send({ok: true, accessToken: createAccessToken(user)})
  })


  // SERVER Schema
  await createConnection()
  const schema = await buildSchema({
      resolvers: [BookResolver,  UserResolver]})

  
  const server = new ApolloServer({ schema, context: ({req, res}) => ({req, res}), plugins:[
    ApolloServerPluginLandingPageGraphQLPlayground()
  ] })
  await server.listen(4000)
  console.log(" 🚀 Server has started!")
}

main()