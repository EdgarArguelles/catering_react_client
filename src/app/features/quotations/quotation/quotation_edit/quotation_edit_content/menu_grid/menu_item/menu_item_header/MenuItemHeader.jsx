import './MenuItemHeader.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEllipsisV, faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Utils from 'app/common/Utils';
import EnterTextField from 'app/common/components/enter_text_field/EnterTextField';
import QuotationActions from 'app/features/quotations/quotation/QuotationActions';
import MenuActions from 'app/features/quotations/menu/MenuActions';

const MenuItemHeader = ({index, focus, menu, select, deselect, openMenu}) => {
  const dispatch = useDispatch();
  const {id, name, isSelected} = menu;

  const getMenuButton = () => {
    const animateIcon = () => Utils.animateIcon(`menu-${id}-options-icon`);
    const onOpen = event => {
      animateIcon();
      deselect();
      openMenu(event);
    };

    return (
      <IconButton onClick={onOpen} onMouseEnter={animateIcon}>
        <FontAwesomeIcon id={`menu-${id}-options-icon`} icon={faEllipsisV}/>
      </IconButton>
    );
  };

  const getTitle = () => {
    const animateIcon = () => {
      if (!isSelected) {
        Utils.animateIcon(`menu-${id}-edit-icon`);
      }
    };

    const handleSave = newValue => {
      dispatch(MenuActions.changeName(newValue !== '' ? newValue : name));
      dispatch(QuotationActions.selectMenu(''));
    };

    const title = isSelected
      ? <EnterTextField placeholder="Nombre del Menú" initValue={name} autoFocus={focus} onSave={handleSave}/>
      : <span>{name}<FontAwesomeIcon id={`menu-${id}-edit-icon`} icon={faPencilAlt}/></span>;

    return (
      <div className="menu-title">
        <Avatar className="avatar" onClick={deselect}>{index + 1}</Avatar>
        <span onClick={select} onMouseEnter={animateIcon}>{title}</span>
      </div>
    );
  };

  return <CardHeader className="menu-item-header" action={getMenuButton()} title={getTitle()}/>;
};

MenuItemHeader.propTypes = {
  index: PropTypes.number.isRequired,
  focus: PropTypes.bool.isRequired,
  menu: PropTypes.object.isRequired,
  select: PropTypes.func.isRequired,
  deselect: PropTypes.func.isRequired,
  openMenu: PropTypes.func.isRequired,
};

export default React.memo(MenuItemHeader);