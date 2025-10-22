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
  IonInput,
  IonTextarea,
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
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonFab,
  IonFabButton,
  IonToggle,
  IonDatetime
} from "@ionic/react";
import {
  medkitOutline,
  addOutline,
  searchOutline,
  filterOutline,
  createOutline,
  trashOutline,
  checkmarkOutline,
  closeOutline,
  alertCircleOutline,
  informationCircleOutline,
  eyeOutline,
  mailOutline,
  callOutline,
  locationOutline,
  idCardOutline,
  schoolOutline,
  starOutline,
  businessOutline,
  keyOutline,
  personAddOutline,
  saveOutline,
  banOutline,
  checkmarkCircleOutline,
  logOutOutline,
  copyOutline
} from "ionicons/icons";
import { useHistory } from "react-router-dom";

interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  specialty: string;
  avatar?: string;
  isActive: boolean;
  status: 'active' | 'inactive' | 'vacation' | 'suspended';
  licenseNumber: string;
  qualification: string;
  experience: number;
  consultationFee: number;
  address: string;
  workingHours: {
    monday: { start: string; end: string; isActive: boolean };
    tuesday: { start: string; end: string; isActive: boolean };
    wednesday: { start: string; end: string; isActive: boolean };
    thursday: { start: string; end: string; isActive: boolean };
    friday: { start: string; end: string; isActive: boolean };
    saturday: { start: string; end: string; isActive: boolean };
    sunday: { start: string; end: string; isActive: boolean };
  };
  joinedDate: string;
  languages: string[];
  certificates: string[];
  createdBy: string;
  lastLogin?: string;
}

const AdminDoctorManagement: React.FC = () => {
  const history = useHistory();
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [searchText, setSearchText] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [isDoctorDetailModal, setIsDoctorDetailModal] = useState(false);
  const [isNewDoctorModal, setIsNewDoctorModal] = useState(false);
  const [isEditDoctorModal, setIsEditDoctorModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Données fictives des médecins
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: "doc1",
      firstName: "Marie",
      lastName: "Dupont",
      email: "marie.dupont@clinique.com",
      password: "mdp123",
      phone: "+33 1 23 45 67 89",
      specialty: "Cardiologie",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      isActive: true,
      status: "active",
      licenseNumber: "FR123456789",
      qualification: "Doctorat en Médecine, Spécialité Cardiologie",
      experience: 15,
      consultationFee: 80,
      address: "15 Avenue des Champs, 75008 Paris",
      workingHours: {
        monday: { start: "08:00", end: "17:00", isActive: true },
        tuesday: { start: "08:00", end: "17:00", isActive: true },
        wednesday: { start: "08:00", end: "17:00", isActive: true },
        thursday: { start: "08:00", end: "17:00", isActive: true },
        friday: { start: "08:00", end: "16:00", isActive: true },
        saturday: { start: "09:00", end: "12:00", isActive: true },
        sunday: { start: "00:00", end: "00:00", isActive: false }
      },
      joinedDate: "2020-03-15",
      languages: ["Français", "Anglais", "Espagnol"],
      certificates: ["Certification Échographie Cardiaque", "Formation Cathétérisme"],
      createdBy: "Admin Sophie Martin",
      lastLogin: "2024-10-21T08:30:00"
    },
    {
      id: "doc2",
      firstName: "Jean",
      lastName: "Martin",
      email: "jean.martin@clinique.com",
      password: "mdp456",
      phone: "+33 1 34 56 78 90",
      specialty: "Médecine générale",
      avatar: "https://randomuser.me/api/portraits/men/50.jpg",
      isActive: true,
      status: "active",
      licenseNumber: "FR987654321",
      qualification: "Doctorat en Médecine Générale",
      experience: 12,
      consultationFee: 60,
      address: "22 Rue de la Santé, 75014 Paris",
      workingHours: {
        monday: { start: "09:00", end: "18:00", isActive: true },
        tuesday: { start: "09:00", end: "18:00", isActive: true },
        wednesday: { start: "09:00", end: "18:00", isActive: true },
        thursday: { start: "09:00", end: "18:00", isActive: true },
        friday: { start: "09:00", end: "17:00", isActive: true },
        saturday: { start: "00:00", end: "00:00", isActive: false },
        sunday: { start: "00:00", end: "00:00", isActive: false }
      },
      joinedDate: "2021-06-10",
      languages: ["Français", "Anglais"],
      certificates: ["Formation Médecine Préventive", "Certification Diabétologie"],
      createdBy: "Admin Sophie Martin",
      lastLogin: "2024-10-21T07:45:00"
    }
  ]);

  const [newDoctor, setNewDoctor] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    specialty: '',
    licenseNumber: '',
    qualification: '',
    experience: 0,
    consultationFee: 60,
    address: '',
    languages: '',
    certificates: ''
  });

  const specialties = [
    "Médecine générale",
    "Cardiologie",
    "Dermatologie",
    "Pédiatrie",
    "Gynécologie",
    "Orthopédie",
    "Neurologie",
    "Psychiatrie",
    "Ophtalmologie",
    "ORL"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'medium';
      case 'vacation': return 'warning';
      case 'suspended': return 'danger';
      default: return 'medium';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'vacation': return 'En congés';
      case 'suspended': return 'Suspendu';
      default: return status;
    }
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewDoctor({ ...newDoctor, password });
  };

  const generateEmail = (firstName: string, lastName: string) => {
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@clinique.com`;
    setNewDoctor({ ...newDoctor, email });
  };

  const getFilteredDoctors = () => {
    let filtered = doctors;

    // Filtre par segment
    if (selectedSegment !== 'all') {
      if (selectedSegment === 'active') {
        filtered = filtered.filter(doc => doc.status === 'active');
      } else if (selectedSegment === 'inactive') {
        filtered = filtered.filter(doc => doc.status !== 'active');
      }
    }

    // Filtre par recherche
    if (searchText) {
      filtered = filtered.filter(doc =>
        `${doc.firstName} ${doc.lastName}`.toLowerCase().includes(searchText.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchText.toLowerCase()) ||
        doc.email.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filtre par spécialité
    if (filterSpecialty) {
      filtered = filtered.filter(doc => doc.specialty === filterSpecialty);
    }

    // Filtre par statut
    if (filterStatus) {
      filtered = filtered.filter(doc => doc.status === filterStatus);
    }

    return filtered.sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`));
  };

  const viewDoctorDetails = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsDoctorDetailModal(true);
  };

  const editDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setNewDoctor({
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      email: doctor.email,
      password: doctor.password,
      phone: doctor.phone,
      specialty: doctor.specialty,
      licenseNumber: doctor.licenseNumber,
      qualification: doctor.qualification,
      experience: doctor.experience,
      consultationFee: doctor.consultationFee,
      address: doctor.address,
      languages: doctor.languages.join(', '),
      certificates: doctor.certificates.join(', ')
    });
    setIsEditDoctorModal(true);
  };

  const deleteDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowDeleteAlert(true);
  };

  const confirmDeleteDoctor = () => {
    if (selectedDoctor) {
      setDoctors(doctors.filter(doctor => doctor.id !== selectedDoctor.id));
      setToastMessage(`Dr. ${selectedDoctor.firstName} ${selectedDoctor.lastName} supprimé`);
      setShowSuccessToast(true);
      setShowDeleteAlert(false);
      setSelectedDoctor(null);
    }
  };

  const createDoctor = () => {
    if (!newDoctor.firstName || !newDoctor.lastName || !newDoctor.email || !newDoctor.password || !newDoctor.specialty) {
      setToastMessage('Veuillez remplir tous les champs obligatoires');
      setShowSuccessToast(true);
      return;
    }

    const doctor: Doctor = {
      id: Date.now().toString(),
      firstName: newDoctor.firstName,
      lastName: newDoctor.lastName,
      email: newDoctor.email,
      password: newDoctor.password,
      phone: newDoctor.phone,
      specialty: newDoctor.specialty,
      isActive: true,
      status: "active",
      licenseNumber: newDoctor.licenseNumber,
      qualification: newDoctor.qualification,
      experience: newDoctor.experience,
      consultationFee: newDoctor.consultationFee,
      address: newDoctor.address,
      workingHours: {
        monday: { start: "09:00", end: "17:00", isActive: true },
        tuesday: { start: "09:00", end: "17:00", isActive: true },
        wednesday: { start: "09:00", end: "17:00", isActive: true },
        thursday: { start: "09:00", end: "17:00", isActive: true },
        friday: { start: "09:00", end: "17:00", isActive: true },
        saturday: { start: "00:00", end: "00:00", isActive: false },
        sunday: { start: "00:00", end: "00:00", isActive: false }
      },
      joinedDate: new Date().toISOString(),
      languages: newDoctor.languages ? newDoctor.languages.split(',').map(l => l.trim()) : [],
      certificates: newDoctor.certificates ? newDoctor.certificates.split(',').map(c => c.trim()) : [],
      createdBy: "Admin Sophie Martin"
    };

    setDoctors([...doctors, doctor]);
    setIsNewDoctorModal(false);
    setToastMessage(`Dr. ${doctor.firstName} ${doctor.lastName} créé avec succès`);
    setShowSuccessToast(true);

    // Reset form
    setNewDoctor({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      specialty: '',
      licenseNumber: '',
      qualification: '',
      experience: 0,
      consultationFee: 60,
      address: '',
      languages: '',
      certificates: ''
    });
  };

  const updateDoctor = () => {
    if (!selectedDoctor) return;

    const updatedDoctor: Doctor = {
      ...selectedDoctor,
      firstName: newDoctor.firstName,
      lastName: newDoctor.lastName,
      email: newDoctor.email,
      password: newDoctor.password,
      phone: newDoctor.phone,
      specialty: newDoctor.specialty,
      licenseNumber: newDoctor.licenseNumber,
      qualification: newDoctor.qualification,
      experience: newDoctor.experience,
      consultationFee: newDoctor.consultationFee,
      address: newDoctor.address,
      languages: newDoctor.languages ? newDoctor.languages.split(',').map(l => l.trim()) : [],
      certificates: newDoctor.certificates ? newDoctor.certificates.split(',').map(c => c.trim()) : []
    };

    setDoctors(doctors.map(doc => doc.id === selectedDoctor.id ? updatedDoctor : doc));
    setIsEditDoctorModal(false);
    setToastMessage(`Dr. ${updatedDoctor.firstName} ${updatedDoctor.lastName} mis à jour`);
    setShowSuccessToast(true);
  };

  const updateDoctorStatus = (doctorId: string, status: Doctor['status']) => {
    setDoctors(doctors.map(doc =>
      doc.id === doctorId ? { ...doc, status } : doc
    ));
    
    const doctor = doctors.find(d => d.id === doctorId);
    setToastMessage(`Statut du Dr. ${doctor?.firstName} ${doctor?.lastName} mis à jour: ${getStatusLabel(status)}`);
    setShowSuccessToast(true);
  };

  const copyCredentials = (doctor: Doctor) => {
    const credentials = `Email: ${doctor.email}\nMot de passe: ${doctor.password}`;
    navigator.clipboard.writeText(credentials);
    setToastMessage('Identifiants copiés dans le presse-papiers');
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

  const filteredDoctors = getFilteredDoctors();
  const activeDoctors = doctors.filter(doc => doc.status === 'active');
  const suspendedDoctors = doctors.filter(doc => doc.status === 'suspended');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestion des Médecins</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsNewDoctorModal(true)}>
              <IonIcon icon={addOutline} />
            </IonButton>
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
                <IonCol size="4" style={{ textAlign: "center" }}>
                  <h2 style={{ margin: "0", color: "var(--ion-color-primary)" }}>{doctors.length}</h2>
                  <p style={{ margin: "0", fontSize: "0.8rem" }}>Total médecins</p>
                </IonCol>
                <IonCol size="4" style={{ textAlign: "center" }}>
                  <h2 style={{ margin: "0", color: "var(--ion-color-success)" }}>{activeDoctors.length}</h2>
                  <p style={{ margin: "0", fontSize: "0.8rem" }}>Actifs</p>
                </IonCol>
                <IonCol size="4" style={{ textAlign: "center" }}>
                  <h2 style={{ margin: "0", color: "var(--ion-color-danger)" }}>{suspendedDoctors.length}</h2>
                  <p style={{ margin: "0", fontSize: "0.8rem" }}>Suspendus</p>
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
              placeholder="Rechercher par nom, spécialité ou email..."
              showClearButton="focus"
            />
            
            <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
              <IonSelect
                value={filterSpecialty}
                placeholder="Spécialité"
                onIonChange={e => setFilterSpecialty(e.detail.value)}
                style={{ minWidth: "150px" }}
              >
                <IonSelectOption value="">Toutes les spécialités</IonSelectOption>
                {specialties.map(specialty => (
                  <IonSelectOption key={specialty} value={specialty}>
                    {specialty}
                  </IonSelectOption>
                ))}
              </IonSelect>

              <IonSelect
                value={filterStatus}
                placeholder="Statut"
                onIonChange={e => setFilterStatus(e.detail.value)}
                style={{ minWidth: "120px" }}
              >
                <IonSelectOption value="">Tous les statuts</IonSelectOption>
                <IonSelectOption value="active">Actif</IonSelectOption>
                <IonSelectOption value="inactive">Inactif</IonSelectOption>
                <IonSelectOption value="vacation">En congés</IonSelectOption>
                <IonSelectOption value="suspended">Suspendu</IonSelectOption>
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
              <IonSegmentButton value="active">
                <IonLabel>Actifs</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="inactive">
                <IonLabel>Inactifs</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonCardContent>
        </IonCard>

        {/* Liste des médecins */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              Médecins ({filteredDoctors.length})
            </IonCardTitle>
          </IonCardHeader>
          
          <IonList>
            {filteredDoctors.map(doctor => (
              <IonItemSliding key={doctor.id}>
                <IonItem button onClick={() => viewDoctorDetails(doctor)}>
                  <IonAvatar slot="start">
                    <img src={doctor.avatar || "https://ionicframework.com/docs/img/demos/avatar.svg"} alt="Avatar" />
                  </IonAvatar>
                  
                  <IonLabel>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ flex: 1 }}>
                        <h2 style={{ fontWeight: "bold", margin: "0 0 4px 0" }}>
                          Dr. {doctor.firstName} {doctor.lastName}
                        </h2>
                        <h3 style={{ color: "var(--ion-color-primary)", margin: "0 0 4px 0" }}>
                          {doctor.specialty}
                        </h3>
                        
                        <p style={{ margin: "0 0 4px 0", fontSize: "0.9rem" }}>
                          <IonIcon icon={mailOutline} style={{ marginRight: "4px" }} />
                          {doctor.email}
                        </p>
                        
                        <p style={{ margin: "0 0 4px 0", fontSize: "0.9rem" }}>
                          <IonIcon icon={callOutline} style={{ marginRight: "4px" }} />
                          {doctor.phone}
                        </p>
                        
                        <p style={{ margin: "0 0 4px 0", fontSize: "0.9rem" }}>
                          Licence: {doctor.licenseNumber} • {doctor.experience} ans d'exp.
                        </p>
                        
                        <p style={{ margin: "0 0 8px 0", fontSize: "0.9rem" }}>
                          Créé le: {new Date(doctor.joinedDate).toLocaleDateString('fr-FR')}
                        </p>
                        
                        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                          <IonChip color={getStatusColor(doctor.status)} style={{ fontSize: "0.8rem" }}>
                            {getStatusLabel(doctor.status)}
                          </IonChip>
                          
                          <IonChip color="tertiary" style={{ fontSize: "0.8rem" }}>
                            {doctor.consultationFee}€
                          </IonChip>
                          
                          {doctor.lastLogin && (
                            <IonChip color="secondary" style={{ fontSize: "0.8rem" }}>
                              Dernière connexion: {new Date(doctor.lastLogin).toLocaleDateString('fr-FR')}
                            </IonChip>
                          )}
                        </div>
                      </div>
                      
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "center" }}>
                        <IonButton
                          fill="clear"
                          size="small"
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyCredentials(doctor);
                          }}
                        >
                          <IonIcon icon={copyOutline} />
                        </IonButton>
                        
                        <IonButton
                          fill="clear"
                          size="small"
                          color="warning"
                          onClick={(e) => {
                            e.stopPropagation();
                            editDoctor(doctor);
                          }}
                        >
                          <IonIcon icon={createOutline} />
                        </IonButton>
                        
                        <IonButton
                          fill="clear"
                          size="small"
                          color="danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteDoctor(doctor);
                          }}
                        >
                          <IonIcon icon={trashOutline} />
                        </IonButton>
                      </div>
                    </div>
                  </IonLabel>
                </IonItem>
                
                <IonItemOptions side="end">
                  {doctor.status !== 'active' && (
                    <IonItemOption
                      color="success"
                      onClick={() => updateDoctorStatus(doctor.id, 'active')}
                    >
                      <IonIcon icon={checkmarkCircleOutline} />
                      Activer
                    </IonItemOption>
                  )}
                  
                  {doctor.status !== 'suspended' && (
                    <IonItemOption
                      color="danger"
                      onClick={() => updateDoctorStatus(doctor.id, 'suspended')}
                    >
                      <IonIcon icon={banOutline} />
                      Suspendre
                    </IonItemOption>
                  )}
                  
                  <IonItemOption
                    color="warning"
                    onClick={() => editDoctor(doctor)}
                  >
                    <IonIcon icon={createOutline} />
                    Modifier
                  </IonItemOption>
                  
                  <IonItemOption
                    color="danger"
                    onClick={() => deleteDoctor(doctor)}
                  >
                    <IonIcon icon={trashOutline} />
                    Supprimer
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
            
            {filteredDoctors.length === 0 && (
              <IonItem>
                <IonLabel style={{ textAlign: "center", color: "var(--ion-color-medium)" }}>
                  Aucun médecin trouvé
                </IonLabel>
              </IonItem>
            )}
          </IonList>
        </IonCard>

        {/* FAB pour nouveau médecin */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setIsNewDoctorModal(true)}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>

        {/* Modal nouveau médecin */}
        <IonModal isOpen={isNewDoctorModal} onDidDismiss={() => setIsNewDoctorModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Nouveau Médecin</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsNewDoctorModal(false)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div style={{ padding: "1rem" }}>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Prénom *</IonLabel>
                  <IonInput
                    value={newDoctor.firstName}
                    placeholder="Prénom du médecin"
                    onIonInput={e => {
                      const firstName = e.detail.value!;
                      setNewDoctor({...newDoctor, firstName});
                      if (firstName && newDoctor.lastName) {
                        generateEmail(firstName, newDoctor.lastName);
                      }
                    }}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Nom *</IonLabel>
                  <IonInput
                    value={newDoctor.lastName}
                    placeholder="Nom du médecin"
                    onIonInput={e => {
                      const lastName = e.detail.value!;
                      setNewDoctor({...newDoctor, lastName});
                      if (newDoctor.firstName && lastName) {
                        generateEmail(newDoctor.firstName, lastName);
                      }
                    }}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Email *</IonLabel>
                  <IonInput
                    value={newDoctor.email}
                    placeholder="email@clinique.com"
                    type="email"
                    onIonInput={e => setNewDoctor({...newDoctor, email: e.detail.value!})}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Mot de passe *</IonLabel>
                  <div style={{ display: "flex", gap: "8px", width: "100%" }}>
                    <IonInput
                      value={newDoctor.password}
                      placeholder="Mot de passe"
                      type="text"
                      style={{ flex: 1 }}
                      onIonInput={e => setNewDoctor({...newDoctor, password: e.detail.value!})}
                    />
                    <IonButton fill="outline" onClick={generatePassword}>
                      Générer
                    </IonButton>
                  </div>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Téléphone</IonLabel>
                  <IonInput
                    value={newDoctor.phone}
                    placeholder="+33 1 23 45 67 89"
                    type="tel"
                    onIonInput={e => setNewDoctor({...newDoctor, phone: e.detail.value!})}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Spécialité *</IonLabel>
                  <IonSelect
                    value={newDoctor.specialty}
                    placeholder="Sélectionner une spécialité"
                    onIonChange={e => setNewDoctor({...newDoctor, specialty: e.detail.value})}
                  >
                    {specialties.map(specialty => (
                      <IonSelectOption key={specialty} value={specialty}>
                        {specialty}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Numéro de licence</IonLabel>
                  <IonInput
                    value={newDoctor.licenseNumber}
                    placeholder="FR123456789"
                    onIonInput={e => setNewDoctor({...newDoctor, licenseNumber: e.detail.value!})}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Qualification</IonLabel>
                  <IonTextarea
                    value={newDoctor.qualification}
                    placeholder="Diplômes et qualifications..."
                    rows={2}
                    onIonInput={e => setNewDoctor({...newDoctor, qualification: e.detail.value!})}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Années d'expérience</IonLabel>
                  <IonInput
                    value={newDoctor.experience}
                    placeholder="0"
                    type="number"
                    onIonInput={e => setNewDoctor({...newDoctor, experience: parseInt(e.detail.value!) || 0})}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Tarif consultation (€)</IonLabel>
                  <IonInput
                    value={newDoctor.consultationFee}
                    placeholder="60"
                    type="number"
                    onIonInput={e => setNewDoctor({...newDoctor, consultationFee: parseInt(e.detail.value!) || 60})}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Adresse</IonLabel>
                  <IonTextarea
                    value={newDoctor.address}
                    placeholder="Adresse du cabinet..."
                    rows={2}
                    onIonInput={e => setNewDoctor({...newDoctor, address: e.detail.value!})}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Langues parlées</IonLabel>
                  <IonInput
                    value={newDoctor.languages}
                    placeholder="Français, Anglais, Espagnol..."
                    onIonInput={e => setNewDoctor({...newDoctor, languages: e.detail.value!})}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Certifications</IonLabel>
                  <IonTextarea
                    value={newDoctor.certificates}
                    placeholder="Certifications et formations..."
                    rows={2}
                    onIonInput={e => setNewDoctor({...newDoctor, certificates: e.detail.value!})}
                  />
                </IonItem>
              </IonList>

              <IonButton expand="block" onClick={createDoctor} style={{ marginTop: "1rem" }}>
                <IonIcon icon={saveOutline} slot="start" />
                Créer le médecin
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        {/* Modal modification médecin */}
        <IonModal isOpen={isEditDoctorModal} onDidDismiss={() => setIsEditDoctorModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Modifier Médecin</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsEditDoctorModal(false)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div style={{ padding: "1rem" }}>
              {/* Même formulaire que pour la création */}
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Prénom *</IonLabel>
                  <IonInput
                    value={newDoctor.firstName}
                    placeholder="Prénom du médecin"
                    onIonInput={e => setNewDoctor({...newDoctor, firstName: e.detail.value!})}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Nom *</IonLabel>
                  <IonInput
                    value={newDoctor.lastName}
                    placeholder="Nom du médecin"
                    onIonInput={e => setNewDoctor({...newDoctor, lastName: e.detail.value!})}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Email *</IonLabel>
                  <IonInput
                    value={newDoctor.email}
                    placeholder="email@clinique.com"
                    type="email"
                    onIonInput={e => setNewDoctor({...newDoctor, email: e.detail.value!})}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Mot de passe *</IonLabel>
                  <IonInput
                    value={newDoctor.password}
                    placeholder="Mot de passe"
                    type="text"
                    onIonInput={e => setNewDoctor({...newDoctor, password: e.detail.value!})}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Spécialité *</IonLabel>
                  <IonSelect
                    value={newDoctor.specialty}
                    placeholder="Sélectionner une spécialité"
                    onIonChange={e => setNewDoctor({...newDoctor, specialty: e.detail.value})}
                  >
                    {specialties.map(specialty => (
                      <IonSelectOption key={specialty} value={specialty}>
                        {specialty}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Tarif consultation (€)</IonLabel>
                  <IonInput
                    value={newDoctor.consultationFee}
                    placeholder="60"
                    type="number"
                    onIonInput={e => setNewDoctor({...newDoctor, consultationFee: parseInt(e.detail.value!) || 60})}
                  />
                </IonItem>
              </IonList>

              <IonButton expand="block" onClick={updateDoctor} style={{ marginTop: "1rem" }}>
                <IonIcon icon={saveOutline} slot="start" />
                Mettre à jour
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        {/* Modal détails médecin */}
        <IonModal isOpen={isDoctorDetailModal} onDidDismiss={() => setIsDoctorDetailModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Détails Médecin</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsDoctorDetailModal(false)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {selectedDoctor && (
              <div style={{ padding: "1rem" }}>
                <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                  <IonAvatar style={{ width: "80px", height: "80px", margin: "0 auto 1rem" }}>
                    <img src={selectedDoctor.avatar || "https://ionicframework.com/docs/img/demos/avatar.svg"} alt="Avatar" />
                  </IonAvatar>
                  <h1>Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}</h1>
                  <p style={{ color: "var(--ion-color-primary)", fontSize: "1.1rem" }}>
                    {selectedDoctor.specialty}
                  </p>
                  <IonChip color={getStatusColor(selectedDoctor.status)}>
                    {getStatusLabel(selectedDoctor.status)}
                  </IonChip>
                </div>

                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Identifiants de connexion</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p><strong>Email:</strong> {selectedDoctor.email}</p>
                    <p><strong>Mot de passe:</strong> {selectedDoctor.password}</p>
                    <IonButton 
                      expand="block" 
                      fill="outline" 
                      onClick={() => copyCredentials(selectedDoctor)}
                    >
                      <IonIcon icon={copyOutline} slot="start" />
                      Copier les identifiants
                    </IonButton>
                  </IonCardContent>
                </IonCard>

                <IonList>
                  <IonItem>
                    <IonIcon icon={idCardOutline} slot="start" />
                    <IonLabel>
                      <h3>Numéro de licence</h3>
                      <p>{selectedDoctor.licenseNumber}</p>
                    </IonLabel>
                  </IonItem>
                  
                  <IonItem>
                    <IonIcon icon={callOutline} slot="start" />
                    <IonLabel>
                      <h3>Téléphone</h3>
                      <p>{selectedDoctor.phone}</p>
                    </IonLabel>
                  </IonItem>
                  
                  <IonItem>
                    <IonIcon icon={starOutline} slot="start" />
                    <IonLabel>
                      <h3>Expérience</h3>
                      <p>{selectedDoctor.experience} ans</p>
                    </IonLabel>
                  </IonItem>
                  
                  <IonItem>
                    <IonIcon icon={businessOutline} slot="start" />
                    <IonLabel>
                      <h3>Tarif consultation</h3>
                      <p>{selectedDoctor.consultationFee}€</p>
                    </IonLabel>
                  </IonItem>
                  
                  <IonItem>
                    <IonIcon icon={personAddOutline} slot="start" />
                    <IonLabel>
                      <h3>Créé par</h3>
                      <p>{selectedDoctor.createdBy}</p>
                      <p>Le {new Date(selectedDoctor.joinedDate).toLocaleDateString('fr-FR')}</p>
                    </IonLabel>
                  </IonItem>
                </IonList>

                <div style={{ marginTop: "2rem", display: "flex", gap: "8px" }}>
                  <IonButton 
                    expand="block" 
                    color="warning" 
                    onClick={() => {
                      editDoctor(selectedDoctor);
                      setIsDoctorDetailModal(false);
                    }}
                  >
                    <IonIcon icon={createOutline} slot="start" />
                    Modifier
                  </IonButton>
                  
                  {selectedDoctor.status !== 'suspended' && (
                    <IonButton 
                      expand="block" 
                      color="danger" 
                      onClick={() => {
                        updateDoctorStatus(selectedDoctor.id, 'suspended');
                        setIsDoctorDetailModal(false);
                      }}
                    >
                      <IonIcon icon={banOutline} slot="start" />
                      Suspendre
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
          header="Supprimer le médecin"
          message={`Voulez-vous vraiment supprimer définitivement le Dr. ${selectedDoctor?.firstName} ${selectedDoctor?.lastName} ? Cette action est irréversible.`}
          buttons={[
            {
              text: 'Annuler',
              role: 'cancel'
            },
            {
              text: 'Supprimer',
              handler: confirmDeleteDoctor
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

export default AdminDoctorManagement;