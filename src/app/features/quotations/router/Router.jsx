import './Router.scss';
import React, {lazy, Suspense, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';
import History from 'app/router/History';

const Home = lazy(() => import('app/features/quotations/home/Home'));
const QuotationEdit = lazy(() => import('app/features/quotations/quotation/quotation_edit/QuotationEdit'));
const QuotationList = lazy(() => import('app/features/quotations/quotation/quotation_list/QuotationList'));
const MenuEdit = lazy(() => import('app/features/quotations/menu/menu_edit/MenuEdit'));
const DishList = lazy(() => import('app/features/quotations/dish/dish_list/DishList'));
const QuotationView = lazy(() => import('app/features/quotations/quotation/quotation_view/QuotationView'));

const RedirectHome = () => {
  useEffect(() => {
    History.navigate('/presupuestos');
  }, []);

  return null;
};

const Router = ({isMenuSelected}) => {
  const validateMenu = component => isMenuSelected ? component : RedirectHome;

  return (
    <main id="quotations-router">
      <Suspense fallback={<div>Cargando...</div>}>
        <Switch>
          <Route exact path="/presupuestos" component={Home}/>
          <Route path="/presupuestos/editar" component={QuotationEdit}/>
          <Route path="/presupuestos/todos" component={QuotationList}/>
          <Route path="/presupuestos/menu/editar" component={validateMenu(MenuEdit)}/>
          <Route path="/presupuestos/platillos" component={validateMenu(DishList)}/>
          <Route path="/presupuestos/menu/ver" component={MenuEdit}/>
          <Route path="/presupuestos/ver/:id" component={QuotationView}/>
        </Switch>
      </Suspense>
    </main>
  );
};

Router.propTypes = {
  isMenuSelected: PropTypes.bool.isRequired,
};

export default React.memo(Router);