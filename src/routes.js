import React from 'react';
import { Route, Switch } from 'react-router-dom';

// components
import Forums from './components/Forums/Forums';
import Forum from './components/Forums/Forum/Forum';
// import ViewThread from './components/Forums/Thread/ViewThread/ViewThread';
import Thread from './components/Forums/Thread/Thread';
import Loading from './components/Loading/Loading';

const routes = (
    <Switch>
        <Route exact path="/" component={ Forums } />
        <Route path="/loading" component={ Loading } />
        <Route path="/forum/thread" component={ Thread } />
        <Route path="/forum" component={ Forum } />
    </Switch>
);

export default routes;