import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import NavigationActions from 'app/features/quotations/header/navigation/NavigationActions';

export const useCateringDialog = (open, onClose) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(NavigationActions.closeNavigationDialog(open ? onClose : null));
  }, [open, onClose, dispatch]);
};