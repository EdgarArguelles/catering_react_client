import './AuthDialog.scss';
import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Zoom from '@material-ui/core/Zoom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import {useBrowserNavigation} from 'app/common/Hooks';
import Auth from 'app/features/auth/Auth';
import AuthDialogActions from './AuthDialogActions';

const AuthDialog = ({onSuccess}) => {
  const dispatch = useDispatch();
  const open = useSelector(state => state.quotations.isAuthDialogOpen);
  const onClose = useCallback(() => dispatch(AuthDialogActions.closeAuthDialog()), [dispatch]);
  useBrowserNavigation(open, onClose);

  const handleSuccess = () => {
    onSuccess && onSuccess();
    onClose();
  };

  return (
    <Dialog id="auth-dialog" maxWidth="xs" open={open} onClose={onClose}
            TransitionComponent={Zoom} transitionDuration={500}>
      <DialogTitle>Acceder</DialogTitle>
      <DialogContent>
        <Auth onSuccess={handleSuccess}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

AuthDialog.propTypes = {
  onSuccess: PropTypes.func,
};

export default React.memo(AuthDialog);