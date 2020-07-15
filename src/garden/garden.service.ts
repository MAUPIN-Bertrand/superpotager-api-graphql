import { ModifyGardenInput } from './input/modify-garden.input';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GardenEntity } from './garden.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGardenInput } from './input/create-garden.input';
import { v4 as uuid } from 'uuid';
import { AddPlantingInput } from './input/add-planting.input';
import { PlantService } from '../plant/plant.service';
import { RemovePlantingInput } from './input/remove-planting.input';
import { ModifyPlantingInput } from './input/modify-planting.input';

@Injectable()
export class GardenService {
  constructor(
    @InjectRepository(GardenEntity)
    private gardenRepository: Repository<GardenEntity>,
    private plantService: PlantService,
  ) {}

  async createGarden(
    createGardenInput: CreateGardenInput,
  ): Promise<GardenEntity> {
    const { width, height, owner } = createGardenInput;
    const garden = this.gardenRepository.create({
      id: uuid(),
      width,
      height,
      owner,
    });

    return this.gardenRepository.save(garden);
  }

  async deleteGardenById(id: string): Promise<GardenEntity> {
    const found = await this.gardenRepository.findOne({ id });
    if (!found)
      throw new NotFoundException(`Garden with ID : '${id}' not found`);
    const removed = this.gardenRepository.remove(found);
    return removed;
  }

  async getGardenById(id: string): Promise<GardenEntity> {
    const found = await this.gardenRepository.findOne({ id });
    if (!found)
      throw new NotFoundException(`Garden with ID : '${id}' not found`);
    return found;
  }

  async modifyGarden(
    modifyGardenInput: ModifyGardenInput,
  ): Promise<GardenEntity> {
    const { id, width, height } = modifyGardenInput;
    const garden = await this.getGardenById(id);
    garden.width = width;
    garden.height = height;
    return await this.gardenRepository.save(garden);
  }

  async getManyGardens(gardensIds: string[]): Promise<GardenEntity[]> {
    if (Array.isArray(gardensIds) && gardensIds.length) {
      return this.gardenRepository.find({
        where: {
          id: {
            $in: gardensIds,
          },
        },
      });
    } else {
      return [];
    }
  }

  async addPlanting(addPlantingInput: AddPlantingInput): Promise<GardenEntity> {
    const {
      gardenID,
      plantID,
      xPosition,
      yPosition,
      width,
      height,
    } = addPlantingInput;
    const garden = await this.getGardenById(gardenID);
    const plant = await this.plantService.getPlantById(plantID);
    if (plant && garden) {
      garden.addPlanting(
        uuid(),
        plant.id,
        plant.icon,
        xPosition,
        yPosition,
        width,
        height,
      );
      await this.gardenRepository.save(garden);
    }
    return garden;
  }

  async modifyPlanting(
    modifyPlantingInput: ModifyPlantingInput,
  ): Promise<GardenEntity> {
    const {
      gardenID,
      plantingID,
      xPosition,
      yPosition,
      width,
      height,
    } = modifyPlantingInput;
    const garden = await this.getGardenById(gardenID);

    if (garden) {
      garden.modifyPlanting(plantingID, xPosition, yPosition, width, height);
      await this.gardenRepository.save(garden);
    }
    return garden;
  }

  async removePlanting(
    removePlantingInput: RemovePlantingInput,
  ): Promise<GardenEntity> {
    const { gardenID, plantingIndex } = removePlantingInput;
    const garden = await this.getGardenById(gardenID);
    if (garden) {
      garden.removePlanting(plantingIndex);
      await this.gardenRepository.save(garden);
    }
    return garden;
  }
}
