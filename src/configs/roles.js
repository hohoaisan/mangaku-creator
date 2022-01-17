const { default: strings } = require('constants/strings');

const { roles: roleStrings } = strings;

const enumRoles = {
  USER: 'user',
  ADMIN: 'admin',
  AUTHOR: 'author',
  MOD: 'mod'
};

const allRoles = {
  [enumRoles.USER]: [],
  [enumRoles.ADMIN]: ['getUsers', 'manageUsers'],
  [enumRoles.AUTHOR]: [],
  [enumRoles.MOD]: ['getUsers', 'manageUsers']
};

const roleNames = {
  [enumRoles.USER]: roleStrings.USER,
  [enumRoles.ADMIN]: roleStrings.ADMIN,
  [enumRoles.AUTHOR]: roleStrings.AUTHOR,
  [enumRoles.MOD]: roleStrings.MOD
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

const selectableRoles = [
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

module.exports = {
  roles,
  enumRoles,
  roleNames,
  roleRights,
  selectableRoles
};
