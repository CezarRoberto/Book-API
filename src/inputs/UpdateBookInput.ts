import { IsDate, IsNumber, IsString } from "class-validator";

import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateBookInput {
    @IsString()
    @Field({ nullable: true})
    title?: string

    @IsNumber()
    @Field({ nullable: true})
    price?: number

    @IsString()
    @Field({ nullable: true})
    author?: string

    @IsDate()
    @Field({ nullable: true})
    year?: Date
}