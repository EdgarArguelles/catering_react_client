import './MenuQuantity.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import MenuActions from 'app/features/quotations/menu/MenuActions';

class MenuQuantity extends React.Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    hideLabels: PropTypes.bool,
    menu: PropTypes.object,
    onEnter: PropTypes.func,
    changeMenuQuantity: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {empty: false};
  }

  handleSave = event => {
    const {changeMenuQuantity} = this.props;
    const value = parseInt(event.target.value, 10);

    this.setState({empty: isNaN(value)});
    if (value > 0) {
      changeMenuQuantity(value);
    }
  };

  handleKeyUp = event => {
    const {onEnter} = this.props;

    event.keyCode === 13 && onEnter && onEnter();
  };

  getTextField = () => {
    const {empty} = this.state;
    const {autoFocus, menu} = this.props;
    const menuQuantity = menu ? menu.quantity : 0;

    return (
      <TextField type="number" className="menu-quantity-field" margin="dense" autoFocus={autoFocus}
                 onKeyUp={this.handleKeyUp} value={empty ? '' : menuQuantity} onChange={this.handleSave}
                 onBlur={() => this.setState({empty: false})}/>
    );
  };

  render() {
    const {hideLabels} = this.props;

    if (hideLabels) {
      return this.getTextField();
    }

    return <div className="menu-quantity">Este menú sera servido a {this.getTextField()} personas.</div>;
  }
}

const mapStateToProps = state => {
  return {
    menu: state.quotations.quotation.menus.find(menu => menu.isSelected),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeMenuQuantity: quantity => {
      dispatch(MenuActions.changeQuantity(quantity));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuQuantity);