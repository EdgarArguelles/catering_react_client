import './Router.scss';
import React, {lazy, Suspense} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';
import History from 'app/router/History';

const Home = lazy(() => import('app/features/quotations/home/Home'));
const QuotationEdit = lazy(() => import('app/features/quotations/quotation/quotation_edit/QuotationEdit.react'));
const QuotationList = lazy(() => import('app/features/quotations/quotation/quotation_list/QuotationList'));
const MenuEdit = lazy(() => import('app/features/quotations/menu/menu_edit/MenuEdit'));
const DishList = lazy(() => import('app/features/quotations/dish/dish_list/DishList'));
const QuotationView = lazy(() => import('app/features/quotations/quotation/quotation_view/QuotationView.react'));

class RedirectHome extends React.Component {
  static propTypes = {};

  componentWillMount() {
    History.navigate('/presupuestos');
  }

  render() {
    return null;
  }
}

export default class Router extends React.Component {
  static propTypes = {
    isMenuSelected: PropTypes.bool.isRequired,
  };

  validateMenu = component => {
    const {isMenuSelected} = this.props;

    return isMenuSelected ? component : RedirectHome;
  };

  render() {
    return (
      <main id="quotations-router">
        <Suspense fallback={<div>Cargando...</div>}>
          <Switch>
            <Route exact path="/presupuestos" component={Home}/>
            <Route path="/presupuestos/editar" component={QuotationEdit}/>
            <Route path="/presupuestos/todos" component={QuotationList}/>
            <Route path="/presupuestos/menu/editar" component={this.validateMenu(MenuEdit)}/>
            <Route path="/presupuestos/platillos" component={this.validateMenu(DishList)}/>
            <Route path="/presupuestos/menu/ver" component={MenuEdit}/>
            <Route path="/presupuestos/ver/:id" component={QuotationView}/>
          </Switch>
        </Suspense>
      </main>
    );
  }
}