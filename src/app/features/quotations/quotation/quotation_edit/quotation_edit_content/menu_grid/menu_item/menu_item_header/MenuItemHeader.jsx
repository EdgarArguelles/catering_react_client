import './MenuItemHeader.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import EnterTextField from 'app/common/components/enter_text_field/EnterTextField';
import QuotationActions from 'app/features/quotations/quotation/QuotationActions';
import MenuActions from 'app/features/quotations/menu/MenuActions';

const MenuItemHeader = ({index, focus, menu, select, deselect, openMenu}) => {
  const dispatch = useDispatch();
  const {name, isSelected} = menu;

  const getMenuButton = () => {
    const onOpen = event => {
      deselect();
      openMenu(event);
    };

    return <IconButton onClick={onOpen}><i className="fas fa-ellipsis-v" aria-hidden="true"/></IconButton>;
  };

  const getTitle = () => {
    const handleSave = newValue => {
      dispatch(MenuActions.changeName(newValue !== '' ? newValue : name));
      dispatch(QuotationActions.selectMenu(''));
    };

    const title = isSelected
      ? <EnterTextField placeholder="Nombre del Menú" initValue={name} autoFocus={focus} onSave={handleSave}/>
      : <span>{name}<i className="fas fa-pencil-alt" aria-hidden="true"/></span>;

    return (
      <div className="menu-title">
        <Avatar className="avatar" onClick={deselect}>{index + 1}</Avatar>
        <span onClick={select}>{title}</span>
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