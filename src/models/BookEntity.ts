import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class BookEntity extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: string

    @Column()
    @Field(() => String)
    title: string

    @Column()
    @Field(() => String)
    author: string

    @Column()
    @Field(() => Number)
    price: number

    @Column({ default: false})
    @Field(() => Boolean)
    isPublished: boolean
}