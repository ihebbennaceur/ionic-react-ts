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
import DoctorTabs from './pages/DoctorTabs';
import ReceptionistTabs from './pages/ReceptionistTabs';
import AdminTabs from './pages/AdminTabs';


const Router: React.FC = () => (
  <IonReactRouter>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/" render={() => <Redirect to="/login" />} />
    
    {/* Interface Patient */}
    <Route path="/tabs" component={MainTabs} />
    
    {/* Interface Médecin */}
    <Route path="/doctor-tabs" component={DoctorTabs} />
    
    {/* Interface Réceptionniste */}
    <Route path="/receptionist-tabs" component={ReceptionistTabs} />
    
    {/* Interface Admin */}
    <Route path="/admin-tabs" component={AdminTabs} />
  </IonReactRouter>
);

export default Router;