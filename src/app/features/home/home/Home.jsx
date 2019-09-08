import './Home.scss';
import React from 'react';
import {useSelector} from 'react-redux';
import History from 'app/router/History';
import {getEditPath, isQuotationStarted} from 'app/features/quotations/quotation/Quotation.service';

const Home = () => {
  const quotation = useSelector(state => state.quotations.quotation);
  const redirect = () => History.navigate(getEditPath(quotation));
  const scroll = () => {
    const element = document.getElementById('quotations');
    const offsetTop = element ? element.offsetTop - 60 : 0;
    window.scroll({top: offsetTop, left: 0, behavior: 'smooth'});
  };

  const getButton = () => {
    return isQuotationStarted(quotation) ?
      <a onClick={redirect} className="btn-get-started">Continuar con el Presupuesto</a> :
      <a className="btn-get-started" onClick={scroll}>Crea un Presupuesto</a>;
  };

  return (
    <section id="home">
      <div className="container">
        <h1>Servicio de banquete para ocasiones especiales.</h1>
        {getButton()}
      </div>
    </section>
  );
};

export default React.memo(Home);