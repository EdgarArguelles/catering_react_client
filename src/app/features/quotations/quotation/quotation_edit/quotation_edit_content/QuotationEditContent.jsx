import './QuotationEditContent.scss';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {QuotationEditLoader} from 'app/common/components/content_loaders/ContentLoaders';
import EditableField from 'app/common/components/editable_field/EditableField';
import QuotationEditToolbar from './quotation_edit_toolbar/QuotationEditToolbar';
import MenuGrid from './menu_grid/MenuGrid';
import QuotationNotify from './quotation_notify/QuotationNotify';
import QuotationCompleteButton from './quotation_complete_button/QuotationCompleteButton';
import {changeName} from 'app/features/quotations/quotation/QuotationReducer';

const QuotationEditContent = () => {
  const dispatch = useDispatch();
  const quotation = useSelector(state => state.quotations.quotation);
  const isFetching = useSelector(state => state.data.quotations.fetching);
  const changeQuotationName = name => dispatch(changeName(name));
  const {id, name} = quotation;

  const getContent = () => {
    if (!name || isFetching) {
      return <QuotationEditLoader/>;
    }

    return (
      <>
        <EditableField value={name} placeholder="Nombre del Presupuesto" onChange={changeQuotationName}/>
        <MenuGrid/>
        {id && <div className="quotation-folio">El folio generado para este presupuesto es: <b>{id}</b></div>}
      </>
    );
  };

  return (
    <div id="quotation-edit-content">
      <QuotationEditToolbar/>
      <div className="content">{getContent()}</div>
      <QuotationNotify/>
      <QuotationCompleteButton/>
    </div>
  );
};

export default React.memo(QuotationEditContent);