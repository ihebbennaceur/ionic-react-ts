import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonImg,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
  IonList,
  IonNote,
  IonAlert,
  IonToast
} from "@ionic/react";
import { 
  peopleOutline, 
  timeOutline, 
  calendarOutline,
  medkitOutline,
  schoolOutline,
  locationOutline,
  callOutline,
  mailOutline,
  logOutOutline,
  checkmarkCircleOutline,
  warningOutline
} from "ionicons/icons";

const ReceptionistProfile: React.FC = () => {
  const history = useHistory();
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Données fictives du réceptionniste (non-éditables)
  const receptionistData = {
    firstName: "Sophie",
    lastName: "Martin",
    email: "sophie.martin@hopital.fr",
    phone: "+33 1 23 45 67 89",
    employeeId: "REC001",
    department: "Accueil et Secrétariat",
    startDate: "2022-03-15",
    experience: "2 ans",
    workingHours: "08:00 - 17:00",
    photoUrl: "https://randomuser.me/api/portraits/women/52.jpg",
    isActive: true,
    permissions: ["Gestion RDV", "Consultation patients", "Planning médecins"]
  };

  // Statistiques du réceptionniste
  const weeklyStats = {
    totalAppointments: 67,
    newPatients: 15,
    efficiency: 92,
    patientSatisfaction: 4.8
  };

  const handleLogout = () => {
    setShowLogoutAlert(true);
  };

  const confirmLogout = () => {
    setShowSuccessToast(true);
    setTimeout(() => {
      history.push('/login');
    }, 1000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mon Profil</IonTitle>
          <IonButton slot="end" fill="clear" onClick={handleLogout}>
            <IonIcon icon={logOutOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        {/* Carte principale du profil */}
        <IonCard>
          <IonCardHeader style={{ textAlign: "center", paddingBottom: "1rem" }}>
            <IonImg
              src={receptionistData.photoUrl}
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                margin: "0 auto 1rem auto",
                border: "4px solid var(--ion-color-tertiary)"
              }}
            />
            <IonCardTitle style={{ fontSize: "1.4rem", fontWeight: "bold" }}>
              {receptionistData.firstName} {receptionistData.lastName}
            </IonCardTitle>
            <IonCardSubtitle style={{ fontSize: "1.1rem", color: "var(--ion-color-tertiary)" }}>
              Réceptionniste
            </IonCardSubtitle>
            <div style={{ marginTop: "0.5rem" }}>
              <IonBadge color={receptionistData.isActive ? "success" : "medium"}>
                {receptionistData.isActive ? "En service" : "Hors service"}
              </IonBadge>
            </div>
          </IonCardHeader>
        </IonCard>

        {/* Informations professionnelles */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={peopleOutline} style={{ marginRight: "8px" }} />
              Informations Professionnelles
            </IonCardTitle>
          </IonCardHeader>
          <IonList>
            <IonItem>
              <IonIcon icon={medkitOutline} slot="start" />
              <IonLabel>
                <h3>Service</h3>
                <p>{receptionistData.department}</p>
              </IonLabel>
            </IonItem>
            
            <IonItem>
              <IonIcon icon={timeOutline} slot="start" />
              <IonLabel>
                <h3>Horaires</h3>
                <p>{receptionistData.workingHours}</p>
              </IonLabel>
            </IonItem>
            
            <IonItem>
              <IonIcon icon={schoolOutline} slot="start" />
              <IonLabel>
                <h3>Ancienneté</h3>
                <p>{receptionistData.experience} • Depuis {new Date(receptionistData.startDate).toLocaleDateString('fr-FR')}</p>
              </IonLabel>
            </IonItem>
            
            <IonItem>
              <IonIcon icon={checkmarkCircleOutline} slot="start" />
              <IonLabel>
                <h3>ID Employé</h3>
                <p>{receptionistData.employeeId}</p>
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCard>

        {/* Informations de contact */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Contact</IonCardTitle>
          </IonCardHeader>
          <IonList>
            <IonItem>
              <IonIcon icon={mailOutline} slot="start" />
              <IonLabel>
                <h3>Email</h3>
                <p>{receptionistData.email}</p>
              </IonLabel>
            </IonItem>
            
            <IonItem>
              <IonIcon icon={callOutline} slot="start" />
              <IonLabel>
                <h3>Téléphone</h3>
                <p>{receptionistData.phone}</p>
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCard>

        {/* Alert de déconnexion */}
        <IonAlert
          isOpen={showLogoutAlert}
          onDidDismiss={() => setShowLogoutAlert(false)}
          header="Déconnexion"
          message="Voulez-vous vraiment vous déconnecter ?"
          buttons={[
            {
              text: 'Annuler',
              role: 'cancel'
            },
            {
              text: 'Déconnexion',
              handler: confirmLogout
            }
          ]}
        />

        {/* Toast de confirmation */}
        <IonToast
          isOpen={showSuccessToast}
          onDidDismiss={() => setShowSuccessToast(false)}
          message="Déconnexion réussie"
          duration={2000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default ReceptionistProfile;