import './DishFilter.scss';
import React from 'react';
import {useDispatch} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import DishFilterActions from './DishFilterActions';
import Categories from './categories/Categories';
import Sort from './sort/Sort';

const DishFilter = () => {
  const dispatch = useDispatch();
  const resetFilters = () => {
    dispatch(DishFilterActions.changeSort('name'));
    dispatch(DishFilterActions.setCategories(null));
  };

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
};

export default React.memo(DishFilter);