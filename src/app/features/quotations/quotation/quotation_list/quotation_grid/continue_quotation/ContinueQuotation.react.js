import './ContinueQuotation.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import History from 'app/router/History';
import {getEditPath, isQuotationStarted} from 'app/features/quotations/quotation/Quotation.service';

class ContinueQuotation extends React.Component {
  static propTypes = {
    quotation: PropTypes.object.isRequired,
  };

  render() {
    const {quotation} = this.props;

    if (!isQuotationStarted(quotation)) {
      return null;
    }

    return (
      <Button id="continue-quotation"
              onClick={() => History.navigate(getEditPath(quotation))}>
        <i className="fas fa-book-open" aria-hidden="true"/>
        Continuar con el presupuesto
      </Button>
    );
  }
}

const mapStateToProps = state => {
  return {
    quotation: state.quotations.quotation,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContinueQuotation);