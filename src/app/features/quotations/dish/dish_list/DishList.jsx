import './DishList.scss';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import {getCourseTypeDishes, getCurrentCourseType} from 'app/features/quotations/course_type/CourseType.service';
import {getActiveDishes} from 'app/features/quotations/dish/Dish.service';
import DishCarButton from './dish_car_button/DishCarButton.react';
import DishFilterDialog from './dish_filter_dialog/DishFilterDialog';
import DishToolbar from './dish_toolbar/DishToolbar.react';
import DishGrid from './dish_grid/DishGrid.react';
import NavigationActions from 'app/features/quotations/header/navigation/NavigationActions';
import DishesActions from 'app/data/dishes/DishesActions';

const DishList = ({location}) => {
  const dispatch = useDispatch();
  const courseType = useSelector(state => getCurrentCourseType(state.data.courseTypes, state.quotations.selectedTab));
  const courseTypeDishes = useSelector(state => getCourseTypeDishes(getActiveDishes(state.data.dishes), courseType));
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const category = new URLSearchParams(location.search).get('categoria');
  const categoryDishes = category ?
    courseTypeDishes.filter(dish => dish.categories.map(c => c.name).includes(category)) :
    courseTypeDishes;

  useEffect(() => {
    dispatch(NavigationActions.changeNavigation('/presupuestos/menu/editar', courseType.name));

    // load courseType's dishes if they aren't present
    if (courseTypeDishes.length <= 0) {
      dispatch(DishesActions.fetchDishes(courseType.id));
    }
  }, [courseType.id, courseType.name, courseTypeDishes.length, dispatch]);

  return (
    <div id="dish-list">
      <DishToolbar/>
      <DishGrid dishes={categoryDishes} isLoading={courseTypeDishes.length <= 0}/>
      <DishCarButton/>
      <Fab id="dish-filter-button" color="primary" className="floating-button animated fadeInRight"
           classes={{label: 'dish-filter-button-label'}} onClick={() => setIsFilterOpen(true)}>
        <i id="dish-filter-button-icon" className="fas fa-filter" aria-hidden="true"/>
      </Fab>

      <DishFilterDialog open={isFilterOpen} onClose={() => setIsFilterOpen(false)}/>
    </div>
  );
};

DishList.propTypes = {
  location: PropTypes.object.isRequired,
};

export default React.memo(DishList);