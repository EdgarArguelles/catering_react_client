import './HamburgerIcon.scss';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const HamburgerIcon = ({open, onOpen, onClose}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fixed, setFixed] = useState(false);
  const className = (isOpen ? 'open ' : '') + (fixed ? 'fixed' : '');

  useEffect(() => {
    const handleScroll = () => setFixed(window.pageYOffset > 10);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClick = () => {
    if (isOpen) {
      setIsOpen(false);
      onClose && onClose();
    } else {
      setIsOpen(true);
      onOpen && onOpen();
    }
  };

  return <div id="hamburger-icon" className={className} onClick={handleClick}><span/><span/><span/></div>;
};

HamburgerIcon.propTypes = {
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

export default React.memo(HamburgerIcon);