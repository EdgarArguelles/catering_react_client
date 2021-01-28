import './SelectedDishDialog.scss';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import {useDish} from 'app/hooks/data/Dishes';
import {useBrowserNavigation, useIsMobileSize} from 'app/hooks/Common';
import Animate from 'app/common/components/animate/Animate';
import Dish from 'app/features/quotations/dish/Dish';
import DishHeader from './dish_header/DishHeader';
import {selectDish} from 'app/features/quotations/dish/DishReducer';

const SelectedDishDialog = () => {
  const dispatch = useDispatch();
  const fullScreen = useIsMobileSize();
  const isMultipleOpen = useSelector(state => state.quotations.multipleDishesDialog.isMultipleDishesDialogOpen);
  const isMenuDialogOpen = useSelector(state => state.quotations.isMenuDialogOpen);
  const selectedDish = useSelector(state => state.quotations.dish.selected);
  const {data: dish} = useDish(selectedDish);
  const deselectDish = useCallback(() => dispatch(selectDish('')), [dispatch]);
  const [shouldWait, setShouldWait] = useState(isMultipleOpen || isMenuDialogOpen);
  const dishName = dish ? `${dish.id} - ${dish.name}` : '';
  const visible = !!dish && !shouldWait;
  useBrowserNavigation(visible, deselectDish);

  useEffect(() => {
    const wait = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShouldWait(false);
    };

    shouldWait && wait();
  }, [shouldWait]);

  useEffect(() => {
    (isMultipleOpen || isMenuDialogOpen) && setShouldWait(true);
  }, [isMultipleOpen, isMenuDialogOpen]);

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