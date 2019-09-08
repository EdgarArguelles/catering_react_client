import './Header.scss';
import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Logo from './logo/Logo';
import Menu from './menu/Menu';

const Header = () => {
  const [fixed, setFixed] = useState(false);
  useEffect(() => {
    const handleScroll = () => setFixed(window.pageYOffset > 10);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header id="header" className={fixed ? 'header-fixed' : ''}>
      <Grid container className="header-container" justify="space-between">
        <Logo id="header-logo"/>
        <Menu/>
      </Grid>
    </header>
  );
};

export default React.memo(Header);