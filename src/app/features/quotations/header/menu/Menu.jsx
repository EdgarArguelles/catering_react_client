import './Menu.scss';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import Utils from 'app/common/Utils';
import ContactDialog from 'app/features/quotations/header/contact_dialog/ContactDialog';
import HomeLink from './home_link/HomeLink';
import User from './user/User';

const Menu = () => {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const animateIcon = () => Utils.animateIcon('menu-phone-icon');
  const handleClick = () => {
    animateIcon();
    setIsContactDialogOpen(true);
  };

  return (
    <div id="menu">
      <HomeLink/>
      <Button color="inherit" onClick={handleClick} onMouseEnter={animateIcon}>
        <FontAwesomeIcon id="menu-phone-icon" icon={faPhone}/>
        <p>Contactanos</p>
      </Button>
      <User/>
      <ContactDialog open={isContactDialogOpen} onClose={() => setIsContactDialogOpen(false)}/>
    </div>
  );
};

export default React.memo(Menu);