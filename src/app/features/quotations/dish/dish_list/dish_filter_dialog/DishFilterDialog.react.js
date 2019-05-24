import './DishFilterDialog.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';
import cateringDialog from '../../../../../common/components/catering_dialog/CateringDialog';
import DishFilter from '../../dish_filter/DishFilter.react';

const Transition = props => {
  return <Slide direction="up" {...props}/>;
};

class DishFilterDialog extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    fullScreen: PropTypes.bool.isRequired,
  };

  render() {
    const {open, onClose, fullScreen} = this.props;

    return (
      <Dialog id="dish-filter-dialog" fullWidth={true} maxWidth="md" fullScreen={fullScreen} open={open}
              onClose={onClose} TransitionComponent={Transition} transitionDuration={500}>
        <DialogContent>
          <DishFilter/>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withMobileDialog()(cateringDialog(DishFilterDialog));