import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as request from 'supertest';
import { UserEntity } from '../../user/user.entity';
import { RolesEnum } from '../enum/roles.enum';

@Injectable()
export class AuthorizationOwnerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();
    if (args) {
      let userId = args.userId;
      if (!userId) {
        const values = Object.keys(args).map(key => args[key]);
        const found = values.find(element => {
          return element.userId != undefined;
        });
        if (found) {
          userId = found.userId;
        }
      }
      if (userId) {
        const request = ctx.getContext().req;
        const user: UserEntity = request.user;
        if (user.id === userId) {
          user.roles = user.roles
            ? [...user.roles, RolesEnum.OWNER]
            : [RolesEnum.OWNER];
        }
      }
    }

    return true;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
