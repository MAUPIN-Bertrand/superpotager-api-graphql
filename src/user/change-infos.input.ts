import { IsString, IsUUID } from 'class-validator';
import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class ChangeInfosInput {
  @IsUUID()
  @Field(() => ID)
  userId: string;

  @IsString()
  @Field()
  readonly tagLine: string;
}
