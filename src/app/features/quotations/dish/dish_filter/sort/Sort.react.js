import './Sort.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import DishFilterActions from 'app/features/quotations/dish/dish_filter/DishFilterActions';

class Sort extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    iconClass: PropTypes.string.isRequired,
    filter: PropTypes.object.isRequired,
    changeSort: PropTypes.func.isRequired,
  };

  render() {
    const {value, label, iconClass, filter, changeSort} = this.props;
    const className = filter.sort === value ? 'active' : '';

    return (
      <Grid item xs={6} sm={4} className="filter-sort">
        <Fab className={className} onClick={() => changeSort(value)}>
          <i className={iconClass} aria-hidden="true"/>
        </Fab>
        <p>{label}</p>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    filter: state.quotations.dish.filter,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeSort: sort => {
      dispatch(DishFilterActions.changeSort(sort));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);