import './MultipleDishesActions.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import {useAreDishesLoaded} from 'app/common/Hooks';
import {getDishesPrice} from 'app/features/quotations/dish/Dish.service';
import {addCourse, increasePrice} from 'app/features/quotations/menu/MenuReducer';
import {cleanDishes} from 'app/features/quotations/course_type/multiple_dishes_dialog/MultipleDishesDialogReducer';

const MultipleDishesActions = ({courseType, onClose}) => {
  const dispatch = useDispatch();
  const allDishes = useSelector(state => state.data.dishes.data);
  const menuCourses = useSelector(state => state.quotations.quotation.menus.find(menu => menu.isSelected).courses);
  const multipleDishes = useSelector(state => state.quotations.multipleDishesDialog.dishes);
  const handleCleanDishes = () => dispatch(cleanDishes());
  const handleAddCourse = (dishesIds, position) => dispatch(addCourse({
    courseTypeId: courseType.id,
    dishesIds,
    position,
  }));
  const handleIncreasePrice = amount => dispatch(increasePrice(amount));
  const areDishesLoaded = useAreDishesLoaded(multipleDishes);

  const save = () => {
    const courseTypeCourses = menuCourses.filter(course => course.type.id === courseType.id);
    const coursePrice = getDishesPrice(multipleDishes, allDishes);
    handleAddCourse(multipleDishes.map(dish => dish.id), courseTypeCourses.length + 1);
    handleIncreasePrice(coursePrice);
    handleCleanDishes();
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