import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { 
  calendarOutline, 
  personOutline, 
  medkitOutline
} from "ionicons/icons";
import DoctorAgenda from "./DoctorAgenda";
import DoctorProfile from "./DoctorProfile";
import DoctorConsultation from "./DoctorConsultation";

export default function DoctorTabs() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/doctor-tabs/agenda" component={DoctorAgenda} />
        <Route exact path="/doctor-tabs/consultation" component={DoctorConsultation} />
        <Route exact path="/doctor-tabs/profile" component={DoctorProfile} />
        <Route exact path="/doctor-tabs" render={() => <Redirect to="/doctor-tabs/agenda" />} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="agenda" href="/doctor-tabs/agenda">
          <IonIcon icon={calendarOutline} />
          <IonLabel>Agenda</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="consultation" href="/doctor-tabs/consultation">
          <IonIcon icon={medkitOutline} />
          <IonLabel>Consultation</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="profile" href="/doctor-tabs/profile">
          <IonIcon icon={personOutline} />
          <IonLabel>Profil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}