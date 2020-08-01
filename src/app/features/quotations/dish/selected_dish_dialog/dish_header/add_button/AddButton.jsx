import './AddButton.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCartPlus} from '@fortawesome/free-solid-svg-icons';
import Fab from '@material-ui/core/Fab';
import History from 'app/router/History';
import {addCourse, increasePrice} from 'app/features/quotations/menu/MenuReducer';
import MultipleDishesDialogActions
  from 'app/features/quotations/course_type/multiple_dishes_dialog/MultipleDishesDialogActions';
import DishActions from 'app/features/quotations/dish/DishActions';

const AddButton = ({className, dish}) => {
  const dispatch = useDispatch();
  const menuCourses = useSelector(state => state.quotations.quotation.menus.find(menu => menu.isSelected).courses);
  const isMultipleDishesDialogOpen = useSelector(state =>
    state.quotations.multipleDishesDialog.isMultipleDishesDialogOpen);

  const handleAddCourse = () => {
    if (isMultipleDishesDialogOpen) {
      dispatch(MultipleDishesDialogActions.addDish(dish.id));
      dispatch(DishActions.selectDish(''));
      History.navigate('/presupuestos/menu/editar');
      return;
    }

    const courseTypeCourses = menuCourses.filter(course => course.type.id === dish.courseTypeId);
    dispatch(addCourse({
      courseTypeId: dish.courseTypeId,
      dishesIds: [dish.id],
      position: courseTypeCourses.length + 1,
    }));
    dispatch(increasePrice(dish.price));
  };

  return (
    <Fab id="add-button" variant="extended" color="primary" onClick={handleAddCourse}
         className={className} classes={{label: 'add-button-label'}}>
      <FontAwesomeIcon id="add-button-icon" className="button-icon" icon={faCartPlus}/> Agregar
    </Fab>
  );
};

AddButton.propTypes = {
  className: PropTypes.string,
  dish: PropTypes.object.isRequired,
};

export default React.memo(AddButton);