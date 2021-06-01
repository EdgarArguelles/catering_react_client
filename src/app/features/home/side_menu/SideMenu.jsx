import './SideMenu.scss';
import React, { useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import HamburgerIcon from 'app/common/components/hamburger_icon/HamburgerIcon';
import Logo from 'app/features/home/header/logo/Logo';
import MenuItems from 'app/features/home/header/menu/menu_items/MenuItems';

const SideMenu = () => {
  const showMenu = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const [open, setOpen] = useState(false);
  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);

  if (!showMenu) {
    return null;
  }

  return (
    <>
      <HamburgerIcon open={open} onOpen={openMenu} onClose={closeMenu}/>
      <SwipeableDrawer id="side-menu" open={open} onOpen={openMenu} onClose={closeMenu}>
        <Logo id="side-logo" animationDuration={65} onClick={closeMenu}/>
        <MenuItems onClick={closeMenu}/>
      </SwipeableDrawer>
    </>
  );
};

export default React.memo(SideMenu);