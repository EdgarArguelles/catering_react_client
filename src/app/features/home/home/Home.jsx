import './Home.scss';
import React from 'react';
import {useSelector} from 'react-redux';
import History from 'app/router/History';
import {getEditPath, isQuotationStarted} from 'app/features/quotations/quotation/Quotation.service';

const Home = () => {
  const quotation = useSelector(state => state.quotations.quotation);
  const redirect = () => History.navigate(getEditPath(quotation));
  const getButton = () => {
    return isQuotationStarted(quotation) ?
      <a onClick={redirect} className="btn-get-started">Continuar con el Presupuesto</a> :
      <a href="#quotations" className="btn-get-started">Crea un Presupuesto</a>;
  };

  return (
    <section id="home">
      <div className="container">
        <h1>Bienvenido a Catering.</h1>
        <h2>Servicio de banquete para ocasiones especiales.</h2>
        {getButton()}
      </div>
    </section>
  );
};

export default React.memo(Home);