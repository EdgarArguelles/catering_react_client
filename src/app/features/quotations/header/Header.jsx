import './Header.scss';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Navigation from './navigation/Navigation';
import Menu from './menu/Menu';

const Header = () => {
  return (
    <header id="quotations-header">
      <AppBar id="app-bar">
        <Toolbar className="tool-bar">
          <Navigation/>
          <Menu/>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default React.memo(Header);