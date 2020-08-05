import './QuotationGrid.scss';
import React from 'react';
import {useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Utils from 'app/common/Utils';
import {isQuotationStarted} from 'app/features/quotations/quotation/Quotation.service';
import {QuotationItemLoader} from 'app/common/components/content_loaders/ContentLoaders';
import Quotation from 'app/features/quotations/quotation/Quotation';
import ContinueQuotation from './continue_quotation/ContinueQuotation';
import CreateNewQuotation from './create_new_quotation/CreateNewQuotation';

const QuotationGrid = () => {
  const isFetching = useSelector(state => state.data.quotations.fetching);
  const metaData = useSelector(state => state.data.quotations.metaData);
  const quotations = useSelector(state => state.data.quotations.data || {});
  const isEditStarted = useSelector(state => isQuotationStarted(state.quotations.quotation));

  const getSortDate = (b, a) => a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0;

  const getSort = () => {
    const sort = metaData ? metaData.pagination.sort[0] : '';

    switch (sort) {
      case 'createdAt':
        return getSortDate;
      case 'price':
        return (a, b) => a.price - b.price !== 0 ? a.price - b.price : getSortDate(a, b);
      case 'name':
        return Utils.getSortString('name', getSortDate);
      default:
        return () => 0;
    }
  };

  const getAnimatedGrid = (id, component) => {
    return (
      <Grid key={id} item xs={12} sm={6} md={4} lg={3} xl={2} className="animate__animated animate__zoomIn">
        {component}
      </Grid>
    );
  };

  const getExtraContent = () => {
    if (isFetching) {
      return Array(5).fill('loader').map((value, index) =>
        <Grid key={`${value}-${index}`} item xs={12} sm={6} md={4} lg={3} xl={2}><QuotationItemLoader/></Grid>);
    }

    return (
      <>
        {isEditStarted && getAnimatedGrid('continue-with-quotation', <ContinueQuotation/>)}
        {getAnimatedGrid('new-quotation', <CreateNewQuotation/>)}
      </>
    );
  };

  return (
    <Grid id="quotation-grid" container spacing={2} justify="flex-start">
      {Object.values(quotations).sort(getSort()).map((quotation, index) =>
        getAnimatedGrid(quotation.id, <Quotation index={index} quotation={quotation}/>),
      )}
      {getExtraContent()}
    </Grid>
  );
};

export default React.memo(QuotationGrid);