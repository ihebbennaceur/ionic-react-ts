import React from "react";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";
import {
  personOutline,
  calendarOutline,
  peopleOutline,
  medkitOutline
} from "ionicons/icons";

import ReceptionistProfile from "./ReceptionistProfile";
import AppointmentManagement from "./AppointmentManagement";
import DoctorManagement from "./DoctorManagement";
import PatientManagement from "./PatientManagement";

const ReceptionistTabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/receptionist-tabs/profile">
          <ReceptionistProfile />
        </Route>
        <Route exact path="/receptionist-tabs/appointments">
          <AppointmentManagement />
        </Route>
        <Route exact path="/receptionist-tabs/doctors">
          <DoctorManagement />
        </Route>
        <Route exact path="/receptionist-tabs/patients">
          <PatientManagement />
        </Route>
        <Route exact path="/receptionist-tabs">
          <ReceptionistProfile />
        </Route>
      </IonRouterOutlet>
      
      <IonTabBar slot="bottom">
        <IonTabButton tab="profile" href="/receptionist-tabs/profile">
          <IonIcon aria-hidden="true" icon={personOutline} />
          <IonLabel>Profil</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="appointments" href="/receptionist-tabs/appointments">
          <IonIcon aria-hidden="true" icon={calendarOutline} />
          <IonLabel>Rendez-vous</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="doctors" href="/receptionist-tabs/doctors">
          <IonIcon aria-hidden="true" icon={medkitOutline} />
          <IonLabel>Médecins</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="patients" href="/receptionist-tabs/patients">
          <IonIcon aria-hidden="true" icon={peopleOutline} />
          <IonLabel>Patients</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default ReceptionistTabs;