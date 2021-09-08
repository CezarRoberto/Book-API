import { Authorized, Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number

    @Column()
    @Field(() => String)
    first_name: string

    @Column()
    @Field(() => String)
    last_name: string

    @Column()
    @Field(() => Number)
    age: number

    @Column()
    @Field(() => String)
    country: string

    @Column()
    @Field(() => String)
    email: string

    
    @Column()
    password: string
    
    @Column("int", {
        default: 0
    })
    tokenVersion: number;
}