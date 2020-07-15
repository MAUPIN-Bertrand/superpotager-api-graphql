import { InputType, Field, Int } from '@nestjs/graphql';
import { IsUUID, IsInt } from 'class-validator';
@InputType()
export class RemovePlantingInput {
  @IsUUID()
  @Field()
  gardenID: string;

  @IsInt()
  @Field(() => Int)
  plantingIndex: number;
}
