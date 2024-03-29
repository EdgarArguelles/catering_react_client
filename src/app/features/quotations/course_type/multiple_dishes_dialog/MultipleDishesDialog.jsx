import './MultipleDishesDialog.scss';
import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useBrowserNavigation } from 'app/hooks/Common';
import MultipleDishesActions from './multiple_dishes_actions/MultipleDishesActions';
import UndoCancelSnackbars from './undo_cancel_snackbars/UndoCancelSnackbars';
import { closeNavigationDialog } from 'app/features/quotations/header/navigation/NavigationReducer';
import { closeDialog } from './MultipleDishesDialogReducer';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props}/>);

const MultipleDishesDialog = ({ courseType, tabToDisplay, children }) => {
  const dispatch = useDispatch();
  const currentTab = useSelector(state => state.quotations.selectedTab);
  const selectedDish = useSelector(state => state.quotations.dish.selected);
  const open = useSelector(state => state.quotations.multipleDishesDialog.isMultipleDishesDialogOpen);
  const isOpen = open && tabToDisplay === currentTab;
  const shouldOverwriteCloseNavigationDialog = isOpen && selectedDish === '';
  const onClose = useCallback(() => dispatch(closeDialog()), [dispatch]);
  useBrowserNavigation(isOpen, onClose);

  useEffect(() => {
    if (shouldOverwriteCloseNavigationDialog) {
      // handle back browser functionality when close SelectedDishDialog
      setTimeout(() => dispatch(closeNavigationDialog(onClose)), 0);
    }
  }, [shouldOverwriteCloseNavigationDialog, onClose, dispatch]);

  return (
    <>
      <Dialog className="multiple-dishes-dialog" TransitionComponent={Transition} transitionDuration={500}
        onClose={onClose} open={isOpen}>
        <DialogContent className="multiple-dishes-dialog-content">
          {children}
        </DialogContent>
        <DialogActions><MultipleDishesActions courseType={courseType} onClose={onClose}/></DialogActions>
      </Dialog>

      <UndoCancelSnackbars tabToDisplay={tabToDisplay}/>
    </>
  );
};

MultipleDishesDialog.propTypes = {
  courseType: PropTypes.object.isRequired,
  tabToDisplay: PropTypes.number.isRequired,
  children: PropTypes.object.isRequired,
};

export default React.memo(MultipleDishesDialog);