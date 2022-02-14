import strings from 'constants/strings';

const { roles: roleStrings } = strings;

export const enumRoles = {
  USER: 'user',
  ADMIN: 'admin',
  AUTHOR: 'author',
  MOD: 'mod'
};

export const allRoles = {
  [enumRoles.USER]: [],
  [enumRoles.ADMIN]: ['getUsers', 'manageUsers'],
  [enumRoles.AUTHOR]: [],
  [enumRoles.MOD]: ['getUsers', 'manageUsers']
};

export const roleNames = {
  [enumRoles.USER]: roleStrings.USER,
  [enumRoles.ADMIN]: roleStrings.ADMIN,
  [enumRoles.AUTHOR]: roleStrings.AUTHOR,
  [enumRoles.MOD]: roleStrings.MOD
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));

export const selectableRoles = [
  {
    name: roleNames[enumRoles.USER],
    value: enumRoles.USER
  },
  {
    name: roleNames[enumRoles.ADMIN],
    value: enumRoles.ADMIN
  },
  {
    name: roleNames[enumRoles.MOD],
    value: enumRoles.MOD
  }
];
