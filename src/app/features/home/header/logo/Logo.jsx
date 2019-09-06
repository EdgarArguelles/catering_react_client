import './Logo.scss';
import image from 'assets/img/logo.png';
import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({onClick}) => {
  const handleClick = () => {
    window.scroll({top: 0, left: 0, behavior: 'smooth'});
    onClick && onClick();
  };

  return (
    <div id="logo">
      <a onClick={handleClick}><img id="logo" className="company-logo" src={image} alt="logo"/></a>
    </div>
  );
};

Logo.propTypes = {
  onClick: PropTypes.func,
};

export default React.memo(Logo);