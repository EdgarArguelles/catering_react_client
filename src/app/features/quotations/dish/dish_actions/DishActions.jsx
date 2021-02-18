import './DishActions.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {isDishAdded} from 'app/features/quotations/dish/Dish.service';
import AddButton from './add_button/AddButton';
import RemoveButton from './remove_button/RemoveButton';

const DishActions = ({dish}) => {
  const menu = useSelector(state => state.quotations.quotation.menus.find(m => m.isSelected));
  const multipleDishesDialog = useSelector(state => state.quotations.multipleDishesDialog);
  const showActions = useSelector(state => state.quotations.dish.showActions);
  const menuCourses = menu?.courses || [];

  if (!menu || !showActions || !dish.courseTypeId) {
    return null;
  }

  const getAction = () => {
    return isDishAdded(multipleDishesDialog, menuCourses, dish.id)
      ? <RemoveButton dish={dish} className="animate__animated animate__rubberBand"/>
      : <AddButton dish={dish} className="animate__animated animate__rubberBand"/>;
  };

  return <div className="dish-actions">{getAction()}</div>;
};

DishActions.propTypes = {
  dish: PropTypes.object.isRequired,
};

export default React.memo(DishActions);