import './DishFilter.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import DishFilterActions from './DishFilterActions';
import Categories from './categories/Categories.react';
import Sort from './sort/Sort.react';

class DishFilter extends React.Component {
  static propTypes = {
    resetFilters: PropTypes.func.isRequired,
  };

  render() {
    const {resetFilters} = this.props;

    return (
      <Grid id="dish-filter" container justify="center">
        <Grid item xs={12}>
          <Grid container justify="center">
            <Sort key="sort-name" value="name" label="Ordenar por nombre" iconClass="fas fa-sort-alpha-up"/>
            <Sort key="sort-price" value="price" label="Ordenar por precio" iconClass="fas fa-dollar-sign"/>
          </Grid>
        </Grid>
        <Grid item xs={10} className="section-header">
          <h2><span>Categorias</span></h2>
        </Grid>
        <Grid item xs={12}>
          <Categories/>
        </Grid>
        <Grid item xs={12} className="clean-filter">
          <Fab variant="extended" onClick={resetFilters}>Limpiar filtros</Fab>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    resetFilters: () => {
      dispatch(DishFilterActions.changeSort('name'));
      dispatch(DishFilterActions.setCategories(null));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DishFilter);