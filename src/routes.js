import React from 'react';
import { Route, Switch } from 'react-router-dom';

// components
import Home from './components/Home/Home';
import Register from './components/Register/Register';

const routes = (
    <Switch>
        <Route exact path="/" component={ Home } />
        <Route path='/register' component={ Register } />
    </Switch>
);

export default routes;