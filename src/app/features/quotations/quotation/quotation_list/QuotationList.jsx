import './QuotationList.scss';
import React, {useCallback, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import AuthDialog from 'app/features/quotations/auth_dialog/AuthDialog';
import EmptyQuotationList from './empty_quotation_list/EmptyQuotationList.react';
import NoSessionQuotationList from './no_session_quotation_list/NoSessionQuotationList.react';
import QuotationToolbar from './quotation_toolbar/QuotationToolbar.react';
import QuotationGrid from './quotation_grid/QuotationGrid.react';
import AuthDialogActions from 'app/features/quotations/auth_dialog/AuthDialogActions';
import NavigationActions from 'app/features/quotations/header/navigation/NavigationActions';
import QuotationsActions from 'app/data/quotations/QuotationsActions';

const PAGINATION = {page: -1, size: 5, sort: ['createdAt'], direction: 'DESC'};

const QuotationList = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.auth.loggedUser);
  const isFetching = useSelector(state => state.data.fetching.quotations || state.data.fetching.quotationsUpdate);
  const metaData = useSelector(state => state.data.metaData.quotations);
  const closeNavigationDialog = () => dispatch(NavigationActions.closeNavigationDialog(null));
  const isComplete = metaData && metaData.totalPages <= metaData.pagination.page + 1;

  // because this useCallback has inputs = [dispatch], fetchNextPage never changes its value, not changes each render
  const fetchNextPage = useCallback(pagination => {
    dispatch(QuotationsActions.fetchQuotations({...pagination, page: pagination.page + 1}));
  }, [dispatch]);
  const latestLoggedUser = useRef(loggedUser); // avoid to re-run useEffect when loggedUser changes
  const latestMetaData = useRef(metaData); // avoid to re-run useEffect when metaData changes
  useEffect(() => {
    dispatch(NavigationActions.changeNavigation('/presupuestos', 'Mis Presupuestos'));
    if (!latestLoggedUser.current) {
      dispatch(AuthDialogActions.openAuthDialog());
    } else if (!latestMetaData.current) {
      fetchNextPage(PAGINATION);
    }
  }, [dispatch, fetchNextPage]); // because fetchNextPage is [dispatch], this useEffect is only [dispatch] as well

  if (!loggedUser) {
    return (
      <>
        <NoSessionQuotationList/>
        <AuthDialog onSuccess={() => {
          fetchNextPage(PAGINATION);
          closeNavigationDialog();
        }}/>
      </>
    );
  }

  if (metaData && metaData.totalElements === 0) {
    return <EmptyQuotationList/>;
  }

  return (
    <div id="quotation-list">
      <QuotationToolbar/>
      <QuotationGrid/>
      {!isComplete && <Button variant="outlined" className="load-more" disabled={isFetching}
                              onClick={() => fetchNextPage(metaData.pagination)}>
        Más resultados
      </Button>}
    </div>
  );
};

export default React.memo(QuotationList);