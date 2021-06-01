import './CreateQuotation.scss';
import image from 'assets/img/new-quotation.jpg';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationDialog from 'app/common/components/confirmation_dialog/ConfirmationDialog';
import History from 'app/router/History';
import { isQuotationStarted } from 'app/features/quotations/quotation/Quotation.service';
import { getRandomMenuId } from 'app/features/quotations/menu/Menu.service';
import Action from 'app/features/quotations/home/action/Action';
import { addNewMenu, selectMenu } from 'app/features/quotations/quotation/QuotationReducer';
import { deleteLocal } from 'app/features/quotations/QuotationsReducer';

const CreateQuotation = () => {
  const dispatch = useDispatch();
  const quotation = useSelector(state => state.quotations.quotation);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogLabel = 'Al crear un nuevo presupuesto se perderan todos los cambios no guardados ¿Desea continuar?';

  const handleQuotationRedirect = force => {
    const isStarted = isQuotationStarted(quotation);

    if (isStarted && !force) {
      setIsDialogOpen(true);
      return;
    }

    const menuId = getRandomMenuId();
    dispatch(deleteLocal());
    dispatch(addNewMenu(menuId));
    dispatch(selectMenu(menuId));
    History.navigate('/presupuestos/menu/editar');
  };

  return (
    <>
      <Action id="create-quotation" image={image} className="animate__animated animate__bounceInDown"
        onClick={() => handleQuotationRedirect(false)}>
        Crear un nuevo Presupuesto
      </Action>

      <ConfirmationDialog title="Crear nuevo presupuesto" label={dialogLabel} okLabel="Continuar"
        open={isDialogOpen} onClose={() => setIsDialogOpen(false)}
        onOK={() => handleQuotationRedirect(true)}/>
    </>
  );
};

export default React.memo(CreateQuotation);