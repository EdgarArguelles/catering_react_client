import './ContinueQuotation.scss';
import React from 'react';
import {useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import History from 'app/router/History';
import {getEditPath, isQuotationStarted} from 'app/features/quotations/quotation/Quotation.service';

const ContinueQuotation = () => {
  const quotation = useSelector(state => state.quotations.quotation);

  if (!isQuotationStarted(quotation)) {
    return null;
  }

  return (
    <Button id="continue-quotation" onClick={() => History.navigate(getEditPath(quotation))}>
      <i className="fas fa-book-open" aria-hidden="true"/>
      Continuar con el presupuesto
    </Button>
  );
};

export default React.memo(ContinueQuotation);