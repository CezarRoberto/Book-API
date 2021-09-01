import { Resolver, Query, Mutation, Args, Arg } from "type-graphql";
import { CreateBookInput } from "../inputs/CreateBookInput";
import { BookEntity } from "../models/BookEntity";


@Resolver()
export class BookResolver {
  @Query(() => [BookEntity])
  allBooks() {
    const book = BookEntity.find()
    return book
  }


  @Mutation(() => BookEntity)
  async createBook(@Arg("data") data: CreateBookInput ) {
    const book =  BookEntity.create(data)
    await book.save()
    return book;
  }
}