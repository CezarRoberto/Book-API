import { compare, hash } from "bcryptjs";
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { createAccessToken, createRefreshToken } from "../Auth/auth";
import { isAuth } from "../Auth/isAuth";
import { UpdateUserInput } from "../inputs/UpdateUserInput";
import { User } from "../models/UserEntity";
import { MyContext } from "../Auth/MyContext";

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string
}


@Resolver()
export class UserResolver {
    // Queries
    @Query(() => [User])
    allUsers() {
        const users = User.find()
        return users
    }


    @Query(() => String)
    @UseMiddleware(isAuth)
    userById(@Ctx() {payload}: MyContext) {
       return `your user id is: ${payload!.userId}`
    }

    @Query(() => User)
    userByEmail(@Arg('email') email: string) {
        const user = User.findOne({ where: { email } })
        if (!user)
            throw new Error("User does not exist")
        return user
    }


    // Mutations

    @Mutation(() => Boolean)
    async createUser(
        @Arg('first_name') first_name: string,
        @Arg('last_name') last_name: string,
        @Arg('age') age: number,
        @Arg('country') country: string,
        @Arg('email') email: string,
        @Arg('password') password: string) {

        const hashedPassword = await hash(password, 12)
        try {
            await User.insert({
                first_name,
                last_name,
                age,
                country,
                email,
                password: hashedPassword
            })
        } catch (err) {
            console.log(err)
        }
        return true;

    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() { res }: MyContext)
        : Promise<LoginResponse> {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            throw new Error('Invalided Login')
        }

        const valid = await compare(password, user.password)

        if (!valid) {
            throw new Error("Email or Password wrong")
        }

        res.cookie('jid', createRefreshToken(user),
            {
                httpOnly: true
            }
        );

        return {
            accessToken: createAccessToken(user)
        }

    }



    @Mutation(() => User)
    async updateUser(@Arg('data') data: UpdateUserInput, @Arg('id') id: string, @Arg('password') password: string) {
        const user = await User.findOne({ where: { id } })
        if (!user) {
            throw new Error("User not found")
        }
        Object.assign(user, data, password)

        const userUpdated = await user.save()
        if (!userUpdated) {
            throw new Error("Book not updated")
        }
        return userUpdated
    }

    @Mutation(() => Boolean)
    async deleteUser(@Arg("id") id: string) {
        const user = await User.findOne({ where: { id } })
        if (!user) {
            throw new Error("Book not found!")
        }
        await user.remove()
        return true
    }


}