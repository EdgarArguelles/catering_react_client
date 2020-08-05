import './ActionButtons.scss';
import React from 'react';
import {useSelector} from 'react-redux';
import {useQuotationsLoader} from 'app/common/Hooks';
import {areEqual} from 'app/features/quotations/quotation/Quotation.service';
import DeleteQuotation from './delete_quotation/DeleteQuotation';
import RevertQuotation from './revert_quotation/RevertQuotation';
import SaveQuotation from './save_quotation/SaveQuotation';

const ActionButtons = () => {
  const quotation = useSelector(state => state.quotations.quotation);
  const isRemoteProcessing = useSelector(state => state.quotations.isRemoteProcessing);
  const quotations = useSelector(state => state.data.quotations.data);
  const isEdited = !areEqual(quotation, quotations ? quotations[quotation.id] : null);
  const showDelete = !isEdited;
  const showRevert = isEdited && !!quotation.name;
  const showSave = isEdited && quotation.price > 0;
  useQuotationsLoader();

  return (
    <div id="action-buttons">
      <RevertQuotation hidden={!showRevert}/>
      {(isRemoteProcessing || showDelete) && <DeleteQuotation isErrorVisible={showDelete}/>}
      {(isRemoteProcessing || showSave) && <SaveQuotation isErrorVisible={showSave}/>}
    </div>
  );
};

export default React.memo(ActionButtons);