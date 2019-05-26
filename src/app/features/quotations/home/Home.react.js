import './Home.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {isQuotationStarted} from 'app/features/quotations/quotation/Quotation.service';
import CreateQuotation from './action/create_quotation/CreateQuotation.react';
import EditQuotation from './action/edit_quotation/EditQuotation.react';
import MyQuotations from './action/my_quotations/MyQuotations.react';
import NavigationActions from 'app/features/quotations/header/navigation/NavigationActions';

class Home extends React.Component {
  static propTypes = {
    quotation: PropTypes.object.isRequired,
    changeNavigation: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const {changeNavigation} = this.props;

    changeNavigation('/presupuestos');
  }

  render() {
    const {quotation} = this.props;
    const isStarted = isQuotationStarted(quotation);
    const smSize = isStarted ? 4 : 6;
    const className = isStarted ? 'three-actions' : 'two-actions';

    return (
      <div id="quotations-home">
        <Grid container spacing={16} justify="center" alignItems="center" className={`container ${className}`}>
          <Grid item xs={12} sm={smSize} className="item"><MyQuotations/></Grid>
          <Grid item xs={12} sm={smSize} className="item"><CreateQuotation/></Grid>
          {isStarted && <Grid item xs={12} sm={smSize} className="item"><EditQuotation/></Grid>}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    quotation: state.quotations.quotation,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeNavigation: (backLink, title) => {
      dispatch(NavigationActions.changeNavigation(backLink, title));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);