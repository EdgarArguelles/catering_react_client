import './Home.scss';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import History from 'app/router/History';
import Welcome from 'app/features/welcome/Welcome';
import {getEditPath, isQuotationStarted} from 'app/features/quotations/quotation/Quotation.service';

const Home = () => {
  const quotation = useSelector(state => state.quotations.quotation);
  const [open, setOpen] = useState(false);
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
        <div>{getButton()}</div>
        <Button className="welcome-button" size="small" onClick={() => setOpen(true)}>
          Ver tutorial de Bienvenida
        </Button>
      </div>

      <Welcome open={open} onClose={() => setOpen(false)}/>
    </section>
  );
};

export default React.memo(Home);