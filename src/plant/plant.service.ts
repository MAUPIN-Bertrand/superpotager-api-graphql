import { Injectable, NotFoundException } from '@nestjs/common';
import { PlantEntity } from './plant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlantInput } from './input/create-plant.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PlantService {
  constructor(
    @InjectRepository(PlantEntity)
    private plantRepository: Repository<PlantEntity>,
  ) {}
  async createPlant(createPlantInput: CreatePlantInput): Promise<PlantEntity> {
    const { name, icon } = createPlantInput;
    const plant = this.plantRepository.create({
      id: uuid(),
      name,
      icon,
    });

    return this.plantRepository.save(plant);
  }

  async deletePlantById(id: string): Promise<PlantEntity> {
    const found = await this.plantRepository.findOne({ id });
    if (!found)
      throw new NotFoundException(`Plant with ID : '${id}' not found`);
    const removed = this.plantRepository.remove(found);
    return removed;
  }

  async getPlantById(id: string): Promise<PlantEntity> {
    const found = await this.plantRepository.findOne({ id });
    if (!found)
      throw new NotFoundException(`Plant with ID : '${id}' not found`);
    return found;
  }

  async getAllPlants(): Promise<PlantEntity[]> {
    return await this.plantRepository.find();
  }
}
