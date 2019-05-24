import './Categories.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Utils from '../../../../../common/Utils';
import {CategoryContentLoader} from '../../../../../common/components/content_loaders/ContentLoaders.react';
import {getCurrentCourseTypeDishes} from '../../../course_type/CourseType.service';
import {getActiveDishes} from '../../../dish/Dish.service';
import Category from './category/Category.react';
import DishFilterActions from '../DishFilterActions';

class Categories extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    filter: PropTypes.object.isRequired,
    courseTypeDishes: PropTypes.array.isRequired,
    setCategories: PropTypes.func.isRequired,
  };

  getCategories = () => {
    const {courseTypeDishes, location: {search}} = this.props;
    const category = new URLSearchParams(search).get('categoria');
    const filteredDishes = category ?
      courseTypeDishes.filter(dish => dish.categories.map(c => c.name).includes(category)) :
      courseTypeDishes;

    const allCategories = filteredDishes.map(dish => dish.categories.map(c => c.name))
      .reduce((accumulator, array) => [...accumulator, ...array], []);

    const categoriesArray = [...new Set(allCategories)]; // remove duplicated entries
    return categoriesArray.sort(Utils.getSortString());
  };

  render() {
    const {filter, setCategories} = this.props;
    const categories = this.getCategories();
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
  }
}

const mapStateToProps = state => {
  const courseTypeDishes = getCurrentCourseTypeDishes(getActiveDishes(state.data.dishes),
    state.data.courseTypes, state.quotations.selectedTab);

  return {
    filter: state.quotations.dish.filter,
    courseTypeDishes: courseTypeDishes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCategories: categories => {
      dispatch(DishFilterActions.setCategories(categories));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Categories));