import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { UserType } from '../user/user.type';
import { PlantingType } from './planting.type';
@ObjectType('Garden')
export class GardenType {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  width: number;

  @Field(() => Int)
  height: number;

  @Field(() => UserType)
  owner: string;

  @Field(() => [PlantingType], { defaultValue: [] })
  plantings: PlantingType[];
}
