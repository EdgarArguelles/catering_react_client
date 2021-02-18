import './DeleteQuotation.scss';
import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import History from 'app/router/History';
import {useDeleteQuotation} from 'app/hooks/data/Quotations';
import ConfirmationDialog from 'app/common/components/confirmation_dialog/ConfirmationDialog';
import FetchButton, {ANIMATION_DELAY} from 'app/common/components/fetch_button/FetchButton';
import {changeError, changeIsRemoteProcessing} from 'app/data/quotations/QuotationsReducer';
import {deleteLocal} from 'app/features/quotations/QuotationsReducer';

const DeleteQuotation = ({isErrorVisible}) => {
  const timeout = useRef(null); // don't initialize timeout to null each render
  useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, []); // Clean timeout on Unmount

  const dispatch = useDispatch();
  const deleteMutation = useDeleteQuotation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [shouldDelete, setShouldDelete] = useState(false);
  const isRemoteProcessing = useSelector(state => state.data.quotations.isRemoteProcessing);
  const quotation = useSelector(state => state.quotations.quotation);
  const error = deleteMutation.error;
  const {id, name} = quotation;
  const handleEndRemoteProcess = () => dispatch(changeIsRemoteProcessing(false));
  const handleCleanError = () => {
    deleteMutation.reset();
    dispatch(changeError(null));
  };

  const handleDeleteQuotation = async () => {
    try {
      dispatch(changeIsRemoteProcessing(true));
      await deleteMutation.mutateAsync(id);
      dispatch(deleteLocal());
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
                     id="delete-quotation-button" hidden={isRemoteProcessing || deleteMutation.isLoading} icon={faTrash}
                     onComplete={handleEndRemoteProcess} preconditionCall={preconditionCall} asyncCall={asyncCall}/>

        <ConfirmationDialog title="Eliminar presupuesto" okID="remove-remote-quotation-button" okLabel="Eliminar"
                            open={isDialogOpen} label={`¿Desea eliminar definitivamente el presupuesto ${name}?`}
                            onClose={() => handleStates(false, false)}
                            onOK={() => handleStates(false, true)}/>
        <Snackbar open={!!error && error?.status !== 401 && shouldDelete && isErrorVisible}
                  TransitionComponent={Slide} autoHideDuration={10000} onClose={handleCleanError}
                  message="Ocurrió un error al intentar eliminar el presupuesto"/>
      </span>
  );
};

DeleteQuotation.propTypes = {
  isErrorVisible: PropTypes.bool.isRequired,
};

export default React.memo(DeleteQuotation);