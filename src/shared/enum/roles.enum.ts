import { registerEnumType, EnumOptions } from '@nestjs/graphql';

export enum RolesEnum {
  OWNER = 1,
  USER,
  ADMIN,
}
const rolesEnumOptions: EnumOptions = {
  name: 'RolesEnum',
};
registerEnumType(RolesEnum, rolesEnumOptions);
