import {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import NavigationActions from 'app/features/quotations/header/navigation/NavigationActions';

export const useCateringDialog = (open, onClose) => {
  const dispatch = useDispatch();
  const latestOnClose = useRef(onClose); // avoid to re-run useEffect when onClose change
  const latestOpen = useRef(open);
  useEffect(() => {
    if (open) {
      dispatch(NavigationActions.closeNavigationDialog(latestOnClose.current));
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