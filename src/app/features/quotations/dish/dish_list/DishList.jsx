import './DishList.scss';
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFilter} from '@fortawesome/free-solid-svg-icons';
import Fab from '@material-ui/core/Fab';
import Utils from 'app/common/Utils';
import {getCourseTypeDishes, getCurrentCourseType} from 'app/features/quotations/course_type/CourseType.service';
import {getActiveDishes} from 'app/features/quotations/dish/Dish.service';
import DishCarButton from './dish_car_button/DishCarButton';
import DishFilterDialog from './dish_filter_dialog/DishFilterDialog';
import DishToolbar from './dish_toolbar/DishToolbar';
import DishGrid from './dish_grid/DishGrid';
import {changeNavigation} from 'app/features/quotations/header/navigation/NavigationReducer';
import {openDishFilterDialog} from 'app/features/quotations/dish/dish_filter/DishFilterReducer';
import {fetchDishes} from 'app/data/dishes/DishesReducer';

const DishList = ({location}) => {
  const dispatch = useDispatch();
  const courseType = useSelector(state =>
    getCurrentCourseType(state.data.courseTypes.data, state.quotations.selectedTab));
  const courseTypeDishes = useSelector(state =>
    getCourseTypeDishes(getActiveDishes(state.data.dishes.data), courseType));
  const category = new URLSearchParams(location.search).get('categoria');
  const categoryDishes = category ?
    courseTypeDishes.filter(dish => dish.categories.map(c => c.name).includes(category)) :
    courseTypeDishes;

  useEffect(() => {
    dispatch(changeNavigation({backLink: '/presupuestos/menu/editar', title: courseType.name}));

    // load courseType's dishes if they aren't present
    if (courseTypeDishes.length <= 0) {
      dispatch(fetchDishes(courseType.id));
    }
  }, [courseType.id, courseType.name, courseTypeDishes.length, dispatch]);

  const animateIcon = () => Utils.animateIcon('dish-filter-button-icon');
  const handleClick = () => {
    animateIcon();
    dispatch(openDishFilterDialog());
  };

  return (
    <div id="dish-list">
      <DishToolbar/>
      <DishGrid dishes={categoryDishes} isLoading={courseTypeDishes.length <= 0}/>
      <DishCarButton/>
      <Fab id="dish-filter-button" color="primary" className="floating-button animate__animated animate__fadeInRight"
           classes={{label: 'dish-filter-button-label'}} onClick={handleClick} onMouseEnter={animateIcon}>
        <FontAwesomeIcon id="dish-filter-button-icon" icon={faFilter}/>
      </Fab>

      <DishFilterDialog/>
    </div>
  );
};

DishList.propTypes = {
  location: PropTypes.object.isRequired,
};

export default React.memo(DishList);