import { IsDate, IsNumber, IsString } from "class-validator";

import { Field, InputType } from "type-graphql";

@InputType()

export class CreateBookInput {

    @IsString()
    @Field()
    title: string

    @IsNumber()
    @Field()
    price: number

    @IsString()
    @Field()
    author: string

    @IsDate()
    @Field()
    year: Date
}