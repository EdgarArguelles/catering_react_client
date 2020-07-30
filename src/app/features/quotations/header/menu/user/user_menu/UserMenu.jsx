import './UserMenu.scss';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDonate, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import History from 'app/router/History';
import Utils from 'app/common/Utils';
import {useAppTheme} from 'app/common/Hooks';
import ConfirmationDialog from 'app/common/components/confirmation_dialog/ConfirmationDialog';
import {logout} from 'app/features/auth/AuthReducer';

const UserMenu = ({open, anchorEl, onClose}) => {
  const dispatch = useDispatch();
  const {theme, themeIcon, changeTheme} = useAppTheme();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const redirectToMyQuotations = () => {
    Utils.animateIcon('menu-my-quotations-icon');
    onClose();
    History.navigate('/presupuestos/todos');
  };

  const handleChangeTheme = () => {
    Utils.animateIcon('menu-theme-icon');
    changeTheme();
  };

  const handleLogout = () => {
    Utils.animateIcon('menu-sign-out-icon');
    setIsDialogOpen(true);
  };

  const doLogout = () => {
    dispatch(logout());
    onClose();
    window.location.replace('/');
  };

  return (
    <Popover id="user-menu" open={open} anchorEl={anchorEl} onClose={onClose}
             anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
      <MenuItem onClick={redirectToMyQuotations}>
        <FontAwesomeIcon id="menu-my-quotations-icon" className="menu-icon" icon={faDonate}/> Mis Presupuestos
      </MenuItem>
      <MenuItem onClick={handleChangeTheme}>
        <FontAwesomeIcon id="menu-theme-icon" className="menu-icon" icon={themeIcon}/>
        Tema {theme === 'dark' ? 'Claro' : 'Oscuro'}
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <FontAwesomeIcon id="menu-sign-out-icon" className="menu-icon" icon={faSignOutAlt}/> Salir
      </MenuItem>

      <ConfirmationDialog title="Salir" label="Al salir se perderan todos los cambios no guardados ¿Desea salir?"
                          okLabel="Salir" open={isDialogOpen} onClose={() => setIsDialogOpen(false)} onOK={doLogout}/>
    </Popover>
  );
};

UserMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(UserMenu);