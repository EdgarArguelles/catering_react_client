import './Access.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import History from '../../../../router/History';
import NoSession from './no_session/NoSession.react';
import Session from './session/Session.react';

class Access extends React.Component {
  static propTypes = {
    loggedUser: PropTypes.object,
  };

  redirect = () => {
    History.navigate('/presupuestos');
  };

  render() {
    const {loggedUser} = this.props;
    if (loggedUser) {
      const userImage = loggedUser.image ? loggedUser.image :
        window.sessionStorage ? window.sessionStorage.getItem('userImage') : '';

      return (
        <div id="access">
          <Button id="welcome-back" variant="contained" color="primary" onClick={this.redirect}>
            <span className="button-label">Bienvenido de vuelta {loggedUser.fullName}</span>
            <Avatar className="button-avatar" src={userImage}/>
          </Button>
        </div>
      );
    }

    return (
      <Grid id="access" container justify="center" spacing={40}>
        <Grid item xs={10} sm={6}>
          <NoSession/>
        </Grid>
        <Grid item xs={10} sm={6}>
          <Session/>
        </Grid>
      </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(Access);