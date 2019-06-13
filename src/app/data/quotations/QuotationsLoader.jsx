import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCompleteQuotation} from 'app/features/quotations/quotation/Quotation.service';
import QuotationsActions from './QuotationsActions';

const QuotationsLoader = ({children}) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.auth.loggedUser);
  const quotation = useSelector(state => state.quotations.quotation);
  const isFetching = useSelector(state => state.data.fetching.quotations || state.data.fetching.quotationsUpdate);
  const quotations = useSelector(state => state.data.quotations);

  useEffect(() => {
    if (loggedUser) {
      const fetchQuotation = quotationId => dispatch(QuotationsActions.fetchQuotation(quotationId, false));
      fetchCompleteQuotation(quotation, isFetching, quotations, fetchQuotation);
    }
  }, [loggedUser, quotation, isFetching, quotations, dispatch]);

  return <>{children}</>;
};

QuotationsLoader.propTypes = {
  children: PropTypes.object.isRequired,
};

export default React.memo(QuotationsLoader);