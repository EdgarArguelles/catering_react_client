import './Router.scss';
import React, {lazy, Suspense} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';
import History from '../../../router/History';

const Home = lazy(() => import('../home/Home.react'));
const QuotationEdit = lazy(() => import('../quotation/quotation_edit/QuotationEdit.react'));
const QuotationList = lazy(() => import('../quotation/quotation_list/QuotationList.react'));
const MenuEdit = lazy(() => import('../menu/menu_edit/MenuEdit.react'));
const DishList = lazy(() => import('../dish/dish_list/DishList.react'));
const QuotationView = lazy(() => import('../quotation/quotation_view/QuotationView.react'));

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