import './QuotationNotify.scss';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMailBulk} from '@fortawesome/free-solid-svg-icons';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Utils from 'app/common/Utils';
import {areEqual} from 'app/features/quotations/quotation/Quotation.service';
import ConfirmationDialog from 'app/common/components/confirmation_dialog/ConfirmationDialog';

const QuotationNotify = () => {
  const isFetching = useSelector(state => state.data.fetching.quotations || state.data.fetching.quotationsUpdate);
  const quotation = useSelector(state => state.quotations.quotation);
  const quotations = useSelector(state => state.data.quotations);
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
  const [comment, setComment] = useState('');
  const link = `${window.location.origin}/presupuestos/ver/${quotation.id}`;
  const body = `comentario:%0D%0A${encodeURI(comment)}%0D%0A%0D%0A%0D%0Alink: ${link}`;
  const animateIcon = () => Utils.animateIcon('quotation-notify-button-icon', {strokeWidth: 20});
  const openSendDialog = () => {
    animateIcon();
    setIsSendDialogOpen(true);
    setComment('');
  };

  const closeSendDialog = () => {
    setIsSendDialogOpen(false);
    setComment('');
  };

  const sendEmail = () => {
    window.location.replace(`mailto:caoc1688@gmail.com?subject=Presupuesto&body=${body}`);
    closeSendDialog();
  };

  const getCommentBox = () => {
    return (
      <TextField fullWidth multiline rows="4" margin="normal" label="Agregue un comentario" value={comment}
                 onChange={event => setComment(event.target.value)}/>
    );
  };

  if (isFetching || !areEqual(quotation, quotations ? quotations[quotation.id] : null)) {
    return null;
  }

  return (
    <div id="quotation-notify">
      <Fab id="quotation-notify-button" variant="extended" className="notify-chef animated zoomIn delay-1s"
           onClick={openSendDialog} onMouseEnter={animateIcon} classes={{label: 'quotation-notify-button-label'}}>
        <FontAwesomeIcon id="quotation-notify-button-icon" className="button-icon" icon={faMailBulk}/>
        Notificar a Areli
      </Fab>

      <ConfirmationDialog open={isSendDialogOpen} title="Notificar a Areli" content={getCommentBox()}
                          label="Notificar a Areli que usted esta interesado en este presupuesto" okLabel="Notificar"
                          onClose={closeSendDialog} onOK={sendEmail}/>
    </div>
  );
};

export default React.memo(QuotationNotify);