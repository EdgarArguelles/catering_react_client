import './CourseContent.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import formatCurrency from 'format-currency';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {getDishesPrice} from 'app/features/quotations/dish/Dish.service';
import {useMultipleDishes} from 'app/features/quotations/course_type/CourseType.service';
import DishActions from 'app/features/quotations/dish/DishActions';
import MultipleDishesDialogActions
  from 'app/features/quotations/course_type/multiple_dishes_dialog/MultipleDishesDialogActions';

const CourseContent = ({course, onActionClick}) => {
  const dispatch = useDispatch();
  const courseTypes = useSelector(state => state.data.courseTypes);
  const dishes = useSelector(state => state.data.dishes);
  const selectDish = dishId => dispatch(DishActions.selectDish(dishId));
  const isMultipleDishes = useMultipleDishes(courseTypes[course.type.id]);
  const openMultipleDishesDialog = dishesInMultiple => {
    dishesInMultiple.forEach(d => dispatch(MultipleDishesDialogActions.addDish(d.id)));
    dispatch(MultipleDishesDialogActions.openDialog());
  };

  const getDishesList = () => {
    const dishesInMultiple = [];
    return course.dishes.map(({id}) => {
      const dish = dishes ? dishes[id] : undefined;
      isMultipleDishes && dish && dishesInMultiple.push(dish);
      return !dish ? null : (
        <li key={dish.id} className={dish.status === 0 ? 'deprecated-text' : ''}>
          <a onClick={() => isMultipleDishes ? openMultipleDishesDialog(dishesInMultiple) : selectDish(dish.id)}>
            {`${dish.name}${dish.status === 0 ? ' (platillo dado de baja)' : ''}`}
          </a>
        </li>
      );
    });
  };

  return (
    <CardHeader
      className="course-content"
      avatar={<div>
        <i className="fas fa-grip-vertical course-drag-icon" aria-hidden="true"/>
        <Avatar className="avatar">{course.position}</Avatar>
      </div>}
      subheader={<ul>{getDishesList()}</ul>}
      action={<>
        <p className="price">
          {formatCurrency(getDishesPrice(course.dishes, dishes), {format: '%s%v', symbol: '$'})}
        </p>
        <IconButton onClick={onActionClick}><i className="fas fa-trash" aria-hidden="true"/></IconButton>
      </>}/>
  );
};

CourseContent.propTypes = {
  course: PropTypes.object.isRequired,
  onActionClick: PropTypes.func.isRequired,
};

export default React.memo(CourseContent);