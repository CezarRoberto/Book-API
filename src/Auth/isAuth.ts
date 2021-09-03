import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "./MyContext";

export const isAuth: MiddlewareFn<MyContext> = ({context}, next) => {
  const authorization =  context.req.headers['authorization']

 if(!authorization) {
     throw new Error("not authentication")
 }

  try {
    const token = authorization.split(' ') [1]
    const payload = verify(token, process.env.ACESS_TOKEN_SECRET!)
    context.payload = payload as any
  }
  catch(err) {
    console.log(err)
    throw new Error("not authentication")
  }
    return next()
}