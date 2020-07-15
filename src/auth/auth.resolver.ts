import { LogInInput } from './input/log-in.input';
import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { CurrentUserID } from '../shared/decorators/decorators';
import { SignUpInput } from './input/sign-up.input';
import { UserType } from '../user/user.type';
import { NotFoundException } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthenticatedGuard } from '../shared/guards/authenticated.guard';
import { Request } from 'express';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserType)
  @UseGuards(AuthenticatedGuard)
  whoami(@CurrentUserID() userId: string) {
    return this.userService.getUserById(userId);
  }

  @Query(() => Boolean)
  async logout(@Context() context) {
    context.req.logout();
    return true;
  }

  // @UseGuards(LoginGuard)
  @Mutation(() => UserType)
  @UseGuards(LocalAuthGuard)
  async login(
    @Args('loginInput') { email, password }: LogInInput, // @Args('email') email: string, //@Args('password') password: string, //@ResGql() res: Response,
  ) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw Error('Email or password incorrect');
    }

    const valid = await user.validatePassword(password);
    if (!valid) {
      throw Error('Email or password incorrect');
    }
    return user;
  }

  @Mutation(() => UserType)
  async signup(
    @Args('signUpInput') signUpInput: SignUpInput,
    @Context() context,
  ) {
    try {
      const emailExists = await this.userService.getUserByEmail(
        signUpInput.email,
      );
      throw new Error(`Email : ${emailExists.email} is already in use`);
    } catch (error) {
      if (error instanceof NotFoundException) {
        const user = await this.userService.createUser(signUpInput);
        if (user) {
          const request: Request = context.req;
          request.login(user, err => {
            console.log(err);
          });
        }
        return user;
      } else {
        throw error;
      }
    }
  }
}
