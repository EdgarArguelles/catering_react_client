import React, {lazy, Suspense} from 'react';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import History from './History';
import pingServer from '../features/PingServer';

const Home = lazy(() => import('../features/home/Layout.react'));
const Quotations = lazy(() => import('../features/quotations/Layout.react'));

export default (
  <Router history={History}>
    <Suspense fallback={<div>Cargando...</div>}>
      <Switch>
        <Route exact path="/" component={pingServer(Home)}/>
        <Route path="/presupuestos" component={pingServer(Quotations)}/>
        <Redirect to="/"/>
      </Switch>
    </Suspense>
  </Router>
);