import './CreateNewQuotation.scss';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import History from 'app/router/History';
import Utils from 'app/common/Utils';
import {getRandomMenuId} from 'app/features/quotations/menu/Menu.service';
import {areEqual} from 'app/features/quotations/quotation/Quotation.service';
import ConfirmationDialog from 'app/common/components/confirmation_dialog/ConfirmationDialog';
import {addNewMenu, selectMenu} from 'app/features/quotations/quotation/QuotationReducer';
import {deleteLocal} from 'app/features/quotations/QuotationsReducer';

const CreateNewQuotation = () => {
  const dispatch = useDispatch();
  const quotations = useSelector(state => state.data.quotations.data);
  const selectedQuotation = useSelector(state => state.quotations.quotation);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogLabel = 'Al crear un nuevo presupuesto se perderan todos los cambios no guardados ¿Desea continuar?';

  const createNewQuotation = () => {
    const menuId = getRandomMenuId();
    dispatch(deleteLocal());
    dispatch(addNewMenu(menuId));
    dispatch(selectMenu(menuId));
    History.navigate('/presupuestos/menu/editar');
  };

  const animateIcon = () => Utils.animateIcon('create-new-quotation-icon');
  const handleShowDialog = () => {
    animateIcon();
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
      <Button id="create-new-quotation" onClick={handleShowDialog} onMouseEnter={animateIcon}>
        <FontAwesomeIcon id="create-new-quotation-icon" icon={faPlusCircle}/>
        Crear un nuevo presupuesto
      </Button>

      <ConfirmationDialog title="Crear nuevo presupuesto" label={dialogLabel} okLabel="Continuar"
                          open={isDialogOpen} onClose={() => setIsDialogOpen(false)} onOK={createNewQuotation}/>
    </>
  );
};

export default React.memo(CreateNewQuotation);