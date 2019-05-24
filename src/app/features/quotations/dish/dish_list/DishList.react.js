import './DishList.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import {getCourseTypeDishes, getCurrentCourseType} from '../../course_type/CourseType.service';
import {getActiveDishes} from '../../dish/Dish.service';
import DishCarButton from './dish_car_button/DishCarButton.react';
import DishFilterDialog from './dish_filter_dialog/DishFilterDialog.react';
import DishToolbar from './dish_toolbar/DishToolbar.react';
import DishGrid from './dish_grid/DishGrid.react';
import NavigationActions from '../../header/navigation/NavigationActions';
import DishesActions from '../../../../data/dishes/DishesActions';

class DishList extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    courseType: PropTypes.object.isRequired,
    courseTypeDishes: PropTypes.array.isRequired,
    changeNavigation: PropTypes.func.isRequired,
    fetchDishes: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {isFilterOpen: false};
  }

  componentWillMount() {
    const {courseType, courseTypeDishes, changeNavigation, fetchDishes} = this.props;
    changeNavigation('/presupuestos/menu/editar', courseType.name);

    // load courseType's dishes if they aren't present
    if (courseTypeDishes.length <= 0) {
      fetchDishes(courseType.id);
    }
  }

  render() {
    const {isFilterOpen} = this.state;
    const {courseTypeDishes, location: {search}} = this.props;
    const category = new URLSearchParams(search).get('categoria');
    const categoryDishes = category ?
      courseTypeDishes.filter(dish => dish.categories.map(c => c.name).includes(category)) :
      courseTypeDishes;

    return (
      <div id="dish-list">
        <DishToolbar/>
        <DishGrid dishes={categoryDishes} isLoading={courseTypeDishes.length <= 0}/>
        <DishCarButton/>
        <Fab id="dish-filter-button" color="primary" className="floating-button animated fadeInRight"
             classes={{label: 'dish-filter-button-label'}} onClick={() => this.setState({isFilterOpen: true})}>
          <i id="dish-filter-button-icon" className="fas fa-filter" aria-hidden="true"/>
        </Fab>

        <DishFilterDialog open={isFilterOpen} onClose={() => this.setState({isFilterOpen: false})}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const courseType = getCurrentCourseType(state.data.courseTypes, state.quotations.selectedTab);

  return {
    courseType: courseType,
    courseTypeDishes: getCourseTypeDishes(getActiveDishes(state.data.dishes), courseType),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeNavigation: (backLink, title) => {
      dispatch(NavigationActions.changeNavigation(backLink, title));
    },
    fetchDishes: courseTypeId => {
      dispatch(DishesActions.fetchDishes(courseTypeId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DishList);