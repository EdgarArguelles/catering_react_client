import './AddDish.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
import History from 'app/router/History';
import DishActions from 'app/features/quotations/dish/DishActions';
import DishFilterActions from 'app/features/quotations/dish/dish_filter/DishFilterActions';

const AddDish = ({dishCategory}) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(DishFilterActions.cleanFilters());
    dispatch(DishActions.selectDish(''));
    History.navigate(`/presupuestos/platillos?categoria=${dishCategory}`);
  };

  return (
    <Button className="add-dish" onClick={handleAdd}>
      <i className="fas fa-plus-circle" aria-hidden="true"/>
    </Button>
  );
};

AddDish.propTypes = {
  dishCategory: PropTypes.string.isRequired,
};

export default React.memo(AddDish);