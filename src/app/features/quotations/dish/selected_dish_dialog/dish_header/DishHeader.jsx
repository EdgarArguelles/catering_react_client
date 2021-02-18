import './DishHeader.scss';
import React from 'react';
import PropTypes from 'prop-types';
import formatCurrency from 'format-currency';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import IconButton from '@material-ui/core/IconButton';
import DishActions from 'app/features/quotations/dish/dish_actions/DishActions';

const DishHeader = ({dish, onClose}) => {
  const getNavigation = () => {
    if (!onClose) {
      return null;
    }

    return <IconButton className="navigation" onClick={onClose}><FontAwesomeIcon icon={faArrowLeft}/></IconButton>;
  };

  return (
    <div id="dish-header">
      {getNavigation()}
      <div className="title">
        <b>{dish.name}</b>
        <div className="sub-title">{formatCurrency(dish.price, {format: '%s%v', symbol: '$'})}</div>
      </div>
      <DishActions dish={dish}/>
    </div>
  );
};

DishHeader.propTypes = {
  dish: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

export default React.memo(DishHeader);