import './DishFilterDialog.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';
import {useBrowserNavigation} from 'app/common/Hooks';
import DialogBack from 'app/common/components/dialog_back/DialogBack';
import DishFilter from 'app/features/quotations/dish/dish_filter/DishFilter';
import DishFilterActions from 'app/features/quotations/dish/dish_filter/DishFilterActions';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props}/>);

const DishFilterDialog = ({fullScreen}) => {
  const dispatch = useDispatch();
  const isDialogOpen = useSelector(state => state.quotations.dish.filter.isDialogOpen);
  const onClose = () => dispatch(DishFilterActions.closeDishFilterDialog());
  useBrowserNavigation(isDialogOpen, onClose);

  return (
    <Dialog id="dish-filter-dialog" fullWidth={true} maxWidth="md" fullScreen={fullScreen} open={isDialogOpen}
            onClose={onClose} TransitionComponent={Transition} transitionDuration={500}>
      {fullScreen && <DialogBack title="Filtros" onClose={onClose}/>}
      <DialogContent>
        <DishFilter/>
      </DialogContent>
      {!fullScreen && <DialogActions><Button onClick={onClose}>Cerrar</Button></DialogActions>}
    </Dialog>
  );
};

DishFilterDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default React.memo(withMobileDialog()(DishFilterDialog));