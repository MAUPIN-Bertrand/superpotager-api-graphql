import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString } from 'class-validator';
@InputType()
export class CreatePlantInput {
  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  icon: string;
}
