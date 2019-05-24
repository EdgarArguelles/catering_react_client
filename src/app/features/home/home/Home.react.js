import './Home.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import History from '../../../router/History';
import {getEditPath, isQuotationStarted} from '../../quotations/quotation/Quotation.service';

class Home extends React.Component {
  static propTypes = {
    quotation: PropTypes.object.isRequired,
  };

  redirect = () => {
    const {quotation} = this.props;
    History.navigate(getEditPath(quotation));
  };

  getButton = () => {
    const {quotation} = this.props;
    return isQuotationStarted(quotation) ?
      <a onClick={this.redirect} className="btn-get-started">Continuar con el Presupuesto</a> :
      <a href="#quotations" className="btn-get-started">Crea un Presupuesto</a>;
  };

  render() {
    return (
      <section id="home">
        <div className="container">
          <h1>Bienvenido a Catering.</h1>
          <h2>Servicio de banquete para ocasiones especiales.</h2>
          {this.getButton()}
        </div>
      </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);