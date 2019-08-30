import './HamburgerIcon.scss';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const HamburgerIcon = ({onOpen, onClose}) => {
  const [open, setOpen] = useState(false);
  const [fixed, setFixed] = useState(false);
  const className = (open ? 'open ' : '') + (fixed ? 'fixed' : '');

  useEffect(() => {
    const handleScroll = () => setFixed(window.pageYOffset > 10);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (open) {
      setOpen(false);
      onClose && onClose();
    } else {
      setOpen(true);
      onOpen && onOpen();
    }
  };

  return <div id="hamburger-icon" className={className} onClick={handleClick}><span/><span/><span/></div>;
};

HamburgerIcon.propTypes = {
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

export default React.memo(HamburgerIcon);