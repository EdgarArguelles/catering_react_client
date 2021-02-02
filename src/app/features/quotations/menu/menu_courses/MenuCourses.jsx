import './MenuCourses.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';
import {useDishesByIds} from 'app/hooks/data/Dishes';
import {selectDishWithoutActions} from 'app/features/quotations/dish/DishReducer';

const MenuCourses = ({courseType}) => {
  const dispatch = useDispatch();
  const menu = useSelector(state => state.quotations.quotation.menus.find(m => m.isSelected));
  const selectDish = dishId => dispatch(selectDishWithoutActions(dishId));
  const courses = menu.courses.filter(course => course.type.id === courseType.id);
  const dishesIds = courses.map(course => course.dishes.map(dish => dish.id)).flat();
  const {dishes: allDishes, isAnyFetching} = useDishesByIds(dishesIds);
  const sortedCourses = courses.sort((a, b) => a.position - b.position);

  const getCourse = course => {
    const dishes = [];

    course.dishes.forEach((dish, index) => {
      let ext = index === course.dishes.length - 2 ? ' y ' : ', ';
      ext = index === course.dishes.length - 1 ? '' : ext;
      const dishName = allDishes.find(d => d.id === dish.id).name;
      dishes.push(<span key={dish.id}><a onClick={() => selectDish(dish.id)}>{dishName}</a>{ext}</span>);
    });

    return <li key={`${course.type.id}-${course.position}`}>{dishes}</li>;
  };

  const getRenderer = () => {
    return <ol type="I">{sortedCourses.map(course => getCourse(course))}</ol>;
  };

  const getLoading = () => Array(sortedCourses.length).fill(courseType.id).map((value, index) => (
    <div key={`${value}-${index}`}>
      <Skeleton variant="circle" animation="wave" className="loader-circle"/>
      <Skeleton variant="text" animation="wave" className="loader-text"/>
    </div>
  ));

  return (
    <div className="course-type">
      <p className="name">{courseType.name}</p>
      {isAnyFetching ? getLoading() : getRenderer()}
    </div>
  );
};

MenuCourses.propTypes = {
  courseType: PropTypes.object.isRequired,
};

export default React.memo(MenuCourses);