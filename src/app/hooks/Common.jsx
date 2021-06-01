import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb as faLightbulbRegular } from '@fortawesome/free-regular-svg-icons';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { changeTheme } from 'app/AppReducer';
import { closeNavigationDialog } from 'app/features/quotations/header/navigation/NavigationReducer';
import { fetchPing } from 'app/features/auth/AuthReducer';

export const useIsMobileSize = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('sm'));
};

export const useAppTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.app.theme);
  const themeIcon = theme === 'dark' ? faLightbulb : faLightbulbRegular;
  const action = () => dispatch(changeTheme(theme === 'dark' ? 'light' : 'dark'));

  return { theme, themeIcon, changeTheme: action };
};

export const usePingServer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPing());
  });
};

export const useBrowserNavigation = (open, onClose) => {
  const dispatch = useDispatch();
  const latestOnClose = useRef(onClose); // avoid to re-run useEffect when onClose changes
  const latestOpen = useRef(open);
  useEffect(() => {
    if (open) {
      setTimeout(() => dispatch(closeNavigationDialog(latestOnClose.current)), 500);
    } else if (latestOpen.current) {
      // only close when last open value was true
      dispatch(closeNavigationDialog(null));
    }
  }, [open, dispatch]);

  // save last open value
  useEffect(() => {
    latestOpen.current = open;
  }, [open]);
};