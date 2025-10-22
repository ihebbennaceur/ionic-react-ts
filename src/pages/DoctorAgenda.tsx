import React, { useState, useEffect } from "react";
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
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonBadge,
  IonButton,
  IonButtons,
  IonDatetime,
  IonModal,
  IonAvatar,
  IonNote,
  IonChip,
  IonSegment,
  IonSegmentButton,
  IonRefresher,
  IonRefresherContent,
  IonAlert,
  IonToast
} from "@ionic/react";
import {
  calendarOutline,
  timeOutline,
  personOutline,
  medkitOutline,
  callOutline,
  chevronForwardOutline,
  todayOutline,
  logOutOutline
} from "ionicons/icons";

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  reason: string;
  notes?: string;
  isFirstVisit: boolean;
  createdBy: string;
  createdAt: string;
  priority: 'low' | 'normal' | 'urgent';
}

const DoctorAgenda: React.FC = () => {
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString());
  const [selectedSegment, setSelectedSegment] = useState<string>('today');
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Charger les rendez-vous depuis localStorage au démarrage
  useEffect(() => {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      const allAppointments: Appointment[] = JSON.parse(storedAppointments);
      // Filtrer pour ne montrer que les RDV du médecin connecté
      // Pour l'exemple, on utilise "Dr. Marie Dupont"
      const doctorAppointments = allAppointments.filter(apt => 
        apt.doctorName === "Dr. Marie Dupont"
      );
      setAppointments(doctorAppointments);
    }
  }, []);

  // Fonction pour recharger les RDV depuis localStorage (utile après une modification)
  const reloadAppointments = () => {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      const allAppointments: Appointment[] = JSON.parse(storedAppointments);
      const doctorAppointments = allAppointments.filter(apt => 
        apt.doctorName === "Dr. Marie Dupont"
      );
      setAppointments(doctorAppointments);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'warning';
      case 'confirmed': return 'primary';
      case 'completed': return 'success';
      case 'cancelled': return 'danger';
      case 'no-show': return 'dark';
      default: return 'medium';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Programmé';
      case 'confirmed': return 'Confirmé';
      case 'completed': return 'Terminé';
      case 'cancelled': return 'Annulé';
      case 'no-show': return 'Patient absent';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatsForSegment = () => {
    const filteredAppointments = getFilteredAppointments();
    const total = filteredAppointments.length;
    const completed = filteredAppointments.filter(apt => apt.status === 'completed').length;
    const pending = filteredAppointments.filter(apt => apt.status === 'scheduled').length;
    return { total, completed, pending };
  };

  const getFilteredAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    
    if (selectedSegment === 'today') {
      // Rendez-vous d'aujourd'hui
      return appointments.filter(apt => {
        const aptDate = apt.date || today; // Si pas de date, considérer comme aujourd'hui
        return aptDate === today;
      });
    } else if (selectedSegment === 'upcoming') {
      // Rendez-vous futurs (après aujourd'hui)
      return appointments.filter(apt => {
        const aptDate = apt.date || today;
        return aptDate > today;
      });
    }
    
    return appointments;
  };

  const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      // Simulation du rafraîchissement
      event.detail.complete();
    }, 2000);
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
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

  const stats = getStatsForSegment();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mon Agenda</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={() => setIsDateModalOpen(true)}>
              <IonIcon icon={calendarOutline} />
            </IonButton>
            <IonButton fill="clear" onClick={handleLogout}>
              <IonIcon icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {/* Sélecteur de période */}
        <IonCard>
          <IonCardContent>
            <IonSegment value={selectedSegment} onIonChange={e => setSelectedSegment(e.detail.value as string)}>
              <IonSegmentButton value="today">
                <IonLabel>Aujourd'hui</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="upcoming">
                <IonLabel>Futurs RDV</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonCardContent>
        </IonCard>

        {/* Statistiques */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={todayOutline} style={{ marginRight: "8px" }} />
              {selectedSegment === 'today' ? 'Statistiques d\'aujourd\'hui' : 'Statistiques des futurs RDV'}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center" }}>
              <div>
                <h2 style={{ margin: "0", color: "var(--ion-color-primary)" }}>{stats.total}</h2>
                <p style={{ margin: "0", fontSize: "0.9rem" }}>Total RDV</p>
              </div>
              <div>
                <h2 style={{ margin: "0", color: "var(--ion-color-success)" }}>{stats.completed}</h2>
                <p style={{ margin: "0", fontSize: "0.9rem" }}>Terminés</p>
              </div>
              <div>
                <h2 style={{ margin: "0", color: "var(--ion-color-warning)" }}>{stats.pending}</h2>
                <p style={{ margin: "0", fontSize: "0.9rem" }}>En attente</p>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Liste des rendez-vous */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              {selectedSegment === 'today' ? 'Rendez-vous d\'aujourd\'hui' : 'Futurs rendez-vous'}
            </IonCardTitle>
          </IonCardHeader>
          <IonList>
            {getFilteredAppointments().length === 0 ? (
              <IonItem>
                <IonLabel>
                  <h3 style={{ textAlign: 'center', color: 'var(--ion-color-medium)' }}>
                    {selectedSegment === 'today' ? 'Aucun rendez-vous aujourd\'hui' : 'Aucun futur rendez-vous'}
                  </h3>
                </IonLabel>
              </IonItem>
            ) : (
              getFilteredAppointments().map((appointment) => (
              <IonItem 
                key={appointment.id} 
                button 
                onClick={() => handleAppointmentClick(appointment)}
              >
                <IonAvatar slot="start">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${appointment.patientName}&background=3b82f6&color=fff&size=64`} 
                    alt={appointment.patientName} 
                  />
                </IonAvatar>
                
                <IonLabel>
                  <h2 style={{ fontWeight: "bold" }}>{appointment.patientName}</h2>
                  <h3 style={{ color: "var(--ion-color-primary)" }}>
                    <IonIcon icon={timeOutline} style={{ marginRight: "4px" }} />
                    {appointment.time} ({appointment.duration}min)
                  </h3>
                  <p>{appointment.reason}</p>
                  <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                    <IonChip color={getStatusColor(appointment.status)} style={{ fontSize: "0.8rem" }}>
                      {getStatusLabel(appointment.status)}
                    </IonChip>
                    {appointment.isFirstVisit && (
                      <IonChip color="tertiary" style={{ fontSize: "0.8rem" }}>
                        Première visite
                      </IonChip>
                    )}
                  </div>
                </IonLabel>
                
                <IonIcon icon={chevronForwardOutline} slot="end" />
              </IonItem>
              ))
            )}
          </IonList>
        </IonCard>

        {/* Modal de sélection de date */}
        <IonModal isOpen={isDateModalOpen} onDidDismiss={() => setIsDateModalOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Choisir une date</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsDateModalOpen(false)}>Fermer</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonDatetime
              value={selectedDate}
              onIonChange={e => setSelectedDate(e.detail.value as string)}
              presentation="date"
              locale="fr-FR"
            />
          </IonContent>
        </IonModal>

        {/* Modal de détails du rendez-vous */}
        <IonModal isOpen={!!selectedAppointment} onDidDismiss={() => setSelectedAppointment(null)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Détails du rendez-vous</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setSelectedAppointment(null)}>Fermer</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {selectedAppointment && (
              <div style={{ padding: "1rem" }}>
                <IonCard>
                  <IonCardContent>
                    <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                      <IonAvatar style={{ width: "80px", height: "80px", margin: "0 auto 1rem auto" }}>
                        <img 
                          src={`https://ui-avatars.com/api/?name=${selectedAppointment.patientName}&background=3b82f6&color=fff&size=128`} 
                          alt={selectedAppointment.patientName} 
                        />
                      </IonAvatar>
                      <h2 style={{ margin: "0" }}>{selectedAppointment.patientName}</h2>
                      <p style={{ color: "var(--ion-color-medium)" }}>
                        {selectedAppointment.time} - {selectedAppointment.duration} minutes
                      </p>
                    </div>
                    
                    <IonList>
                      <IonItem>
                        <IonIcon icon={medkitOutline} slot="start" />
                        <IonLabel>
                          <h3>Type de consultation</h3>
                          <p>{selectedAppointment.type}</p>
                        </IonLabel>
                      </IonItem>
                      
                      <IonItem>
                        <IonIcon icon={personOutline} slot="start" />
                        <IonLabel>
                          <h3>Motif</h3>
                          <p>{selectedAppointment.reason}</p>
                        </IonLabel>
                      </IonItem>
                      
                      {selectedAppointment.patientPhone && (
                        <IonItem>
                          <IonIcon icon={callOutline} slot="start" />
                          <IonLabel>
                            <h3>Téléphone</h3>
                            <p>{selectedAppointment.patientPhone}</p>
                          </IonLabel>
                        </IonItem>
                      )}
                    </IonList>

                    <div style={{ marginTop: "1rem" }}>
                      <IonButton 
                        expand="block" 
                        fill="solid"
                        onClick={() => {
                          const currentAppointment = selectedAppointment;
                          setSelectedAppointment(null);
                          history.push('/doctor-tabs/consultation', { 
                            patient: currentAppointment,
                            mode: 'consultation' 
                          });
                        }}
                      >
                        Commencer la consultation
                      </IonButton>
                      <IonButton 
                        expand="block" 
                        fill="outline" 
                        style={{ marginTop: "8px" }}
                        onClick={() => {
                          const currentAppointment = selectedAppointment;
                          setSelectedAppointment(null);
                          history.push('/doctor-tabs/consultation', { 
                            patient: currentAppointment,
                            mode: 'dossier' 
                          });
                        }}
                      >
                        Voir le dossier patient
                      </IonButton>
                    </div>
                  </IonCardContent>
                </IonCard>
              </div>
            )}
          </IonContent>
        </IonModal>

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

export default DoctorAgenda;