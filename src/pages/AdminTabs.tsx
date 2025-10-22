import React from "react";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
import {
  personOutline,
  peopleOutline,
  medkitOutline,
  desktopOutline,
  settingsOutline
} from "ionicons/icons";

import AdminProfile from "./AdminProfile";
import AdminPatientManagement from "./AdminPatientManagement";
import AdminDoctorManagement from "./AdminDoctorManagement";
import AdminReceptionistManagement from "./AdminReceptionistManagement";

const AdminTabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/admin-tabs/profile">
          <AdminProfile />
        </Route>
        <Route exact path="/admin-tabs/patients">
          <AdminPatientManagement />
        </Route>
        <Route exact path="/admin-tabs/doctors">
          <AdminDoctorManagement />
        </Route>
        <Route exact path="/admin-tabs/receptionists">
          <AdminReceptionistManagement />
        </Route>
        <Route exact path="/admin-tabs">
          <Redirect to="/admin-tabs/profile" />
        </Route>
      </IonRouterOutlet>
      
      <IonTabBar slot="bottom">
        <IonTabButton tab="profile" href="/admin-tabs/profile">
          <IonIcon icon={personOutline} />
          <IonLabel>Tableau de bord</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="patients" href="/admin-tabs/patients">
          <IonIcon icon={peopleOutline} />
          <IonLabel>Patients</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="doctors" href="/admin-tabs/doctors">
          <IonIcon icon={medkitOutline} />
          <IonLabel>Médecins</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="receptionists" href="/admin-tabs/receptionists">
          <IonIcon icon={desktopOutline} />
          <IonLabel>Réceptionnistes</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AdminTabs;