import './ContactDialog.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import {useBrowserNavigation, useIsMobileSize} from 'app/hooks/Common';
import DialogBack from 'app/common/components/dialog_back/DialogBack';
import Contact from 'app/features/home/contact/Contact';

const ContactDialog = ({open, onClose}) => {
  const fullScreen = useIsMobileSize();
  useBrowserNavigation(open, onClose);

  return (
    <Dialog id="contact-dialog" fullWidth={true} maxWidth="md" fullScreen={fullScreen} open={open} onClose={onClose}
            TransitionComponent={Slide} transitionDuration={500}>
      {fullScreen && <DialogBack title="Contactanos" onClose={onClose}/>}
      <DialogContent>
        <Contact/>
      </DialogContent>
      {!fullScreen && <DialogActions><Button onClick={onClose}>Cerrar</Button></DialogActions>}
    </Dialog>
  );
};

ContactDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(ContactDialog);