import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class Story {
  @PrimaryColumn()
  key: string;

  @Column()
  value: string;

}
