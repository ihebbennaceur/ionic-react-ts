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
  IonButton,
  IonButtons,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonTextarea,
  IonDatetime,
  IonBadge,
  IonChip,
  IonSegment,
  IonSegmentButton,
  IonModal,
  IonAlert,
  IonToast,
  IonRefresher,
  IonRefresherContent,
  IonFab,
  IonFabButton,
  IonAvatar,
  IonNote,
  IonCheckbox
} from "@ionic/react";
import {
  addOutline,
  searchOutline,
  filterOutline,
  calendarOutline,
  timeOutline,
  personOutline,
  medkitOutline,
  callOutline,
  createOutline,
  trashOutline,
  checkmarkOutline,
  closeOutline,
  alertCircleOutline,
  informationCircleOutline,
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

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar?: string;
  isAvailable: boolean;
  nextAvailableSlot?: string;
}

interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  isNewPatient: boolean;
}

const AppointmentManagement: React.FC = () => {
  const history = useHistory();
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [searchText, setSearchText] = useState('');
  const [filterDoctor, setFilterDoctor] = useState<string>('');
  const [filterDate, setFilterDate] = useState<string>('');
  const [isNewAppointmentModal, setIsNewAppointmentModal] = useState(false);
  const [isEditAppointmentModal, setIsEditAppointmentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Données fictives
  const doctors: Doctor[] = [
    {
      id: "doc1",
      name: "Dr. Marie Dupont",
      specialty: "Cardiologie",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      isAvailable: true,
      nextAvailableSlot: "2024-10-22T09:00:00"
    },
    {
      id: "doc2",
      name: "Dr. Jean Martin",
      specialty: "Médecine générale",
      avatar: "https://randomuser.me/api/portraits/men/50.jpg",
      isAvailable: true,
      nextAvailableSlot: "2024-10-22T10:30:00"
    },
    {
      id: "doc3",
      name: "Dr. Sarah Leroy",
      specialty: "Pédiatrie",
      avatar: "https://randomuser.me/api/portraits/women/38.jpg",
      isAvailable: false
    }
  ];

  const patients: Patient[] = [
    {
      id: "pat1",
      name: "Pierre Durand",
      phone: "+33 6 12 34 56 78",
      email: "pierre.durand@email.com",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      isNewPatient: false
    },
    {
      id: "pat2",
      name: "Marie Moreau",
      phone: "+33 6 87 65 43 21",
      email: "marie.moreau@email.com",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      isNewPatient: true
    },
    {
      id: "pat3",
      name: "Sophie Bernard",
      phone: "+33 6 55 44 33 22",
      email: "sophie.bernard@email.com",
      isNewPatient: false
    }
  ];

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "apt1",
      patientId: "pat1",
      patientName: "Pierre Durand",
      patientPhone: "+33 6 12 34 56 78",
      patientEmail: "pierre.durand@email.com",
      doctorId: "doc1",
      doctorName: "Dr. Marie Dupont",
      date: "2024-10-22",
      time: "09:00",
      duration: 30,
      type: "Consultation",
      status: "confirmed",
      reason: "Contrôle cardiologique",
      isFirstVisit: false,
      createdBy: "Sophie Martin",
      createdAt: "2024-10-21T08:30:00",
      priority: "normal"
    },
    {
      id: "apt2",
      patientId: "pat2",
      patientName: "Marie Moreau",
      patientPhone: "+33 6 87 65 43 21",
      doctorId: "doc2",
      doctorName: "Dr. Jean Martin",
      date: "2024-10-22",
      time: "10:30",
      duration: 45,
      type: "Première consultation",
      status: "scheduled",
      reason: "Douleurs abdominales",
      isFirstVisit: true,
      createdBy: "Sophie Martin",
      createdAt: "2024-10-21T09:15:00",
      priority: "urgent"
    },
    {
      id: "apt3",
      patientId: "pat3",
      patientName: "Sophie Bernard",
      patientPhone: "+33 6 55 44 33 22",
      doctorId: "doc1",
      doctorName: "Dr. Marie Dupont",
      date: "2024-10-21",
      time: "15:30",
      duration: 30,
      type: "Consultation",
      status: "completed",
      reason: "Suivi hypertension",
      isFirstVisit: false,
      createdBy: "Sophie Martin",
      createdAt: "2024-10-20T14:00:00",
      priority: "normal"
    }
  ]);

  // Charger les rendez-vous depuis localStorage au démarrage
  useEffect(() => {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    }
  }, []);

  const [newAppointment, setNewAppointment] = useState({
    patientId: '',
    doctorId: '',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    duration: 30,
    type: 'Consultation',
    reason: '',
    notes: '',
    priority: 'normal' as 'low' | 'normal' | 'urgent'
  });

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'danger';
      case 'normal': return 'primary';
      case 'low': return 'medium';
      default: return 'medium';
    }
  };

  const getFilteredAppointments = () => {
    let filtered = appointments;

    // Exclure les rendez-vous confirmés pour le réceptionniste
    filtered = filtered.filter(apt => apt.status !== 'confirmed');

    // Filtre par segment
    if (selectedSegment !== 'all') {
      filtered = filtered.filter(apt => apt.status === selectedSegment);
    }

    // Filtre par recherche
    if (searchText) {
      filtered = filtered.filter(apt =>
        apt.patientName.toLowerCase().includes(searchText.toLowerCase()) ||
        apt.doctorName.toLowerCase().includes(searchText.toLowerCase()) ||
        apt.reason.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filtre par médecin
    if (filterDoctor) {
      filtered = filtered.filter(apt => apt.doctorId === filterDoctor);
    }

    // Filtre par date
    if (filterDate) {
      filtered = filtered.filter(apt => apt.date === filterDate);
    }

    return filtered.sort((a, b) => new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime());
  };

  const createAppointment = () => {
    if (!newAppointment.patientId || !newAppointment.doctorId || !newAppointment.reason) {
      setToastMessage('Veuillez remplir tous les champs obligatoires');
      setShowSuccessToast(true);
      return;
    }

    const patient = patients.find(p => p.id === newAppointment.patientId);
    const doctor = doctors.find(d => d.id === newAppointment.doctorId);

    if (!patient || !doctor) return;

    const appointment: Appointment = {
      id: Date.now().toString(),
      patientId: newAppointment.patientId,
      patientName: patient.name,
      patientPhone: patient.phone,
      patientEmail: patient.email,
      doctorId: newAppointment.doctorId,
      doctorName: doctor.name,
      date: newAppointment.date,
      time: newAppointment.time,
      duration: newAppointment.duration,
      type: newAppointment.type,
      status: 'scheduled',
      reason: newAppointment.reason,
      notes: newAppointment.notes,
      isFirstVisit: patient.isNewPatient,
      createdBy: 'Sophie Martin',
      createdAt: new Date().toISOString(),
      priority: newAppointment.priority
    };

    setAppointments([...appointments, appointment]);
    
    // Sauvegarder dans localStorage pour que le médecin puisse voir le RDV
    const existingAppointments = localStorage.getItem('appointments');
    let allAppointments = [];
    
    if (existingAppointments) {
      allAppointments = JSON.parse(existingAppointments);
    }
    
    allAppointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(allAppointments));
    
    setIsNewAppointmentModal(false);
    setToastMessage('Rendez-vous créé avec succès et ajouté à l\'agenda du médecin');
    setShowSuccessToast(true);

    // Reset form
    setNewAppointment({
      patientId: '',
      doctorId: '',
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
      duration: 30,
      type: 'Consultation',
      reason: '',
      notes: '',
      priority: 'normal'
    });
  };

  const editAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsEditAppointmentModal(true);
  };

  const deleteAppointment = (appointmentId: string) => {
    setSelectedAppointment(appointments.find(apt => apt.id === appointmentId) || null);
    setShowDeleteAlert(true);
  };

  const confirmDelete = () => {
    if (selectedAppointment) {
      setAppointments(appointments.filter(apt => apt.id !== selectedAppointment.id));
      setToastMessage('Rendez-vous supprimé');
      setShowSuccessToast(true);
      setShowDeleteAlert(false);
      setSelectedAppointment(null);
    }
  };

  const updateAppointmentStatus = (appointmentId: string, status: Appointment['status']) => {
    setAppointments(appointments.map(apt =>
      apt.id === appointmentId ? { ...apt, status } : apt
    ));
    setToastMessage(`Statut mis à jour: ${getStatusLabel(status)}`);
    setShowSuccessToast(true);
  };

  const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
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

  const filteredAppointments = getFilteredAppointments();
  const todayAppointments = appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestion des Rendez-vous</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={() => setIsNewAppointmentModal(true)}>
              <IonIcon icon={addOutline} />
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

        {/* Statistiques rapides */}
        <IonCard>
          <IonCardContent>
            <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center" }}>
              <div>
                <h2 style={{ margin: "0", color: "var(--ion-color-primary)" }}>{todayAppointments.length}</h2>
                <p style={{ margin: "0", fontSize: "0.9rem" }}>Aujourd'hui</p>
              </div>
              <div>
                <h2 style={{ margin: "0", color: "var(--ion-color-warning)" }}>
                  {todayAppointments.filter(apt => apt.status === 'scheduled').length}
                </h2>
                <p style={{ margin: "0", fontSize: "0.9rem" }}>Programmés</p>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Filtres */}
        <IonCard>
          <IonCardContent>
            <IonSearchbar
              value={searchText}
              onIonInput={e => setSearchText(e.detail.value!)}
              placeholder="Rechercher par patient, médecin ou motif..."
              showClearButton="focus"
            />
            
            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              <IonSelect
                value={filterDoctor}
                placeholder="Médecin"
                onIonChange={e => setFilterDoctor(e.detail.value)}
                style={{ maxWidth: "150px" }}
              >
                <IonSelectOption value="">Tous les médecins</IonSelectOption>
                {doctors.map(doctor => (
                  <IonSelectOption key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </IonSelectOption>
                ))}
              </IonSelect>

              <IonInput
                type="date"
                value={filterDate}
                placeholder="Date"
                onIonInput={e => setFilterDate(e.detail.value!)}
                style={{ maxWidth: "150px" }}
              />
            </div>

            <IonSegment 
              value={selectedSegment} 
              onIonChange={e => setSelectedSegment(e.detail.value as string)}
              style={{ marginTop: "8px" }}
            >
              <IonSegmentButton value="all">
                <IonLabel>Tous</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="scheduled">
                <IonLabel>Programmés</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="completed">
                <IonLabel>Terminés</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonCardContent>
        </IonCard>

        {/* Liste des rendez-vous */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              Rendez-vous ({filteredAppointments.length})
            </IonCardTitle>
          </IonCardHeader>
          
          <IonList>
            {filteredAppointments.map(appointment => (
              <IonItem key={appointment.id} button onClick={() => editAppointment(appointment)}>
                <IonIcon icon={calendarOutline} slot="start" />
                
                <IonLabel>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <h2 style={{ fontWeight: "bold", margin: "0 0 4px 0" }}>
                        {appointment.patientName}
                      </h2>
                      <h3 style={{ color: "var(--ion-color-primary)", margin: "0 0 4px 0" }}>
                        {appointment.doctorName}
                      </h3>
                      <p style={{ margin: "0 0 4px 0", fontSize: "0.9rem" }}>
                        <IonIcon icon={timeOutline} style={{ marginRight: "4px" }} />
                        {new Date(appointment.date).toLocaleDateString('fr-FR')} à {appointment.time}
                      </p>
                      <p style={{ margin: "0 0 8px 0", fontSize: "0.9rem" }}>
                        {appointment.reason}
                      </p>
                      
                      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                        <IonChip color={getStatusColor(appointment.status)} style={{ fontSize: "0.8rem" }}>
                          {getStatusLabel(appointment.status)}
                        </IonChip>
                        
                        {appointment.priority === 'urgent' && (
                          <IonChip color="danger" style={{ fontSize: "0.8rem" }}>
                            <IonIcon icon={alertCircleOutline} />
                            <IonLabel>Urgent</IonLabel>
                          </IonChip>
                        )}
                        
                        {appointment.isFirstVisit && (
                          <IonChip color="tertiary" style={{ fontSize: "0.8rem" }}>
                            Première visite
                          </IonChip>
                        )}
                      </div>
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "center" }}>
                      <IonButton
                        fill="clear"
                        size="small"
                        color="danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteAppointment(appointment.id);
                        }}
                      >
                        <IonIcon icon={trashOutline} />
                      </IonButton>
                    </div>
                  </div>
                </IonLabel>
              </IonItem>
            ))}
            
            {filteredAppointments.length === 0 && (
              <IonItem>
                <IonLabel style={{ textAlign: "center", color: "var(--ion-color-medium)" }}>
                  Aucun rendez-vous trouvé
                </IonLabel>
              </IonItem>
            )}
          </IonList>
        </IonCard>

        {/* FAB pour nouveau RDV */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setIsNewAppointmentModal(true)}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>

        {/* Modal nouveau rendez-vous */}
        <IonModal isOpen={isNewAppointmentModal} onDidDismiss={() => setIsNewAppointmentModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Nouveau Rendez-vous</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsNewAppointmentModal(false)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div style={{ padding: "1rem" }}>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Patient *</IonLabel>
                  <IonSelect
                    value={newAppointment.patientId}
                    placeholder="Sélectionner un patient"
                    onIonChange={e => setNewAppointment({...newAppointment, patientId: e.detail.value})}
                  >
                    {patients.map(patient => (
                      <IonSelectOption key={patient.id} value={patient.id}>
                        {patient.name} {patient.isNewPatient ? '(Nouveau)' : ''}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Médecin *</IonLabel>
                  <IonSelect
                    value={newAppointment.doctorId}
                    placeholder="Sélectionner un médecin"
                    onIonChange={e => setNewAppointment({...newAppointment, doctorId: e.detail.value})}
                  >
                    {doctors.filter(doc => doc.isAvailable).map(doctor => (
                      <IonSelectOption key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialty}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Date *</IonLabel>
                  <IonInput
                    type="date"
                    value={newAppointment.date}
                    onIonInput={e => setNewAppointment({...newAppointment, date: e.detail.value!})}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Heure *</IonLabel>
                  <IonInput
                    type="time"
                    value={newAppointment.time}
                    onIonInput={e => setNewAppointment({...newAppointment, time: e.detail.value!})}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Type de consultation</IonLabel>
                  <IonSelect
                    value={newAppointment.type}
                    onIonChange={e => setNewAppointment({...newAppointment, type: e.detail.value})}
                  >
                    <IonSelectOption value="Consultation">Consultation</IonSelectOption>
                    <IonSelectOption value="Première consultation">Première consultation</IonSelectOption>
                    <IonSelectOption value="Contrôle">Contrôle</IonSelectOption>
                    <IonSelectOption value="Urgence">Urgence</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Durée (minutes)</IonLabel>
                  <IonSelect
                    value={newAppointment.duration}
                    onIonChange={e => setNewAppointment({...newAppointment, duration: e.detail.value})}
                  >
                    <IonSelectOption value={15}>15 min</IonSelectOption>
                    <IonSelectOption value={30}>30 min</IonSelectOption>
                    <IonSelectOption value={45}>45 min</IonSelectOption>
                    <IonSelectOption value={60}>60 min</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Priorité</IonLabel>
                  <IonSelect
                    value={newAppointment.priority}
                    onIonChange={e => setNewAppointment({...newAppointment, priority: e.detail.value})}
                  >
                    <IonSelectOption value="low">Basse</IonSelectOption>
                    <IonSelectOption value="normal">Normale</IonSelectOption>
                    <IonSelectOption value="urgent">Urgente</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Motif de consultation *</IonLabel>
                  <IonTextarea
                    value={newAppointment.reason}
                    placeholder="Décrivez le motif de la consultation..."
                    rows={3}
                    onIonInput={e => setNewAppointment({...newAppointment, reason: e.detail.value!})}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Notes (optionnel)</IonLabel>
                  <IonTextarea
                    value={newAppointment.notes}
                    placeholder="Notes additionnelles..."
                    rows={2}
                    onIonInput={e => setNewAppointment({...newAppointment, notes: e.detail.value!})}
                  />
                </IonItem>
              </IonList>

              <IonButton expand="block" onClick={createAppointment} style={{ marginTop: "1rem" }}>
                <IonIcon icon={checkmarkOutline} slot="start" />
                Créer le rendez-vous
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        {/* Alert de suppression */}
        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header="Supprimer le rendez-vous"
          message={`Voulez-vous vraiment supprimer le rendez-vous de ${selectedAppointment?.patientName} ?`}
          buttons={[
            {
              text: 'Annuler',
              role: 'cancel'
            },
            {
              text: 'Supprimer',
              handler: confirmDelete
            }
          ]}
        />

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

export default AppointmentManagement;