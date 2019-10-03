import './DishFilter.scss';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {faDollarSign, faSortAlphaUp} from '@fortawesome/free-solid-svg-icons';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import DishFilterActions from './DishFilterActions';
import Categories from './categories/Categories';
import Sort from './sort/Sort';

const DishFilter = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.app.theme);
  const resetFilters = () => {
    dispatch(DishFilterActions.changeSort('name'));
    dispatch(DishFilterActions.setCategories(null));
  };

  return (
    <Grid id="dish-filter" container justify="center">
      <Grid item xs={12}>
        <Grid container justify="center">
          <Sort key="sort-name" value="name" label="Ordenar por nombre" icon={faSortAlphaUp}/>
          <Sort key="sort-price" value="price" label="Ordenar por precio" icon={faDollarSign}/>
        </Grid>
      </Grid>
      <Grid item xs={10} className="section-header">
        <h2><span className={theme}>Categorias</span></h2>
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