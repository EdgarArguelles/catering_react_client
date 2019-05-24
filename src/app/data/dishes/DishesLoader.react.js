import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {areAllDishesPresent, fetchDishesList} from '../../features/quotations/dish/Dish.service';
import DishesActions from './DishesActions';

class DishesLoader extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    renderer: PropTypes.func,
    loader: PropTypes.object,
    dishes: PropTypes.array.isRequired,
    dataVersion: PropTypes.number,
    dishFetching: PropTypes.object.isRequired,
    allDishes: PropTypes.object,
    fetchDish: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const {dishes, dishFetching, allDishes, fetchDish} = this.props;
    fetchDishesList(dishes, allDishes, dishFetching, fetchDish);
  }

  componentWillUpdate(nextProps) {
    const {dishes, dataVersion, dishFetching, allDishes, fetchDish} = nextProps;

    if (this.props.dataVersion !== dataVersion) {
      fetchDishesList(dishes, allDishes, dishFetching, fetchDish);
    }
  }

  render() {
    const {children, renderer, loader, dishes, allDishes} = this.props;

    if (areAllDishesPresent(dishes, allDishes) || dishes.length === 0) {
      if (renderer) {
        return renderer();
      }

      return <React.Fragment>{children}</React.Fragment>;
    }

    if (loader) {
      return loader;
    }

    return null;
  }
}

const mapStateToProps = state => {
  return {
    dataVersion: state.data.version,
    dishFetching: state.data.fetching.dish,
    allDishes: state.data.dishes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDish: dishId => {
      dispatch(DishesActions.fetchDish(dishId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DishesLoader);