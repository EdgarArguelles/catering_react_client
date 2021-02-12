import './ActionButtons.scss';
import React from 'react';
import {useSelector} from 'react-redux';
import {useQuotation} from 'app/hooks/data/Quotations';
import {areEqual} from 'app/features/quotations/quotation/Quotation.service';
import DeleteQuotation from './delete_quotation/DeleteQuotation';
import RevertQuotation from './revert_quotation/RevertQuotation';
import SaveQuotation from './save_quotation/SaveQuotation';

const ActionButtons = () => {
  const quotation = useSelector(state => state.quotations.quotation);
  const isRemoteProcessing = useSelector(state => state.data.quotations.isRemoteProcessing);
  const {data: remote} = useQuotation(quotation.id);
  const isEdited = !areEqual(quotation, remote);
  const showDelete = !isEdited;
  const showRevert = isEdited && !!quotation.name;
  const showSave = isEdited && quotation.price > 0;

  return (
    <div id="action-buttons">
      <RevertQuotation hidden={!showRevert}/>
      {(isRemoteProcessing || showDelete) && <DeleteQuotation isErrorVisible={showDelete}/>}
      {(isRemoteProcessing || showSave) && <SaveQuotation isErrorVisible={showSave}/>}
    </div>
  );
};

export default React.memo(ActionButtons);