import './Logo.scss';
import Image from 'assets/img/logo.svg';
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Utils from 'app/common/Utils';

const Logo = ({id, onClick}) => {
  useEffect(() => {
    Utils.animateIcon(id, {strokeWidth: 3, duration: 150, animation: 'delayed'});
  }, [id]);

  const handleClick = () => {
    window.scroll({top: 0, left: 0, behavior: 'smooth'});
    onClick && onClick();
  };

  return <Image id={id} className="logo" onClick={handleClick}/>;
};

Logo.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default React.memo(Logo);