import React from "react";
import { IonFooter, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from "@ionic/react";
import { homeOutline, personOutline, settingsOutline } from "ionicons/icons";

export default function FooterMenu() {
  return (
    <IonFooter>
      <IonToolbar
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          background: "#f8fafc",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        {/* Bouton Home */}
        <IonButtons>
          <IonButton routerLink="/home" fill="clear">
            <IonIcon icon={homeOutline} slot="icon-only" color="primary" />
          </IonButton>
        </IonButtons>

        {/* Bouton Profil */}
        <IonButtons>
          <IonButton routerLink="/profile" fill="clear">
            <IonIcon icon={personOutline} slot="icon-only" color="primary" />
          </IonButton>
        </IonButtons>

        {/* Bouton Paramètres */}
        <IonButtons>
          <IonButton routerLink="/settings" fill="clear">
            <IonIcon icon={settingsOutline} slot="icon-only" color="primary" />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonFooter>
  );
}
