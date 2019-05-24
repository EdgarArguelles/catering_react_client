import './Header.scss';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Logo from './logo/Logo.react';
import Menu from './menu/Menu.react';

export default class Header extends React.Component {
  static propTypes = {};

  render() {
    return (
      <header id="header">
        <Grid container className="header-container" justify="space-between">
          <Logo/>
          <Menu/>
        </Grid>
      </header>
    );
  }
}