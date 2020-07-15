import { Entity, Column } from 'typeorm';

@Entity()
export class PlantingEntity {
  @Column()
  id: string;
  @Column()
  plantId: string;
  @Column()
  icon: string;
  @Column()
  xPosition: number;
  @Column()
  yPosition: number;
  @Column()
  width: number;
  @Column()
  height: number;
}
