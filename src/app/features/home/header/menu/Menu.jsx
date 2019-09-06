import './Menu.scss';
import React, {useEffect} from 'react';
import MenuItems, {selectItem} from './menu_items/MenuItems';

const Menu = () => {
  useEffect(() => {
    const handleScroll = () => selectItem();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <nav id="nav-menu-container"><MenuItems/></nav>;
};

export default React.memo(Menu);