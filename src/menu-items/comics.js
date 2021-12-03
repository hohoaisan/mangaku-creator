// assets
import { IconNote, IconNotebook, IconNotes, IconUsers } from '@tabler/icons';

// constant
const icons = {
  IconNote,
  IconNotebook,
  IconNotes,
  IconUsers
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'comic',
  title: 'Manage Comics',
  type: 'group',
  children: [
    {
      id: 'comics',
      title: 'Comics',
      type: 'item',
      icon: icons.IconNotes,
      url: '/comics',
      breadcrumbs: false
    },
    {
      id: 'comic_authors',
      title: 'Authors',
      type: 'item',
      icon: icons.IconUsers,
      url: '/authors',
      breadcrumbs: false
    },
    {
      id: 'comic_format',
      title: 'Formats',
      type: 'item',
      icon: icons.IconNote,
      url: '/formats',
      breadcrumbs: false
    },
    {
      id: 'comic_genres',
      title: 'Genres',
      type: 'item',
      icon: icons.IconNote,
      url: '/genres',
      breadcrumbs: false
    }
  ]
};

export default pages;
