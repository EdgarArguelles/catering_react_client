import './MenuItemContent.scss';
import React from 'react';
import PropTypes from 'prop-types';
import formatCurrency from 'format-currency';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import CardContent from '@material-ui/core/CardContent';
import Utils from 'app/common/Utils';
import MenuQuantity from 'app/features/quotations/menu/menu_summary/menu_quantity/MenuQuantity';

const MenuItemContent = ({focus, menu, select, deselect}) => {
  const {id, price, quantity, isSelected, courses} = menu;

  const animateIcon = () => {
    if (!isSelected) {
      Utils.animateIcon(`menu-${id}-quantity-icon`);
    }
  };

  const handleSelect = () => {
    animateIcon();
    select();
  };

  const getQuantity = () => {
    const input = isSelected
      ? <MenuQuantity hideLabels={true} onEnter={deselect} autoFocus={focus}/>
      : <span>{quantity}<FontAwesomeIcon id={`menu-${id}-quantity-icon`} icon={faPencilAlt}/></span>;

    return (
      <span>
        <span onClick={deselect}>Menús en presupuesto</span>
        <b onClick={handleSelect} onMouseEnter={animateIcon}>x {input}</b>
      </span>
    );
  };

  return (
    <CardContent className="menu-item-content">
      <div className="menu-description" onClick={deselect}>
        Menú conformado por <b>{courses.length}</b> tiempo{courses.length === 1 ? '' : 's'}
      </div>
      <hr/>
      <div className="menu-footer">
        <p onClick={deselect}>Costo por menú <b>{formatCurrency(price, {format: '%s%v', symbol: '$'})}</b></p>
        {getQuantity()}
        <p onClick={deselect}>
          Costo total <b>{formatCurrency(price * quantity, {format: '%s%v', symbol: '$'})}</b>
        </p>
      </div>
    </CardContent>
  );
};

MenuItemContent.propTypes = {
  focus: PropTypes.bool.isRequired,
  menu: PropTypes.object.isRequired,
  select: PropTypes.func.isRequired,
  deselect: PropTypes.func.isRequired,
};

export default React.memo(MenuItemContent);