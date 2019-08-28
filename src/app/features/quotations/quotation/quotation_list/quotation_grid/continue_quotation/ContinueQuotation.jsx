import './ContinueQuotation.scss';
import React from 'react';
import {useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBookOpen} from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import History from 'app/router/History';
import Utils from 'app/common/Utils';
import {getEditPath, isQuotationStarted} from 'app/features/quotations/quotation/Quotation.service';

const ContinueQuotation = () => {
  const quotation = useSelector(state => state.quotations.quotation);

  if (!isQuotationStarted(quotation)) {
    return null;
  }

  const animateIcon = () => Utils.animateIcon('continue-quotation-icon');
  const handleClick = () => {
    animateIcon();
    History.navigate(getEditPath(quotation));
  };

  return (
    <Button id="continue-quotation" onClick={handleClick} onMouseEnter={animateIcon}>
      <FontAwesomeIcon id="continue-quotation-icon" icon={faBookOpen}/>
      Continuar con el presupuesto
    </Button>
  );
};

export default React.memo(ContinueQuotation);