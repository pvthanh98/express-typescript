import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Product } from './product.entity'; 

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type:"varchar",
        length: 255
    })
    name: string;

    @Column({
        type:"text",
        nullable:true,
        default: null
    })
    description: string;

    @OneToMany(()=> Product, (product) => product.category)
    products: Product[]

}