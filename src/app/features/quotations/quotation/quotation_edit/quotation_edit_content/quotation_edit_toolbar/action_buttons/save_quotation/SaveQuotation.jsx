import './SaveQuotation.scss';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {useQueryClient} from 'react-query';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import {QUOTATION_KEY, useCreateQuotation, useEditQuotation, useQuotation} from 'app/hooks/data/Quotations';
import FetchButton from 'app/common/components/fetch_button/FetchButton';
import AuthDialog from 'app/features/quotations/auth_dialog/AuthDialog';
import {openAuthDialog} from 'app/features/quotations/auth_dialog/AuthDialogReducer';
import {revertQuotation} from 'app/features/quotations/quotation/QuotationReducer';
import {changeIsRemoteProcessing} from 'app/data/quotations/QuotationsReducer';

const SaveQuotation = ({isErrorVisible}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [remoteId, setRemoteId] = useState(null);
  const {data: remote} = useQuotation(remoteId);
  const createMutation = useCreateQuotation();
  const editMutation = useEditQuotation();
  const loggedUser = useSelector(state => state.auth.loggedUser);
  const isRemoteProcessing = useSelector(state => state.data.quotations.isRemoteProcessing);
  const quotation = useSelector(state => state.quotations.quotation);
  const isFetching = createMutation.isLoading || editMutation.isLoading;
  const error = createMutation.error || editMutation.error;
  const handleOpenAuthDialog = () => dispatch(openAuthDialog());
  const handleEndRemoteProcess = () => dispatch(changeIsRemoteProcessing(false));
  const handleCleanError = () => {
    createMutation.reset();
    editMutation.reset();
  };

  useEffect(() => {
    remote && dispatch(revertQuotation(remote));
  }, [dispatch, remote]);

  const saveQuotation = async () => {
    dispatch(changeIsRemoteProcessing(true));
    if (!quotation.id) {
      const {id} = await createMutation.mutateAsync({
        ...quotation,
        menus: quotation.menus.map(menu => ({...menu, id: null})),
      });
      setRemoteId(id);
    } else {
      const {id} = await editMutation.mutateAsync({
        ...quotation,
        menus: quotation.menus.map(menu => {
          if (menu.id.startsWith('local-')) {
            return {...menu, id: null};
          }

          return menu;
        }),
      });
      await queryClient.invalidateQueries([QUOTATION_KEY, id]);
      setRemoteId(id);
    }
  };

  const errorMessage = error?.status === 401 ? 'Usuario sin sesión'
    : quotation.menus && quotation.menus.filter(menu => menu.courses.length === 0).length > 0
      ? 'No puede haber menús vacíos' : 'Ocurrió un error al intentar guardar el presupuesto';
  const preconditionCall = loggedUser ? null : handleOpenAuthDialog;
  const asyncCall = loggedUser ? async () => await saveQuotation() : null;
  const label = quotation.id ? 'Cambios' : 'Presupuesto';

  return (
    <span id="save-quotation">
        <FetchButton color="primary" label={`Guardar ${label}`} successLabel="Cambios Guardados"
                     id="save-quotation-button" hidden={isRemoteProcessing || isFetching} icon={faSave}
                     onComplete={handleEndRemoteProcess} preconditionCall={preconditionCall} asyncCall={asyncCall}/>

        <AuthDialog/>
        <Snackbar open={!!error && isErrorVisible} TransitionComponent={Slide}
                  autoHideDuration={10000} onClose={handleCleanError} message={error ? errorMessage : ''}/>
      </span>
  );
};

SaveQuotation.propTypes = {
  isErrorVisible: PropTypes.bool.isRequired,
};

export default React.memo(SaveQuotation);