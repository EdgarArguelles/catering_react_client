import './QuotationView.scss';
import React, {useCallback, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import History from 'app/router/History';
import AuthDialog from 'app/features/quotations/auth_dialog/AuthDialog';
import NavigationActions from 'app/features/quotations/header/navigation/NavigationActions';
import AuthDialogActions from 'app/features/quotations/auth_dialog/AuthDialogActions';
import QuotationsActions from 'app/features/quotations/QuotationsActions';
import QuotationsDataActions from 'app/data/quotations/QuotationsActions';

const QuotationView = ({match}) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.auth.loggedUser);

  const quotationId = useRef(match.params.id); // avoid to re-run useEffect when match changes
  const latestLoggedUser = useRef(loggedUser); // avoid to re-run useEffect when loggedUser changes
  const openAuthDialog = useCallback(() => dispatch(AuthDialogActions.openAuthDialog()), [dispatch]);
  const loadQuotation = useCallback(async () => {
    dispatch(QuotationsActions.deleteLocal());
    await dispatch(QuotationsDataActions.fetchQuotation(quotationId.current));
    History.navigate('/presupuestos/editar');
  }, [dispatch]); // because this useCallback has inputs = [dispatch], loadQuotation never changes its value

  // because loadQuotation and openAuthDialog are [dispatch], this useEffect is [dispatch] as well
  useEffect(() => {
    dispatch(NavigationActions.changeNavigation('/presupuestos'));

    if (latestLoggedUser.current) {
      loadQuotation();
    } else {
      openAuthDialog();
    }
  }, [dispatch, loadQuotation, openAuthDialog]);

  return (
    <div id="quotation-view">
      <i className="fas fa-info-circle" aria-hidden="true"/>
      <p className="title">No tienes permisos para ver este presupuesto</p>
      <Button variant="outlined" className="access" onClick={openAuthDialog}>
        Iniciar sesión
      </Button>
      <AuthDialog onSuccess={loadQuotation}/>
    </div>
  );
};

QuotationView.propTypes = {
  match: PropTypes.object.isRequired,
};

export default React.memo(QuotationView);