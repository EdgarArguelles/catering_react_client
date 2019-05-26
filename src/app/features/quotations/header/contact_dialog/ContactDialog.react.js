import './ContactDialog.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';
import cateringDialog from 'app/common/components/catering_dialog/CateringDialog';
import Contact from 'app/features/home/contact/Contact.react';

const Transition = props => {
  return <Slide {...props}/>;
};

class ContactDialog extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    fullScreen: PropTypes.bool.isRequired,
  };

  render() {
    const {open, onClose, fullScreen} = this.props;

    return (
      <Dialog id="contact-dialog" fullWidth={true} maxWidth="md" fullScreen={fullScreen} open={open} onClose={onClose}
              TransitionComponent={Transition} transitionDuration={500}>
        <DialogContent>
          <Contact/>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withMobileDialog()(cateringDialog(ContactDialog));