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
  IonNote,
  IonCheckbox,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonToggle,
  IonPopover
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
  eyeOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  mailOutline,
  locationOutline,
  schoolOutline,
  starOutline,
  businessOutline,
  idCardOutline
} from "ionicons/icons";

interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  email: string;
  phone: string;
  avatar?: string;
  isAvailable: boolean;
  status: 'active' | 'inactive' | 'vacation' | 'sick';
  licenseNumber: string;
  qualification: string;
  experience: number;
  rating: number;
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
  nextAvailableSlot?: string;
  todayAppointments: number;
  weeklyAppointments: number;
  monthlyAppointments: number;
  joinedDate: string;
  languages: string[];
  certificates: string[];
}

interface TimeSlot {
  time: string;
  isBooked: boolean;
  patientName?: string;
  appointmentType?: string;
}

const DoctorManagement: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState<string>('');
  const [isDoctorDetailModal, setIsDoctorDetailModal] = useState(false);
  const [isScheduleModal, setIsScheduleModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Données fictives des médecins
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: "doc1",
      firstName: "Marie",
      lastName: "Dupont",
      specialty: "Cardiologie",
      email: "marie.dupont@clinique.com",
      phone: "+33 1 23 45 67 89",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      isAvailable: true,
      status: "active",
      licenseNumber: "FR123456789",
      qualification: "Doctorat en Médecine, Spécialité Cardiologie",
      experience: 15,
      rating: 4.8,
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
      nextAvailableSlot: "2024-10-22T09:00:00",
      todayAppointments: 8,
      weeklyAppointments: 35,
      monthlyAppointments: 142,
      joinedDate: "2020-03-15",
      languages: ["Français", "Anglais", "Espagnol"],
      certificates: ["Certification Échographie Cardiaque", "Formation Cathétérisme"]
    },
    {
      id: "doc2",
      firstName: "Jean",
      lastName: "Martin",
      specialty: "Médecine générale",
      email: "jean.martin@clinique.com",
      phone: "+33 1 34 56 78 90",
      avatar: "https://randomuser.me/api/portraits/men/50.jpg",
      isAvailable: true,
      status: "active",
      licenseNumber: "FR987654321",
      qualification: "Doctorat en Médecine Générale",
      experience: 12,
      rating: 4.6,
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
      nextAvailableSlot: "2024-10-22T10:30:00",
      todayAppointments: 12,
      weeklyAppointments: 48,
      monthlyAppointments: 195,
      joinedDate: "2021-06-10",
      languages: ["Français", "Anglais"],
      certificates: ["Formation Médecine Préventive", "Certification Diabétologie"]
    },
    {
      id: "doc3",
      firstName: "Sarah",
      lastName: "Leroy",
      specialty: "Pédiatrie",
      email: "sarah.leroy@clinique.com",
      phone: "+33 1 45 67 89 01",
      avatar: "https://randomuser.me/api/portraits/women/38.jpg",
      isAvailable: false,
      status: "vacation",
      licenseNumber: "FR456789123",
      qualification: "Doctorat en Pédiatrie",
      experience: 8,
      rating: 4.9,
      consultationFee: 70,
      address: "8 Boulevard des Enfants, 75015 Paris",
      workingHours: {
        monday: { start: "08:30", end: "17:30", isActive: true },
        tuesday: { start: "08:30", end: "17:30", isActive: true },
        wednesday: { start: "08:30", end: "17:30", isActive: true },
        thursday: { start: "08:30", end: "17:30", isActive: true },
        friday: { start: "08:30", end: "16:30", isActive: true },
        saturday: { start: "09:00", end: "13:00", isActive: true },
        sunday: { start: "00:00", end: "00:00", isActive: false }
      },
      nextAvailableSlot: "2024-10-28T08:30:00",
      todayAppointments: 0,
      weeklyAppointments: 0,
      monthlyAppointments: 98,
      joinedDate: "2022-01-20",
      languages: ["Français", "Anglais", "Italien"],
      certificates: ["Spécialisation Néonatologie", "Formation Allergologie Pédiatrique"]
    },
    {
      id: "doc4",
      firstName: "Thomas",
      lastName: "Dubois",
      specialty: "Orthopédie",
      email: "thomas.dubois@clinique.com",
      phone: "+33 1 56 78 90 12",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
      isAvailable: true,
      status: "active",
      licenseNumber: "FR789123456",
      qualification: "Doctorat en Chirurgie Orthopédique",
      experience: 20,
      rating: 4.7,
      consultationFee: 90,
      address: "5 Place de l'Orthopédie, 75016 Paris",
      workingHours: {
        monday: { start: "07:00", end: "16:00", isActive: true },
        tuesday: { start: "07:00", end: "16:00", isActive: true },
        wednesday: { start: "07:00", end: "16:00", isActive: true },
        thursday: { start: "07:00", end: "16:00", isActive: true },
        friday: { start: "07:00", end: "15:00", isActive: true },
        saturday: { start: "00:00", end: "00:00", isActive: false },
        sunday: { start: "00:00", end: "00:00", isActive: false }
      },
      nextAvailableSlot: "2024-10-22T14:00:00",
      todayAppointments: 6,
      weeklyAppointments: 28,
      monthlyAppointments: 115,
      joinedDate: "2019-09-01",
      languages: ["Français", "Anglais", "Allemand"],
      certificates: ["Certification Arthroscopie", "Formation Prothèses Articulaires"]
    }
  ]);

  const specialties = Array.from(new Set(doctors.map(doc => doc.specialty)));



  const getFilteredDoctors = () => {
    let filtered = doctors;

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

    return filtered.sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`));
  };

  const generateTimeSlots = (doctor: Doctor, date: string): TimeSlot[] => {
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
    const dayMapping: { [key: string]: keyof typeof doctor.workingHours } = {
      'sun': 'sunday',
      'mon': 'monday',
      'tue': 'tuesday',
      'wed': 'wednesday',
      'thu': 'thursday',
      'fri': 'friday',
      'sat': 'saturday'
    };
    
    const dayKey = dayMapping[dayOfWeek];
    const workingHours = doctor.workingHours[dayKey];
    
    if (!workingHours.isActive) {
      return [];
    }

    const slots: TimeSlot[] = [];
    const startHour = parseInt(workingHours.start.split(':')[0]);
    const startMinute = parseInt(workingHours.start.split(':')[1]);
    const endHour = parseInt(workingHours.end.split(':')[0]);
    const endMinute = parseInt(workingHours.end.split(':')[1]);

    let currentHour = startHour;
    let currentMinute = startMinute;

    while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
      const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
      
      // Simulation de créneaux occupés
      const isBooked = Math.random() < 0.3; // 30% de chance d'être occupé
      const patientNames = ['Pierre Durand', 'Marie Moreau', 'Sophie Bernard', 'Jean Leroy', 'Anna Martin'];
      const appointmentTypes = ['Consultation', 'Contrôle', 'Première visite', 'Urgence'];
      
      slots.push({
        time: timeString,
        isBooked,
        patientName: isBooked ? patientNames[Math.floor(Math.random() * patientNames.length)] : undefined,
        appointmentType: isBooked ? appointmentTypes[Math.floor(Math.random() * appointmentTypes.length)] : undefined
      });

      // Ajouter 30 minutes
      currentMinute += 30;
      if (currentMinute >= 60) {
        currentHour += 1;
        currentMinute = 0;
      }
    }

    return slots;
  };

  const viewDoctorDetails = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsDoctorDetailModal(true);
  };

  const viewDoctorSchedule = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsScheduleModal(true);
  };



  const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  const filteredDoctors = getFilteredDoctors();
  const totalAppointmentsToday = doctors.reduce((sum, doc) => sum + doc.todayAppointments, 0);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestion des Médecins</IonTitle>
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
                  <h2 style={{ margin: "0", color: "var(--ion-color-warning)" }}>{totalAppointmentsToday}</h2>
                  <p style={{ margin: "0", fontSize: "0.8rem" }}>RDV aujourd'hui</p>
                </IonCol>
                <IonCol size="4" style={{ textAlign: "center" }}>
                  <h2 style={{ margin: "0", color: "var(--ion-color-tertiary)" }}>{specialties.length}</h2>
                  <p style={{ margin: "0", fontSize: "0.8rem" }}>Spécialités</p>
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
            </div>
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
                        
                        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
                          <IonIcon icon={starOutline} style={{ fontSize: "0.9rem" }} />
                          <span style={{ fontSize: "0.9rem" }}>{doctor.rating}/5</span>
                          <span style={{ fontSize: "0.9rem", color: "var(--ion-color-medium)" }}>
                            ({doctor.experience} ans d'exp.)
                          </span>
                        </div>
                        
                        <p style={{ margin: "0 0 4px 0", fontSize: "0.9rem" }}>
                          <IonIcon icon={callOutline} style={{ marginRight: "4px" }} />
                          {doctor.phone}
                        </p>
                        
                        <p style={{ margin: "0 0 8px 0", fontSize: "0.9rem" }}>
                          RDV aujourd'hui: <strong>{doctor.todayAppointments}</strong>
                          {doctor.nextAvailableSlot && (
                            <span style={{ marginLeft: "8px", color: "var(--ion-color-success)" }}>
                              Prochaine dispo: {new Date(doctor.nextAvailableSlot).toLocaleString('fr-FR', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </IonLabel>
                </IonItem>
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

        {/* Modal détails médecin */}
        <IonModal isOpen={isDoctorDetailModal} onDidDismiss={() => setIsDoctorDetailModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Détails du Médecin</IonTitle>
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
                </div>

                <IonList>
                  <IonItem>
                    <IonIcon icon={idCardOutline} slot="start" />
                    <IonLabel>
                      <h3>Numéro de licence</h3>
                      <p>{selectedDoctor.licenseNumber}</p>
                    </IonLabel>
                  </IonItem>
                  
                  <IonItem>
                    <IonIcon icon={schoolOutline} slot="start" />
                    <IonLabel>
                      <h3>Qualification</h3>
                      <p>{selectedDoctor.qualification}</p>
                    </IonLabel>
                  </IonItem>
                  
                  <IonItem>
                    <IonIcon icon={starOutline} slot="start" />
                    <IonLabel>
                      <h3>Expérience</h3>
                      <p>{selectedDoctor.experience} ans • Note: {selectedDoctor.rating}/5</p>
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
                    <IonIcon icon={mailOutline} slot="start" />
                    <IonLabel>
                      <h3>Email</h3>
                      <p>{selectedDoctor.email}</p>
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
                    <IonIcon icon={locationOutline} slot="start" />
                    <IonLabel>
                      <h3>Adresse</h3>
                      <p>{selectedDoctor.address}</p>
                    </IonLabel>
                  </IonItem>
                </IonList>

                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Langues parlées</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                      {selectedDoctor.languages.map(lang => (
                        <IonChip key={lang} color="tertiary">
                          {lang}
                        </IonChip>
                      ))}
                    </div>
                  </IonCardContent>
                </IonCard>

                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Certifications</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {selectedDoctor.certificates.map(cert => (
                      <IonItem key={cert} lines="none">
                        <IonIcon icon={checkmarkCircleOutline} slot="start" color="success" />
                        <IonLabel>{cert}</IonLabel>
                      </IonItem>
                    ))}
                  </IonCardContent>
                </IonCard>

                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Statistiques</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="4" style={{ textAlign: "center" }}>
                          <h3 style={{ margin: "0", color: "var(--ion-color-primary)" }}>
                            {selectedDoctor.todayAppointments}
                          </h3>
                          <p style={{ margin: "0", fontSize: "0.9rem" }}>Aujourd'hui</p>
                        </IonCol>
                        <IonCol size="4" style={{ textAlign: "center" }}>
                          <h3 style={{ margin: "0", color: "var(--ion-color-success)" }}>
                            {selectedDoctor.weeklyAppointments}
                          </h3>
                          <p style={{ margin: "0", fontSize: "0.9rem" }}>Cette semaine</p>
                        </IonCol>
                        <IonCol size="4" style={{ textAlign: "center" }}>
                          <h3 style={{ margin: "0", color: "var(--ion-color-warning)" }}>
                            {selectedDoctor.monthlyAppointments}
                          </h3>
                          <p style={{ margin: "0", fontSize: "0.9rem" }}>Ce mois</p>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              </div>
            )}
          </IonContent>
        </IonModal>

        {/* Modal planning médecin */}
        <IonModal isOpen={isScheduleModal} onDidDismiss={() => setIsScheduleModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>
                Planning - Dr. {selectedDoctor?.firstName} {selectedDoctor?.lastName}
              </IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsScheduleModal(false)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {selectedDoctor && (
              <div style={{ padding: "1rem" }}>
                <IonItem>
                  <IonLabel position="stacked">Sélectionner une date</IonLabel>
                  <IonInput
                    type="date"
                    value={selectedDate}
                    onIonInput={e => setSelectedDate(e.detail.value!)}
                  />
                </IonItem>

                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>
                      Créneaux pour le {new Date(selectedDate).toLocaleDateString('fr-FR')}
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {(() => {
                      const slots = generateTimeSlots(selectedDoctor, selectedDate);
                      if (slots.length === 0) {
                        return (
                          <p style={{ textAlign: "center", color: "var(--ion-color-medium)" }}>
                            Pas de consultation ce jour
                          </p>
                        );
                      }
                      
                      return (
                        <IonGrid>
                          {slots.reduce((rows: any[], slot, index) => {
                            if (index % 2 === 0) {
                              rows.push([slot]);
                            } else {
                              rows[rows.length - 1].push(slot);
                            }
                            return rows;
                          }, []).map((rowSlots, rowIndex) => (
                            <IonRow key={rowIndex}>
                              {rowSlots.map((slot: TimeSlot) => (
                                <IonCol key={slot.time} size="6">
                                  <div
                                    style={{
                                      padding: "8px",
                                      border: "1px solid var(--ion-color-light)",
                                      borderRadius: "4px",
                                      backgroundColor: slot.isBooked 
                                        ? "var(--ion-color-danger-tint)" 
                                        : "var(--ion-color-success-tint)",
                                      textAlign: "center"
                                    }}
                                  >
                                    <div style={{ fontWeight: "bold" }}>{slot.time}</div>
                                    {slot.isBooked ? (
                                      <div>
                                        <div style={{ fontSize: "0.8rem" }}>{slot.patientName}</div>
                                        <div style={{ fontSize: "0.7rem", color: "var(--ion-color-medium)" }}>
                                          {slot.appointmentType}
                                        </div>
                                      </div>
                                    ) : (
                                      <div style={{ fontSize: "0.8rem", color: "var(--ion-color-success)" }}>
                                        Libre
                                      </div>
                                    )}
                                  </div>
                                </IonCol>
                              ))}
                            </IonRow>
                          ))}
                        </IonGrid>
                      );
                    })()}
                  </IonCardContent>
                </IonCard>

                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Horaires de travail</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {Object.entries(selectedDoctor.workingHours).map(([day, hours]) => {
                      const dayNames: { [key: string]: string } = {
                        monday: 'Lundi',
                        tuesday: 'Mardi',
                        wednesday: 'Mercredi',
                        thursday: 'Jeudi',
                        friday: 'Vendredi',
                        saturday: 'Samedi',
                        sunday: 'Dimanche'
                      };
                      
                      return (
                        <IonItem key={day} lines="none">
                          <IonLabel>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <span>{dayNames[day]}</span>
                              <span>
                                {hours.isActive 
                                  ? `${hours.start} - ${hours.end}` 
                                  : 'Fermé'
                                }
                              </span>
                            </div>
                          </IonLabel>
                        </IonItem>
                      );
                    })}
                  </IonCardContent>
                </IonCard>
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

export default DoctorManagement;