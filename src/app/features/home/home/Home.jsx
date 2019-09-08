import './Home.scss';
import Logo from 'assets/img/logo.svg';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import History from 'app/router/History';
import Utils from 'app/common/Utils';
import {getEditPath, isQuotationStarted} from 'app/features/quotations/quotation/Quotation.service';

const Home = () => {
  const quotation = useSelector(state => state.quotations.quotation);
  const redirect = () => History.navigate(getEditPath(quotation));

  useEffect(() => {
    Utils.animateIcon('home-logo', {strokeWidth: 3, duration: 150, animation: 'delayed'});
  }, []);

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
        <Logo id="home-logo" width="300px" height="300px"/>
        <h1>Servicio de banquete para ocasiones especiales.</h1>
        {getButton()}
      </div>
    </section>
  );
};

export default React.memo(Home);