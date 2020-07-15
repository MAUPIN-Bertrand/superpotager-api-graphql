import { Entity, ObjectIdColumn, PrimaryColumn, Column } from 'typeorm';
import { PlantingEntity } from './planting.entity';

@Entity()
export class GardenEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  owner: string;

  @Column({ nullable: true })
  plantings: PlantingEntity[];

  addPlanting(
    id: string,
    plantId: string,
    icon: string,
    xPosition: number,
    yPosition: number,
    width: number,
    height: number,
  ) {
    const plantingEntity: PlantingEntity = {
      id,
      plantId,
      icon,
      xPosition,
      yPosition,
      width,
      height,
    };
    if (Array.isArray(this.plantings) && this.plantings.length) {
      this.plantings = [...this.plantings, plantingEntity];
    } else {
      this.plantings = [plantingEntity];
    }
  }

  removePlanting(plantingIndex: number) {
    this.plantings.splice(plantingIndex, 1);
  }

  modifyPlanting(
    plantingId: string,
    xPosition: number,
    yPosition: number,
    width: number,
    height: number,
  ) {
    this.plantings.forEach((planting, index, array) => {
      if (planting.id === plantingId) {
        array[index] = { ...planting, xPosition, yPosition, width, height };
      }
    });
  }
}
