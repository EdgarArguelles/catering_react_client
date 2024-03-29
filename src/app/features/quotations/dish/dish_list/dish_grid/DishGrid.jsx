import './DishGrid.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Utils from 'app/common/Utils';
import Animate from 'app/common/components/animate/Animate';
import DishItem from 'app/features/quotations/dish/dish_list/dish_item/DishItem';

const DishGrid = ({ dishes, isLoading }) => {
  const filter = useSelector(state => state.quotations.dish.filter);
  const { sort, search, categories } = filter;

  const getSort = () => {
    switch (sort) {
    case 'price':
      return (a, b) => a.price - b.price;
    case 'name':
      return Utils.getSortString('name');
    default:
      return () => 0;
    }
  };

  const isDishVisible = dish => {
    if (search !== '' && !dish.name.toUpperCase().includes(search.toUpperCase())) {
      return false;
    }

    if (categories && categories.length >= 0 && !dish.categories.some(category => categories.includes(category.name))) {
      return false;
    }

    return true;
  };

  const getContentLoader = () => {
    if (!isLoading) {
      return null;
    }

    const getLoading = () => (<>
      <Skeleton variant="rect" animation="pulse" className="loader-body"/>
      <Skeleton variant="rect" animation="wave" className="loader-footer"/>
    </>);

    return Array(12).fill('loader').map((value, index) =>
      <Grid key={`${value}-${index}`} item xs={6} sm={4} md={4} lg={3} xl={2}>{getLoading()}</Grid>);
  };

  return (
    <Grid id="dish-grid" container spacing={2} justify="flex-start">
      {getContentLoader()}
      {[...dishes].sort(getSort()).map(dish => (
        <Animate key={dish.id} show={isDishVisible(dish)} animationIn="fadeInDown" animationOut="fadeOutUp faster">
          <Grid item xs={6} sm={4} md={4} lg={3} xl={2}><DishItem dish={dish}/></Grid>
        </Animate>
      ))}
    </Grid>
  );
};

DishGrid.propTypes = {
  dishes: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default React.memo(DishGrid);