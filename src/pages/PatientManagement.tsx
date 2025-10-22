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
  IonSearchbar,
  IonInput,
  IonTextarea,
  IonChip,
  IonModal,
  IonAlert,
  IonToast,
  IonRefresher,
  IonRefresherContent,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  IonNote,
  IonCheckbox,
  IonAccordion,
  IonAccordionGroup,
  IonDatetime
} from "@ionic/react";
import {
  addOutline,
  searchOutline,
  calendarOutline,
  timeOutline,
  personOutline,
  medkitOutline,
  callOutline,
  createOutline,
  trashOutline,
  closeOutline,
  informationCircleOutline,
  eyeOutline,
  mailOutline,
  locationOutline,
  idCardOutline,
  heartOutline,
  clipboardOutline,
  documentTextOutline,
  warningOutline,
  peopleOutline,
  homeOutline,
  phonePortraitOutline
} from "ionicons/icons";

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mobile?: string;
  avatar?: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  city: string;
  postalCode: string;
  nationalId: string;
  insuranceNumber: string;
  insuranceProvider: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalHistory: {
    allergies: string[];
    chronicConditions: string[];
    medications: string[];
    surgeries: string[];
    lastVisit?: string;
    notes?: string;
  };
  registrationDate: string;
  status: 'active' | 'inactive' | 'blocked';
  isNewPatient: boolean;
  totalAppointments: number;
  upcomingAppointments: number;
  lastAppointmentDate?: string;
  preferredDoctor?: string;
  bloodType?: string;
  weight?: number;
  height?: number;
}

interface Appointment {
  id: string;
  patientId: string;
  date: string;
  time: string;
  doctorName: string;
  type: string;
  status: string;
  reason: string;
  createdBy?: string;
  createdAt?: string;
}

const PatientManagement: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [isPatientDetailModal, setIsPatientDetailModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Données fictives des patients
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "pat1",
      firstName: "Pierre",
      lastName: "Durand",
      email: "pierre.durand@email.com",
      phone: "+33 1 23 45 67 89",
      mobile: "+33 6 12 34 56 78",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      dateOfBirth: "1985-05-15",
      gender: "male",
      address: "25 Rue de la Paix",
      city: "Paris",
      postalCode: "75001",
      nationalId: "1850515123456",
      insuranceNumber: "1850515123456789",
      insuranceProvider: "CPAM Paris",
      emergencyContact: {
        name: "Marie Durand",
        relationship: "Épouse",
        phone: "+33 6 87 65 43 21"
      },
      medicalHistory: {
        allergies: ["Pénicilline", "Fruits de mer"],
        chronicConditions: ["Hypertension", "Diabète type 2"],
        medications: ["Metformine 850mg", "Lisinopril 10mg"],
        surgeries: ["Appendicectomie (2010)"],
        lastVisit: "2024-09-15",
        notes: "Patient coopératif, suit bien le traitement"
      },
      registrationDate: "2020-03-15",
      status: "active",
      isNewPatient: false,
      totalAppointments: 45,
      upcomingAppointments: 2,
      lastAppointmentDate: "2024-09-15",
      preferredDoctor: "Dr. Marie Dupont",
      bloodType: "O+",
      weight: 78,
      height: 175
    },
    {
      id: "pat2",
      firstName: "Marie",
      lastName: "Moreau",
      email: "marie.moreau@email.com",
      phone: "+33 1 34 56 78 90",
      mobile: "+33 6 87 65 43 21",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      dateOfBirth: "1990-08-22",
      gender: "female",
      address: "12 Avenue des Lilas",
      city: "Lyon",
      postalCode: "69001",
      nationalId: "2900822234567",
      insuranceNumber: "2900822234567890",
      insuranceProvider: "CPAM Rhône",
      emergencyContact: {
        name: "Jean Moreau",
        relationship: "Père",
        phone: "+33 6 98 76 54 32"
      },
      medicalHistory: {
        allergies: [],
        chronicConditions: [],
        medications: [],
        surgeries: [],
        lastVisit: "2024-10-01",
        notes: "Première visite, aucun antécédent particulier"
      },
      registrationDate: "2024-10-01",
      status: "active",
      isNewPatient: true,
      totalAppointments: 1,
      upcomingAppointments: 1,
      lastAppointmentDate: "2024-10-01",
      preferredDoctor: "Dr. Jean Martin",
      bloodType: "A+",
      weight: 62,
      height: 165
    },
    {
      id: "pat3",
      firstName: "Sophie",
      lastName: "Bernard",
      email: "sophie.bernard@email.com",
      phone: "+33 1 45 67 89 01",
      mobile: "+33 6 55 44 33 22",
      avatar: "https://randomuser.me/api/portraits/women/35.jpg",
      dateOfBirth: "1988-12-10",
      gender: "female",
      address: "8 Place du Marché",
      city: "Marseille",
      postalCode: "13001",
      nationalId: "2881210345678",
      insuranceNumber: "2881210345678901",
      insuranceProvider: "CPAM Bouches-du-Rhône",
      emergencyContact: {
        name: "Paul Bernard",
        relationship: "Frère",
        phone: "+33 6 11 22 33 44"
      },
      medicalHistory: {
        allergies: ["Aspirine"],
        chronicConditions: ["Migraine chronique"],
        medications: ["Sumatriptan 50mg"],
        surgeries: [],
        lastVisit: "2024-08-20",
        notes: "Suivi régulier pour migraines"
      },
      registrationDate: "2021-06-10",
      status: "active",
      isNewPatient: false,
      totalAppointments: 28,
      upcomingAppointments: 0,
      lastAppointmentDate: "2024-08-20",
      preferredDoctor: "Dr. Sarah Leroy",
      bloodType: "B-",
      weight: 58,
      height: 162
    },
    {
      id: "pat4",
      firstName: "Thomas",
      lastName: "Petit",
      email: "thomas.petit@email.com",
      phone: "+33 1 56 78 90 12",
      mobile: "+33 6 33 44 55 66",
      dateOfBirth: "1975-03-08",
      gender: "male",
      address: "45 Rue Victor Hugo",
      city: "Toulouse",
      postalCode: "31000",
      nationalId: "1750308456789",
      insuranceNumber: "1750308456789012",
      insuranceProvider: "MSA",
      emergencyContact: {
        name: "Claire Petit",
        relationship: "Épouse",
        phone: "+33 6 77 88 99 00"
      },
      medicalHistory: {
        allergies: ["Iode"],
        chronicConditions: ["Arthrose du genou"],
        medications: ["Ibuprofène 400mg"],
        surgeries: ["Chirurgie du genou (2019)"],
        lastVisit: "2024-07-30",
        notes: "Suivi post-opératoire arthrose"
      },
      registrationDate: "2019-01-20",
      status: "inactive",
      isNewPatient: false,
      totalAppointments: 35,
      upcomingAppointments: 0,
      lastAppointmentDate: "2024-07-30",
      preferredDoctor: "Dr. Thomas Dubois",
      bloodType: "AB+",
      weight: 85,
      height: 180
    }
  ]);

  // Appointments dynamiques récupérés depuis localStorage
  const getPatientAppointments = (patientId: string): Appointment[] => {
    try {
      const storedAppointments = localStorage.getItem('appointments');
      if (storedAppointments) {
        const allAppointments: Appointment[] = JSON.parse(storedAppointments);
        return allAppointments.filter(apt => apt.patientId === patientId)
          .sort((a, b) => new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime());
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous:', error);
    }

    // Données par défaut si pas de localStorage ou erreur
    const appointments: { [key: string]: Appointment[] } = {
      "pat1": [
        {
          id: "apt1",
          patientId: "pat1",
          date: "2024-09-15",
          time: "09:00",
          doctorName: "Dr. Marie Dupont",
          type: "Contrôle",
          status: "completed",
          reason: "Contrôle diabète et hypertension",
          createdBy: "Réceptionniste",
          createdAt: "2024-09-10T08:00:00"
        },
        {
          id: "apt2",
          patientId: "pat1",
          date: "2024-10-22",
          time: "09:00",
          doctorName: "Dr. Marie Dupont",
          type: "Consultation",
          status: "confirmed",
          reason: "Contrôle cardiologique",
          createdBy: "Réceptionniste",
          createdAt: "2024-10-15T14:30:00"
        },
        {
          id: "apt3",
          patientId: "pat1",
          date: "2024-11-15",
          time: "10:30",
          doctorName: "Dr. Marie Dupont",
          type: "Contrôle",
          status: "scheduled",
          reason: "Suivi diabète",
          createdBy: "Réceptionniste",
          createdAt: "2024-10-20T16:00:00"
        }
      ],
      "pat2": [
        {
          id: "apt4",
          patientId: "pat2",
          date: "2024-10-01",
          time: "14:30",
          doctorName: "Dr. Jean Martin",
          type: "Première consultation",
          status: "completed",
          reason: "Douleurs abdominales",
          createdBy: "Réceptionniste",
          createdAt: "2024-09-25T10:00:00"
        },
        {
          id: "apt5",
          patientId: "pat2",
          date: "2024-10-22",
          time: "10:30",
          doctorName: "Dr. Jean Martin",
          type: "Consultation",
          status: "scheduled",
          reason: "Résultats analyses",
          createdBy: "Réceptionniste",
          createdAt: "2024-10-15T11:30:00"
        }
      ],
      "pat3": [
        {
          id: "apt6",
          patientId: "pat3",
          date: "2024-08-20",
          time: "15:30",
          doctorName: "Dr. Sarah Leroy",
          type: "Consultation",
          status: "completed",
          reason: "Crise de migraine",
          createdBy: "Réceptionniste",
          createdAt: "2024-08-15T09:15:00"
        }
      ]
    };
    
    return appointments[patientId] || [];
  };

  const insuranceProviders = Array.from(new Set(patients.map(p => p.insuranceProvider)));

  const getAgeFromBirthDate = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const getFilteredPatients = () => {
    let filtered = patients;

    // Filtre par recherche uniquement
    if (searchText) {
      filtered = filtered.filter(patient =>
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchText.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchText.toLowerCase()) ||
        patient.phone.includes(searchText) ||
        patient.nationalId.includes(searchText)
      );
    }

    return filtered.sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`));
  };

  const viewPatientDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsPatientDetailModal(true);
  };

  const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  const filteredPatients = getFilteredPatients();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestion des Patients</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {/* Statistiques rapides */}
        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="12" style={{ textAlign: "center" }}>
                  <h2 style={{ margin: "0", color: "var(--ion-color-primary)" }}>{patients.length}</h2>
                  <p style={{ margin: "0", fontSize: "0.8rem" }}>Total patients</p>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Filtres */}
        <IonCard>
          <IonCardContent>
            <IonSearchbar
              value={searchText}
              onIonInput={e => setSearchText(e.detail.value!)}
              placeholder="Rechercher par nom, email, téléphone ou n° sécurité sociale..."
              showClearButton="focus"
            />
          </IonCardContent>
        </IonCard>

        {/* Liste des patients */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              Patients ({filteredPatients.length})
            </IonCardTitle>
          </IonCardHeader>
          
          <IonList>
            {filteredPatients.map(patient => (
              <IonItem key={patient.id} button onClick={() => viewPatientDetails(patient)}>
                <IonAvatar slot="start">
                  <img src={patient.avatar || "https://ionicframework.com/docs/img/demos/avatar.svg"} alt="Avatar" />
                </IonAvatar>
                
                <IonLabel>
                  <h2 style={{ fontWeight: "bold", margin: "0 0 4px 0" }}>
                    {patient.firstName} {patient.lastName}
                  </h2>
                  <h3 style={{ color: "var(--ion-color-primary)", margin: "0 0 4px 0" }}>
                    {getAgeFromBirthDate(patient.dateOfBirth)} ans • {patient.gender === 'male' ? 'Homme' : patient.gender === 'female' ? 'Femme' : 'Autre'}
                  </h3>
                  
                  <p style={{ margin: "0 0 4px 0", fontSize: "0.9rem" }}>
                    <IonIcon icon={callOutline} style={{ marginRight: "4px" }} />
                    {patient.phone}
                    {patient.mobile && ` • ${patient.mobile}`}
                  </p>
                  
                  <p style={{ margin: "0 0 4px 0", fontSize: "0.9rem" }}>
                    <IonIcon icon={mailOutline} style={{ marginRight: "4px" }} />
                    {patient.email}
                  </p>
                  
                  {patient.lastAppointmentDate && (
                    <p style={{ margin: "0 0 4px 0", fontSize: "0.9rem" }}>
                      Dernière visite: {new Date(patient.lastAppointmentDate).toLocaleDateString('fr-FR')}
                    </p>
                  )}
                  
                  {patient.medicalHistory.allergies.length > 0 && (
                    <IonChip color="danger" style={{ fontSize: "0.8rem" }}>
                      <IonIcon icon={warningOutline} />
                      <IonLabel>Allergies</IonLabel>
                    </IonChip>
                  )}
                </IonLabel>
              </IonItem>
            ))}
            
            {filteredPatients.length === 0 && (
              <IonItem>
                <IonLabel style={{ textAlign: "center", color: "var(--ion-color-medium)" }}>
                  Aucun patient trouvé
                </IonLabel>
              </IonItem>
            )}
          </IonList>
        </IonCard>

        {/* Modal détails patient */}
        <IonModal isOpen={isPatientDetailModal} onDidDismiss={() => setIsPatientDetailModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Dossier Patient</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsPatientDetailModal(false)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {selectedPatient && (
              <div style={{ padding: "1rem" }}>
                <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                  <IonAvatar style={{ width: "80px", height: "80px", margin: "0 auto 1rem" }}>
                    <img src={selectedPatient.avatar || "https://ionicframework.com/docs/img/demos/avatar.svg"} alt="Avatar" />
                  </IonAvatar>
                  <h1>{selectedPatient.firstName} {selectedPatient.lastName}</h1>
                  <p style={{ color: "var(--ion-color-primary)", fontSize: "1.1rem" }}>
                    {getAgeFromBirthDate(selectedPatient.dateOfBirth)} ans • {selectedPatient.gender === 'male' ? 'Homme' : selectedPatient.gender === 'female' ? 'Femme' : 'Autre'}
                  </p>
                </div>

                <IonAccordionGroup>
                  {/* Informations personnelles */}
                  <IonAccordion value="personal">
                    <IonItem slot="header">
                      <IonIcon icon={personOutline} slot="start" />
                      <IonLabel>Informations personnelles</IonLabel>
                    </IonItem>
                    <div slot="content" style={{ padding: "1rem" }}>
                      <IonList>
                        <IonItem>
                          <IonIcon icon={idCardOutline} slot="start" />
                          <IonLabel>
                            <h3>N° Sécurité Sociale</h3>
                            <p>{selectedPatient.nationalId}</p>
                          </IonLabel>
                        </IonItem>
                        
                        <IonItem>
                          <IonIcon icon={calendarOutline} slot="start" />
                          <IonLabel>
                            <h3>Date de naissance</h3>
                            <p>{new Date(selectedPatient.dateOfBirth).toLocaleDateString('fr-FR')}</p>
                          </IonLabel>
                        </IonItem>
                        
                        <IonItem>
                          <IonIcon icon={mailOutline} slot="start" />
                          <IonLabel>
                            <h3>Email</h3>
                            <p>{selectedPatient.email}</p>
                          </IonLabel>
                        </IonItem>
                        
                        <IonItem>
                          <IonIcon icon={callOutline} slot="start" />
                          <IonLabel>
                            <h3>Téléphones</h3>
                            <p>{selectedPatient.phone}</p>
                            {selectedPatient.mobile && <p>Mobile: {selectedPatient.mobile}</p>}
                          </IonLabel>
                        </IonItem>
                        
                        <IonItem>
                          <IonIcon icon={homeOutline} slot="start" />
                          <IonLabel>
                            <h3>Adresse</h3>
                            <p>{selectedPatient.address}</p>
                            <p>{selectedPatient.postalCode} {selectedPatient.city}</p>
                          </IonLabel>
                        </IonItem>
                      </IonList>
                    </div>
                  </IonAccordion>

                  {/* Contact d'urgence */}
                  <IonAccordion value="emergency">
                    <IonItem slot="header">
                      <IonIcon icon={peopleOutline} slot="start" />
                      <IonLabel>Contact d'urgence</IonLabel>
                    </IonItem>
                    <div slot="content" style={{ padding: "1rem" }}>
                      <IonList>
                        <IonItem>
                          <IonLabel>
                            <h3>{selectedPatient.emergencyContact.name}</h3>
                            <p>{selectedPatient.emergencyContact.relationship}</p>
                            <p>{selectedPatient.emergencyContact.phone}</p>
                          </IonLabel>
                        </IonItem>
                      </IonList>
                    </div>
                  </IonAccordion>

                  {/* Informations médicales */}
                  <IonAccordion value="medical">
                    <IonItem slot="header">
                      <IonIcon icon={medkitOutline} slot="start" />
                      <IonLabel>Informations médicales</IonLabel>
                    </IonItem>
                    <div slot="content" style={{ padding: "1rem" }}>
                      {selectedPatient.bloodType && (
                        <IonItem>
                          <IonIcon icon={heartOutline} slot="start" />
                          <IonLabel>
                            <h3>Groupe sanguin</h3>
                            <p>{selectedPatient.bloodType}</p>
                          </IonLabel>
                        </IonItem>
                      )}
                      
                      {(selectedPatient.weight || selectedPatient.height) && (
                        <IonItem>
                          <IonIcon icon={personOutline} slot="start" />
                          <IonLabel>
                            <h3>Mensurations</h3>
                            {selectedPatient.weight && <p>Poids: {selectedPatient.weight} kg</p>}
                            {selectedPatient.height && <p>Taille: {selectedPatient.height} cm</p>}
                          </IonLabel>
                        </IonItem>
                      )}
                      
                      {selectedPatient.medicalHistory.allergies.length > 0 && (
                        <IonItem>
                          <IonIcon icon={warningOutline} slot="start" color="danger" />
                          <IonLabel>
                            <h3>Allergies</h3>
                            {selectedPatient.medicalHistory.allergies.map(allergy => (
                              <IonChip key={allergy} color="danger" style={{ margin: "2px" }}>
                                {allergy}
                              </IonChip>
                            ))}
                          </IonLabel>
                        </IonItem>
                      )}
                      
                      {selectedPatient.medicalHistory.chronicConditions.length > 0 && (
                        <IonItem>
                          <IonIcon icon={clipboardOutline} slot="start" />
                          <IonLabel>
                            <h3>Conditions chroniques</h3>
                            {selectedPatient.medicalHistory.chronicConditions.map(condition => (
                              <IonChip key={condition} color="warning" style={{ margin: "2px" }}>
                                {condition}
                              </IonChip>
                            ))}
                          </IonLabel>
                        </IonItem>
                      )}
                      
                      {selectedPatient.medicalHistory.medications.length > 0 && (
                        <IonItem>
                          <IonIcon icon={medkitOutline} slot="start" />
                          <IonLabel>
                            <h3>Médicaments actuels</h3>
                            {selectedPatient.medicalHistory.medications.map(medication => (
                              <IonChip key={medication} color="tertiary" style={{ margin: "2px" }}>
                                {medication}
                              </IonChip>
                            ))}
                          </IonLabel>
                        </IonItem>
                      )}
                      
                      {selectedPatient.medicalHistory.surgeries.length > 0 && (
                        <IonItem>
                          <IonIcon icon={medkitOutline} slot="start" />
                          <IonLabel>
                            <h3>Chirurgies</h3>
                            {selectedPatient.medicalHistory.surgeries.map(surgery => (
                              <p key={surgery}>{surgery}</p>
                            ))}
                          </IonLabel>
                        </IonItem>
                      )}
                    </div>
                  </IonAccordion>

                  {/* Historique des rendez-vous */}
                  <IonAccordion value="appointments">
                    <IonItem slot="header">
                      <IonIcon icon={calendarOutline} slot="start" />
                      <IonLabel>Historique des rendez-vous</IonLabel>
                    </IonItem>
                    <div slot="content" style={{ padding: "1rem" }}>
                      {(() => {
                        const appointments = getPatientAppointments(selectedPatient.id);
                        if (appointments.length === 0) {
                          return (
                            <div style={{ textAlign: "center", padding: "2rem" }}>
                              <IonIcon icon={calendarOutline} style={{ fontSize: "3rem", color: "var(--ion-color-medium)" }} />
                              <p style={{ color: "var(--ion-color-medium)", marginTop: "1rem" }}>
                                Aucun rendez-vous trouvé
                              </p>
                              <p style={{ fontSize: "0.9rem", color: "var(--ion-color-medium)" }}>
                                Les rendez-vous pris par le réceptionniste apparaîtront ici
                              </p>
                            </div>
                          );
                        }
                        
                        return (
                          <IonList>
                            {appointments.map(appointment => (
                              <IonCard key={appointment.id} style={{ margin: "0.5rem 0" }}>
                                <IonCardContent>
                                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                    <div style={{ flex: 1 }}>
                                      <h3 style={{ margin: "0 0 0.5rem 0", color: "var(--ion-color-primary)" }}>
                                        {appointment.doctorName}
                                      </h3>
                                      <p style={{ margin: "0 0 0.5rem 0", fontWeight: "bold" }}>
                                        {new Date(appointment.date).toLocaleDateString('fr-FR')} à {appointment.time}
                                      </p>
                                      <p style={{ margin: "0 0 0.5rem 0" }}>
                                        <strong>Motif:</strong> {appointment.reason}
                                      </p>
                                      <p style={{ margin: "0 0 0.5rem 0" }}>
                                        <strong>Type:</strong> {appointment.type}
                                      </p>
                                      
                                      {appointment.createdBy && (
                                        <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem", color: "var(--ion-color-medium)" }}>
                                          Pris par: {appointment.createdBy}
                                          {appointment.createdAt && (
                                            <span> le {new Date(appointment.createdAt).toLocaleDateString('fr-FR')} à {new Date(appointment.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                                          )}
                                        </p>
                                      )}
                                    </div>
                                    
                                    <div style={{ marginLeft: "1rem" }}>
                                      <IonChip color={
                                        appointment.status === 'completed' ? 'success' : 
                                        appointment.status === 'confirmed' ? 'primary' : 
                                        appointment.status === 'cancelled' ? 'danger' :
                                        'warning'
                                      }>
                                        {appointment.status === 'completed' ? 'Terminé' : 
                                         appointment.status === 'confirmed' ? 'Confirmé' : 
                                         appointment.status === 'cancelled' ? 'Annulé' :
                                         'Programmé'}
                                      </IonChip>
                                    </div>
                                  </div>
                                </IonCardContent>
                              </IonCard>
                            ))}
                          </IonList>
                        );
                      })()}
                    </div>
                  </IonAccordion>
                </IonAccordionGroup>
              </div>
            )}
          </IonContent>
        </IonModal>

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

export default PatientManagement;