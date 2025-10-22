import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  IonChip,
  IonRefresher,
  IonRefresherContent,
  IonAlert,
  IonToast
} from "@ionic/react";
import {
  personOutline,
  businessOutline,
  peopleOutline,
  medkitOutline,
  shieldOutline,
  settingsOutline,
  analyticsOutline,
  trendingUpOutline,
  calendarOutline,
  timeOutline,
  checkmarkCircleOutline,
  warningOutline,
  logOutOutline,
  statsChartOutline,
  documentTextOutline,
  keyOutline
} from "ionicons/icons";
import { useHistory } from "react-router-dom";

interface AdminStats {
  totalPatients: number;
  totalDoctors: number;
  totalReceptionists: number;
  totalAppointments: number;
  todayAppointments: number;
  pendingApprovals: number;
  systemAlerts: number;
  activeUsers: number;
  monthlyGrowth: {
    patients: number;
    appointments: number;
    revenue: number;
  };
}

const AdminProfile: React.FC = () => {
  const history = useHistory();
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Données fictives de l'admin
  const adminInfo = {
    firstName: "Sophie",
    lastName: "Martin",
    email: "admin@clinique.com",
    phone: "+33 1 23 45 67 89",
    role: "Administrateur Système",
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    lastLogin: "2024-10-21T08:30:00",
    permissions: ["Gestion utilisateurs", "Gestion système", "Rapports", "Configuration"],
    clinicName: "Clinique MedFlow",
    address: "123 Avenue de la Santé, 75015 Paris"
  };

  // Statistiques fictives
  const [stats, setStats] = useState<AdminStats>({
    totalPatients: 1247,
    totalDoctors: 18,
    totalReceptionists: 8,
    totalAppointments: 3456,
    todayAppointments: 45,
    pendingApprovals: 3,
    systemAlerts: 2,
    activeUsers: 23,
    monthlyGrowth: {
      patients: 12.5,
      appointments: 8.3,
      revenue: 15.7
    }
  });

  const recentActivities = [
    {
      id: "1",
      type: "user_created",
      message: "Nouveau médecin ajouté: Dr. Pierre Dubois",
      timestamp: "2024-10-21T10:15:00",
      icon: medkitOutline,
      color: "success"
    },
    {
      id: "2",
      type: "patient_registered",
      message: "15 nouveaux patients inscrits aujourd'hui",
      timestamp: "2024-10-21T09:30:00",
      icon: peopleOutline,
      color: "primary"
    },
    {
      id: "3",
      type: "system_alert",
      message: "Sauvegarde système programmée à 23:00",
      timestamp: "2024-10-21T08:00:00",
      icon: shieldOutline,
      color: "warning"
    },
    {
      id: "4",
      type: "approval_needed",
      message: "3 demandes d'approbation en attente",
      timestamp: "2024-10-20T16:45:00",
      icon: warningOutline,
      color: "danger"
    }
  ];

  const handleLogout = () => {
    setShowLogoutAlert(true);
  };

  const confirmLogout = () => {
    setToastMessage('Déconnexion réussie');
    setShowSuccessToast(true);
    setTimeout(() => {
      history.push('/login');
    }, 1000);
  };

  const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      // Simulation du rafraîchissement des données
      setStats({
        ...stats,
        activeUsers: stats.activeUsers + Math.floor(Math.random() * 3),
        todayAppointments: stats.todayAppointments + Math.floor(Math.random() * 2)
      });
      event.detail.complete();
    }, 2000);
  };

  const exportReport = () => {
    setToastMessage('Rapport exporté avec succès');
    setShowSuccessToast(true);
  };

  const manageSystemSettings = () => {
    setToastMessage('Accès aux paramètres système');
    setShowSuccessToast(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tableau de Bord Admin</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>
              <IonIcon icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {/* Profil Admin */}
        <IonCard>
          <IonCardContent>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <IonAvatar style={{ width: "80px", height: "80px" }}>
                <img src={adminInfo.avatar} alt="Admin Avatar" />
              </IonAvatar>
              <div style={{ flex: 1 }}>
                <h1 style={{ margin: "0 0 8px 0", fontSize: "1.5rem" }}>
                  {adminInfo.firstName} {adminInfo.lastName}
                </h1>
                <p style={{ margin: "0 0 4px 0", color: "var(--ion-color-primary)" }}>
                  {adminInfo.role}
                </p>
                <p style={{ margin: "0 0 4px 0", fontSize: "0.9rem" }}>
                  {adminInfo.clinicName}
                </p>
                <p style={{ margin: "0", fontSize: "0.9rem", color: "var(--ion-color-medium)" }}>
                  Dernière connexion: {new Date(adminInfo.lastLogin).toLocaleString('fr-FR')}
                </p>
              </div>
              <IonChip color="success">
                <IonIcon icon={shieldOutline} />
                <IonLabel>Admin</IonLabel>
              </IonChip>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Statistiques principales */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Vue d'ensemble</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="6" style={{ textAlign: "center" }}>
                  <div style={{ padding: "1rem", backgroundColor: "var(--ion-color-primary-tint)", borderRadius: "8px" }}>
                    <IonIcon icon={peopleOutline} style={{ fontSize: "2rem", color: "var(--ion-color-primary)" }} />
                    <h2 style={{ margin: "8px 0 4px 0", color: "var(--ion-color-primary)" }}>{stats.totalPatients}</h2>
                    <p style={{ margin: "0", fontSize: "0.9rem" }}>Patients</p>
                    <small style={{ color: "var(--ion-color-success)" }}>+{stats.monthlyGrowth.patients}% ce mois</small>
                  </div>
                </IonCol>
                <IonCol size="6" style={{ textAlign: "center" }}>
                  <div style={{ padding: "1rem", backgroundColor: "var(--ion-color-success-tint)", borderRadius: "8px" }}>
                    <IonIcon icon={medkitOutline} style={{ fontSize: "2rem", color: "var(--ion-color-success)" }} />
                    <h2 style={{ margin: "8px 0 4px 0", color: "var(--ion-color-success)" }}>{stats.totalDoctors}</h2>
                    <p style={{ margin: "0", fontSize: "0.9rem" }}>Médecins</p>
                    <small style={{ color: "var(--ion-color-success)" }}>Actifs</small>
                  </div>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6" style={{ textAlign: "center" }}>
                  <div style={{ padding: "1rem", backgroundColor: "var(--ion-color-warning-tint)", borderRadius: "8px" }}>
                    <IonIcon icon={businessOutline} style={{ fontSize: "2rem", color: "var(--ion-color-warning)" }} />
                    <h2 style={{ margin: "8px 0 4px 0", color: "var(--ion-color-warning)" }}>{stats.totalReceptionists}</h2>
                    <p style={{ margin: "0", fontSize: "0.9rem" }}>Réceptionnistes</p>
                    <small style={{ color: "var(--ion-color-success)" }}>Actifs</small>
                  </div>
                </IonCol>
                <IonCol size="6" style={{ textAlign: "center" }}>
                  <div style={{ padding: "1rem", backgroundColor: "var(--ion-color-tertiary-tint)", borderRadius: "8px" }}>
                    <IonIcon icon={calendarOutline} style={{ fontSize: "2rem", color: "var(--ion-color-tertiary)" }} />
                    <h2 style={{ margin: "8px 0 4px 0", color: "var(--ion-color-tertiary)" }}>{stats.todayAppointments}</h2>
                    <p style={{ margin: "0", fontSize: "0.9rem" }}>RDV aujourd'hui</p>
                    <small style={{ color: "var(--ion-color-success)" }}>+{stats.monthlyGrowth.appointments}% ce mois</small>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Alertes et notifications */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Alertes système</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="4" style={{ textAlign: "center" }}>
                  <div style={{ padding: "1rem" }}>
                    <IonIcon icon={warningOutline} style={{ fontSize: "1.5rem", color: "var(--ion-color-danger)" }} />
                    <h3 style={{ margin: "4px 0", color: "var(--ion-color-danger)" }}>{stats.pendingApprovals}</h3>
                    <p style={{ margin: "0", fontSize: "0.8rem" }}>En attente</p>
                  </div>
                </IonCol>
                <IonCol size="4" style={{ textAlign: "center" }}>
                  <div style={{ padding: "1rem" }}>
                    <IonIcon icon={shieldOutline} style={{ fontSize: "1.5rem", color: "var(--ion-color-warning)" }} />
                    <h3 style={{ margin: "4px 0", color: "var(--ion-color-warning)" }}>{stats.systemAlerts}</h3>
                    <p style={{ margin: "0", fontSize: "0.8rem" }}>Alertes</p>
                  </div>
                </IonCol>
                <IonCol size="4" style={{ textAlign: "center" }}>
                  <div style={{ padding: "1rem" }}>
                    <IonIcon icon={checkmarkCircleOutline} style={{ fontSize: "1.5rem", color: "var(--ion-color-success)" }} />
                    <h3 style={{ margin: "4px 0", color: "var(--ion-color-success)" }}>{stats.activeUsers}</h3>
                    <p style={{ margin: "0", fontSize: "0.8rem" }}>Utilisateurs actifs</p>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Actions rapides */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Actions rapides</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <IonButton expand="block" fill="outline" color="primary" onClick={exportReport}>
                    <IonIcon icon={documentTextOutline} slot="start" />
                    Exporter rapport
                  </IonButton>
                </IonCol>
                <IonCol size="6">
                  <IonButton expand="block" fill="outline" color="tertiary" onClick={manageSystemSettings}>
                    <IonIcon icon={settingsOutline} slot="start" />
                    Paramètres
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Activités récentes */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Activités récentes</IonCardTitle>
          </IonCardHeader>
          <IonList>
            {recentActivities.map(activity => (
              <IonItem key={activity.id}>
                <IonIcon icon={activity.icon} slot="start" color={activity.color} />
                <IonLabel>
                  <h3>{activity.message}</h3>
                  <p>{new Date(activity.timestamp).toLocaleString('fr-FR')}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonCard>

        {/* Informations admin */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Informations administrateur</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonIcon icon={personOutline} slot="start" />
                <IonLabel>
                  <h3>Email</h3>
                  <p>{adminInfo.email}</p>
                </IonLabel>
              </IonItem>
              
              <IonItem>
                <IonIcon icon={businessOutline} slot="start" />
                <IonLabel>
                  <h3>Établissement</h3>
                  <p>{adminInfo.clinicName}</p>
                  <p>{adminInfo.address}</p>
                </IonLabel>
              </IonItem>
              
              <IonItem>
                <IonIcon icon={keyOutline} slot="start" />
                <IonLabel>
                  <h3>Permissions</h3>
                  <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginTop: "4px" }}>
                    {adminInfo.permissions.map(permission => (
                      <IonChip key={permission} color="tertiary" style={{ fontSize: "0.8rem" }}>
                        {permission}
                      </IonChip>
                    ))}
                  </div>
                </IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
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

        {/* Toast */}
        <IonToast
          isOpen={showSuccessToast}
          onDidDismiss={() => setShowSuccessToast(false)}
          message={toastMessage}
          duration={3000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default AdminProfile;