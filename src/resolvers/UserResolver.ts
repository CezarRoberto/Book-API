import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { CreateUserInput } from "../inputs/CreateUserInput";
import { UpdateBookInput } from "../inputs/UpdateBookInput";
import { BookEntity } from "../models/BookEntity";
import { User } from "../models/UserEntity";

@Resolver()
export class UserResolver {
    // Queries
    @Query(() => [BookEntity])
    allUsers() {
        const users = User.find()
        return users
    }

    @Query(() => [BookEntity])
    userById(@Arg('id') id: string) {
        const user = User.findOne({ where: { id } })
        if (!user)
            throw new Error("User does not exist")
        return user
    }

    @Query(() => [BookEntity])
    userByEmail(@Arg('email') email: string) {
        const user = User.findOne({ where: { email } })
        if (!user)
            throw new Error("User does not exist")
        return user
    }


    // Mutations
    
    @Mutation(() => User)
    async createUser(@Arg('data') data: CreateUserInput) {
        const user = User.create(data)
        const userSaved = await user.save()

        if (!userSaved) {
            throw new Error("Could not create book")
        }
        return userSaved;
    }

    @Mutation(() => User)
    async updateUser(@Arg('data') data: UpdateBookInput, @Arg('id') id: string) {
        const user = await User.findOne({ where: { id } })
        if (!user) {
            throw new Error("User not found")
        }
        Object.assign(user, data)

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