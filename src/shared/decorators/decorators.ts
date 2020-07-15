import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Response } from 'express';
import { UserEntity } from '../../user/user.entity';
import { AuthContext } from '../../auth/auth.context';

export const ResGql = createParamDecorator(
  (data: unknown, context: ExecutionContext): Response =>
    GqlExecutionContext.create(context).getContext().res,
);

export const GqlUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserEntity => {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.req && ctx.req.user;
  },
);

//export const CurrentUser = createParamDecorator((data, req) => req.user);

export const CurrentUserID = createParamDecorator(
  (data: unknown, context: ExecutionContext): string => {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.req.user.id;
  },
);

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): string => {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.req.user;
  },
);
