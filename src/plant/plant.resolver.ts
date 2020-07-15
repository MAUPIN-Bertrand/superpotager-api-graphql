import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PlantService } from './plant.service';
import { PlantType } from './plant.type';
import { PlantEntity } from './plant.entity';
import { CreatePlantInput } from './input/create-plant.input';

@Resolver('Plant')
export class PlantResolver {
  constructor(private plantService: PlantService) {}

  @Query(() => PlantType)
  async plant(@Args('plantId') plantId: string): Promise<PlantEntity> {
    return this.plantService.getPlantById(plantId);
  }

  @Query(() => [PlantType])
  async plants(): Promise<PlantEntity[]> {
    return this.plantService.getAllPlants();
  }

  @Mutation(() => PlantType)
  async createPlant(
    @Args('createPlantInput') createPlantInput: CreatePlantInput,
  ) {
    const plant = await this.plantService.createPlant(createPlantInput);
    return plant;
  }

  @Mutation(() => Boolean)
  async deletePlant(@Args('plantId') plantId: string) {
    const plantDeleted = await this.plantService.deletePlantById(plantId);
    if (plantDeleted) {
      return true;
    }
    return false;
  }
}
