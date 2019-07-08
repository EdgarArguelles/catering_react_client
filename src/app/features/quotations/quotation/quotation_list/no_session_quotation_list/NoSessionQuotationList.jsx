import './NoSessionQuotationList.scss';
import React from 'react';
import {useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
import AuthDialogActions from 'app/features/quotations/auth_dialog/AuthDialogActions';

const NoSessionQuotationList = () => {
  const dispatch = useDispatch();

  return (
    <div id="no-session-quotation-list">
      <i className="fas fa-info-circle" aria-hidden="true"/>
      <p className="title">Sin sesión</p>
      <Button variant="outlined" className="access" onClick={() => dispatch(AuthDialogActions.openAuthDialog())}>
        Iniciar sesión
      </Button>
    </div>
  );
};

export default React.memo(NoSessionQuotationList);