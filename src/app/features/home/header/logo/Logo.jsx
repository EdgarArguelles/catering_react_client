import './Logo.scss';
import image from 'assets/img/logo.png';
import React from 'react';

const Logo = () => {
  return <div id="logo"><a href="#home"><img id="logo" className="company-logo" src={image} alt="logo"/></a></div>;
};

export default React.memo(Logo);