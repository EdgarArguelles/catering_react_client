import './QuotationCompleteButton.scss';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import History from 'app/router/History';
import {areEqual} from 'app/features/quotations/quotation/Quotation.service';
import ConfirmationDialog from 'app/common/components/confirmation_dialog/ConfirmationDialog';
import QuotationsActions from 'app/features/quotations/QuotationsActions';

const QuotationCompleteButton = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.auth.loggedUser);
  const isFetching = useSelector(state => state.data.fetching.quotations || state.data.fetching.quotationsUpdate);
  const quotations = useSelector(state => state.data.quotations);
  const errors = useSelector(state => state.data.errors.quotations);
  const selectedQuotation = useSelector(state => state.quotations.quotation);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogLabel = 'Al cerrar este presupuesto se perderan todos los cambios no guardados ¿Desea continuar?';

  const completeQuotation = () => {
    dispatch(QuotationsActions.deleteLocal());
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
      <Fab id="quotation-complete-button" className={`floating-button animated zoomIn ${errors ? 'move-up' : ''}`}
           classes={{label: 'quotation-complete-button-label'}} onClick={handleShowDialog}>
        <i id="quotation-complete-button-icon" className="fas fa-flag-checkered" aria-hidden="true"/>
      </Fab>

      <ConfirmationDialog title="Completar presupuesto" label={dialogLabel} okLabel="Continuar"
                          open={isDialogOpen} onClose={() => setIsDialogOpen(false)} onOK={completeQuotation}/>
    </>
  );
};

export default React.memo(QuotationCompleteButton);