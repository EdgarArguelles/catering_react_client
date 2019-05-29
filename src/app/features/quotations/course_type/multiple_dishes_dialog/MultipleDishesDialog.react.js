import './MultipleDishesDialog.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import cateringDialog from 'app/common/components/catering_dialog/CateringDialog';
import MultipleDishesActions from './multiple_dishes_actions/MultipleDishesActions.react';
import UndoCancelSnackbars from './undo_cancel_snackbars/UndoCancelSnackbars.react';
import NavigationActions from 'app/features/quotations/header/navigation/NavigationActions';
import MultipleDishesDialogActions from './MultipleDishesDialogActions';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props}/>);

class MultipleDishesDialog extends React.Component {
  static propTypes = {
    courseType: PropTypes.object.isRequired,
    tabToDisplay: PropTypes.number.isRequired,
    children: PropTypes.object.isRequired,
    currentTab: PropTypes.number.isRequired,
    selectedDish: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    handleCloseNavigationDialog: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.timeout = {};
  }

  componentDidMount() {
    this.handleCloseNavigation();
  }

  componentWillUpdate(nextProps) {
    if (this.props.selectedDish !== '' && nextProps.selectedDish === '' && nextProps.open) {
      this.handleCloseNavigation();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.timeout = null;
  }

  handleCloseNavigation = () => {
    const {tabToDisplay, currentTab, open, onClose, handleCloseNavigationDialog} = this.props;

    // handle back browser functionality when close SelectedDishDialog
    clearTimeout(this.timeout);
    open && tabToDisplay === currentTab && this.timeout &&
    (this.timeout = setTimeout(() => handleCloseNavigationDialog(onClose), 500));
  };

  render() {
    const {courseType, tabToDisplay, children, currentTab, open, onClose} = this.props;

    return (
      <React.Fragment>
        <Dialog className="multiple-dishes-dialog" TransitionComponent={Transition} transitionDuration={500}
                open={open && tabToDisplay === currentTab}>
          <DialogContent className="multiple-dishes-dialog-content">
            {children}
          </DialogContent>
          <DialogActions><MultipleDishesActions courseType={courseType} onClose={onClose}/></DialogActions>
        </Dialog>

        <UndoCancelSnackbars tabToDisplay={tabToDisplay}/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.quotations.selectedTab,
    selectedDish: state.quotations.dish.selected,
    open: state.quotations.multipleDishesDialog.isMultipleDishesDialogOpen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClose: () => {
      dispatch(MultipleDishesDialogActions.closeDialog());
    },
    handleCloseNavigationDialog: closeDialog => {
      dispatch(NavigationActions.closeNavigationDialog(closeDialog));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(cateringDialog(MultipleDishesDialog));