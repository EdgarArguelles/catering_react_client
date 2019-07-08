import './DishFilterDialog.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';
import {useBrowserNavigation} from 'app/common/Hooks';
import DishFilter from 'app/features/quotations/dish/dish_filter/DishFilter';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props}/>);

const DishFilterDialog = ({open, onClose, fullScreen}) => {
  useBrowserNavigation(open, onClose);

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
};

DishFilterDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool.isRequired,
};

export default React.memo(withMobileDialog()(DishFilterDialog));