import './Sort.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import DishFilterActions from 'app/features/quotations/dish/dish_filter/DishFilterActions';

const Sort = ({value, label, iconClass}) => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.quotations.dish.filter);
  const className = filter.sort === value ? 'active' : '';
  const changeSort = () => dispatch(DishFilterActions.changeSort(value));

  return (
    <Grid item xs={6} sm={4} className="filter-sort">
      <Fab className={className} onClick={changeSort}>
        <i className={iconClass} aria-hidden="true"/>
      </Fab>
      <p>{label}</p>
    </Grid>
  );
};

Sort.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
};

export default React.memo(Sort);