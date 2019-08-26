import './AddDish.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import History from 'app/router/History';
import Utils from 'app/common/Utils';
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
    <Button className="add-dish" onClick={handleAdd} onMouseEnter={() => Utils.animateIcon(`${dishCategory}-icon`)}>
      <FontAwesomeIcon id={`${dishCategory}-icon`} icon={faPlusCircle}/>
    </Button>
  );
};

AddDish.propTypes = {
  dishCategory: PropTypes.string.isRequired,
};

export default React.memo(AddDish);