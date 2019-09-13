import './DialogBack.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';

const DialogBack = ({title, onClose}) => {
  return (
    <DialogTitle id="dialog-back">
      <IconButton onClick={onClose}><FontAwesomeIcon icon={faArrowLeft}/></IconButton>
      <span id="dialog-back-title">{title ? title : 'Atras'}</span>
    </DialogTitle>
  );
};

DialogBack.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(DialogBack);