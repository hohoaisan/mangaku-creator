// assets
import { IconNote, IconNotebook, IconNotes, IconUsers } from '@tabler/icons';

import strings from 'constants/strings';

const { menus: menuStrings } = strings;
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
  title: menuStrings.comic,
  type: 'group',
  children: [
    {
      id: 'comics',
      title: menuStrings.manageComic,
      type: 'item',
      icon: icons.IconNotes,
      url: '/comics',
      breadcrumbs: false
    },
    {
      id: 'comic_authors',
      title: menuStrings.manageAuthor,
      type: 'item',
      icon: icons.IconUsers,
      url: '/authors',
      role: ['admin', 'mod'],
      breadcrumbs: false
    },
    {
      id: 'comic_format',
      title: menuStrings.manageFormat,
      type: 'item',
      icon: icons.IconNote,
      url: '/formats',
      role: ['admin', 'mod'],
      breadcrumbs: false
    },
    {
      id: 'comic_genres',
      title: menuStrings.manageGenre,
      type: 'item',
      icon: icons.IconNote,
      url: '/genres',
      role: ['admin', 'mod'],
      breadcrumbs: false
    }
  ]
};

export default pages;
