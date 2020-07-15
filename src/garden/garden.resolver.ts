import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Query,
} from '@nestjs/graphql';
import { GardenType } from './garden.type';
import { GardenService } from './garden.service';
import { UseGuards } from '@nestjs/common';
import { CreateGardenInput } from './input/create-garden.input';
import { ModifyGardenInput } from './input/modify-garden.input';
import { GardenEntity } from './garden.entity';
import { UserService } from '../user/user.service';
import { CurrentUser } from 'src/shared/decorators/decorators';
import { AuthenticatedGuard } from 'src/shared/guards/authenticated.guard';
import { UserEntity } from '../user/user.entity';
import { AddPlantingInput } from './input/add-planting.input';
import { RemovePlantingInput } from './input/remove-planting.input';
import { ModifyPlantingInput } from './input/modify-planting.input';

@Resolver(() => GardenType)
export class GardenResolver {
  constructor(
    private gardenService: GardenService,
    private userService: UserService,
  ) {}

  @Query(() => [GardenType])
  @UseGuards(AuthenticatedGuard)
  async mygardens(@CurrentUser() user: UserEntity) {
    return this.gardenService.getManyGardens(user.gardens);
  }

  @Query(() => GardenType)
  async garden(@Args('gardenId') gardenId: string): Promise<GardenEntity> {
    return this.gardenService.getGardenById(gardenId);
  }

  @Mutation(() => GardenType)
  async createGarden(
    @Args('createGardenInput') createGardenInput: CreateGardenInput,
  ) {
    const owner = await this.userService.getUserById(createGardenInput.owner);
    const garden = await this.gardenService.createGarden(createGardenInput);
    this.userService.addGarden(garden.id, owner);
    return garden;
  }

  @Mutation(() => GardenType)
  async modifyGarden(
    @Args('modifyGardenInput') modifyGardenInput: ModifyGardenInput,
  ) {
    const garden = await this.gardenService.modifyGarden(modifyGardenInput);
    return garden;
  }

  @Mutation(() => Boolean)
  async deleteGarden(@Args('gardenId') gardenId: string) {
    const gardenDeleted = await this.gardenService.deleteGardenById(gardenId);
    if (gardenDeleted) {
      const gardenOwner = await this.userService.getUserById(
        gardenDeleted.owner,
      );
      if (gardenOwner) {
        await this.userService.removeGarden(gardenId, gardenOwner);
        return true;
      }
    }
    return false;
  }

  @ResolveField()
  async owner(@Parent() garden: GardenEntity) {
    return this.userService.getUserById(garden.owner);
  }

  @Mutation(() => GardenType)
  async addPlanting(
    @Args('addPlantingInput') addPlantingInput: AddPlantingInput,
  ) {
    const garden = await this.gardenService.addPlanting(addPlantingInput);
    return garden;
  }

  @Mutation(() => GardenType)
  async modifyPlanting(
    @Args('modifyPlantingInput') modifyPlantingInput: ModifyPlantingInput,
  ) {
    const garden = await this.gardenService.modifyPlanting(modifyPlantingInput);
    return garden;
  }

  @Mutation(() => GardenType)
  async removePlanting(
    @Args('removePlantingInput') removePlantingInput: RemovePlantingInput,
  ) {
    const garden = await this.gardenService.removePlanting(removePlantingInput);
    return garden;
  }
}
