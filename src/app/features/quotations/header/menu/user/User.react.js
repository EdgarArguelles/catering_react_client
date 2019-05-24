import './User.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import History from '../../../../../router/History';
import UserMenu from './user_menu/UserMenu.react';

class User extends React.Component {
  static propTypes = {
    loggedUser: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {open: false, anchorEl: null};
  }

  handleClick = event => {
    this.setState({open: true, anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  getShortName = () => {
    const {loggedUser} = this.props;
    return loggedUser.fullName.substr(0, loggedUser.fullName.indexOf(' '));
  };

  render() {
    if (!this.props.loggedUser) {
      return (
        <Button color="inherit" onClick={() => History.navigate('/')}>
          <i className="fas fa-sign-out-alt" aria-hidden="true"/>
          <p>Salir</p>
        </Button>
      );
    }

    const {loggedUser} = this.props;
    const {open, anchorEl} = this.state;
    const userImage = loggedUser.image ? loggedUser.image :
      window.sessionStorage ? window.sessionStorage.getItem('userImage') : '';

    return (
      <div id="user">
        <Button color="inherit" onClick={this.handleClick}>
          <p className="user-name">Hola {this.getShortName()}</p>
          <Avatar className="avatar" src={userImage}/>
        </Button>
        <UserMenu open={open} anchorEl={anchorEl} onClose={this.handleClose}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.auth.loggedUser,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(User);