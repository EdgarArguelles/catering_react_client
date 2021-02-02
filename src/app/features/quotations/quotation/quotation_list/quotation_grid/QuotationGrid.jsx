import './QuotationGrid.scss';
import React from 'react';
import {useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Utils from 'app/common/Utils';
import {useQuotations} from 'app/hooks/data/Quotations';
import {isQuotationStarted} from 'app/features/quotations/quotation/Quotation.service';
import Quotation from 'app/features/quotations/quotation/Quotation';
import ContinueQuotation from './continue_quotation/ContinueQuotation';
import CreateNewQuotation from './create_new_quotation/CreateNewQuotation';

const QuotationGrid = () => {
  const {quotations, metaData, isFetching} = useQuotations();
  const isEditStarted = useSelector(state => isQuotationStarted(state.quotations.quotation));

  const getSortDate = (b, a) => a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0;

  const getSort = () => {
    const sort = metaData.pagination.sort[0];

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
      const getLoader = () => (<>
        <Skeleton variant="circle" animation="wave" className="loader loader-circle"/>
        <Skeleton variant="rect" animation="wave" className="loader loader-title"/>
        <Skeleton variant="rect" animation="wave" className="loader loader-data1"/>
        <Skeleton variant="rect" animation="wave" className="loader loader-data2"/>
        <Skeleton variant="rect" animation="wave" className="loader loader-footer1"/>
        <Skeleton variant="rect" animation="wave" className="loader loader-footer2"/>
      </>);

      return Array(5).fill('loader').map((value, index) =>
        <Grid key={`${value}-${index}`} item xs={12} sm={6} md={4} lg={3} xl={2}>{getLoader()}</Grid>);
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
      {quotations?.sort(getSort()).map((quotation, index) =>
        getAnimatedGrid(quotation.id, <Quotation index={index} quotation={quotation}/>),
      )}
      {getExtraContent()}
    </Grid>
  );
};

export default React.memo(QuotationGrid);