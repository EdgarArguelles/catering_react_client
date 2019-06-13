import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {areAllDishesPresent, fetchDishesList} from 'app/features/quotations/dish/Dish.service';
import DishesActions from './DishesActions';

const DishesLoader = ({children, renderer, loader, dishes}) => {
  const dispatch = useDispatch();
  const dishFetching = useSelector(state => state.data.fetching.dish);
  const allDishes = useSelector(state => state.data.dishes);

  useEffect(() => {
    const fetchDish = dishId => dispatch(DishesActions.fetchDish(dishId));

    fetchDishesList(dishes, allDishes, dishFetching, fetchDish);
  }, [dishes, dishFetching, allDishes, dispatch]);

  if (areAllDishesPresent(dishes, allDishes) || dishes.length === 0) {
    if (renderer) {
      return renderer();
    }

    return <>{children}</>;
  }

  if (loader) {
    return loader;
  }

  return null;
};

DishesLoader.propTypes = {
  children: PropTypes.object,
  renderer: PropTypes.func,
  loader: PropTypes.object,
  dishes: PropTypes.array.isRequired,
};

export default React.memo(DishesLoader);