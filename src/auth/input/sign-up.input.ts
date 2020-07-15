import {
  IsEmail,
  MinLength,
  IsString,
  MaxLength,
  Matches,
} from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignUpInput {
  @IsEmail()
  @Field()
  readonly email: string;

  @MinLength(6)
  @IsString()
  @Field()
  readonly username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password must be strong',
  })
  @Field()
  readonly password: string;
}
