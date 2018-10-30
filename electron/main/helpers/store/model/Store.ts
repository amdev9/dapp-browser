import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Store {
  @PrimaryColumn()
  key: string;

  @Column()
  value: string;
}
// { database: 'dappDB' }
@Entity()
export class DappStore {
  @PrimaryColumn()
  key: string;

  @Column()
  value: string;
}
