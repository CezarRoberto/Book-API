import { sign } from "jsonwebtoken";
import { User } from "../models/UserEntity";

export const createAccessToken = (user: User) => {
    return sign({ userId: user.id, }, process.env.ACESS_TOKEN_SECRET!, { expiresIn: '15m' })
}

export const createRefreshToken = (user: User) => {
   return  sign({ userId: user.id, }, process.env.REFRESH_TOKEN_SECRET! , { expiresIn: '15m' })
}