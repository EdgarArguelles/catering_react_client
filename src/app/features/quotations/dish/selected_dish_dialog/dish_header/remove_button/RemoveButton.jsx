import './RemoveButton.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import isEqual from 'lodash/isEqual';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import Fab from '@material-ui/core/Fab';
import History from 'app/router/History';
import MenuActions from 'app/features/quotations/menu/MenuActions';
import MultipleDishesDialogActions
  from 'app/features/quotations/course_type/multiple_dishes_dialog/MultipleDishesDialogActions';
import DishActions from 'app/features/quotations/dish/DishActions';

const RemoveButton = ({className, dish}) => {
  const dispatch = useDispatch();
  const menuCourses = useSelector(state => state.quotations.quotation.menus.find(menu => menu.isSelected).courses);
  const isMultipleDishesDialogOpen = useSelector(state =>
    state.quotations.multipleDishesDialog.isMultipleDishesDialogOpen);

  const handleRemoveCourse = () => {
    if (isMultipleDishesDialogOpen) {
      dispatch(MultipleDishesDialogActions.removeDish(dish.id));
      dispatch(DishActions.selectDish(''));
      History.navigate('/presupuestos/menu/editar');
      return;
    }

    const course = menuCourses.find(c => c.type.id === dish.courseTypeId &&
      isEqual(c.dishes.map(d => ({id: d.id})), [{id: dish.id}]));
    dispatch(MenuActions.removeCourse(dish.courseTypeId, course.position));
    dispatch(MenuActions.decreasePrice(dish.price));
  };

  return (
    <Fab id="remove-button" variant="extended" color="secondary" onClick={handleRemoveCourse}
         className={className} classes={{label: 'remove-button-label'}}>
      <FontAwesomeIcon id="remove-button-icon" className="button-icon" icon={faMinusCircle}/> Remover
    </Fab>
  );
};

RemoveButton.propTypes = {
  className: PropTypes.string,
  dish: PropTypes.object.isRequired,
};

export default React.memo(RemoveButton);