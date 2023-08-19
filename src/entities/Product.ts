import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
// import { Category } from './Category';

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    price!: number;

    @Column()
    description!: string;

    @Column()
    availability!: boolean;

    @Column()
    categoryId!: number;



}
