import { ObjectType, Field, ID } from '@nestjs/graphql';
@ObjectType('Plant')
export class PlantType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  icon: string;
}
