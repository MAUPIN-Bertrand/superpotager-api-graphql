import { Request as ExpressRequest } from 'express';
import { PassportSubscriptionContext, PassportContext } from 'graphql-passport';
import { AuthUserType } from './auth-user.type';

export type AuthContext = PassportContext<AuthUserType, ExpressRequest>;

export type AuthSubscriptionContext = PassportSubscriptionContext<
  AuthUserType,
  ExpressRequest
>;
