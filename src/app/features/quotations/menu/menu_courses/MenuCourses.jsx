import './MenuCourses.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';
import {useAreDishesLoaded} from 'app/common/Hooks';
import {getSortedCourseTypes} from 'app/features/quotations/course_type/CourseType.service';
import {selectDishWithoutActions} from 'app/features/quotations/dish/DishReducer';

const MenuCourses = ({courseType}) => {
  const dispatch = useDispatch();
  const allDishes = useSelector(state => state.data.dishes.data);
  const menu = useSelector(state => state.quotations.quotation.menus.find(m => m.isSelected));
  const selectDish = dishId => dispatch(selectDishWithoutActions(dishId));
  const courses = menu.courses.filter(course => course.type.id === courseType.id);
  const areDishesLoaded = useAreDishesLoaded(courses.map(course => course.dishes).flatten());

  const getCourse = course => {
    const dishes = [];

    course.dishes.forEach((dish, index) => {
      let ext = index === course.dishes.length - 2 ? ' y ' : ', ';
      ext = index === course.dishes.length - 1 ? '' : ext;
      dishes.push(<span key={dish.id}><a onClick={() => selectDish(dish.id)}>{allDishes[dish.id].name}</a>{ext}</span>);
    });

    return <li key={`${course.type.id}-${course.position}`}>{dishes}</li>;
  };

  const getRenderer = () => {
    return <ol type="I">{getSortedCourseTypes(courses, true).map(course => getCourse(course))}</ol>;
  };

  const getLoading = () => {
    const getLoader = () => (<>
      <Skeleton variant="circle" animation="wave" className="loader-circle"/>
      <Skeleton variant="text" animation="wave" className="loader-text"/>
    </>);

    return <>{getLoader()}{getLoader()}{getLoader()}{getLoader()}</>;
  };

  return (
    <div className="course-type">
      <p className="name">{courseType.name}</p>
      {areDishesLoaded ? getRenderer() : getLoading()}
    </div>
  );
};

MenuCourses.propTypes = {
  courseType: PropTypes.object.isRequired,
};

export default React.memo(MenuCourses);