import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';


@Entity()
export class OrderProduct extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    cost!: number;

    @Column()
    quantity!: number;
  
    @Column()
    userId!: number;
    @Column()
  orderId!: number

}


