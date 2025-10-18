import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact  } from '@ionic/react';
import { IonPage, IonContent, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/Profile';
import FooterMenu from "./pages/FooterMenu";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path={["/home", "/profile", "/settings"]} render={() => (
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/home" component={Home} />
              <Route exact path="/profile" render={() => {
                const firstName = localStorage.getItem('firstName') || 'Prénom';
                const lastName = localStorage.getItem('lastName') || 'Nom';
                const email = localStorage.getItem('email') || 'email@example.com';
                const role = localStorage.getItem('role') || 'Patient';
                const photoUrl = localStorage.getItem('photoUrl') || undefined;
                return (
                  <UserProfile
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    role={role}
                    photoUrl={photoUrl}
                  />
                );
              }} />
              <Route exact path="/settings" render={() => (
                <IonPage>
                  <IonContent className="ion-padding">
                    <h2>Paramètres</h2>
                  </IonContent>
                </IonPage>
              )} />
            </IonRouterOutlet>
            <FooterMenu />
          </IonTabs>
        )} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
