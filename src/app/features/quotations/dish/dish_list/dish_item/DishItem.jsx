import './DishItem.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import formatCurrency from 'format-currency';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Utils from 'app/common/Utils';
import {isDishAdded} from 'app/features/quotations/dish/Dish.service';
import Image from 'app/common/components/image/Image';
import DishActions from 'app/features/quotations/dish/DishActions';

const DishItem = ({dish}) => {
  const dispatch = useDispatch();
  const multipleDishesDialog = useSelector(state => state.quotations.multipleDishesDialog);
  const menuCourses = useSelector(state => state.quotations.quotation.menus.find(menu => menu.isSelected).courses);
  const selectDish = () => dispatch(DishActions.selectDish(dish.id));

  return (
    <Paper className="dish-item" elevation={8}>
      {isDishAdded(multipleDishesDialog, menuCourses, dish.id) &&
      <i className="added fas fa-check-circle" aria-hidden="true"/>}
      <ButtonBase focusRipple className="dish-btn" onClick={selectDish}>
        <Image className="image" alt={dish.name} smallLoading={true} src={Utils.getDriveImage(dish.picture)}/>
        <div className="image-content image-backdrop"/>
        <div className="image-content">
          <div className="image-info">
            <p className="image-title">{dish.name}</p>
            <p className="image-subtitle">{formatCurrency(dish.price, {format: '%s%v', symbol: '$'})}</p>
          </div>
          <div className="image-action">
            <i className="fas fa-info-circle info-icon" aria-hidden="true"/>
          </div>
        </div>
      </ButtonBase>
    </Paper>
  );
};

DishItem.propTypes = {
  dish: PropTypes.object.isRequired,
};

export default React.memo(DishItem);