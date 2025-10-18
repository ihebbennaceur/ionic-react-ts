import React from "react";
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { homeOutline, personOutline, settingsOutline } from "ionicons/icons";

export default function FooterMenu() {
  return (
    <IonTabBar slot="bottom">
  <IonTabButton tab="home" href="/home">
        <IonIcon icon={homeOutline} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
  <IonTabButton tab="profile" href="/profile">
        <IonIcon icon={personOutline} />
        <IonLabel>Profil</IonLabel>
      </IonTabButton>
  <IonTabButton tab="settings" href="/settings">
        <IonIcon icon={settingsOutline} />
        <IonLabel>Paramètres</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
}
