import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

const ErrorElement: React.FC = () => <div>Une erreur est survenue.</div>;

const Router: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route component={ErrorElement} />
        </Switch>
    </BrowserRouter>
);

<Route exact path="/register" component={Register} />

export default Router;