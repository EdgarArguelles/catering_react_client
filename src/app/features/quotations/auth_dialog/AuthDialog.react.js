import './AuthDialog.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Zoom from '@material-ui/core/Zoom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import cateringDialog from 'app/common/components/catering_dialog/CateringDialog';
import Auth from 'app/features/auth/Auth.react';
import AuthDialogActions from './AuthDialogActions';

class AuthDialog extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
  };

  handleSuccess = () => {
    const {onClose, onSuccess} = this.props;

    onSuccess && onSuccess();
    onClose();
  };

  render() {
    const {open, onClose} = this.props;

    return (
      <Dialog id="auth-dialog" maxWidth="xs" open={open} onClose={onClose}
              TransitionComponent={Zoom} transitionDuration={500}>
        <DialogTitle>Acceder</DialogTitle>
        <DialogContent>
          <Auth onSuccess={this.handleSuccess}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.quotations.isAuthDialogOpen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClose: () => {
      dispatch(AuthDialogActions.closeAuthDialog());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(cateringDialog(AuthDialog));