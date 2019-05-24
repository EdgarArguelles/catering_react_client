import './QuotationList.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import AuthDialog from '../../auth_dialog/AuthDialog.react';
import EmptyQuotationList from './empty_quotation_list/EmptyQuotationList.react';
import NoSessionQuotationList from './no_session_quotation_list/NoSessionQuotationList.react';
import QuotationToolbar from './quotation_toolbar/QuotationToolbar.react';
import QuotationGrid from './quotation_grid/QuotationGrid.react';
import AuthDialogActions from '../../auth_dialog/AuthDialogActions';
import NavigationActions from '../../header/navigation/NavigationActions';
import QuotationsActions from '../../../../data/quotations/QuotationsActions';

const PAGINATION = {page: -1, size: 5, sort: ['createdAt'], direction: 'DESC'};

class QuotationList extends React.Component {
  static propTypes = {
    loggedUser: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    metaData: PropTypes.object,
    openAuthDialog: PropTypes.func.isRequired,
    changeNavigation: PropTypes.func.isRequired,
    fetchNextPage: PropTypes.func.isRequired,
    closeNavigationDialog: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const {loggedUser, metaData, openAuthDialog, changeNavigation, fetchNextPage} = this.props;
    changeNavigation('/presupuestos', 'Mis Presupuestos');

    if (!loggedUser) {
      openAuthDialog();
      return;
    }

    if (!metaData) {
      fetchNextPage(PAGINATION);
    }
  }

  render() {
    const {loggedUser, isFetching, metaData, fetchNextPage, closeNavigationDialog} = this.props;
    const isComplete = metaData && metaData.totalPages <= metaData.pagination.page + 1;

    if (!loggedUser) {
      return (
        <React.Fragment>
          <NoSessionQuotationList/>
          <AuthDialog onSuccess={() => {
            fetchNextPage(PAGINATION);
            closeNavigationDialog();
          }}/>
        </React.Fragment>
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
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.auth.loggedUser,
    isFetching: state.data.fetching.quotations || state.data.fetching.quotationsUpdate,
    metaData: state.data.metaData.quotations,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openAuthDialog: () => {
      dispatch(AuthDialogActions.openAuthDialog());
    },
    changeNavigation: (backLink, title) => {
      dispatch(NavigationActions.changeNavigation(backLink, title));
    },
    fetchNextPage: pagination => {
      dispatch(QuotationsActions.fetchQuotations({...pagination, page: pagination.page + 1}));
    },
    closeNavigationDialog: () => {
      dispatch(NavigationActions.closeNavigationDialog(null));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuotationList);