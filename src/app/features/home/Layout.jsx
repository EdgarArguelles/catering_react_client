import './Layout.scss';
import React, {useEffect} from 'react';
import IconButton from '@material-ui/core/IconButton';
import {initJQuery} from 'app/Template';
import {useAppTheme} from 'app/common/Hooks';
import BackToTop from 'app/common/components/back_to_top/BackToTop';
import Header from './header/Header';
import Home from './home/Home';
import About from './about/About';
import Services from './services/Services';
import Quotations from './quotations/Quotations';
import Contact from './contact/Contact';

const Layout = () => {
  const {themeIcon, changeTheme} = useAppTheme();
  useEffect(() => {
    initJQuery();
  }, []);

  return (
    <div id="layout">
      <Header/>
      <main id="main">
        <Home/>
        <About/>
        <Services/>
        <section id="separation"/>
        <Quotations/>
        <Contact isHomeScreen={true}/>
      </main>
      <IconButton className="change-theme-button floating-button" onClick={changeTheme}>
        <i className={themeIcon} aria-hidden="true"/>
      </IconButton>
      <BackToTop/>
    </div>
  );
};

export default React.memo(Layout);