import './SaveQuotation.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {useQueryClient} from 'react-query';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import {QUOTATION_KEY} from 'app/hooks/data/Quotations';
import FetchButton from 'app/common/components/fetch_button/FetchButton';
import AuthDialog from 'app/features/quotations/auth_dialog/AuthDialog';
import {openAuthDialog} from 'app/features/quotations/auth_dialog/AuthDialogReducer';
import {endRemoteProcess} from 'app/features/quotations/QuotationsReducer';
import {cleanError, createQuotation, editQuotation} from 'app/data/quotations/QuotationsReducer';

const SaveQuotation = ({isErrorVisible}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const loggedUser = useSelector(state => state.auth.loggedUser);
  const isRemoteProcessing = useSelector(state => state.quotations.isRemoteProcessing);
  const quotation = useSelector(state => state.quotations.quotation);
  const isFetching = useSelector(state => state.data.quotations.fetching);
  const errors = useSelector(state => state.data.quotations.error);
  const handleOpenAuthDialog = () => dispatch(openAuthDialog());
  const handleCleanError = () => dispatch(cleanError());
  const handleEndRemoteProcess = () => dispatch(endRemoteProcess());
  const saveQuotation = async () => {
    if (!quotation.id) {
      await dispatch(createQuotation({
        ...quotation,
        menus: quotation.menus.map(menu => ({...menu, id: null})),
      }));
    } else {
      await dispatch(editQuotation({
        ...quotation,
        menus: quotation.menus.map(menu => {
          if (menu.id.startsWith('local-')) {
            return {...menu, id: null};
          }

          return menu;
        }),
      }));
    }
    queryClient.invalidateQueries(QUOTATION_KEY);
  };

  const errorMessage = errors?.message === 'Unauthorized' ? 'Usuario sin sesión'
    : quotation.menus && quotation.menus.filter(menu => menu.courses.length === 0).length > 0
      ? 'No puede haber menús vacíos' : 'Ocurrió un error al intentar guardar el presupuesto';
  const preconditionCall = loggedUser ? null : handleOpenAuthDialog;
  const asyncCall = loggedUser ? async () => await saveQuotation() : null;
  const labelAction = quotation.id ? 'Guardados' : 'Guardado';
  const label = quotation.id ? 'Cambios' : 'Presupuesto';

  return (
    <span id="save-quotation">
        <FetchButton color="primary" label={`Guardar ${label}`} successLabel={`${label} ${labelAction}`}
                     id="save-quotation-button" hidden={isRemoteProcessing || isFetching} icon={faSave}
                     onComplete={handleEndRemoteProcess} preconditionCall={preconditionCall} asyncCall={asyncCall}/>

        <AuthDialog/>
        <Snackbar open={!!errors && isErrorVisible} TransitionComponent={Slide}
                  autoHideDuration={10000} onClose={handleCleanError} message={errors ? errorMessage : ''}/>
      </span>
  );
};

SaveQuotation.propTypes = {
  isErrorVisible: PropTypes.bool.isRequired,
};

export default React.memo(SaveQuotation);