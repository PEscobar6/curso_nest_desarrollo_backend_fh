import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from ".";

@Entity({ name: 'product_images' })
export class ProductImage {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    url: string;

    // @Column('text')
    // public_id: string;

    //TODO: save public_api

    //TODO: save secure_url

    //TODO: save extension file


    @ManyToOne(
        () => Product,
        product => product.images,
        { onDelete: 'CASCADE' }
    )
    product: Product

}