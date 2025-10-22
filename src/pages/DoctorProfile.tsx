import React from "react";
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
  IonNote
} from "@ionic/react";
import { 
  medkitOutline, 
  timeOutline, 
  peopleOutline, 
  calendarOutline,
  schoolOutline,
  locationOutline,
  callOutline,
  mailOutline,
  logOutOutline
} from "ionicons/icons";

const DoctorProfile: React.FC = () => {
  // Données fictives du médecin (non-éditables)
  const doctorData = {
    firstName: "Dr. Marie",
    lastName: "Dupont",
    email: "marie.dupont@hopital.fr",
    phone: "+33 1 23 45 67 89",
    specialty: "Cardiologie",
    department: "Service de Cardiologie",
    license: "123456789",
    experience: "15 ans",
    education: "Université Paris Descartes",
    photoUrl: "https://randomuser.me/api/portraits/women/45.jpg",
    isActive: true,
    workingHours: "08:00 - 18:00",
    consultationRoom: "Bureau 205, 2ème étage"
  };

  // Statistiques du médecin
  const stats = {
    todayAppointments: 8,
    weekAppointments: 35,
    totalPatients: 245,
    completedConsultations: 1250
  };

  const handleLogout = () => {
    // Simulation de déconnexion
    console.log("Déconnexion médecin");
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
              src={doctorData.photoUrl}
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                margin: "0 auto 1rem auto",
                border: "4px solid var(--ion-color-primary)"
              }}
            />
            <IonCardTitle style={{ fontSize: "1.4rem", fontWeight: "bold" }}>
              {doctorData.firstName} {doctorData.lastName}
            </IonCardTitle>
            <IonCardSubtitle style={{ fontSize: "1.1rem", color: "var(--ion-color-primary)" }}>
              {doctorData.specialty}
            </IonCardSubtitle>
            <div style={{ marginTop: "0.5rem" }}>
              <IonBadge color={doctorData.isActive ? "success" : "medium"}>
                {doctorData.isActive ? "En service" : "Hors service"}
              </IonBadge>
            </div>
          </IonCardHeader>
        </IonCard>

        {/* Statistiques du jour */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={calendarOutline} style={{ marginRight: "8px" }} />
              Aujourd'hui
            </IonCardTitle>
          </IonCardHeader>
          <IonGrid>
            <IonRow>
              <IonCol size="6" style={{ textAlign: "center" }}>
                <h2 style={{ margin: "0", color: "var(--ion-color-primary)", fontSize: "2rem" }}>
                  {stats.todayAppointments}
                </h2>
                <p style={{ margin: "0", fontSize: "0.9rem" }}>Rendez-vous</p>
              </IonCol>
              <IonCol size="6" style={{ textAlign: "center" }}>
                <h2 style={{ margin: "0", color: "var(--ion-color-success)", fontSize: "2rem" }}>
                  {stats.weekAppointments}
                </h2>
                <p style={{ margin: "0", fontSize: "0.9rem" }}>Cette semaine</p>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>

        {/* Informations professionnelles */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={medkitOutline} style={{ marginRight: "8px" }} />
              Informations Professionnelles
            </IonCardTitle>
          </IonCardHeader>
          <IonList>
            <IonItem>
              <IonIcon icon={locationOutline} slot="start" />
              <IonLabel>
                <h3>Service</h3>
                <p>{doctorData.department}</p>
              </IonLabel>
            </IonItem>
            
            <IonItem>
              <IonIcon icon={timeOutline} slot="start" />
              <IonLabel>
                <h3>Horaires</h3>
                <p>{doctorData.workingHours}</p>
              </IonLabel>
            </IonItem>
            
            <IonItem>
              <IonIcon icon={locationOutline} slot="start" />
              <IonLabel>
                <h3>Bureau</h3>
                <p>{doctorData.consultationRoom}</p>
              </IonLabel>
            </IonItem>
            
            <IonItem>
              <IonIcon icon={schoolOutline} slot="start" />
              <IonLabel>
                <h3>Formation</h3>
                <p>{doctorData.education}</p>
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
                <p>{doctorData.email}</p>
              </IonLabel>
            </IonItem>
            
            <IonItem>
              <IonIcon icon={callOutline} slot="start" />
              <IonLabel>
                <h3>Téléphone</h3>
                <p>{doctorData.phone}</p>
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCard>

        {/* Statistiques générales */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={peopleOutline} style={{ marginRight: "8px" }} />
              Statistiques Globales
            </IonCardTitle>
          </IonCardHeader>
          <IonGrid>
            <IonRow>
              <IonCol size="6" style={{ textAlign: "center" }}>
                <h3 style={{ margin: "0", color: "var(--ion-color-tertiary)" }}>
                  {stats.totalPatients}
                </h3>
                <p style={{ margin: "0", fontSize: "0.9rem" }}>Patients suivis</p>
              </IonCol>
              <IonCol size="6" style={{ textAlign: "center" }}>
                <h3 style={{ margin: "0", color: "var(--ion-color-warning)" }}>
                  {stats.completedConsultations}
                </h3>
                <p style={{ margin: "0", fontSize: "0.9rem" }}>Consultations réalisées</p>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>

        {/* Informations système */}
        <div style={{ textAlign: "center", padding: "1rem", color: "var(--ion-color-medium)" }}>
          <p style={{ margin: "0", fontSize: "0.8rem" }}>
            MedFlow - Interface Médecin v1.0.0
          </p>
          <p style={{ margin: "0", fontSize: "0.8rem" }}>
            Licence n° {doctorData.license} • {doctorData.experience} d'expérience
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DoctorProfile;