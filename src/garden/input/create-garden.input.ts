import { InputType, Field, Int } from '@nestjs/graphql';
import { IsUUID, IsInt, Min } from 'class-validator';
@InputType()
export class CreateGardenInput {
  @IsInt()
  @Min(1)
  @Field(() => Int)
  width: number;

  @IsInt()
  @Min(1)
  @Field(() => Int)
  height: number;

  @IsUUID()
  @Field()
  owner: string;
}
