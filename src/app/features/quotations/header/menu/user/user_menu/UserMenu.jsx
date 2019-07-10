import './UserMenu.scss';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import History from 'app/router/History';
import {useAppTheme} from 'app/common/Hooks';
import ConfirmationDialog from 'app/common/components/confirmation_dialog/ConfirmationDialog';
import AuthActions from 'app/features/auth/AuthActions';

const UserMenu = ({open, anchorEl, onClose}) => {
  const dispatch = useDispatch();
  const {theme, themeIcon, changeTheme} = useAppTheme();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const redirectToMyQuotations = () => {
    onClose();
    History.navigate('/presupuestos/todos');
  };

  const logout = () => {
    dispatch(AuthActions.logout());
    onClose();
    window.location.replace('/');
  };

  return (
    <Popover id="user-menu" open={open} anchorEl={anchorEl} onClose={onClose}
             anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
      <MenuItem onClick={redirectToMyQuotations}>
        <i className="fas fa-donate menu-icon" aria-hidden="true"/> Mis Presupuestos
      </MenuItem>
      <MenuItem onClick={changeTheme}>
        <i className={`${themeIcon} menu-icon`} aria-hidden="true"/> Tema {theme === 'dark' ? 'Claro' : 'Oscuro'}
      </MenuItem>
      <MenuItem onClick={() => setIsDialogOpen(true)}>
        <i className="fas fa-sign-out-alt menu-icon" aria-hidden="true"/> Salir
      </MenuItem>

      <ConfirmationDialog title="Salir" label="Al salir se perderan todos los cambios no guardados ¿Desea salir?"
                          okLabel="Salir" open={isDialogOpen} onClose={() => setIsDialogOpen(false)} onOK={logout}/>
    </Popover>
  );
};

UserMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(UserMenu);