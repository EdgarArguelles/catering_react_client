import './ContactDialog.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';
import {useBrowserNavigation} from 'app/common/Hooks';
import Contact from 'app/features/home/contact/Contact.react';

const ContactDialog = ({open, onClose, fullScreen}) => {
  useBrowserNavigation(open, onClose);

  return (
    <Dialog id="contact-dialog" fullWidth={true} maxWidth="md" fullScreen={fullScreen} open={open} onClose={onClose}
            TransitionComponent={Slide} transitionDuration={500}>
      <DialogContent>
        <Contact/>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

ContactDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool.isRequired,
};

export default React.memo(withMobileDialog()(ContactDialog));