import { Resolver, Query, Mutation, Args, Arg } from "type-graphql";
import { CreateBookInput } from "../inputs/CreateBookInput";
import { UpdateBookInput } from "../inputs/UpdateBookInput";
import { BookEntity } from "../models/BookEntity";


@Resolver()
export class BookResolver {
  @Query(() => [BookEntity])
  allBooks() {
    const book = BookEntity.find()
    return book
  }

  @Query(() => BookEntity)
  oneBook(@Arg('id') id : string) {
    const book = BookEntity.findOne({ where : {id}})
    return book
  }


  @Mutation(() => BookEntity)
  async createBook(@Arg("data") data: CreateBookInput ) {
    const book =  BookEntity.create(data)
    const booksaved = await book.save()

    if(!booksaved) {
      throw new Error("Could not create book")
    }
    return booksaved;
  }

  @Mutation(() => BookEntity)
  async updateBook(@Arg('id') id: string, @Arg('data') data: UpdateBookInput) {
    const book = await BookEntity.findOne({ where : { id}}) 
    if(!book)
    throw new Error("Book not found")
    Object.assign(book,data)
    const bookUpdated = await book.save()
    if(!bookUpdated)
    throw new Error("Book not updated")
    return bookUpdated
  }

  @Mutation(() => Boolean)
  async deleteBook(@Arg("id") id: string) {
    const book = await BookEntity.findOne({ where : { id }})
    if (!book) {
      throw new Error("Book not found!")
    }
    await book.remove()
    return true 
  }

}