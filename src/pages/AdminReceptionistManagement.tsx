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
  peopleOutline,
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
  copyOutline,
  desktopOutline,
  calendarOutline,
  timeOutline
} from "ionicons/icons";
import { useHistory } from "react-router-dom";

interface Receptionist {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  avatar?: string;
  isActive: boolean;
  status: 'active' | 'inactive' | 'vacation' | 'suspended';
  employeeId: string;
  department: string;
  position: string;
  experience: number;
  salary: number;
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
  permissions: {
    manageAppointments: boolean;
    manageDoctors: boolean;
    managePatients: boolean;
    viewReports: boolean;
    manageSchedule: boolean;
  };
  joinedDate: string;
  languages: string[];
  skills: string[];
  createdBy: string;
  lastLogin?: string;
}

const AdminReceptionistManagement: React.FC = () => {
  const history = useHistory();
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [searchText, setSearchText] = useState('');
  const [filterDepartment, setFilterDepartment] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [isReceptionistDetailModal, setIsReceptionistDetailModal] = useState(false);
  const [isNewReceptionistModal, setIsNewReceptionistModal] = useState(false);
  const [isEditReceptionistModal, setIsEditReceptionistModal] = useState(false);
  const [selectedReceptionist, setSelectedReceptionist] = useState<Receptionist | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Données fictives des réceptionnistes
  const [receptionists, setReceptionists] = useState<Receptionist[]>([
    {
      id: "rec1",
      firstName: "Sophie",
      lastName: "Laurent",
      email: "sophie.laurent@clinique.com",
      password: "rec123",
      phone: "+33 1 45 67 89 01",
      avatar: "https://randomuser.me/api/portraits/women/30.jpg",
      isActive: true,
      status: "active",
      employeeId: "REC001",
      department: "Accueil Principal",
      position: "Réceptionniste Senior",
      experience: 8,
      salary: 2800,
      address: "12 Rue de la Paix, 75001 Paris",
      workingHours: {
        monday: { start: "08:00", end: "17:00", isActive: true },
        tuesday: { start: "08:00", end: "17:00", isActive: true },
        wednesday: { start: "08:00", end: "17:00", isActive: true },
        thursday: { start: "08:00", end: "17:00", isActive: true },
        friday: { start: "08:00", end: "16:00", isActive: true },
        saturday: { start: "00:00", end: "00:00", isActive: false },
        sunday: { start: "00:00", end: "00:00", isActive: false }
      },
      permissions: {
        manageAppointments: true,
        manageDoctors: true,
        managePatients: true,
        viewReports: true,
        manageSchedule: true
      },
      joinedDate: "2019-09-10",
      languages: ["Français", "Anglais", "Italien"],
      skills: ["Gestion des rendez-vous", "Accueil patients", "Téléphonie", "Informatique médicale"],
      createdBy: "Admin Sophie Martin",
      lastLogin: "2024-10-21T08:15:00"
    },
    {
      id: "rec2",
      firstName: "Thomas",
      lastName: "Moreau",
      email: "thomas.moreau@clinique.com",
      password: "rec456",
      phone: "+33 1 56 78 90 12",
      avatar: "https://randomuser.me/api/portraits/men/35.jpg",
      isActive: true,
      status: "active",
      employeeId: "REC002",
      department: "Urgences",
      position: "Réceptionniste",
      experience: 4,
      salary: 2400,
      address: "8 Boulevard Saint-Michel, 75005 Paris",
      workingHours: {
        monday: { start: "06:00", end: "14:00", isActive: true },
        tuesday: { start: "06:00", end: "14:00", isActive: true },
        wednesday: { start: "14:00", end: "22:00", isActive: true },
        thursday: { start: "14:00", end: "22:00", isActive: true },
        friday: { start: "06:00", end: "14:00", isActive: true },
        saturday: { start: "08:00", end: "16:00", isActive: true },
        sunday: { start: "08:00", end: "16:00", isActive: true }
      },
      permissions: {
        manageAppointments: true,
        manageDoctors: false,
        managePatients: true,
        viewReports: false,
        manageSchedule: true
      },
      joinedDate: "2022-01-15",
      languages: ["Français", "Anglais"],
      skills: ["Accueil d'urgence", "Gestion du stress", "Premiers secours", "Logiciels hospitaliers"],
      createdBy: "Admin Sophie Martin",
      lastLogin: "2024-10-21T06:00:00"
    }
  ]);

  const [newReceptionist, setNewReceptionist] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    employeeId: '',
    department: '',
    position: '',
    experience: 0,
    salary: 2200,
    address: '',
    languages: '',
    skills: ''
  });

  const departments = [
    "Accueil Principal",
    "Urgences",
    "Consultation",
    "Chirurgie",
    "Pédiatrie",
    "Cardiologie",
    "Administration"
  ];

  const positions = [
    "Réceptionniste",
    "Réceptionniste Senior",
    "Chef de service accueil",
    "Assistant administratif",
    "Coordinateur patient"
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
    setNewReceptionist({ ...newReceptionist, password });
  };

  const generateEmail = (firstName: string, lastName: string) => {
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@clinique.com`;
    setNewReceptionist({ ...newReceptionist, email });
  };

  const generateEmployeeId = () => {
    const nextId = `REC${String(receptionists.length + 1).padStart(3, '0')}`;
    setNewReceptionist({ ...newReceptionist, employeeId: nextId });
  };

  const getFilteredReceptionists = () => {
    let filtered = receptionists;

    // Filtre par segment
    if (selectedSegment !== 'all') {
      if (selectedSegment === 'active') {
        filtered = filtered.filter(rec => rec.status === 'active');
      } else if (selectedSegment === 'inactive') {
        filtered = filtered.filter(rec => rec.status !== 'active');
      }
    }

    // Filtre par recherche
    if (searchText) {
      filtered = filtered.filter(rec =>
        `${rec.firstName} ${rec.lastName}`.toLowerCase().includes(searchText.toLowerCase()) ||
        rec.department.toLowerCase().includes(searchText.toLowerCase()) ||
        rec.email.toLowerCase().includes(searchText.toLowerCase()) ||
        rec.employeeId.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filtre par département
    if (filterDepartment) {
      filtered = filtered.filter(rec => rec.department === filterDepartment);
    }

    // Filtre par statut
    if (filterStatus) {
      filtered = filtered.filter(rec => rec.status === filterStatus);
    }

    return filtered.sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`));
  };

  const viewReceptionistDetails = (receptionist: Receptionist) => {
    setSelectedReceptionist(receptionist);
    setIsReceptionistDetailModal(true);
  };

  const editReceptionist = (receptionist: Receptionist) => {
    setSelectedReceptionist(receptionist);
    setNewReceptionist({
      firstName: receptionist.firstName,
      lastName: receptionist.lastName,
      email: receptionist.email,
      password: receptionist.password,
      phone: receptionist.phone,
      employeeId: receptionist.employeeId,
      department: receptionist.department,
      position: receptionist.position,
      experience: receptionist.experience,
      salary: receptionist.salary,
      address: receptionist.address,
      languages: receptionist.languages.join(', '),
      skills: receptionist.skills.join(', ')
    });
    setIsEditReceptionistModal(true);
  };

  const deleteReceptionist = (receptionist: Receptionist) => {
    setSelectedReceptionist(receptionist);
    setShowDeleteAlert(true);
  };

  const confirmDeleteReceptionist = () => {
    if (selectedReceptionist) {
      setReceptionists(receptionists.filter(rec => rec.id !== selectedReceptionist.id));
      setToastMessage(`${selectedReceptionist.firstName} ${selectedReceptionist.lastName} supprimé(e)`);
      setShowSuccessToast(true);
      setShowDeleteAlert(false);
      setSelectedReceptionist(null);
    }
  };

  const createReceptionist = () => {
    if (!newReceptionist.firstName || !newReceptionist.lastName || !newReceptionist.email || 
        !newReceptionist.password || !newReceptionist.department || !newReceptionist.position) {
      setToastMessage('Veuillez remplir tous les champs obligatoires');
      setShowSuccessToast(true);
      return;
    }

    const receptionist: Receptionist = {
      id: Date.now().toString(),
      firstName: newReceptionist.firstName,
      lastName: newReceptionist.lastName,
      email: newReceptionist.email,
      password: newReceptionist.password,
      phone: newReceptionist.phone,
      employeeId: newReceptionist.employeeId,
      department: newReceptionist.department,
      position: newReceptionist.position,
      experience: newReceptionist.experience,
      salary: newReceptionist.salary,
      address: newReceptionist.address,
      isActive: true,
      status: "active",
      workingHours: {
        monday: { start: "08:00", end: "17:00", isActive: true },
        tuesday: { start: "08:00", end: "17:00", isActive: true },
        wednesday: { start: "08:00", end: "17:00", isActive: true },
        thursday: { start: "08:00", end: "17:00", isActive: true },
        friday: { start: "08:00", end: "17:00", isActive: true },
        saturday: { start: "00:00", end: "00:00", isActive: false },
        sunday: { start: "00:00", end: "00:00", isActive: false }
      },
      permissions: {
        manageAppointments: true,
        manageDoctors: false,
        managePatients: true,
        viewReports: false,
        manageSchedule: true
      },
      joinedDate: new Date().toISOString(),
      languages: newReceptionist.languages ? newReceptionist.languages.split(',').map(l => l.trim()) : [],
      skills: newReceptionist.skills ? newReceptionist.skills.split(',').map(s => s.trim()) : [],
      createdBy: "Admin Sophie Martin"
    };

    setReceptionists([...receptionists, receptionist]);
    setIsNewReceptionistModal(false);
    setToastMessage(`${receptionist.firstName} ${receptionist.lastName} créé(e) avec succès`);
    setShowSuccessToast(true);

    // Reset form
    setNewReceptionist({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      employeeId: '',
      department: '',
      position: '',
      experience: 0,
      salary: 2200,
      address: '',
      languages: '',
      skills: ''
    });
  };

  const updateReceptionist = () => {
    if (!selectedReceptionist) return;

    const updatedReceptionist: Receptionist = {
      ...selectedReceptionist,
      firstName: newReceptionist.firstName,
      lastName: newReceptionist.lastName,
      email: newReceptionist.email,
      password: newReceptionist.password,
      phone: newReceptionist.phone,
      employeeId: newReceptionist.employeeId,
      department: newReceptionist.department,
      position: newReceptionist.position,
      experience: newReceptionist.experience,
      salary: newReceptionist.salary,
      address: newReceptionist.address,
      languages: newReceptionist.languages ? newReceptionist.languages.split(',').map(l => l.trim()) : [],
      skills: newReceptionist.skills ? newReceptionist.skills.split(',').map(s => s.trim()) : []
    };

    setReceptionists(receptionists.map(rec => rec.id === selectedReceptionist.id ? updatedReceptionist : rec));
    setIsEditReceptionistModal(false);
    setToastMessage(`${updatedReceptionist.firstName} ${updatedReceptionist.lastName} mis(e) à jour`);
    setShowSuccessToast(true);
  };

  const updateReceptionistStatus = (receptionistId: string, status: Receptionist['status']) => {
    setReceptionists(receptionists.map(rec =>
      rec.id === receptionistId ? { ...rec, status } : rec
    ));
    
    const receptionist = receptionists.find(r => r.id === receptionistId);
    setToastMessage(`Statut de ${receptionist?.firstName} ${receptionist?.lastName} mis à jour: ${getStatusLabel(status)}`);
    setShowSuccessToast(true);
  };

  const copyCredentials = (receptionist: Receptionist) => {
    const credentials = `Email: ${receptionist.email}\nMot de passe: ${receptionist.password}`;
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

  const filteredReceptionists = getFilteredReceptionists();
  const activeReceptionists = receptionists.filter(rec => rec.status === 'active');
  const suspendedReceptionists = receptionists.filter(rec => rec.status === 'suspended');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestion des Réceptionnistes</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsNewReceptionistModal(true)}>
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
                  <h2 style={{ margin: "0", color: "var(--ion-color-primary)" }}>{receptionists.length}</h2>
                  <p style={{ margin: "0", fontSize: "0.8rem" }}>Total réceptionnistes</p>
                </IonCol>
                <IonCol size="4" style={{ textAlign: "center" }}>
                  <h2 style={{ margin: "0", color: "var(--ion-color-success)" }}>{activeReceptionists.length}</h2>
                  <p style={{ margin: "0", fontSize: "0.8rem" }}>Actifs</p>
                </IonCol>
                <IonCol size="4" style={{ textAlign: "center" }}>
                  <h2 style={{ margin: "0", color: "var(--ion-color-danger)" }}>{suspendedReceptionists.length}</h2>
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
              placeholder="Rechercher par nom, département, ID..."
              showClearButton="focus"
            />
            
            <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
              <IonSelect
                value={filterDepartment}
                placeholder="Département"
                onIonChange={e => setFilterDepartment(e.detail.value)}
                style={{ minWidth: "150px" }}
              >
                <IonSelectOption value="">Tous les départements</IonSelectOption>
                {departments.map(dept => (
                  <IonSelectOption key={dept} value={dept}>
                    {dept}
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

        {/* Liste des réceptionnistes */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              Réceptionnistes ({filteredReceptionists.length})
            </IonCardTitle>
          </IonCardHeader>
          
          <IonList>
            {filteredReceptionists.map(receptionist => (
              <IonItemSliding key={receptionist.id}>
                <IonItem button onClick={() => viewReceptionistDetails(receptionist)}>
                  <IonAvatar slot="start">
                    <img src={receptionist.avatar || "https://ionicframework.com/docs/img/demos/avatar.svg"} alt="Avatar" />
                  </IonAvatar>
                  
                  <IonLabel>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ flex: 1 }}>
                        <h2 style={{ fontWeight: "bold", margin: "0 0 4px 0" }}>
                          {receptionist.firstName} {receptionist.lastName}
                        </h2>
                        <h3 style={{ color: "var(--ion-color-primary)", margin: "0 0 4px 0" }}>
                          {receptionist.position} - {receptionist.department}
                        </h3>
                        
                        <p style={{ margin: "0 0 4px 0", fontSize: "0.9rem" }}>
                          <IonIcon icon={idCardOutline} style={{ marginRight: "4px" }} />
                          ID: {receptionist.employeeId}
                        </p>
                        
                        <p style={{ margin: "0 0 4px 0", fontSize: "0.9rem" }}>
                          <IonIcon icon={mailOutline} style={{ marginRight: "4px" }} />
                          {receptionist.email}
                        </p>
                        
                        <p style={{ margin: "0 0 4px 0", fontSize: "0.9rem" }}>
                          <IonIcon icon={callOutline} style={{ marginRight: "4px" }} />
                          {receptionist.phone}
                        </p>
                        
                        <p style={{ margin: "0 0 4px 0", fontSize: "0.9rem" }}>
                          Expérience: {receptionist.experience} ans • Salaire: {receptionist.salary}€
                        </p>
                        
                        <p style={{ margin: "0 0 8px 0", fontSize: "0.9rem" }}>
                          Embauché le: {new Date(receptionist.joinedDate).toLocaleDateString('fr-FR')}
                        </p>
                        
                        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                          <IonChip color={getStatusColor(receptionist.status)} style={{ fontSize: "0.8rem" }}>
                            {getStatusLabel(receptionist.status)}
                          </IonChip>
                          
                          {receptionist.permissions.manageAppointments && (
                            <IonChip color="secondary" style={{ fontSize: "0.8rem" }}>
                              RDV
                            </IonChip>
                          )}
                          
                          {receptionist.permissions.manageDoctors && (
                            <IonChip color="tertiary" style={{ fontSize: "0.8rem" }}>
                              Médecins
                            </IonChip>
                          )}
                          
                          {receptionist.permissions.viewReports && (
                            <IonChip color="warning" style={{ fontSize: "0.8rem" }}>
                              Rapports
                            </IonChip>
                          )}
                          
                          {receptionist.lastLogin && (
                            <IonChip color="medium" style={{ fontSize: "0.8rem" }}>
                              Connexion: {new Date(receptionist.lastLogin).toLocaleDateString('fr-FR')}
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
                            copyCredentials(receptionist);
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
                            editReceptionist(receptionist);
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
                            deleteReceptionist(receptionist);
                          }}
                        >
                          <IonIcon icon={trashOutline} />
                        </IonButton>
                      </div>
                    </div>
                  </IonLabel>
                </IonItem>
                
                <IonItemOptions side="end">
                  {receptionist.status !== 'active' && (
                    <IonItemOption
                      color="success"
                      onClick={() => updateReceptionistStatus(receptionist.id, 'active')}
                    >
                      <IonIcon icon={checkmarkCircleOutline} />
                      Activer
                    </IonItemOption>
                  )}
                  
                  {receptionist.status !== 'suspended' && (
                    <IonItemOption
                      color="danger"
                      onClick={() => updateReceptionistStatus(receptionist.id, 'suspended')}
                    >
                      <IonIcon icon={banOutline} />
                      Suspendre
                    </IonItemOption>
                  )}
                  
                  <IonItemOption
                    color="warning"
                    onClick={() => editReceptionist(receptionist)}
                  >
                    <IonIcon icon={createOutline} />
                    Modifier
                  </IonItemOption>
                  
                  <IonItemOption
                    color="danger"
                    onClick={() => deleteReceptionist(receptionist)}
                  >
                    <IonIcon icon={trashOutline} />
                    Supprimer
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
            
            {filteredReceptionists.length === 0 && (
              <IonItem>
                <IonLabel style={{ textAlign: "center", color: "var(--ion-color-medium)" }}>
                  Aucun réceptionniste trouvé
                </IonLabel>
              </IonItem>
            )}
          </IonList>
        </IonCard>

        {/* FAB pour nouveau réceptionniste */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setIsNewReceptionistModal(true)}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>

        {/* Modal nouveau réceptionniste */}
        <IonModal isOpen={isNewReceptionistModal} onDidDismiss={() => setIsNewReceptionistModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Nouveau Réceptionniste</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsNewReceptionistModal(false)}>
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
                    value={newReceptionist.firstName}
                    placeholder="Prénom"
                    onIonInput={e => {
                      const firstName = e.detail.value!;
                      setNewReceptionist({...newReceptionist, firstName});
                      if (firstName && newReceptionist.lastName) {
                        generateEmail(firstName, newReceptionist.lastName);
                      }
                    }}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Nom *</IonLabel>
                  <IonInput
                    value={newReceptionist.lastName}
                    placeholder="Nom"
                    onIonInput={e => {
                      const lastName = e.detail.value!;
                      setNewReceptionist({...newReceptionist, lastName});
                      if (newReceptionist.firstName && lastName) {
                        generateEmail(newReceptionist.firstName, lastName);
                      }
                    }}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Email *</IonLabel>
                  <IonInput
                    value={newReceptionist.email}
                    placeholder="email@clinique.com"
                    type="email"
                    onIonInput={e => setNewReceptionist({...newReceptionist, email: e.detail.value!})}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Mot de passe *</IonLabel>
                  <div style={{ display: "flex", gap: "8px", width: "100%" }}>
                    <IonInput
                      value={newReceptionist.password}
                      placeholder="Mot de passe"
                      type="text"
                      style={{ flex: 1 }}
                      onIonInput={e => setNewReceptionist({...newReceptionist, password: e.detail.value!})}
                    />
                    <IonButton fill="outline" onClick={generatePassword}>
                      Générer
                    </IonButton>
                  </div>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">ID Employé</IonLabel>
                  <div style={{ display: "flex", gap: "8px", width: "100%" }}>
                    <IonInput
                      value={newReceptionist.employeeId}
                      placeholder="REC001"
                      style={{ flex: 1 }}
                      onIonInput={e => setNewReceptionist({...newReceptionist, employeeId: e.detail.value!})}
                    />
                    <IonButton fill="outline" onClick={generateEmployeeId}>
                      Auto
                    </IonButton>
                  </div>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Téléphone</IonLabel>
                  <IonInput
                    value={newReceptionist.phone}
                    placeholder="+33 1 23 45 67 89"
                    type="tel"
                    onIonInput={e => setNewReceptionist({...newReceptionist, phone: e.detail.value!})}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Département *</IonLabel>
                  <IonSelect
                    value={newReceptionist.department}
                    placeholder="Sélectionner un département"
                    onIonChange={e => setNewReceptionist({...newReceptionist, department: e.detail.value})}
                  >
                    {departments.map(dept => (
                      <IonSelectOption key={dept} value={dept}>
                        {dept}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Poste *</IonLabel>
                  <IonSelect
                    value={newReceptionist.position}
                    placeholder="Sélectionner un poste"
                    onIonChange={e => setNewReceptionist({...newReceptionist, position: e.detail.value})}
                  >
                    {positions.map(pos => (
                      <IonSelectOption key={pos} value={pos}>
                        {pos}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Années d'expérience</IonLabel>
                  <IonInput
                    value={newReceptionist.experience}
                    placeholder="0"
                    type="number"
                    onIonInput={e => setNewReceptionist({...newReceptionist, experience: parseInt(e.detail.value!) || 0})}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Salaire mensuel (€)</IonLabel>
                  <IonInput
                    value={newReceptionist.salary}
                    placeholder="2200"
                    type="number"
                    onIonInput={e => setNewReceptionist({...newReceptionist, salary: parseInt(e.detail.value!) || 2200})}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Adresse</IonLabel>
                  <IonTextarea
                    value={newReceptionist.address}
                    placeholder="Adresse personnelle..."
                    rows={2}
                    onIonInput={e => setNewReceptionist({...newReceptionist, address: e.detail.value!})}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Langues parlées</IonLabel>
                  <IonInput
                    value={newReceptionist.languages}
                    placeholder="Français, Anglais..."
                    onIonInput={e => setNewReceptionist({...newReceptionist, languages: e.detail.value!})}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Compétences</IonLabel>
                  <IonTextarea
                    value={newReceptionist.skills}
                    placeholder="Accueil, Téléphonie, Informatique..."
                    rows={2}
                    onIonInput={e => setNewReceptionist({...newReceptionist, skills: e.detail.value!})}
                  />
                </IonItem>
              </IonList>

              <IonButton expand="block" onClick={createReceptionist} style={{ marginTop: "1rem" }}>
                <IonIcon icon={saveOutline} slot="start" />
                Créer le réceptionniste
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        {/* Modal modification réceptionniste */}
        <IonModal isOpen={isEditReceptionistModal} onDidDismiss={() => setIsEditReceptionistModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Modifier Réceptionniste</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsEditReceptionistModal(false)}>
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
                    value={newReceptionist.firstName}
                    placeholder="Prénom"
                    onIonInput={e => setNewReceptionist({...newReceptionist, firstName: e.detail.value!})}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Nom *</IonLabel>
                  <IonInput
                    value={newReceptionist.lastName}
                    placeholder="Nom"
                    onIonInput={e => setNewReceptionist({...newReceptionist, lastName: e.detail.value!})}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Département *</IonLabel>
                  <IonSelect
                    value={newReceptionist.department}
                    placeholder="Sélectionner un département"
                    onIonChange={e => setNewReceptionist({...newReceptionist, department: e.detail.value})}
                  >
                    {departments.map(dept => (
                      <IonSelectOption key={dept} value={dept}>
                        {dept}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Poste *</IonLabel>
                  <IonSelect
                    value={newReceptionist.position}
                    placeholder="Sélectionner un poste"
                    onIonChange={e => setNewReceptionist({...newReceptionist, position: e.detail.value})}
                  >
                    {positions.map(pos => (
                      <IonSelectOption key={pos} value={pos}>
                        {pos}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Salaire mensuel (€)</IonLabel>
                  <IonInput
                    value={newReceptionist.salary}
                    placeholder="2200"
                    type="number"
                    onIonInput={e => setNewReceptionist({...newReceptionist, salary: parseInt(e.detail.value!) || 2200})}
                  />
                </IonItem>
              </IonList>

              <IonButton expand="block" onClick={updateReceptionist} style={{ marginTop: "1rem" }}>
                <IonIcon icon={saveOutline} slot="start" />
                Mettre à jour
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        {/* Modal détails réceptionniste */}
        <IonModal isOpen={isReceptionistDetailModal} onDidDismiss={() => setIsReceptionistDetailModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Détails Réceptionniste</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsReceptionistDetailModal(false)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {selectedReceptionist && (
              <div style={{ padding: "1rem" }}>
                <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                  <IonAvatar style={{ width: "80px", height: "80px", margin: "0 auto 1rem" }}>
                    <img src={selectedReceptionist.avatar || "https://ionicframework.com/docs/img/demos/avatar.svg"} alt="Avatar" />
                  </IonAvatar>
                  <h1>{selectedReceptionist.firstName} {selectedReceptionist.lastName}</h1>
                  <p style={{ color: "var(--ion-color-primary)", fontSize: "1.1rem" }}>
                    {selectedReceptionist.position}
                  </p>
                  <p style={{ color: "var(--ion-color-medium)" }}>
                    {selectedReceptionist.department}
                  </p>
                  <IonChip color={getStatusColor(selectedReceptionist.status)}>
                    {getStatusLabel(selectedReceptionist.status)}
                  </IonChip>
                </div>

                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Identifiants de connexion</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p><strong>Email:</strong> {selectedReceptionist.email}</p>
                    <p><strong>Mot de passe:</strong> {selectedReceptionist.password}</p>
                    <p><strong>ID Employé:</strong> {selectedReceptionist.employeeId}</p>
                    <IonButton 
                      expand="block" 
                      fill="outline" 
                      onClick={() => copyCredentials(selectedReceptionist)}
                    >
                      <IonIcon icon={copyOutline} slot="start" />
                      Copier les identifiants
                    </IonButton>
                  </IonCardContent>
                </IonCard>

                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Permissions</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>Gestion des rendez-vous</span>
                        <IonChip color={selectedReceptionist.permissions.manageAppointments ? "success" : "medium"}>
                          {selectedReceptionist.permissions.manageAppointments ? "Autorisé" : "Non autorisé"}
                        </IonChip>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>Gestion des médecins</span>
                        <IonChip color={selectedReceptionist.permissions.manageDoctors ? "success" : "medium"}>
                          {selectedReceptionist.permissions.manageDoctors ? "Autorisé" : "Non autorisé"}
                        </IonChip>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>Gestion des patients</span>
                        <IonChip color={selectedReceptionist.permissions.managePatients ? "success" : "medium"}>
                          {selectedReceptionist.permissions.managePatients ? "Autorisé" : "Non autorisé"}
                        </IonChip>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>Consultation des rapports</span>
                        <IonChip color={selectedReceptionist.permissions.viewReports ? "success" : "medium"}>
                          {selectedReceptionist.permissions.viewReports ? "Autorisé" : "Non autorisé"}
                        </IonChip>
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>

                <IonList>
                  <IonItem>
                    <IonIcon icon={callOutline} slot="start" />
                    <IonLabel>
                      <h3>Téléphone</h3>
                      <p>{selectedReceptionist.phone}</p>
                    </IonLabel>
                  </IonItem>
                  
                  <IonItem>
                    <IonIcon icon={businessOutline} slot="start" />
                    <IonLabel>
                      <h3>Salaire</h3>
                      <p>{selectedReceptionist.salary}€/mois</p>
                    </IonLabel>
                  </IonItem>
                  
                  <IonItem>
                    <IonIcon icon={starOutline} slot="start" />
                    <IonLabel>
                      <h3>Expérience</h3>
                      <p>{selectedReceptionist.experience} ans</p>
                    </IonLabel>
                  </IonItem>
                  
                  <IonItem>
                    <IonIcon icon={personAddOutline} slot="start" />
                    <IonLabel>
                      <h3>Embauché par</h3>
                      <p>{selectedReceptionist.createdBy}</p>
                      <p>Le {new Date(selectedReceptionist.joinedDate).toLocaleDateString('fr-FR')}</p>
                    </IonLabel>
                  </IonItem>
                </IonList>

                <div style={{ marginTop: "2rem", display: "flex", gap: "8px" }}>
                  <IonButton 
                    expand="block" 
                    color="warning" 
                    onClick={() => {
                      editReceptionist(selectedReceptionist);
                      setIsReceptionistDetailModal(false);
                    }}
                  >
                    <IonIcon icon={createOutline} slot="start" />
                    Modifier
                  </IonButton>
                  
                  {selectedReceptionist.status !== 'suspended' && (
                    <IonButton 
                      expand="block" 
                      color="danger" 
                      onClick={() => {
                        updateReceptionistStatus(selectedReceptionist.id, 'suspended');
                        setIsReceptionistDetailModal(false);
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
          header="Supprimer le réceptionniste"
          message={`Voulez-vous vraiment supprimer définitivement ${selectedReceptionist?.firstName} ${selectedReceptionist?.lastName} ? Cette action est irréversible.`}
          buttons={[
            {
              text: 'Annuler',
              role: 'cancel'
            },
            {
              text: 'Supprimer',
              handler: confirmDeleteReceptionist
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

export default AdminReceptionistManagement;