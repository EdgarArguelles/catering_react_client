import './Access.scss';
import React from 'react';
import {useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import History from 'app/router/History';
import NoSession from './no_session/NoSession';
import Session from './session/Session';

const Access = () => {
  const loggedUser = useSelector(state => state.auth.loggedUser);
  const redirect = () => History.navigate('/presupuestos');

  if (loggedUser) {
    const userImage = loggedUser?.image || window.sessionStorage ? window.sessionStorage.getItem('userImage') : '';

    return (
      <div id="access">
        <Button id="welcome-back" variant="contained" color="primary" onClick={redirect}>
          <span className="button-label">Bienvenido de vuelta {loggedUser.fullName}</span>
          <Avatar className="button-avatar" src={userImage}/>
        </Button>
      </div>
    );
  }

  return (
    <Grid id="access" container justify="center" spacing={5}>
      <Grid item xs={10} sm={6}>
        <NoSession/>
      </Grid>
      <Grid item xs={10} sm={6}>
        <Session/>
      </Grid>
    </Grid>
  );
};

export default React.memo(Access);