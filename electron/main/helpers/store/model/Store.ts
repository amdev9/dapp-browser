import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Store {
  @PrimaryColumn()
  key: string;

  @Column()
  value: string;
}
