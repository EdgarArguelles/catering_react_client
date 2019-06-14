import React, {lazy, Suspense} from 'react';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import pingServer from 'app/features/PingServer';
import History from './History';

const Home = lazy(() => import('app/features/home/Layout'));
const Quotations = lazy(() => import('app/features/quotations/Layout'));

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