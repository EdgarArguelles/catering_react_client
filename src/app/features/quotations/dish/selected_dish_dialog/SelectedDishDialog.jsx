import './SelectedDishDialog.scss';
import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import {useBrowserNavigation, useIsMobileSize} from 'app/common/Hooks';
import Animate from 'app/common/components/animate/Animate';
import Dish from 'app/features/quotations/dish/Dish';
import DishHeader from './dish_header/DishHeader';
import {selectDish} from 'app/features/quotations/dish/DishReducer';

const SelectedDishDialog = () => {
  const dispatch = useDispatch();
  const fullScreen = useIsMobileSize();
  const dish = useSelector(state =>
    state.data.dishes.data ? state.data.dishes.data[state.quotations.dish.selected] : null);
  const deselectDish = useCallback(() => dispatch(selectDish('')), [dispatch]);
  const dishName = dish ? `${dish.id} - ${dish.name}` : '';
  const visible = !!dish;
  useBrowserNavigation(visible, deselectDish);

  return (
    <Animate show={visible} animationIn="zoomInUp" animationOut="zoomOutUp">
      <Dialog id="selected-dish-dialog" fullWidth={true} maxWidth="sm" fullScreen={fullScreen}
              dish-name={dishName} onClose={deselectDish} open={visible} transitionDuration={1000}>
        <DialogTitle className="selected-dish-dialog-title">
          {dish ? <DishHeader dish={dish} onClose={fullScreen ? deselectDish : null}/> : <div/>}
        </DialogTitle>
        <DialogContent className="selected-dish-dialog-content">
          {dish ? <Dish dish={dish}/> : <div className="empty"/>}
        </DialogContent>
        {!fullScreen && <DialogActions><Button onClick={deselectDish}>Cerrar</Button></DialogActions>}
      </Dialog>
    </Animate>
  );
};

export default React.memo(SelectedDishDialog);