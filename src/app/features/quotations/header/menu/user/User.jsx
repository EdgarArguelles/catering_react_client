import './User.scss';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import History from 'app/router/History';
import Utils from 'app/common/Utils';
import UserMenu from './user_menu/UserMenu';

const User = () => {
  const loggedUser = useSelector(state => state.auth.loggedUser);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const userImage = loggedUser && loggedUser.image ? loggedUser.image :
    window.sessionStorage ? window.sessionStorage.getItem('userImage') : '';

  const handleClick = event => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const getShortName = () => {
    return loggedUser.fullName.substr(0, loggedUser.fullName.indexOf(' '));
  };

  if (!loggedUser) {
    return (
      <Button color="inherit" onClick={() => History.navigate('/')}
              onMouseEnter={() => Utils.animateIcon('menu-sign-out-icon')}>
        <FontAwesomeIcon id="menu-sign-out-icon" icon={faSignOutAlt}/>
        <p>Salir</p>
      </Button>
    );
  }

  return (
    <div id="user">
      <Button color="inherit" onClick={handleClick}>
        <p className="user-name">Hola {getShortName()}</p>
        <Avatar className="avatar" src={userImage}/>
      </Button>
      <UserMenu open={open} anchorEl={anchorEl} onClose={() => setOpen(false)}/>
    </div>
  );
};

export default React.memo(User);