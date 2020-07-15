import { IsEmail, MinLength, IsString, MaxLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LogInInput {
  @IsEmail()
  @Field()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Field()
  readonly password: string;
}
