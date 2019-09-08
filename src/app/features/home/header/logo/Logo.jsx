import './Logo.scss';
import Image from 'assets/img/logo.svg';
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Utils from 'app/common/Utils';

const Logo = ({onClick}) => {
  useEffect(() => {
    Utils.animateIcon('logo', {strokeWidth: 3, duration: 150, animation: 'delayed'});
  }, []);

  const handleClick = () => {
    window.scroll({top: 0, left: 0, behavior: 'smooth'});
    onClick && onClick();
  };

  return <Image id="logo" onClick={handleClick}/>;
};

Logo.propTypes = {
  onClick: PropTypes.func,
};

export default React.memo(Logo);