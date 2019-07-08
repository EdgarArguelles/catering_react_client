import './EmptyQuotationList.scss';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import History from 'app/router/History';
import {getRandomMenuId} from 'app/features/quotations/menu/Menu.service';
import {getEditPath, isQuotationStarted} from 'app/features/quotations/quotation/Quotation.service';
import QuotationActions from 'app/features/quotations/quotation/QuotationActions';
import QuotationsActions from 'app/features/quotations/QuotationsActions';

const EmptyQuotationList = () => {
  const dispatch = useDispatch();
  const quotation = useSelector(state => state.quotations.quotation);
  const isStarted = isQuotationStarted(quotation);

  const handleQuotationRedirect = () => {
    if (!isStarted) {
      const menuId = getRandomMenuId();
      dispatch(QuotationsActions.deleteLocal());
      dispatch(QuotationActions.addNewMenu(menuId));
      dispatch(QuotationActions.selectMenu(menuId));
      History.navigate('/presupuestos/menu/editar');
      return;
    }

    History.navigate(getEditPath(quotation));
  };

  return (
    <div id="empty-quotation-list">
      <i className="fas fa-info-circle" aria-hidden="true"/>
      <p className="title">Vacio</p>
      <p className="subtitle">Aún no has creado ningún presupuesto</p>
      <Button variant="outlined" className="create" onClick={handleQuotationRedirect}>
        {isStarted ? 'Continuar con el Presupuesto' : 'Crear Un Presupuesto'}
      </Button>
    </div>
  );
};

export default React.memo(EmptyQuotationList);