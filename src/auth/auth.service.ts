import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validate({ id }): Promise<UserEntity> {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async validateUser(email: string, pass: string): Promise<UserEntity> {
    const user = await this.userService.getUserByEmail(email);
    if (user && user.validatePassword(pass)) {
      user.passwordHash = undefined;
      return user;
    }
    return null;
  }
}
