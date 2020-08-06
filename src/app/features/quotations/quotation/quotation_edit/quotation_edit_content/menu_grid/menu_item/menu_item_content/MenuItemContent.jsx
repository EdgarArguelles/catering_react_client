import './MenuItemContent.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import formatCurrency from 'format-currency';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import CardContent from '@material-ui/core/CardContent';
import Utils from 'app/common/Utils';
import MenuQuantity from 'app/features/quotations/menu/menu_summary/menu_quantity/MenuQuantity';
import {selectMenu} from 'app/features/quotations/quotation/QuotationReducer';

const MenuItemContent = ({focus, menu, select}) => {
  const dispatch = useDispatch();
  const deselect = () => dispatch(selectMenu(''));
  const {id, price, quantity, isSelected, courses} = menu;

  const animateIcon = () => {
    if (!isSelected) {
      Utils.animateIcon(`menu-${id}-quantity-icon`);
    }
  };

  const getQuantity = () => {
    const input = isSelected
      ? <MenuQuantity hideLabels={true} autoFocus={focus} onEnter={deselect} onEsc={deselect} onBlur={deselect}/>
      : <span>{quantity}<FontAwesomeIcon id={`menu-${id}-quantity-icon`} icon={faPencilAlt}/></span>;

    return (
      <span>
        <span>Menús en presupuesto</span>
        <b onClick={select} onMouseEnter={animateIcon}>x {input}</b>
      </span>
    );
  };

  return (
    <CardContent className="menu-item-content">
      <div className="menu-description">
        Menú conformado por <b>{courses.length}</b> tiempo{courses.length === 1 ? '' : 's'}
      </div>
      <hr/>
      <div className="menu-footer">
        <p>Costo por menú <b>{formatCurrency(price, {format: '%s%v', symbol: '$'})}</b></p>
        {getQuantity()}
        <p>Costo total <b>{formatCurrency(price * quantity, {format: '%s%v', symbol: '$'})}</b></p>
      </div>
    </CardContent>
  );
};

MenuItemContent.propTypes = {
  focus: PropTypes.bool.isRequired,
  menu: PropTypes.object.isRequired,
  select: PropTypes.func.isRequired,
};

export default React.memo(MenuItemContent);