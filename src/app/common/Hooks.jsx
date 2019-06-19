import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCompleteQuotation} from 'app/features/quotations/quotation/Quotation.service';
import NavigationActions from 'app/features/quotations/header/navigation/NavigationActions';
import QuotationsActions from 'app/data/quotations/QuotationsActions';

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