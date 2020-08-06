import './MenuQuantity.scss';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {changeQuantity} from 'app/features/quotations/menu/MenuReducer';

const MenuQuantity = ({autoFocus, hideLabels, onEnter, onEsc, onBlur}) => {
  const dispatch = useDispatch();
  const menu = useSelector(state => state.quotations.quotation.menus.find(m => m.isSelected));
  const [empty, setEmpty] = useState(false);

  const handleSave = event => {
    const value = parseInt(event.target.value, 10);

    setEmpty(isNaN(value));
    if (value > 0) {
      dispatch(changeQuantity(value));
    }
  };

  const handleKeyUp = event => {
    // on Enter
    event.keyCode === 13 && onEnter && onEnter();

    // on Esc
    event.keyCode === 27 && onEsc && onEsc();
  };

  const handleBlur = () => {
    setEmpty(false);
    onBlur && onBlur();
  };

  const getTextField = () => {
    const menuQuantity = menu ? menu.quantity : 0;

    return (
      <TextField type="number" className="menu-quantity-field" margin="dense" autoFocus={autoFocus}
                 value={empty ? '' : menuQuantity} onChange={handleSave} onKeyUp={handleKeyUp} onBlur={handleBlur}/>
    );
  };

  if (hideLabels) {
    return getTextField();
  }

  return <div className="menu-quantity">Este menú sera servido a {getTextField()} personas.</div>;
};

MenuQuantity.propTypes = {
  autoFocus: PropTypes.bool,
  hideLabels: PropTypes.bool,
  onEnter: PropTypes.func,
  onEsc: PropTypes.func,
  onBlur: PropTypes.func,
};

export default React.memo(MenuQuantity);