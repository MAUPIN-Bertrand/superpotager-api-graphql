import { ObjectType, Field, ID, HideField } from '@nestjs/graphql';
import { GardenType } from '../garden/garden.type';
import { RolesEnum } from '../shared/enum/roles.enum';

@ObjectType('User')
export class UserType {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field(() => [RolesEnum], { defaultValue: [] })
  roles: RolesEnum[];

  @Field()
  username: string;

  @HideField()
  passwordHash: string;

  @Field({ nullable: true })
  tagLine: string;

  @Field(() => [GardenType], { defaultValue: [] })
  gardens: string[];
}
