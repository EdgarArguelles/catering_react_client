import './EditQuotation.scss';
import image from 'assets/img/edit-quotation.jpg';
import React from 'react';
import {useSelector} from 'react-redux';
import History from 'app/router/History';
import {getEditPath} from 'app/features/quotations/quotation/Quotation.service';
import Action from 'app/features/quotations/home/action/Action';

const EditQuotation = () => {
  const quotation = useSelector(state => state.quotations.quotation);

  return (
    <Action id="edit-quotation" image={image} className="animate__animated animate__bounceInDown"
            onClick={() => History.navigate(getEditPath(quotation))}>
      Continuar con el Presupuesto
    </Action>
  );
};

export default React.memo(EditQuotation);