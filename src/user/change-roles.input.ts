import { IsUUID, IsArray } from 'class-validator';
import { InputType, Field, ID } from '@nestjs/graphql';
import { RolesEnum } from '../shared/enum/roles.enum';

@InputType()
export class ChangeRolesInput {
  @IsUUID()
  @Field(() => ID)
  userId: string;

  @IsArray()
  @Field(() => [RolesEnum])
  readonly roles: RolesEnum[];
}
