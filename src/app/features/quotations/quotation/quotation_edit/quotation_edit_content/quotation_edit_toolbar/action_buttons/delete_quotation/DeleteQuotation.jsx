import './DeleteQuotation.scss';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import History from 'app/router/History';
import ConfirmationDialog from 'app/common/components/confirmation_dialog/ConfirmationDialog';
import FetchButton, {ANIMATION_DELAY} from 'app/common/components/fetch_button/FetchButton';
import DataQuotationsActions from 'app/data/quotations/QuotationsActions';
import QuotationsActions from 'app/features/quotations/QuotationsActions';

const DeleteQuotation = () => {
  const timeout = useRef(null); // don't initialize timeout to null each render
  useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, []); // Clean timeout on Unmount

  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [shouldDelete, setShouldDelete] = useState(false);
  const isRemoteProcessing = useSelector(state => state.quotations.isRemoteProcessing);
  const quotation = useSelector(state => state.quotations.quotation);
  const isFetching = useSelector(state => state.data.fetching.quotations || state.data.fetching.quotationsUpdate);
  const errors = useSelector(state => state.data.errors.quotations);

  const {id, name} = quotation;
  const cleanError = () => dispatch(DataQuotationsActions.cleanError());
  const endRemoteProcess = () => dispatch(QuotationsActions.endRemoteProcess());
  const deleteQuotation = async () => {
    await dispatch(DataQuotationsActions.deleteQuotation(id));
    dispatch(QuotationsActions.deleteLocal());
  };

  const handleDeleteQuotation = async () => {
    try {
      await deleteQuotation();
    } catch (e) {
      throw e;
    } finally {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => History.navigate('/presupuestos/todos'), ANIMATION_DELAY);
    }
  };

  const handleStates = (isDialogOpenValue, shouldDeleteValue) => {
    setIsDialogOpen(isDialogOpenValue);
    setShouldDelete(shouldDeleteValue);
  };

  const preconditionCall = shouldDelete ? null : () => handleStates(true, false);
  const asyncCall = shouldDelete ? handleDeleteQuotation : null;

  return (
    <span id="delete-quotation">
        <FetchButton color="secondary" label="Eliminar Presupuesto" successLabel="Presupuesto Eliminado"
                     id="delete-quotation-button" hidden={isRemoteProcessing || isFetching} icon={faTrash}
                     onComplete={endRemoteProcess} preconditionCall={preconditionCall} asyncCall={asyncCall}/>

        <ConfirmationDialog title="Eliminar presupuesto" okID="remove-remote-quotation-button" okLabel="Eliminar"
                            open={isDialogOpen} label={`¿Desea eliminar definitivamente el presupuesto ${name}?`}
                            onClose={() => handleStates(false, false)}
                            onOK={() => handleStates(false, true)}/>
        <Snackbar open={!!errors && errors.errorCode !== 401 && errors.errorCode !== 403 && shouldDelete}
                  TransitionComponent={Slide} autoHideDuration={10000} onClose={cleanError}
                  message="Ocurrió un error al intentar eliminar el presupuesto"/>
      </span>
  );
};

export default React.memo(DeleteQuotation);