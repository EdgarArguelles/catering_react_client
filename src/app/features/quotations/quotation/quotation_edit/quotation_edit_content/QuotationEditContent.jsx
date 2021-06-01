import './QuotationEditContent.scss';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import EditableField from 'app/common/components/editable_field/EditableField';
import QuotationEditToolbar from './quotation_edit_toolbar/QuotationEditToolbar';
import MenuGrid from './menu_grid/MenuGrid';
import QuotationNotify from './quotation_notify/QuotationNotify';
import QuotationCompleteButton from './quotation_complete_button/QuotationCompleteButton';
import { changeName } from 'app/features/quotations/quotation/QuotationReducer';

const QuotationEditContent = () => {
  const dispatch = useDispatch();
  const quotation = useSelector(state => state.quotations.quotation);
  const isFetching = useSelector(state => state.data.quotations.fetching);
  const changeQuotationName = name => dispatch(changeName(name));
  const { id, name } = quotation;

  const getContent = () => {
    if (!name || isFetching) {
      const getMenuCircle = () => <Skeleton variant="circle" animation="wave" height={9} width={9}/>;
      const getFooter = (width1, width2) => (
        <div className="loader-footer">
          <Skeleton variant="rect" animation="wave" width={width1}/>
          <Skeleton variant="rect" animation="wave" width={width2} className="loader-right"/>
        </div>
      );

      const getLoader = () => (<>
        <div className="loader-header">
          <Skeleton variant="circle" animation="wave" className="loader-header-circle"/>
          <div className="loader-header-title"><Skeleton variant="rect" animation="wave" className="text"/></div>
          <div className="loader-header-menu">{getMenuCircle()}{getMenuCircle()}{getMenuCircle()}</div>
        </div>
        <Skeleton variant="rect" animation="wave" className="loader-data1"/>
        <Skeleton variant="rect" animation="wave" className="loader-data2"/>
        <Skeleton variant="rect" animation="wave" className="loader-divider"/>
        {getFooter('35%', '25%')}
        {getFooter('45%', '15%')}
        {getFooter('25%', '30%')}
        <div className="last-space"/>
      </>);

      return (
        <Grid className="loader" container spacing={2} justify="flex-start">
          <Grid item xs={12}>
            <div className="loader-name">
              <Skeleton variant="rect" animation="wave" className="loader-text"/>
              <Skeleton variant="circle" animation="wave" height={25} width={25}/>
            </div>
          </Grid>
          {Array(5).fill('loader').map((value, index) =>
            <Grid key={`${value}-${index}`} item xs={12} sm={6} md={4} lg={3} xl={2}>{getLoader()}</Grid>)}
        </Grid>
      );
    }

    return (
      <>
        <EditableField value={name} placeholder="Nombre del Presupuesto" onChange={changeQuotationName}/>
        <MenuGrid/>
        {id && <div className="quotation-folio">El folio generado para este presupuesto es: <b>{id}</b></div>}
      </>
    );
  };

  return (
    <div id="quotation-edit-content">
      <QuotationEditToolbar/>
      <div className="content">{getContent()}</div>
      <QuotationNotify/>
      <QuotationCompleteButton/>
    </div>
  );
};

export default React.memo(QuotationEditContent);