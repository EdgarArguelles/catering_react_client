import './NoSessionQuotationList.scss';
import React from 'react';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import Utils from 'app/common/Utils';
import AuthDialogActions from 'app/features/quotations/auth_dialog/AuthDialogActions';

const NoSessionQuotationList = () => {
  const dispatch = useDispatch();
  const animateIcon = () => Utils.animateIcon('no-session-quotation-icon', {strokeWidth: 20});
  const handleClick = () => {
    animateIcon();
    dispatch(AuthDialogActions.openAuthDialog());
  };

  return (
    <div id="no-session-quotation-list">
      <FontAwesomeIcon id="no-session-quotation-icon" icon={faInfoCircle} onMouseEnter={animateIcon}/>
      <p className="title">Sin sesión</p>
      <Button variant="outlined" className="access" onClick={handleClick}>
        Iniciar sesión
      </Button>
    </div>
  );
};

export default React.memo(NoSessionQuotationList);