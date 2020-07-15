import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RolesEnum } from '../enum/roles.enum';
import { UserEntity } from '../../user/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<RolesEnum[]>(
      'roles',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    const request = this.getRequest(context);
    const user: UserEntity = request.user;
    const hasRole = () =>
      user?.roles?.some(role => {
        const found = roles.find(item => {
          return item === role;
        });
        return !!found;
      });

    const result = hasRole();
    return user && user.roles && result;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
