import './CreateNewQuotation.scss';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import History from 'app/router/History';
import {getRandomMenuId} from 'app/features/quotations/menu/Menu.service';
import {areEqual} from 'app/features/quotations/quotation/Quotation.service';
import ConfirmationDialog from 'app/common/components/confirmation_dialog/ConfirmationDialog';
import QuotationActions from 'app/features/quotations/quotation/QuotationActions';
import QuotationsActions from 'app/features/quotations/QuotationsActions';

const CreateNewQuotation = () => {
  const dispatch = useDispatch();
  const quotations = useSelector(state => state.data.quotations);
  const selectedQuotation = useSelector(state => state.quotations.quotation);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogLabel = 'Al crear un nuevo presupuesto se perderan todos los cambios no guardados ¿Desea continuar?';

  const createNewQuotation = () => {
    const menuId = getRandomMenuId();
    dispatch(QuotationsActions.deleteLocal());
    dispatch(QuotationActions.addNewMenu(menuId));
    dispatch(QuotationActions.selectMenu(menuId));
    History.navigate('/presupuestos/menu/editar');
  };

  const handleShowDialog = () => {
    const isQuotationStarted = selectedQuotation.menus && selectedQuotation.menus.length > 0;
    const isEdited = !areEqual(selectedQuotation, quotations ? quotations[selectedQuotation.id] : null);

    if (isQuotationStarted && isEdited) {
      setIsDialogOpen(true);
      return;
    }

    createNewQuotation();
  };

  return (
    <>
      <Button id="create-new-quotation" onClick={handleShowDialog}>
        <i className="fas fa-plus-circle" aria-hidden="true"/>
        Crear un nuevo presupuesto
      </Button>

      <ConfirmationDialog title="Crear nuevo presupuesto" label={dialogLabel} okLabel="Continuar"
                          open={isDialogOpen} onClose={() => setIsDialogOpen(false)} onOK={createNewQuotation}/>
    </>
  );
};

export default React.memo(CreateNewQuotation);