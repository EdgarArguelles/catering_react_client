import './Categories.scss';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Checkbox from '@material-ui/core/Checkbox';
import Utils from 'app/common/Utils';
import {useCourseTypes} from 'app/hooks/data/CourseTypes';
import {getCurrentCourseTypeDishes} from 'app/features/quotations/course_type/CourseType.service';
import {getActiveDishes} from 'app/features/quotations/dish/Dish.service';
import Category from './category/Category';
import {setCategories} from 'app/features/quotations/dish/dish_filter/DishFilterReducer';

const Categories = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {data: courseTypes} = useCourseTypes();
  const filter = useSelector(state => state.quotations.dish.filter);
  const courseTypeDishes = useSelector(state => getCurrentCourseTypeDishes(getActiveDishes(state.data.dishes.data),
    courseTypes, state.quotations.selectedTab));
  const setCat = categories => dispatch(setCategories(categories));

  const getCategories = () => {
    const category = new URLSearchParams(location.search).get('categoria');
    const filteredDishes = category ?
      courseTypeDishes.filter(dish => dish.categories.map(c => c.name).includes(category)) :
      courseTypeDishes;

    const allCategories = filteredDishes.map(dish => dish.categories.map(c => c.name))
      .reduce((accumulator, array) => [...accumulator, ...array], []);

    const categoriesArray = [...new Set(allCategories)]; // remove duplicated entries
    return categoriesArray.sort(Utils.getSortString());
  };

  const getLoading = () => {
    const getCheck = () => (
      <div className="loader-check">
        <Skeleton variant="text" animation="wave" className="check-text"/>
        <Skeleton variant="circle" animation="wave" className="check-circle"/>
        <Skeleton variant="text" animation="wave" className="text"/>
      </div>
    );

    return (<>{getCheck()}{getCheck()}{getCheck()}{getCheck()}{getCheck()}</>);
  };

  const categories = getCategories();
  const isAllSelected = filter.categories === null || filter.categories.length === categories.length;

  return (
    <Grid id="filter-categories" container>
      <Grid item xs={12}>
        <Checkbox color="primary" checked={isAllSelected} onChange={() => setCat(isAllSelected ? [] : null)}/>
        <b>Todos</b>
      </Grid>
      <Grid item xs={12}>
        {categories.length === 0 && getLoading()}
        <Grid container>
          {categories.map(category => (
            <Grid key={category} item xs={6} sm={4} className="section-header">
              <Category category={category} categories={categories} isAllSelected={isAllSelected}/>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(Categories);