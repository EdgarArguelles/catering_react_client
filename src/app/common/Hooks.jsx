import {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import NavigationActions from 'app/features/quotations/header/navigation/NavigationActions';

export const useBrowserNavigation = (open, onClose) => {
  const dispatch = useDispatch();
  const latestOnClose = useRef(onClose); // avoid to re-run useEffect when onClose change
  const latestOpen = useRef(open);
  useEffect(() => {
    if (open) {
      setTimeout(() => dispatch(NavigationActions.closeNavigationDialog(latestOnClose.current)), 500);
    } else if (latestOpen.current) {
      // only close when last open value was true
      dispatch(NavigationActions.closeNavigationDialog(null));
    }
  }, [open, dispatch]);

  // save last open value
  useEffect(() => {
    latestOpen.current = open;
  }, [open]);
};