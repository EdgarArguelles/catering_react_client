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
import {closeNavigationDialog} from 'app/features/quotations/header/navigation/NavigationReducer';
import {changeMenuDialogOpen} from 'app/features/quotations/QuotationsReducer';

const MenuDialog = ({onClose}) => {
  const dispatch = useDispatch();
  const isMenuDialogOpen = useSelector(state => state.quotations.isMenuDialogOpen);
  const selectedDish = useSelector(state => state.quotations.dish.selected);
  const shouldOverwriteCloseNavigationDialog = isMenuDialogOpen && selectedDish === '';
  const latestOnClose = useRef(onClose); // avoid to re-run useEffect when onClose changes
  const closeDialog = useCallback(() => {
    dispatch(changeMenuDialogOpen(false));
    latestOnClose.current && latestOnClose.current();
  }, [dispatch]);
  useBrowserNavigation(isMenuDialogOpen, closeDialog);

  useEffect(() => {
    if (shouldOverwriteCloseNavigationDialog) {
      // handle back browser functionality when close SelectedDishDialog
      setTimeout(() => dispatch(closeNavigationDialog(closeDialog)), 0);
    }
  }, [shouldOverwriteCloseNavigationDialog, closeDialog, dispatch]);

  return (
    <Animate show={isMenuDialogOpen} animationIn="fadeInDownBig" animationOut="fadeOutUpBig">
      <Dialog id="menu-dialog" open={isMenuDialogOpen} transitionDuration={500} fullScreen={true}
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