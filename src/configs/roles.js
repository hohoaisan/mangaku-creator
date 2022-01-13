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
  [enumRoles.USER]: 'Regular user',
  [enumRoles.ADMIN]: 'Administrator',
  [enumRoles.AUTHOR]: 'Author',
  [enumRoles.MOD]: 'Moderator'
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
