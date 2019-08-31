import './SideMenu.scss';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import withWidth from '@material-ui/core/withWidth';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import HamburgerIcon from 'app/common/components/hamburger_icon/HamburgerIcon';
import Logo from 'app/features/home/header/logo/Logo';
import MenuItems from 'app/features/home/header/menu/menu_items/MenuItems';

const SideMenu = ({width}) => {
  const [open, setOpen] = useState(false);
  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);

  if (width !== 'xs') {
    return null;
  }

  return (
    <>
      <HamburgerIcon open={open} onOpen={openMenu} onClose={closeMenu}/>
      <SwipeableDrawer id="side-menu" open={open} onOpen={openMenu} onClose={closeMenu}>
        <Logo onClick={closeMenu}/>
        <MenuItems onClick={closeMenu}/>
      </SwipeableDrawer>
    </>
  );
};

SideMenu.propTypes = {
  width: PropTypes.string.isRequired,
};

export default React.memo(withWidth()(SideMenu));