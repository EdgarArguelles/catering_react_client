import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchCompleteQuotation} from '../../features/quotations/quotation/Quotation.service';
import QuotationsActions from './QuotationsActions';

class QuotationsLoader extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    loggedUser: PropTypes.object,
    quotation: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    quotations: PropTypes.object,
    fetchQuotation: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const {quotation, isFetching, quotations, fetchQuotation} = this.props;
    fetchCompleteQuotation(quotation, isFetching, quotations, fetchQuotation);
  }

  componentWillUpdate(nextProps) {
    const {loggedUser, quotation, isFetching, quotations, fetchQuotation} = nextProps;

    if (!this.props.loggedUser && loggedUser) {
      fetchCompleteQuotation(quotation, isFetching, quotations, fetchQuotation);
    }
  }

  render() {
    const {children} = this.props;

    return <React.Fragment>{children}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.auth.loggedUser,
    quotation: state.quotations.quotation,
    isFetching: state.data.fetching.quotations || state.data.fetching.quotationsUpdate,
    quotations: state.data.quotations,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchQuotation: quotationId => {
      dispatch(QuotationsActions.fetchQuotation(quotationId, false));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuotationsLoader);