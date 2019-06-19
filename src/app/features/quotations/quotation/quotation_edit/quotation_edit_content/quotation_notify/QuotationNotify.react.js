import './QuotationNotify.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import {areEqual} from 'app/features/quotations/quotation/Quotation.service';
import ConfirmationDialog from 'app/common/components/confirmation_dialog/ConfirmationDialog';

class QuotationNotify extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    quotation: PropTypes.object.isRequired,
    quotations: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {isSendDialogOpen: false, comment: ''};
  }

  getCommentBox = () => {
    return (
      <TextField fullWidth multiline rows="4" margin="normal" label="Comentario" value={this.state.comment}
                 onChange={event => this.setState({comment: event.target.value})}/>
    );
  };

  render() {
    const {isSendDialogOpen, comment} = this.state;
    const {isFetching, quotation, quotations} = this.props;
    const link = `${window.location.origin}/presupuestos/ver/${quotation.id}`;
    const body = `comentario:%0D%0A${encodeURI(comment)}%0D%0A%0D%0A%0D%0Alink: ${link}`;
    const openSendDialog = () => this.setState({isSendDialogOpen: true, comment: ''});
    const closeSendDialog = () => this.setState({isSendDialogOpen: false, comment: ''});
    const sendEmail = () => {
      window.location.replace(`mailto:caoc1688@gmail.com?subject=Presupuesto&body=${body}`);
      closeSendDialog();
    };

    if (isFetching || !areEqual(quotation, quotations ? quotations[quotation.id] : null)) {
      return null;
    }

    return (
      <div id="quotation-notify">
        <Fab id="quotation-notify-button" variant="extended" className="notify-chef animated zoomIn delay-1s"
             onClick={openSendDialog} classes={{label: 'quotation-notify-button-label'}}>
          <i id="quotation-notify-button-icon" className="fas fa-mail-bulk button-icon" aria-hidden="true"/>
          Notificar a Areli
        </Fab>

        <ConfirmationDialog open={isSendDialogOpen} title="Notificar a Areli" content={this.getCommentBox()}
                            label="Notificar a Areli que usted esta interesado en este presupuesto" okLabel="Notificar"
                            onClose={closeSendDialog} onOK={sendEmail}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.data.fetching.quotations || state.data.fetching.quotationsUpdate,
    quotation: state.quotations.quotation,
    quotations: state.data.quotations,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuotationNotify);