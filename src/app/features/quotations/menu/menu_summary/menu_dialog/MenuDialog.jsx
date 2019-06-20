import './MenuDialog.scss';
import React, {useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import {useBrowserNavigation} from 'app/common/Hooks';
import Animate from 'app/common/components/animate/Animate';
import Menu from 'app/features/quotations/menu/Menu.react';
import NavigationActions from 'app/features/quotations/header/navigation/NavigationActions';
import QuotationsActions from 'app/features/quotations/QuotationsActions';

const MenuDialog = ({onClose}) => {
  const dispatch = useDispatch();
  const isMenuDialogOpen = useSelector(state => state.quotations.isMenuDialogOpen);
  const selectedDish = useSelector(state => state.quotations.dish.selected);
  const shouldOverwriteCloseNavigationDialog = isMenuDialogOpen && selectedDish === '';
  const delayOut = 200;
  const closeDialog = useCallback(() => {
    dispatch(QuotationsActions.changeMenuDialogOpen(false));
    onClose && onClose();
  }, [onClose, dispatch]);
  useBrowserNavigation(isMenuDialogOpen, closeDialog);

  useEffect(() => {
    if (shouldOverwriteCloseNavigationDialog) {
      // handle back browser functionality when close SelectedDishDialog
      setTimeout(() => dispatch(NavigationActions.closeNavigationDialog(closeDialog)), 0);
    }
  }, [shouldOverwriteCloseNavigationDialog, closeDialog, dispatch]);

  return (
    <Animate visible={isMenuDialogOpen} animationIn="fadeInDownBig" animationOut="fadeOutUpBig" delayOut={delayOut}>
      <Dialog id="menu-dialog" open={isMenuDialogOpen} transitionDuration={delayOut + 300} fullScreen={true}
              onClose={closeDialog}>
        <DialogContent>
          <Menu/>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Animate>
  );
};

MenuDialog.propTypes = {
  onClose: PropTypes.func,
};

export default React.memo(MenuDialog);