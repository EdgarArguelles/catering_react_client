import React, {lazy, Suspense} from 'react';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import {usePingServer} from 'app/common/Hooks';
import History from './History';

const Home = lazy(() => import('app/features/home/Layout'));
const Quotations = lazy(() => import('app/features/quotations/Layout'));

const pingServer = Component => () => {
  usePingServer();
  return <Component/>;
};

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