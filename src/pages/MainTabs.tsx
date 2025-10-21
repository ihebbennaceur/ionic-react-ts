import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { homeOutline, personOutline, calendarOutline } from "ionicons/icons";
import Home from "./Home";
import UserProfile from "./Profile";
import RDV_patiant from "./Rendezvous_patiant";

export default function MainTabs() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/home" component={Home} />
        <Route exact path="/tabs/profile" component={UserProfile} />
        <Route exact path="/tabs/rendez-vous" component={RDV_patiant} />
        <Route exact path="/tabs" render={() => <Redirect to="/tabs/home" />} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/tabs/home">
          <IonIcon icon={homeOutline} />
          <IonLabel>Accueil</IonLabel>
        </IonTabButton>
        <IonTabButton tab="rendezvous" href="/tabs/rendez-vous">
          <IonIcon icon={calendarOutline} />
          <IonLabel>Rendez-vous</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/tabs/profile">
          <IonIcon icon={personOutline} />
          <IonLabel>Profil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}