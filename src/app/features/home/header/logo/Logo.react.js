import './Logo.scss';
import image from 'assets/img/logo.png';
import React from 'react';

export default class Logo extends React.Component {
  static propTypes = {};

  render() {
    return <div id="logo"><a href="#home"><img id="logo" className="company-logo" src={image} alt="logo"/></a></div>;
  }
}