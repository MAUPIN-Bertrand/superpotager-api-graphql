import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import passport from 'passport';
import { LogInInput } from './input/log-in.input';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContextHost): Promise<boolean> {
    try {
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req;
      const args = ctx.getArgs();
      const arg = args.loginInput;
      request.body = {
        ...ctx.getContext().req.body,
        ...arg,
      };
      const result = (await super.canActivate(context)) as boolean;
      if (result) {
        await super.logIn(request);
      }
      return result;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
