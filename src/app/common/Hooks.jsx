import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {faLightbulb} from '@fortawesome/free-solid-svg-icons';
import {faLightbulb as faLightbulbRegular} from '@fortawesome/free-regular-svg-icons';
import {changeTheme} from 'app/Reducers';
import {areAllDishesPresent, fetchDishesList} from 'app/features/quotations/dish/Dish.service';
import {fetchCompleteQuotation} from 'app/features/quotations/quotation/Quotation.service';
import NavigationActions from 'app/features/quotations/header/navigation/NavigationActions';
import QuotationsActions from 'app/data/quotations/QuotationsActions';
import DishesActions from 'app/data/dishes/DishesActions';
import AuthActions from 'app/features/auth/AuthActions';

export const useAppTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);
  const themeIcon = theme === 'dark' ? faLightbulb : faLightbulbRegular;
  const action = () => dispatch(changeTheme(theme === 'dark' ? 'light' : 'dark'));

  return {theme, themeIcon, changeTheme: action};
};

export const usePingServer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AuthActions.fetchPing());
  });
};

export const useBrowserNavigation = (open, onClose) => {
  const dispatch = useDispatch();
  const latestOnClose = useRef(onClose); // avoid to re-run useEffect when onClose changes
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

export const useQuotationsLoader = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.auth.loggedUser);
  const quotation = useSelector(state => state.quotations.quotation);
  const isFetching = useSelector(state => state.data.fetching.quotations || state.data.fetching.quotationsUpdate);
  const quotations = useSelector(state => state.data.quotations);

  const latestQuotation = useRef(quotation); // avoid to re-run useEffect when quotation changes
  const latestIsFetching = useRef(isFetching); // avoid to re-run useEffect when isFetching changes
  const latestQuotations = useRef(quotations); // avoid to re-run useEffect when quotations changes

  useEffect(() => {
    if (loggedUser) {
      const fetch = quotationId => dispatch(QuotationsActions.fetchQuotation(quotationId, false));
      fetchCompleteQuotation(latestQuotation.current, latestIsFetching.current, latestQuotations.current, fetch);
      latestIsFetching.current = true;
    }
  }, [loggedUser, dispatch]);
};

export const useAreDishesLoaded = dishes => {
  const dispatch = useDispatch();
  const dishFetching = useSelector(state => state.data.fetching.dish);
  const allDishes = useSelector(state => state.data.dishes);

  const latestDishes = useRef(dishes); // avoid to re-run useEffect when dishes changes
  const latestDishFetching = useRef(dishFetching); // avoid to re-run useEffect when dishFetching changes
  const latestAllDishes = useRef(allDishes); // avoid to re-run useEffect when allDishes changes

  useEffect(() => {
    const fetchDish = dishId => dispatch(DishesActions.fetchDish(dishId));

    fetchDishesList(latestDishes.current, latestAllDishes.current, latestDishFetching.current, fetchDish);
  }, [dispatch]);

  return areAllDishesPresent(dishes, allDishes) || dishes.length === 0;
};