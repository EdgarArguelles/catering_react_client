import './UndoCancelSnackbars.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {
  cleanDishes,
  openDialog,
} from 'app/features/quotations/course_type/multiple_dishes_dialog/MultipleDishesDialogReducer';

const UndoCancelSnackbars = ({ tabToDisplay }) => {
  const dispatch = useDispatch();
  const multipleDishesDialog = useSelector(state => state.quotations.multipleDishesDialog);
  const { isMultipleDishesDialogOpen, dishes } = multipleDishesDialog;
  const isOpen = !isMultipleDishesDialogOpen && dishes.length > 0;
  const openMultipleDishesDialog = () => dispatch(openDialog());

  const handleClose = (event, reason) => {
    if (!isMultipleDishesDialogOpen && dishes.length > 0 && reason !== 'clickaway') {
      dispatch(cleanDishes());
    }
  };

  return (
    <Snackbar id="undo-cancel-snackbars" open={isOpen} TransitionComponent={Slide}
      className="snackbar-in-tabs" style={{ left: `calc(${tabToDisplay * 100}vw + 50%)` }}
      onClose={handleClose} autoHideDuration={10000} message="Se descarto el Plato Fuerte"
      action={[
        <Button key="undo" color="secondary" onClick={openMultipleDishesDialog}>DESHACER</Button>,
        <IconButton key="close" color="inherit" onClick={handleClose}>
          <FontAwesomeIcon className="close-icon" icon={faTimes}/>
        </IconButton>,
      ]}/>
  );
};

UndoCancelSnackbars.propTypes = {
  tabToDisplay: PropTypes.number.isRequired,
};

export default React.memo(UndoCancelSnackbars);