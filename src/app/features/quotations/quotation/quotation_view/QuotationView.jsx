import './QuotationView.scss';
import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {useQueryClient} from 'react-query';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import History from 'app/router/History';
import Utils from 'app/common/Utils';
import {QUOTATION_KEY, useQuotation} from 'app/hooks/data/Quotations';
import AuthDialog from 'app/features/quotations/auth_dialog/AuthDialog';
import {changeNavigation} from 'app/features/quotations/header/navigation/NavigationReducer';
import {openAuthDialog} from 'app/features/quotations/auth_dialog/AuthDialogReducer';
import {deleteLocal} from 'app/features/quotations/QuotationsReducer';
import {revertQuotation} from 'app/features/quotations/quotation/QuotationReducer';

const QuotationView = ({match}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {data: quotation} = useQuotation(match.params.id);
  const open = useSelector(state => state.quotations.isAuthDialogOpen);
  const loggedUser = useSelector(state => state.auth.loggedUser);
  const latestLoggedUser = useRef(loggedUser); // avoid to re-run useEffect when loggedUser changes

  useEffect(() => {
    dispatch(changeNavigation({backLink: '/presupuestos'}));
    !latestLoggedUser.current && dispatch(openAuthDialog());
  }, [dispatch]);

  useEffect(() => {
    if (quotation) {
      dispatch(deleteLocal());
      dispatch(revertQuotation(quotation));
      History.navigate('/presupuestos/editar');
    }
  }, [dispatch, quotation]);

  // animate icon when AuthDialog closes
  useEffect(() => {
    !open && Utils.animateIcon('quotation-view-info-icon', {strokeWidth: 20});
  }, [open]);

  return (
    <div id="quotation-view">
      <FontAwesomeIcon id="quotation-view-info-icon" icon={faInfoCircle}/>
      <p className="title">No tienes permisos para ver este presupuesto</p>
      <Button variant="outlined" className="access" onClick={() => dispatch(openAuthDialog())}>
        Iniciar sesión
      </Button>
      <AuthDialog onSuccess={() => loggedUser && queryClient.removeQueries(QUOTATION_KEY)}/>
    </div>
  );
};

QuotationView.propTypes = {
  match: PropTypes.object.isRequired,
};

export default React.memo(QuotationView);