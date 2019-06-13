import './Layout.scss';
import React from 'react';
import {initJQuery} from 'app/Template';
import BackToTop from 'app/common/components/back_to_top/BackToTop';
import Header from './header/Header.react';
import Home from './home/Home.react';
import About from './about/About.react';
import Services from './services/Services.react';
import Quotations from './quotations/Quotations.react';
import Contact from './contact/Contact.react';

export default class Layout extends React.Component {
  static propTypes = {};

  componentDidMount() {
    initJQuery();
  }

  render() {
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
  }
}