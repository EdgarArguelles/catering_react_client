import React from 'react';
import PropTypes from 'prop-types';
import Zoom from '@material-ui/core/Zoom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import cateringDialog from 'app/common/components/catering_dialog/CateringDialog';

const CateringDialog = cateringDialog(Dialog);

export default class ConfirmationDialog extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    content: PropTypes.object,
    okID: PropTypes.string,
    okLabel: PropTypes.string,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onOK: PropTypes.func.isRequired,
  };

  componentWillUpdate(nextProps) {
    const {open} = this.props;

    if (!open && nextProps.open) {
      navigator.vibrate(500);
    }
  }

  render() {
    const {className, title, label, content, okID, okLabel, open, onClose, onOK} = this.props;

    return (
      <CateringDialog className={className} TransitionComponent={Zoom} transitionDuration={500}
                      open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <div>{label}</div>
          {content}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button id={okID} color="primary" classes={{label: `${okID}-label`}} onClick={onOK}>{okLabel || 'OK'}</Button>
        </DialogActions>
      </CateringDialog>
    );
  }
}