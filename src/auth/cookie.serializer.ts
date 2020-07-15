import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthUserType } from './auth-user.type';
import { UserService } from '../user/user.service';

@Injectable()
export class CookieSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }

  serializeUser(user: any, done: (a: any, b: any) => void): any {
    const authUserType: AuthUserType = {
      id: user.id,
    };
    done(null, authUserType);
  }

  async deserializeUser(
    payload: any,
    done: (a: any, b: any) => void,
  ): Promise<any> {
    try {
      const user = await this.userService.getUserById(payload.id);
      if (user) {
        done(null, user);
      } else {
        done('error', payload);
      }
    } catch (error) {
      done(null, null);
    }
  }
}
