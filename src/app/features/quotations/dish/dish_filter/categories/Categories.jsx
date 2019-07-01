import './Categories.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Utils from 'app/common/Utils';
import {getCurrentCourseTypeDishes} from 'app/features/quotations/course_type/CourseType.service';
import {getActiveDishes} from 'app/features/quotations/dish/Dish.service';
import {CategoryContentLoader} from 'app/common/components/content_loaders/ContentLoaders';
import Category from './category/Category';
import DishFilterActions from 'app/features/quotations/dish/dish_filter/DishFilterActions';

const Categories = ({location}) => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.quotations.dish.filter);
  const courseTypeDishes = useSelector(state => getCurrentCourseTypeDishes(getActiveDishes(state.data.dishes),
    state.data.courseTypes, state.quotations.selectedTab));
  const setCategories = categories => dispatch(DishFilterActions.setCategories(categories));

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

  const categories = getCategories();
  const isAllSelected = filter.categories === null || filter.categories.length === categories.length;

  return (
    <Grid id="filter-categories" container>
      <Grid item xs={12}>
        <Checkbox color="primary" checked={isAllSelected} onChange={() => setCategories(isAllSelected ? [] : null)}/>
        <b>Todos</b>
      </Grid>
      <Grid item xs={12}>
        {categories.length === 0 && <CategoryContentLoader/>}
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

Categories.propTypes = {
  location: PropTypes.object.isRequired,
};

export default React.memo(withRouter(Categories));