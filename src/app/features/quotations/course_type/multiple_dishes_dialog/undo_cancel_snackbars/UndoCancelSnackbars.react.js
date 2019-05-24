import './UndoCancelSnackbars.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MultipleDishesDialogActions from '../MultipleDishesDialogActions';

class UndoCancelSnackbars extends React.Component {
  static propTypes = {
    tabToDisplay: PropTypes.number.isRequired,
    multipleDishesDialog: PropTypes.object.isRequired,
    openMultipleDishesDialog: PropTypes.func.isRequired,
    cleanMultipleDishesDialogDishes: PropTypes.func.isRequired,
  };

  handleClose = () => {
    const {multipleDishesDialog: {isMultipleDishesDialogOpen, dishes}, cleanMultipleDishesDialogDishes} = this.props;

    if (!isMultipleDishesDialogOpen && dishes.length > 0) {
      cleanMultipleDishesDialogDishes();
    }
  };

  render() {
    const {
      tabToDisplay, multipleDishesDialog: {isMultipleDishesDialogOpen, dishes}, openMultipleDishesDialog,
    } = this.props;
    const isOpen = !isMultipleDishesDialogOpen && dishes.length > 0;

    return (
      <Snackbar id="undo-cancel-snackbars" open={isOpen}
                className="snackbar-in-tabs" style={{left: `calc(${tabToDisplay * 100}vw + 50%)`}}
                onClose={this.handleClose} autoHideDuration={10000} message="Se descarto el Plato Fuerte"
                action={[
                  <Button key="undo" color="secondary" onClick={openMultipleDishesDialog}>DESHACER</Button>,
                  <IconButton key="close" color="inherit" onClick={this.handleClose}>
                    <i className="fas fa-times close-icon" aria-hidden="true"/>
                  </IconButton>,
                ]}/>
    );
  }
}

const mapStateToProps = state => {
  return {
    multipleDishesDialog: state.quotations.multipleDishesDialog,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openMultipleDishesDialog: () => {
      dispatch(MultipleDishesDialogActions.openDialog());
    },
    cleanMultipleDishesDialogDishes: () => {
      dispatch(MultipleDishesDialogActions.cleanDishes());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UndoCancelSnackbars);