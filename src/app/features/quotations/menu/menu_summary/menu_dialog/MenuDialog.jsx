import './MenuDialog.scss';
import React, {useCallback, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {useBrowserNavigation} from 'app/common/Hooks';
import DialogBack from 'app/common/components/dialog_back/DialogBack';
import Animate from 'app/common/components/animate/Animate';
import Menu from 'app/features/quotations/menu/Menu';
import NavigationActions from 'app/features/quotations/header/navigation/NavigationActions';
import QuotationsActions from 'app/features/quotations/QuotationsActions';

const MenuDialog = ({onClose}) => {
  const dispatch = useDispatch();
  const isMenuDialogOpen = useSelector(state => state.quotations.isMenuDialogOpen);
  const selectedDish = useSelector(state => state.quotations.dish.selected);
  const shouldOverwriteCloseNavigationDialog = isMenuDialogOpen && selectedDish === '';
  const delayOut = 500;
  const latestOnClose = useRef(onClose); // avoid to re-run useEffect when onClose changes
  const closeDialog = useCallback(() => {
    dispatch(QuotationsActions.changeMenuDialogOpen(false));
    latestOnClose.current && latestOnClose.current();
  }, [dispatch]);
  useBrowserNavigation(isMenuDialogOpen, closeDialog);

  useEffect(() => {
    if (shouldOverwriteCloseNavigationDialog) {
      // handle back browser functionality when close SelectedDishDialog
      setTimeout(() => dispatch(NavigationActions.closeNavigationDialog(closeDialog)), 0);
    }
  }, [shouldOverwriteCloseNavigationDialog, closeDialog, dispatch]);

  return (
    <Animate visible={isMenuDialogOpen} animationIn="fadeInDownBig" animationOut="fadeOutUpBig" delayOut={delayOut}>
      <Dialog id="menu-dialog" open={isMenuDialogOpen} transitionDuration={delayOut} fullScreen={true}
              onClose={closeDialog}>
        <DialogBack title="Modificar Menú" onClose={closeDialog}/>
        <DialogContent>
          <Menu/>
        </DialogContent>
      </Dialog>
    </Animate>
  );
};

MenuDialog.propTypes = {
  onClose: PropTypes.func,
};

export default React.memo(MenuDialog);