import './QuotationNotify.scss';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMailBulk} from '@fortawesome/free-solid-svg-icons';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Utils from 'app/common/Utils';
import {useQuotation} from 'app/hooks/data/Quotations';
import {areEqual} from 'app/features/quotations/quotation/Quotation.service';
import Animate from 'app/common/components/animate/Animate';
import ConfirmationDialog from 'app/common/components/confirmation_dialog/ConfirmationDialog';

const QuotationNotify = () => {
  const quotation = useSelector(state => state.quotations.quotation);
  const {data: remote, isFetching} = useQuotation(quotation.id);
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
  const [comment, setComment] = useState('');
  const link = `${window.location.origin}/presupuestos/ver/${quotation.id}`;
  const body = `comentario:%0D%0A${encodeURI(comment)}%0D%0A%0D%0A%0D%0Alink: ${link}`;
  const visible = !isFetching && areEqual(quotation, remote);
  const openSendDialog = () => {
    Utils.animateIcon('quotation-notify-button-icon', {strokeWidth: 20});
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

  return (
    <div id="quotation-notify">
      <Animate show={visible} className="notify-chef" animationIn="zoomIn delay-1s" animationOut="zoomOut">
        <Fab id="quotation-notify-button" variant="extended" onClick={openSendDialog}
             classes={{label: 'quotation-notify-button-label'}}>
          <FontAwesomeIcon id="quotation-notify-button-icon" className="button-icon" icon={faMailBulk}/>
          Notificar a Areli
        </Fab>
      </Animate>

      <ConfirmationDialog open={isSendDialogOpen} title="Notificar a Areli" content={getCommentBox()}
                          label="Notificar a Areli que usted esta interesado en este presupuesto" okLabel="Notificar"
                          onClose={closeSendDialog} onOK={sendEmail}/>
    </div>
  );
};

export default React.memo(QuotationNotify);