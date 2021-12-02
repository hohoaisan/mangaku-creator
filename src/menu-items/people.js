// assets
import { IconUsers } from '@tabler/icons';

// constant
const icons = {
  IconUsers
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'people',
  title: 'People',
  type: 'group',
  children: [
    {
      id: 'user',
      title: 'Manage Users',
      type: 'item',
      icon: icons.IconUsers,
      url: '/users',
      breadcrumbs: false
    }
  ]
};

export default pages;
