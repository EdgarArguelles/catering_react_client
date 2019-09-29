import './SaveQuotation.scss';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import FetchButton from 'app/common/components/fetch_button/FetchButton';
import AuthDialog from 'app/features/quotations/auth_dialog/AuthDialog';
import AuthDialogActions from 'app/features/quotations/auth_dialog/AuthDialogActions';
import QuotationsActions from 'app/features/quotations/QuotationsActions';
import DataQuotationsActions from 'app/data/quotations/QuotationsActions';

const SaveQuotation = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.auth.loggedUser);
  const isRemoteProcessing = useSelector(state => state.quotations.isRemoteProcessing);
  const quotation = useSelector(state => state.quotations.quotation);
  const isFetching = useSelector(state => state.data.fetching.quotations || state.data.fetching.quotationsUpdate);
  const errors = useSelector(state => state.data.errors.quotations);
  const openAuthDialog = () => dispatch(AuthDialogActions.openAuthDialog());
  const cleanError = () => dispatch(DataQuotationsActions.cleanError());
  const endRemoteProcess = () => dispatch(QuotationsActions.endRemoteProcess());
  const saveQuotation = async () => {
    let quotationId;
    if (!quotation.id) {
      const response = await dispatch(DataQuotationsActions.createQuotation({
        ...quotation,
        menus: quotation.menus.map(menu => ({...menu, id: null})),
      }));
      quotationId = response.data.createQuotation.id;
    } else {
      const response = await dispatch(DataQuotationsActions.editQuotation({
        ...quotation,
        menus: quotation.menus.map(menu => {
          if (menu.id.startsWith('local-')) {
            return {...menu, id: null};
          }

          return menu;
        }),
      }));
      quotationId = response.data.updateQuotation.id;
    }
    await dispatch(DataQuotationsActions.fetchQuotation(quotationId));
  };

  const errorMessage = errors && (errors.errorCode === 401 || errors.errorCode === 403) ? 'Usuario sin sesión'
    : quotation.menus && quotation.menus.filter(menu => menu.courses.length === 0).length > 0
      ? 'No puede haber menús vacíos' : 'Ocurrió un error al intentar guardar el presupuesto';
  const preconditionCall = loggedUser ? null : openAuthDialog;
  const asyncCall = loggedUser ? async () => await saveQuotation() : null;
  const labelAction = quotation.id ? 'Guardados' : 'Guardado';
  const label = quotation.id ? 'Cambios' : 'Presupuesto';

  return (
    <span id="save-quotation">
        <FetchButton color="primary" label={`Guardar ${label}`} successLabel={`${label} ${labelAction}`}
                     id="save-quotation-button" hidden={isRemoteProcessing || isFetching} icon={faSave}
                     onComplete={endRemoteProcess} preconditionCall={preconditionCall} asyncCall={asyncCall}/>

        <AuthDialog/>
        <Snackbar open={!!errors} TransitionComponent={Slide}
                  autoHideDuration={10000} onClose={cleanError} message={errors ? errorMessage : ''}/>
      </span>
  );
};

export default React.memo(SaveQuotation);