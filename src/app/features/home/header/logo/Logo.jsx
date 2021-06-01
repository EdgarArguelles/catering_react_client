import './Logo.scss';
import Image from 'assets/img/logo.svg';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Utils from 'app/common/Utils';

const Logo = ({ id, animationDuration, onClick }) => {
  useEffect(() => {
    Utils.animateIcon(id, { strokeWidth: 3, duration: animationDuration || 150, animation: 'delayed' });
  }, [id, animationDuration]);

  const handleClick = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    onClick && onClick();
  };

  return <Image id={id} className="logo" onClick={handleClick}/>;
};

Logo.propTypes = {
  id: PropTypes.string.isRequired,
  animationDuration: PropTypes.number,
  onClick: PropTypes.func,
};

export default React.memo(Logo);