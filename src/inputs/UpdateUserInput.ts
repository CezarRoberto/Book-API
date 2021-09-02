import { IsEmail, IsNumber, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";


@InputType()
export class UpdateUserInput {
   
    @IsString()
    @Field()
    first_name?: string

    @IsString()
    @Field()
    last_name?: string

    @IsNumber()
    @Field()
    age?: number

    @IsString()
    @Field()
    country?: string
    
    @IsEmail()
    @Field()
    email: string
    
    @IsString()
    @Field()
    password: string
}