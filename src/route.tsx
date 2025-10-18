import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Register from './pages/Register';

const Router: React.FC = () => (
  <IonReactRouter>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/">
      <Redirect to="/login" />
    </Route>
  </IonReactRouter>
);

export default Router;