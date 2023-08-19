import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,CreateDateColumn } from 'typeorm';


@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

   

    @CreateDateColumn()
   orderDate!: Date;

    
  
    @Column()
    userId!: number;
    @Column()
    totalCost!: number;

}


