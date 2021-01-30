import './CourseContent.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import formatCurrency from 'format-currency';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGripVertical, faTrash} from '@fortawesome/free-solid-svg-icons';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Utils from 'app/common/Utils';
import {useCourseTypes} from 'app/hooks/data/CourseTypes';
import {useDishesByIds} from 'app/hooks/data/Dishes';
import {useMultipleDishes} from 'app/features/quotations/course_type/CourseType.service';
import {selectDish} from 'app/features/quotations/dish/DishReducer';
import {
  addDish,
  openDialog,
} from 'app/features/quotations/course_type/multiple_dishes_dialog/MultipleDishesDialogReducer';

const CourseContent = ({course, onActionClick}) => {
  const dispatch = useDispatch();
  const {data: courseTypes} = useCourseTypes();
  const results = useDishesByIds(course.dishes.map(dish => dish.id));
  const dishes = results.filter(result => result.data).map(result => result.data);
  const coursePrice = dishes.reduce((accumulator, dish) => dish.price ? accumulator + dish.price : accumulator, 0);
  const handleSelectDish = dishId => dispatch(selectDish(dishId));
  const isMultipleDishes = useMultipleDishes(courseTypes.find(c => c.id === course.type.id));
  const handleRemoveClick = () => {
    Utils.animateIcon(`${course.type.id}-${course.position}-trash-icon`);
    onActionClick();
  };

  const openMultipleDishesDialog = dishesInMultiple => {
    dishesInMultiple.forEach(d => dispatch(addDish(d.id)));
    dispatch(openDialog());
  };

  const getDishesList = () => {
    const dishesInMultiple = [];
    return dishes.map(dish => {
      isMultipleDishes && dishesInMultiple.push(dish);
      return (
        <li key={dish.id} className={dish.status === 0 ? 'deprecated-text' : ''}>
          <a onClick={() => isMultipleDishes ? openMultipleDishesDialog(dishesInMultiple) : handleSelectDish(dish.id)}>
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
        <FontAwesomeIcon className="course-drag-icon" icon={faGripVertical}/>
        <Avatar className="avatar">{course.position}</Avatar>
      </div>}
      subheader={<ul>{getDishesList()}</ul>}
      action={<>
        <p className="price">{formatCurrency(coursePrice, {format: '%s%v', symbol: '$'})}</p>
        <IconButton onClick={handleRemoveClick}>
          <FontAwesomeIcon id={`${course.type.id}-${course.position}-trash-icon`} icon={faTrash}/>
        </IconButton>
      </>}/>
  );
};

CourseContent.propTypes = {
  course: PropTypes.object.isRequired,
  onActionClick: PropTypes.func.isRequired,
};

export default React.memo(CourseContent);