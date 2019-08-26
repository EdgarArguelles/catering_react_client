import './Sort.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Utils from 'app/common/Utils';
import DishFilterActions from 'app/features/quotations/dish/dish_filter/DishFilterActions';

const Sort = ({value, label, icon}) => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.quotations.dish.filter);
  const className = filter.sort === value ? 'active' : '';
  const animateIcon = () => Utils.animateIcon(`${label}-sort-icon`);
  const changeSort = () => {
    animateIcon();
    dispatch(DishFilterActions.changeSort(value));
  };

  return (
    <Grid item xs={6} sm={4} className="filter-sort">
      <Fab className={className} onClick={changeSort} onMouseEnter={animateIcon}>
        <FontAwesomeIcon id={`${label}-sort-icon`} icon={icon}/>
      </Fab>
      <p>{label}</p>
    </Grid>
  );
};

Sort.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};

export default React.memo(Sort);