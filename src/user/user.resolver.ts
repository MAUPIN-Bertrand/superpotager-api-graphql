import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserType } from './user.type';
import { Query, ID } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { ChangeInfosInput } from './change-infos.input';
import { UseGuards } from '@nestjs/common';
import { GardenService } from '../garden/garden.service';
import { AuthorizationOwnerGuard } from '../shared/guards/authorization-owner.guard';
import { AuthenticatedGuard } from '../shared/guards/authenticated.guard';
import { Roles } from '../shared/decorators/roles.decorator';
import { RolesGuard } from '../shared/guards/roles.guard';
import { RolesEnum } from 'src/shared/enum/roles.enum';
import { ChangeRolesInput } from './change-roles.input';

@Resolver(() => UserType)
export class UserResolver {
  constructor(
    private userService: UserService,
    private gardenService: GardenService,
  ) {}

  @Query(() => [UserType])
  async users(): Promise<UserEntity[]> {
    return this.userService.getUsers();
  }

  @Query(() => UserType)
  async user(@Args('userId') userId: string): Promise<UserEntity> {
    return this.userService.getUserById(userId);
  }

  @Mutation(() => UserType)
  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
  @UseGuards(AuthenticatedGuard, AuthorizationOwnerGuard, RolesGuard)
  async changeUserInfos(
    @Args('changeInfosInput') changeInfosInput: ChangeInfosInput,
  ) {
    return this.userService.changeInfos(changeInfosInput);
  }

  @Mutation(() => UserType)
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthenticatedGuard, AuthorizationOwnerGuard, RolesGuard)
  async changeUserRoles(
    @Args('changeRolesInput') changeRolesInput: ChangeRolesInput,
  ) {
    return this.userService.changeUserRoles(changeRolesInput);
  }

  @Mutation(() => Boolean)
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthenticatedGuard, AuthorizationOwnerGuard, RolesGuard)
  async deleteUser(
    @Args('userToDeleteID', { type: () => ID }) userToDeleteID: string,
  ) {
    return this.userService.deleteUser(userToDeleteID);
  }

  @ResolveField()
  async gardens(@Parent() user: UserEntity) {
    return this.gardenService.getManyGardens(user.gardens);
  }
}
