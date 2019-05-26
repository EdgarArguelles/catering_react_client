import './MenuDialog.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import cateringDialog from 'app/common/components/catering_dialog/CateringDialog';
import Animate from 'app/common/components/animate/Animate.react';
import Menu from 'app/features/quotations/menu/Menu.react';
import NavigationActions from 'app/features/quotations/header/navigation/NavigationActions';
import QuotationsActions from 'app/features/quotations/QuotationsActions';

const CateringDialog = cateringDialog(Dialog);

class MenuDialog extends React.Component {
  static propTypes = {
    isMenuDialogOpen: PropTypes.bool.isRequired,
    selectedDish: PropTypes.string.isRequired,
    onClose: PropTypes.func,
    closeMenuDialog: PropTypes.func.isRequired,
    handleCloseNavigationDialog: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.timeout = {};
  }

  componentWillUpdate(nextProps) {
    const {selectedDish, handleCloseNavigationDialog} = this.props;

    // handle back browser functionality when close SelectedDishDialog
    if (selectedDish !== '' && nextProps.selectedDish === '' && nextProps.isMenuDialogOpen) {
      clearTimeout(this.timeout);
      this.timeout && (this.timeout = setTimeout(() => handleCloseNavigationDialog(this.onClose), 500));
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.timeout = null;
  }

  onClose = () => {
    const {onClose, closeMenuDialog} = this.props;

    closeMenuDialog();
    onClose && onClose();
  };

  render() {
    const {isMenuDialogOpen} = this.props;
    const visible = isMenuDialogOpen;
    const delayOut = 500;

    return (
      <Animate visible={visible} animationIn="fadeInDownBig" animationOut="fadeOutUpBig" delayOut={delayOut}>
        <CateringDialog id="menu-dialog" open={visible} transitionDuration={delayOut} fullScreen={true}
                        onClose={this.onClose}>
          <DialogContent>
            <Menu/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onClose}>Cerrar</Button>
          </DialogActions>
        </CateringDialog>
      </Animate>
    );
  }
}

const mapStateToProps = state => {
  return {
    isMenuDialogOpen: state.quotations.isMenuDialogOpen,
    selectedDish: state.quotations.dish.selected,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeMenuDialog: () => {
      dispatch(QuotationsActions.changeMenuDialogOpen(false));
    },
    handleCloseNavigationDialog: closeDialog => {
      dispatch(NavigationActions.closeNavigationDialog(closeDialog));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuDialog);