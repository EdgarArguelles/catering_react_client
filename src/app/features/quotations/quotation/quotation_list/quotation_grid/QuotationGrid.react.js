import './QuotationGrid.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Utils from 'app/common/Utils';
import {isQuotationStarted} from 'app/features/quotations/quotation/Quotation.service';
import {QuotationItemLoader} from 'app/common/components/content_loaders/ContentLoaders.react';
import Quotation from 'app/features/quotations/quotation/Quotation.react';
import ContinueQuotation from './continue_quotation/ContinueQuotation.react';
import CreateNewQuotation from './create_new_quotation/CreateNewQuotation.react';

class QuotationGrid extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    metaData: PropTypes.object,
    quotations: PropTypes.object.isRequired,
    isEditStarted: PropTypes.bool.isRequired,
  };

  getSortDate = (b, a) => a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0;

  getSort = () => {
    const {metaData} = this.props;
    const sort = metaData ? metaData.pagination.sort[0] : '';

    switch (sort) {
      case 'createdAt':
        return this.getSortDate;
      case 'price':
        return (a, b) => a.price - b.price !== 0 ? a.price - b.price : this.getSortDate(a, b);
      case 'name':
        return Utils.getSortString('name', this.getSortDate);
      default:
        return () => 0;
    }
  };

  getAnimatedGrid = (id, children) => {
    return <Grid key={id} item xs={12} sm={6} md={4} lg={3} xl={2} className="animated zoomIn">{children}</Grid>;
  };

  getExtraContent = () => {
    const {isFetching, isEditStarted} = this.props;

    if (isFetching) {
      return Array(5).fill('loader').map((value, index) =>
        <Grid key={`${value}-${index}`} item xs={12} sm={6} md={4} lg={3} xl={2}><QuotationItemLoader/></Grid>);
    }

    return (
      <React.Fragment>
        {isEditStarted && this.getAnimatedGrid('continue-with-quotation', <ContinueQuotation/>)}
        {this.getAnimatedGrid('new-quotation', <CreateNewQuotation/>)}
      </React.Fragment>
    );
  };

  render() {
    const {quotations} = this.props;

    return (
      <Grid id="quotation-grid" container spacing={16} justify="flex-start">
        {Object.values(quotations).sort(this.getSort()).map((quotation, index) =>
          this.getAnimatedGrid(quotation.id, <Quotation index={index} quotation={quotation}/>),
        )}
        {this.getExtraContent()}
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.data.fetching.quotations || state.data.fetching.quotationsUpdate,
    metaData: state.data.metaData.quotations,
    quotations: state.data.quotations || {},
    isEditStarted: isQuotationStarted(state.quotations.quotation),
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuotationGrid);