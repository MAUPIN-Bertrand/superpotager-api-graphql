import { InputType, Field, Int } from '@nestjs/graphql';
import { IsUUID, IsInt } from 'class-validator';
@InputType()
export class ModifyPlantingInput {
  @IsUUID()
  @Field()
  gardenID: string;

  @IsUUID()
  @Field()
  plantingID: string;

  @IsInt()
  @Field(() => Int)
  xPosition: number;

  @IsInt()
  @Field(() => Int)
  yPosition: number;

  @IsInt()
  @Field(() => Int)
  width: number;

  @IsInt()
  @Field(() => Int)
  height: number;
}
