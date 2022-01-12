// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

import useAuth from 'hooks/useAuth';
// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const auth = useAuth();
  const navItems = menuItem.items.map((item) => {
    if (item.role && !item.role.includes(auth.user.role)) {
      return null;
    }
    if (item.children) {
      item.children = item.children.filter((child) => {
        if (child.role && !child.role.includes(auth.user.role)) {
          return false;
        }
        return true;
      });
    }
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
