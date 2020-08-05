import './QuotationCompleteButton.scss';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFlagCheckered} from '@fortawesome/free-solid-svg-icons';
import Fab from '@material-ui/core/Fab';
import History from 'app/router/History';
import {areEqual} from 'app/features/quotations/quotation/Quotation.service';
import ConfirmationDialog from 'app/common/components/confirmation_dialog/ConfirmationDialog';
import {deleteLocal} from 'app/features/quotations/QuotationsReducer';

const QuotationCompleteButton = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.auth.loggedUser);
  const isFetching = useSelector(state => state.data.quotations.fetching);
  const quotations = useSelector(state => state.data.quotations.data);
  const errors = useSelector(state => state.data.quotations.error);
  const selectedQuotation = useSelector(state => state.quotations.quotation);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogLabel = 'Al cerrar este presupuesto se perderan todos los cambios no guardados ¿Desea continuar?';

  const completeQuotation = () => {
    dispatch(deleteLocal());
    History.navigate(loggedUser ? '/presupuestos/todos' : '/presupuestos');
  };

  const handleShowDialog = () => {
    const isQuotationStarted = selectedQuotation.menus && selectedQuotation.menus.length > 0;
    const isEdited = !areEqual(selectedQuotation, quotations ? quotations[selectedQuotation.id] : null);

    if (isQuotationStarted && isEdited) {
      setIsDialogOpen(true);
      return;
    }

    completeQuotation();
  };

  if (isFetching) {
    return null;
  }

  return (
    <>
      <Fab id="quotation-complete-button"
           className={`floating-button animate__animated animate__zoomIn ${errors ? 'move-up' : ''}`}
           classes={{label: 'quotation-complete-button-label'}} onClick={handleShowDialog}>
        <FontAwesomeIcon id="quotation-complete-button-icon" icon={faFlagCheckered}/>
      </Fab>

      <ConfirmationDialog title="Completar presupuesto" label={dialogLabel} okLabel="Continuar"
                          open={isDialogOpen} onClose={() => setIsDialogOpen(false)} onOK={completeQuotation}/>
    </>
  );
};

export default React.memo(QuotationCompleteButton);