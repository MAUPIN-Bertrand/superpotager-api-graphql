import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
@ObjectType('Planting')
export class PlantingType {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  plantId: string;

  @Field()
  icon: string;

  @Field(() => Int)
  xPosition: number;

  @Field(() => Int)
  yPosition: number;

  @Field(() => Int)
  width: number;

  @Field(() => Int)
  height: number;
}
