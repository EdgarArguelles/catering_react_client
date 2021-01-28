import './MultipleDishesActions.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import {useDishesByIds} from 'app/hooks/data/Dishes';
import {useAreDishesLoaded} from 'app/hooks/Common';
import {addCourse, increasePrice} from 'app/features/quotations/menu/MenuReducer';
import {cleanDishes} from 'app/features/quotations/course_type/multiple_dishes_dialog/MultipleDishesDialogReducer';

const MultipleDishesActions = ({courseType, onClose}) => {
  const dispatch = useDispatch();
  const menuCourses = useSelector(state => state.quotations.quotation.menus.find(menu => menu.isSelected).courses);
  const multipleDishes = useSelector(state => state.quotations.multipleDishesDialog.dishes);
  const results = useDishesByIds(multipleDishes.map(dish => dish.id));
  const dishes = results.filter(result => result.data).map(result => result.data);
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
    const coursePrice = dishes.reduce((accumulator, dish) => dish.price ? accumulator + dish.price : accumulator, 0);
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