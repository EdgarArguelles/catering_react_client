import './NoSessionQuotationList.scss';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import Utils from 'app/common/Utils';
import { openAuthDialog } from 'app/features/quotations/auth_dialog/AuthDialogReducer';

const NoSessionQuotationList = () => {
  const dispatch = useDispatch();
  const open = useSelector(state => state.quotations.isAuthDialogOpen);

  // animate icon when AuthDialog closes
  useEffect(() => {
    !open && Utils.animateIcon('no-session-quotation-icon', { strokeWidth: 20 });
  }, [open]);

  return (
    <div id="no-session-quotation-list">
      <FontAwesomeIcon id="no-session-quotation-icon" icon={faInfoCircle}/>
      <p className="title">Sin sesión</p>
      <Button variant="outlined" className="access" onClick={() => dispatch(openAuthDialog())}>
        Iniciar sesión
      </Button>
    </div>
  );
};

export default React.memo(NoSessionQuotationList);