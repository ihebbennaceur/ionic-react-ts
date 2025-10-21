import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { IonApp, IonRouterOutlet, setupIonicReact  } from '@ionic/react';
import { IonPage, IonContent, IonTabs } from '@ionic/react';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/Profile';
import RDV_patiant from './pages/Rendezvous_patiant';
import MainTabs from './pages/MainTabs';


const Router: React.FC = () => (
  <IonReactRouter>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/" render={() => <Redirect to="/tabs/home" />} />
    
    <Route path="/tabs" component={MainTabs} />
  </IonReactRouter>
);

export default Router;