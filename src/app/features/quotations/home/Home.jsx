import './Home.scss';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {isQuotationStarted} from 'app/features/quotations/quotation/Quotation.service';
import CreateQuotation from './action/create_quotation/CreateQuotation';
import EditQuotation from './action/edit_quotation/EditQuotation';
import MyQuotations from './action/my_quotations/MyQuotations';
import NavigationActions from 'app/features/quotations/header/navigation/NavigationActions';

const Home = () => {
  const dispatch = useDispatch();
  const quotation = useSelector(state => state.quotations.quotation);
  const isStarted = isQuotationStarted(quotation);
  const smSize = isStarted ? 4 : 6;
  const className = isStarted ? 'three-actions' : 'two-actions';
  useEffect(() => {
    dispatch(NavigationActions.changeNavigation('/presupuestos'));
  }, [dispatch]);

  return (
    <div id="quotations-home">
      <Grid container spacing={2} justify="center" alignItems="center" className={`container ${className}`}>
        <Grid item xs={12} sm={smSize} className="item"><MyQuotations/></Grid>
        <Grid item xs={12} sm={smSize} className="item"><CreateQuotation/></Grid>
        {isStarted && <Grid item xs={12} sm={smSize} className="item"><EditQuotation/></Grid>}
      </Grid>
    </div>
  );
};

export default React.memo(Home);