// assets
import { IconUsers } from '@tabler/icons';

import strings from 'constants/strings';

const { menus: menuStrings } = strings;
// constant
const icons = {
  IconUsers
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'people',
  title: menuStrings.manageUsers,
  type: 'group',
  role: ['admin'],
  children: [
    {
      id: 'user',
      title: menuStrings.manageUsers,
      type: 'item',
      icon: icons.IconUsers,
      url: '/users',
      breadcrumbs: false
    }
  ]
};

export default pages;
