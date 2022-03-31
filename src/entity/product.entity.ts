import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Category } from './category.entity';

@Entity()
export class Product {
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

    @ManyToOne(() => Category, (category) => category.products)
    category: Category
}