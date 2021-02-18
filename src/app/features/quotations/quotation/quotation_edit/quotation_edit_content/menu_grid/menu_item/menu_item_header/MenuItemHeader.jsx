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
import {selectMenu} from 'app/features/quotations/quotation/QuotationReducer';
import {changeName} from 'app/features/quotations/menu/MenuReducer';

const MenuItemHeader = ({index, focus, menu, select, openMenu}) => {
  const dispatch = useDispatch();
  const {id, name, isSelected} = menu;

  const getMenuButton = () => {
    const onOpen = event => {
      Utils.animateIcon(`menu-${id}-options-icon`);
      openMenu(event);
    };

    return (
      <IconButton onClick={onOpen}><FontAwesomeIcon id={`menu-${id}-options-icon`} icon={faEllipsisV}/></IconButton>
    );
  };

  const getTitle = () => {
    const animateIcon = () => !isSelected && Utils.animateIcon(`menu-${id}-edit-icon`);

    const handleSave = newValue => {
      dispatch(changeName(newValue || name));
      dispatch(selectMenu(''));
    };

    const title = isSelected
      ? <EnterTextField placeholder="Nombre del Menú" initValue={name} autoFocus={focus} onSave={handleSave}/>
      : <span>{name}<FontAwesomeIcon id={`menu-${id}-edit-icon`} icon={faPencilAlt}/></span>;

    return (
      <div className="menu-title">
        <Avatar className="avatar">{index + 1}</Avatar>
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
  openMenu: PropTypes.func.isRequired,
};

export default React.memo(MenuItemHeader);