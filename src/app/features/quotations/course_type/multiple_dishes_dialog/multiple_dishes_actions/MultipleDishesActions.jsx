import './MultipleDishesActions.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import {useAreDishesLoaded} from 'app/common/Hooks';
import {getDishesPrice} from 'app/features/quotations/dish/Dish.service';
import MenuActions from 'app/features/quotations/menu/MenuActions';
import MultipleDishesDialogActions
  from 'app/features/quotations/course_type/multiple_dishes_dialog/MultipleDishesDialogActions';

const MultipleDishesActions = ({courseType, onClose}) => {
  const dispatch = useDispatch();
  const allDishes = useSelector(state => state.data.dishes);
  const menuCourses = useSelector(state => state.quotations.quotation.menus.find(menu => menu.isSelected).courses);
  const multipleDishes = useSelector(state => state.quotations.multipleDishesDialog.dishes);
  const cleanDishes = () => dispatch(MultipleDishesDialogActions.cleanDishes());
  const addCourse = (dishesIds, position) => dispatch(MenuActions.addCourse(courseType.id, dishesIds, position));
  const increasePrice = amount => dispatch(MenuActions.increasePrice(amount));
  const areDishesLoaded = useAreDishesLoaded(multipleDishes);

  const save = () => {
    const courseTypeCourses = menuCourses.filter(course => course.type.id === courseType.id);
    const coursePrice = getDishesPrice(multipleDishes, allDishes);
    addCourse(multipleDishes.map(dish => dish.id), courseTypeCourses.length + 1);
    increasePrice(coursePrice);
    cleanDishes();
    onClose();
  };

  return (
    <div className="multiple-dishes-actions">
      <Button onClick={onClose}>Cancelar</Button>
      {areDishesLoaded &&
      <Button color="primary" onClick={save} disabled={multipleDishes.length <= 0}>Crear</Button>}
    </div>
  );
};

MultipleDishesActions.propTypes = {
  courseType: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(MultipleDishesActions);