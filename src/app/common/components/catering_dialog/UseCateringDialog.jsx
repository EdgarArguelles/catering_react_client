import {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import NavigationActions from 'app/features/quotations/header/navigation/NavigationActions';

export const useCateringDialog = (open, onClose) => {
  const dispatch = useDispatch();
  const latestOnClose = useRef(onClose); // avoid to re-run useEffect when onClose change
  useEffect(() => {
    setTimeout(() => dispatch(NavigationActions.closeNavigationDialog(open ? latestOnClose.current : null)), 500);
  }, [open, dispatch]);
};