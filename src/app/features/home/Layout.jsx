import './Layout.scss';
import React, {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';
import {useAppTheme} from 'app/common/Hooks';
import Utils from 'app/common/Utils';
import BackToTop from 'app/common/components/back_to_top/BackToTop';
import SideMenu from './side_menu/SideMenu';
import Header from './header/Header';
import Home from './home/Home';
import About from './about/About';
import Services from './services/Services';
import Quotations from './quotations/Quotations';
import Social from './social/Social';
import Contact from './contact/Contact';

const Layout = () => {
  const {themeIcon, changeTheme} = useAppTheme();
  useEffect(() => {
    Utils.completeLoading();
  }, []);

  const animateIcon = () => Utils.animateIcon('change-theme-icon');
  const handleClick = () => {
    animateIcon();
    changeTheme();
  };

  return (
    <div id="layout">
      <SideMenu/>
      <Header/>
      <main id="main">
        <Home/>
        <About/>
        <Services/>
        <section id="separation"/>
        <Quotations/>
        <Social/>
        <Contact isHomeScreen={true}/>
      </main>
      <IconButton className="change-theme-button floating-button" onClick={handleClick} onMouseEnter={animateIcon}>
        <FontAwesomeIcon id="change-theme-icon" icon={themeIcon}/>
      </IconButton>
      <BackToTop/>
    </div>
  );
};

export default React.memo(Layout);