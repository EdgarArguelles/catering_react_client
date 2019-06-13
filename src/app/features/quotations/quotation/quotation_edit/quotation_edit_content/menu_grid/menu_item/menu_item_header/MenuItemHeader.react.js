import './MenuItemHeader.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import EnterTextField from 'app/common/components/enter_text_field/EnterTextField';
import QuotationActions from 'app/features/quotations/quotation/QuotationActions';
import MenuActions from 'app/features/quotations/menu/MenuActions';

class MenuItemHeader extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    focus: PropTypes.bool.isRequired,
    menu: PropTypes.object.isRequired,
    select: PropTypes.func.isRequired,
    deselect: PropTypes.func.isRequired,
    openMenu: PropTypes.func.isRequired,
    deselectMenu: PropTypes.func.isRequired,
    changeMenuName: PropTypes.func.isRequired,
  };

  getMenuButton = () => {
    const {deselect, openMenu} = this.props;
    const onOpen = event => {
      deselect();
      openMenu(event);
    };

    return <IconButton onClick={onOpen}><i className="fas fa-ellipsis-v" aria-hidden="true"/></IconButton>;
  };

  getTitle = () => {
    const {index, focus, menu: {name, isSelected}, select, deselect, deselectMenu, changeMenuName} = this.props;
    const handleSave = newValue => {
      changeMenuName(newValue !== '' ? newValue : name);
      deselectMenu();
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

  render() {
    return <CardHeader className="menu-item-header" action={this.getMenuButton()} title={this.getTitle()}/>;
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    deselectMenu: () => {
      dispatch(QuotationActions.selectMenu(''));
    },
    changeMenuName: name => {
      dispatch(MenuActions.changeName(name));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemHeader);