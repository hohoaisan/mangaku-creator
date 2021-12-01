const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers'],
  author: [],
  mod: ['getUsers', 'manageUsers']
};

const roleNames = {
  user: 'Regular user',
  admin: 'Administrator',
  mod: 'Moderator',
  author: 'Author'
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleNames,
  roleRights
};
