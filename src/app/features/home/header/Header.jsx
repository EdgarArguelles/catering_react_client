import './Header.scss';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Logo from './logo/Logo';
import Menu from './menu/Menu';

const Header = () => {
  return (
    <header id="header">
      <Grid container className="header-container" justify="space-between">
        <Logo/>
        <Menu/>
      </Grid>
    </header>
  );
};

export default React.memo(Header);