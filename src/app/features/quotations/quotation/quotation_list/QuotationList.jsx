import './QuotationList.scss';
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import {useQuotations} from 'app/hooks/data/Quotations';
import AuthDialog from 'app/features/quotations/auth_dialog/AuthDialog';
import EmptyQuotationList from './empty_quotation_list/EmptyQuotationList';
import NoSessionQuotationList from './no_session_quotation_list/NoSessionQuotationList';
import QuotationToolbar from './quotation_toolbar/QuotationToolbar';
import QuotationGrid from './quotation_grid/QuotationGrid';
import {openAuthDialog} from 'app/features/quotations/auth_dialog/AuthDialogReducer';
import {changeNavigation, closeNavigationDialog} from 'app/features/quotations/header/navigation/NavigationReducer';

const QuotationList = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.auth.loggedUser);
  const {metaData, isFetching, hasNextPage, fetchNextPage} = useQuotations(loggedUser);
  const latestLoggedUser = useRef(loggedUser); // avoid to re-run useEffect when loggedUser changes
  useEffect(() => {
    dispatch(changeNavigation({backLink: '/presupuestos', title: 'Mis Presupuestos'}));
    !latestLoggedUser.current && dispatch(openAuthDialog());
  }, [dispatch]);

  if (!loggedUser) {
    return (
      <>
        <NoSessionQuotationList/>
        <AuthDialog onSuccess={() => dispatch(closeNavigationDialog(null))}/>
      </>
    );
  }

  if (metaData?.totalElements === 0) {
    return <EmptyQuotationList/>;
  }

  return (
    <div id="quotation-list">
      <QuotationToolbar/>
      <QuotationGrid/>
      {hasNextPage && <Button variant="outlined" className="load-more" disabled={isFetching}
                              onClick={() => fetchNextPage()}>
        Más resultados
      </Button>}
    </div>
  );
};

export default React.memo(QuotationList);