import './QuotationView.scss';
import React, {useCallback, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import History from 'app/router/History';
import Utils from 'app/common/Utils';
import AuthDialog from 'app/features/quotations/auth_dialog/AuthDialog';
import {changeNavigation} from 'app/features/quotations/header/navigation/NavigationReducer';
import {openAuthDialog} from 'app/features/quotations/auth_dialog/AuthDialogReducer';
import {deleteLocal} from 'app/features/quotations/QuotationsReducer';
import {fetchQuotation} from 'app/data/quotations/QuotationsReducer';

const QuotationView = ({match}) => {
  const dispatch = useDispatch();
  const open = useSelector(state => state.quotations.isAuthDialogOpen);
  const loggedUser = useSelector(state => state.auth.loggedUser);

  const quotationId = useRef(match.params.id); // avoid to re-run useEffect when match changes
  const latestLoggedUser = useRef(loggedUser); // avoid to re-run useEffect when loggedUser changes
  const handleOpenAuthDialog = useCallback(() => dispatch(openAuthDialog()), [dispatch]);
  const loadQuotation = useCallback(async () => {
    dispatch(deleteLocal());
    const json = await dispatch(fetchQuotation({quotationId: quotationId.current, overwriteLocalChanges: true}));
    !json.error && History.navigate('/presupuestos/editar');
  }, [dispatch]); // because this useCallback has inputs = [dispatch], loadQuotation never changes its value

  // because loadQuotation and handleOpenAuthDialog are [dispatch], this useEffect is [dispatch] as well
  useEffect(() => {
    dispatch(changeNavigation({backLink: '/presupuestos'}));

    if (latestLoggedUser.current) {
      loadQuotation();
    } else {
      handleOpenAuthDialog();
    }
  }, [dispatch, loadQuotation, handleOpenAuthDialog]);

  // animate icon when AuthDialog closes
  useEffect(() => {
    if (!open) {
      Utils.animateIcon('quotation-view-info-icon', {strokeWidth: 20});
    }
  }, [open]);

  return (
    <div id="quotation-view">
      <FontAwesomeIcon id="quotation-view-info-icon" icon={faInfoCircle}/>
      <p className="title">No tienes permisos para ver este presupuesto</p>
      <Button variant="outlined" className="access" onClick={handleOpenAuthDialog}>
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