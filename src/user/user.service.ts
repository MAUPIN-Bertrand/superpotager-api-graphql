import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { v4 as uuid } from 'uuid';
import { SignUpInput } from '../auth/input/sign-up.input';
import { ChangeInfosInput } from './change-infos.input';
import { ChangeRolesInput } from './change-roles.input';
import { GardenService } from '../garden/garden.service';
import { RolesEnum } from 'src/shared/enum/roles.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private gardenService: GardenService,
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getUserById(id: string): Promise<UserEntity> {
    const found = await this.userRepository.findOne({ id });
    if (!found) throw new NotFoundException(`User with ID : '${id}' not found`);
    return found;
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const found = await this.userRepository.findOne({ email });
    if (!found)
      throw new NotFoundException(`User with Email : '${email}' not found`);
    return found;
  }

  async createUser(signUpInput: SignUpInput): Promise<UserEntity> {
    const { username, email, password } = signUpInput;

    const user = this.userRepository.create({
      id: uuid(),
      email,
      username,
    });

    const passwordHashed = await user.savePassword(password);

  

    if (!passwordHashed) {
      throw new InternalServerErrorException();
    }

    if (email === 'yutini17@yahoo.fr') {
      user.roles = [RolesEnum.ADMIN];
    }
    
    return this.userRepository.save(user);
  }

  async changeInfos(changeInfosInput: ChangeInfosInput): Promise<UserEntity> {
    const { userId, tagLine } = changeInfosInput;
    const user = await this.getUserById(userId);
    user.tagLine = tagLine;
    await this.userRepository.save(user);
    return user;
  }

  async addGarden(gardenId: string, user: UserEntity): Promise<UserEntity> {
    user.addGarden(gardenId);
    await this.userRepository.save(user);
    return user;
  }

  async removeGarden(gardenId: string, user: UserEntity): Promise<UserEntity> {
    user.removeGarden(gardenId);
    await this.userRepository.save(user);
    return user;
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.getUserById(id);
    if (user) {
      if (user.gardens) {
        user.gardens.forEach(
          async gardenID => await this.gardenService.deleteGardenById(gardenID),
        );
      }

      await this.userRepository.remove(user);
      return true;
    }
    return false;
  }

  async changeUserRoles(
    changeRolesInput: ChangeRolesInput,
  ): Promise<UserEntity> {
    const user = await this.getUserById(changeRolesInput.userId);
    user.roles = changeRolesInput.roles;
    await this.userRepository.save(user);
    return user;
  }
}
