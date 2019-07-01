import './Menu.scss';
import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import ContactDialog from 'app/features/quotations/header/contact_dialog/ContactDialog';
import HomeLink from './home_link/HomeLink';
import User from './user/User';

const Menu = () => {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  return (
    <div id="menu">
      <HomeLink/>
      <Button color="inherit" onClick={() => setIsContactDialogOpen(true)}>
        <i className="fas fa-phone" aria-hidden="true"/>
        <p>Contactanos</p>
      </Button>
      <User/>
      <ContactDialog open={isContactDialogOpen} onClose={() => setIsContactDialogOpen(false)}/>
    </div>
  );
};

export default React.memo(Menu);