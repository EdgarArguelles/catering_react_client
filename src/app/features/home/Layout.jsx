import './Layout.scss';
import React, {useEffect} from 'react';
import {initJQuery} from 'app/Template';
import BackToTop from 'app/common/components/back_to_top/BackToTop';
import Header from './header/Header';
import Home from './home/Home';
import About from './about/About';
import Services from './services/Services.react';
import Quotations from './quotations/Quotations';
import Contact from './contact/Contact';

const Layout = () => {
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
      <BackToTop/>
    </div>
  );
};

export default React.memo(Layout);