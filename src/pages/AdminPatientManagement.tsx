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
  IonSelect,
  IonSelectOption,
  IonBadge,
  IonChip,
  IonSegment,
  IonSegmentButton,
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
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonAccordion,
  IonAccordionGroup
} from "@ionic/react";
import {
  peopleOutline,
  searchOutline,
  filterOutline,
  calendarOutline,
  timeOutline,
  personOutline,
  medkitOutline,
  callOutline,
  trashOutline,
  checkmarkOutline,
  closeOutline,
  alertCircleOutline,
  informationCircleOutline,
  eyeOutline,
  mailOutline,
  locationOutline,
  idCardOutline,
  heartOutline,
  clipboardOutline,
  documentTextOutline,
  warningOutline,
  businessOutline,
  homeOutline,
  phonePortraitOutline,
  banOutline,
  checkmarkCircleOutline,
  logOutOutline
} from "ionicons/icons";
import { useHistory } from "react-router-dom";

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

const AdminPatientManagement: React.FC = () => {
  const history = useHistory();
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterInsurance, setFilterInsurance] = useState<string>('');
  const [isPatientDetailModal, setIsPatientDetailModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
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
      status: "blocked",
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

  const insuranceProviders = Array.from(new Set(patients.map(p => p.insuranceProvider)));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'warning';
      case 'blocked': return 'danger';
      default: return 'medium';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'blocked': return 'Bloqué';
      default: return status;
    }
  };

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

    // Filtre par segment
    if (selectedSegment !== 'all') {
      if (selectedSegment === 'new') {
        filtered = filtered.filter(patient => patient.isNewPatient);
      } else if (selectedSegment === 'active') {
        filtered = filtered.filter(patient => patient.status === 'active');
      } else if (selectedSegment === 'blocked') {
        filtered = filtered.filter(patient => patient.status === 'blocked');
      }
    }

    // Filtre par recherche
    if (searchText) {
      filtered = filtered.filter(patient =>
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchText.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchText.toLowerCase()) ||
        patient.phone.includes(searchText) ||
        patient.nationalId.includes(searchText)
      );
    }

    // Filtre par statut
    if (filterStatus) {
      filtered = filtered.filter(patient => patient.status === filterStatus);
    }

    // Filtre par assurance
    if (filterInsurance) {
      filtered = filtered.filter(patient => patient.insuranceProvider === filterInsurance);
    }

    return filtered.sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`));
  };

  const viewPatientDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsPatientDetailModal(true);
  };

  const deletePatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowDeleteAlert(true);
  };

  const confirmDeletePatient = () => {
    if (selectedPatient) {
      setPatients(patients.filter(patient => patient.id !== selectedPatient.id));
      setToastMessage(`Patient ${selectedPatient.firstName} ${selectedPatient.lastName} supprimé`);
      setShowSuccessToast(true);
      setShowDeleteAlert(false);
      setSelectedPatient(null);
    }
  };

  const updatePatientStatus = (patientId: string, status: Patient['status']) => {
    setPatients(patients.map(patient =>
      patient.id === patientId ? { ...patient, status } : patient
    ));
    
    const patient = patients.find(p => p.id === patientId);
    setToastMessage(`Statut de ${patient?.firstName} ${patient?.lastName} mis à jour: ${getStatusLabel(status)}`);
    setShowSuccessToast(true);
  };

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
      event.detail.complete();
    }, 2000);
  };

  const filteredPatients = getFilteredPatients();
  const newPatients = patients.filter(p => p.isNewPatient);
  const activePatients = patients.filter(p => p.status === 'active');
  const blockedPatients = patients.filter(p => p.status === 'blocked');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestion des Patients</IonTitle>
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

        {/* Statistiques rapides */}
        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="3" style={{ textAlign: "center" }}>
                  <h2 style={{ margin: "0", color: "var(--ion-color-primary)" }}>{patients.length}</h2>
                  <p style={{ margin: "0", fontSize: "0.8rem" }}>Total patients</p>
                </IonCol>
                <IonCol size="3" style={{ textAlign: "center" }}>
                  <h2 style={{ margin: "0", color: "var(--ion-color-success)" }}>{activePatients.length}</h2>
                  <p style={{ margin: "0", fontSize: "0.8rem" }}>Actifs</p>
                </IonCol>
                <IonCol size="3" style={{ textAlign: "center" }}>
                  <h2 style={{ margin: "0", color: "var(--ion-color-warning)" }}>{newPatients.length}</h2>
                  <p style={{ margin: "0", fontSize: "0.8rem" }}>Nouveaux</p>
                </IonCol>
                <IonCol size="3" style={{ textAlign: "center" }}>
                  <h2 style={{ margin: "0", color: "var(--ion-color-danger)" }}>{blockedPatients.length}</h2>
                  <p style={{ margin: "0", fontSize: "0.8rem" }}>Bloqués</p>
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
            
            <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
              <IonSelect
                value={filterStatus}
                placeholder="Statut"
                onIonChange={e => setFilterStatus(e.detail.value)}
                style={{ minWidth: "120px" }}
              >
                <IonSelectOption value="">Tous les statuts</IonSelectOption>
                <IonSelectOption value="active">Actif</IonSelectOption>
                <IonSelectOption value="inactive">Inactif</IonSelectOption>
                <IonSelectOption value="blocked">Bloqué</IonSelectOption>
              </IonSelect>

              <IonSelect
                value={filterInsurance}
                placeholder="Assurance"
                onIonChange={e => setFilterInsurance(e.detail.value)}
                style={{ minWidth: "150px" }}
              >
                <IonSelectOption value="">Toutes les assurances</IonSelectOption>
                {insuranceProviders.map(provider => (
                  <IonSelectOption key={provider} value={provider}>
                    {provider}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </div>

            <IonSegment 
              value={selectedSegment} 
              onIonChange={e => setSelectedSegment(e.detail.value as string)}
              style={{ marginTop: "8px" }}
            >
              <IonSegmentButton value="all">
                <IonLabel>Tous</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="new">
                <IonLabel>Nouveaux</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="active">
                <IonLabel>Actifs</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="blocked">
                <IonLabel>Bloqués</IonLabel>
              </IonSegmentButton>
            </IonSegment>
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
              <IonItemSliding key={patient.id}>
                <IonItem button onClick={() => viewPatientDetails(patient)}>
                  <IonAvatar slot="start">
                    <img src={patient.avatar || "https://ionicframework.com/docs/img/demos/avatar.svg"} alt="Avatar" />
                  </IonAvatar>
                  
                  <IonLabel>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ flex: 1 }}>
                        <h2 style={{ fontWeight: "bold", margin: "0 0 4px 0" }}>
                          {patient.firstName} {patient.lastName}
                        </h2>
                        <h3 style={{ color: "var(--ion-color-primary)", margin: "0 0 4px 0" }}>
                          {getAgeFromBirthDate(patient.dateOfBirth)} ans • {patient.gender === 'male' ? 'Homme' : patient.gender === 'female' ? 'Femme' : 'Autre'}
                        </h3>
                        
                        <p style={{ margin: "0 0 4px 0", fontSize: "0.9rem" }}>
                          <IonIcon icon={callOutline} style={{ marginRight: "4px" }} />
                          {patient.phone}
                        </p>
                        
                        <p style={{ margin: "0 0 4px 0", fontSize: "0.9rem" }}>
                          <IonIcon icon={mailOutline} style={{ marginRight: "4px" }} />
                          {patient.email}
                        </p>
                        
                        <p style={{ margin: "0 0 4px 0", fontSize: "0.9rem" }}>
                          <IonIcon icon={businessOutline} style={{ marginRight: "4px" }} />
                          {patient.insuranceProvider}
                        </p>
                        
                        <p style={{ margin: "0 0 8px 0", fontSize: "0.9rem" }}>
                          Inscrit le: {new Date(patient.registrationDate).toLocaleDateString('fr-FR')}
                        </p>
                        
                        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                          <IonChip color={getStatusColor(patient.status)} style={{ fontSize: "0.8rem" }}>
                            {getStatusLabel(patient.status)}
                          </IonChip>
                          
                          {patient.isNewPatient && (
                            <IonChip color="tertiary" style={{ fontSize: "0.8rem" }}>
                              Nouveau patient
                            </IonChip>
                          )}
                          
                          <IonChip color="secondary" style={{ fontSize: "0.8rem" }}>
                            {patient.totalAppointments} consultations
                          </IonChip>
                          
                          {patient.medicalHistory.allergies.length > 0 && (
                            <IonChip color="danger" style={{ fontSize: "0.8rem" }}>
                              <IonIcon icon={warningOutline} />
                              <IonLabel>Allergies</IonLabel>
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
                            deletePatient(patient);
                          }}
                        >
                          <IonIcon icon={trashOutline} />
                        </IonButton>
                      </div>
                    </div>
                  </IonLabel>
                </IonItem>
                
                <IonItemOptions side="end">
                  {patient.status !== 'active' && (
                    <IonItemOption
                      color="success"
                      onClick={() => updatePatientStatus(patient.id, 'active')}
                    >
                      <IonIcon icon={checkmarkCircleOutline} />
                      Activer
                    </IonItemOption>
                  )}
                  
                  {patient.status !== 'blocked' && (
                    <IonItemOption
                      color="danger"
                      onClick={() => updatePatientStatus(patient.id, 'blocked')}
                    >
                      <IonIcon icon={banOutline} />
                      Bloquer
                    </IonItemOption>
                  )}
                  
                  <IonItemOption
                    color="danger"
                    onClick={() => deletePatient(patient)}
                  >
                    <IonIcon icon={trashOutline} />
                    Supprimer
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
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

        {/* Modal détails patient (version simplifiée pour admin) */}
        <IonModal isOpen={isPatientDetailModal} onDidDismiss={() => setIsPatientDetailModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Dossier Patient - Vue Admin</IonTitle>
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
                  <IonChip color={getStatusColor(selectedPatient.status)}>
                    {getStatusLabel(selectedPatient.status)}
                  </IonChip>
                </div>

                <IonList>
                  <IonItem>
                    <IonIcon icon={idCardOutline} slot="start" />
                    <IonLabel>
                      <h3>N° Sécurité Sociale</h3>
                      <p>{selectedPatient.nationalId}</p>
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
                      <h3>Téléphone</h3>
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
                  
                  <IonItem>
                    <IonIcon icon={businessOutline} slot="start" />
                    <IonLabel>
                      <h3>Assurance</h3>
                      <p>{selectedPatient.insuranceProvider}</p>
                      <p>N°: {selectedPatient.insuranceNumber}</p>
                    </IonLabel>
                  </IonItem>
                  
                  <IonItem>
                    <IonIcon icon={calendarOutline} slot="start" />
                    <IonLabel>
                      <h3>Inscription</h3>
                      <p>{new Date(selectedPatient.registrationDate).toLocaleDateString('fr-FR')}</p>
                    </IonLabel>
                  </IonItem>
                  
                  <IonItem>
                    <IonIcon icon={medkitOutline} slot="start" />
                    <IonLabel>
                      <h3>Statistiques</h3>
                      <p>Total consultations: {selectedPatient.totalAppointments}</p>
                      <p>RDV à venir: {selectedPatient.upcomingAppointments}</p>
                      {selectedPatient.lastAppointmentDate && (
                        <p>Dernière visite: {new Date(selectedPatient.lastAppointmentDate).toLocaleDateString('fr-FR')}</p>
                      )}
                    </IonLabel>
                  </IonItem>
                </IonList>

                <div style={{ marginTop: "2rem", display: "flex", gap: "8px" }}>
                  {selectedPatient.status !== 'blocked' && (
                    <IonButton 
                      expand="block" 
                      color="danger" 
                      onClick={() => {
                        updatePatientStatus(selectedPatient.id, 'blocked');
                        setIsPatientDetailModal(false);
                      }}
                    >
                      <IonIcon icon={banOutline} slot="start" />
                      Bloquer le patient
                    </IonButton>
                  )}
                  
                  {selectedPatient.status === 'blocked' && (
                    <IonButton 
                      expand="block" 
                      color="success" 
                      onClick={() => {
                        updatePatientStatus(selectedPatient.id, 'active');
                        setIsPatientDetailModal(false);
                      }}
                    >
                      <IonIcon icon={checkmarkCircleOutline} slot="start" />
                      Réactiver le patient
                    </IonButton>
                  )}
                </div>
              </div>
            )}
          </IonContent>
        </IonModal>

        {/* Alert de suppression */}
        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header="Supprimer le patient"
          message={`Voulez-vous vraiment supprimer définitivement le patient ${selectedPatient?.firstName} ${selectedPatient?.lastName} ? Cette action est irréversible.`}
          buttons={[
            {
              text: 'Annuler',
              role: 'cancel'
            },
            {
              text: 'Supprimer',
              handler: confirmDeletePatient
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

export default AdminPatientManagement;