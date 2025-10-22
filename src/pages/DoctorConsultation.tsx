import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
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
  IonTextarea,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonAvatar,
  IonSegment,
  IonSegmentButton,
  IonAccordion,
  IonAccordionGroup,
  IonNote,
  IonChip,
  IonAlert,
  IonToast,
  IonModal,
  IonDatetime,
  IonRadioGroup,
  IonRadio
} from "@ionic/react";
import {
  personOutline,
  medkitOutline,
  documentTextOutline,
  addOutline,
  saveOutline,
  printOutline,
  warningOutline,
  heartOutline,
  pulseOutline,
  thermometerOutline,
  scaleOutline,
  eyeOutline,
  calendarOutline,
  closeOutline,
  logOutOutline,
  createOutline,
  trashOutline
} from "ionicons/icons";

interface Appointment {
  id: string;
  patientName: string;
  patientAvatar?: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  notes?: string;
  isFirstVisit: boolean;
  patientPhone?: string;
  reason: string;
}

interface LocationState {
  patient?: Appointment;
  mode?: string;
}

interface PatientRecord {
  id: string;
  name: string;
  avatar?: string;
  age: number;
  gender: string;
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  currentMedications: string[];
  lastVisit: string;
  weight: number;
  height: number;
  bloodPressure: string;
}

interface Consultation {
  id: string;
  date: string;
  symptoms: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  vitals: {
    bloodPressure: string;
    weight: number;
  };
}

interface Prescription {
  id: string;
  date: string;
  patientName: string;
  diagnosis: string;
  treatment: string;
  notes?: string;
  vitals: {
    bloodPressure: string;
    weight: number;
  };
}

const DoctorConsultation: React.FC = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const [selectedSegment, setSelectedSegment] = useState<string>('dossier');
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [isNewConsultationModal, setIsNewConsultationModal] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showHistoryDetailModal, setShowHistoryDetailModal] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [prescriptionPatient, setPrescriptionPatient] = useState<string>('');
  const [isPrescriptionDirectMode, setIsPrescriptionDirectMode] = useState(false);
  
  // États pour prescription directe
  const [directPrescription, setDirectPrescription] = useState({
    diagnosis: "",
    treatment: "",
    notes: ""
  });

  // États pour l'édition et suppression
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [showPrescriptionDetailModal, setShowPrescriptionDetailModal] = useState(false);
  const [showDeletePrescriptionAlert, setShowDeletePrescriptionAlert] = useState(false);
  const [isEditingPrescription, setIsEditingPrescription] = useState(false);
  const [showDeleteConsultationAlert, setShowDeleteConsultationAlert] = useState(false);
  const [consultationToDelete, setConsultationToDelete] = useState<string | null>(null);
  const [isEditingConsultation, setIsEditingConsultation] = useState(false);
  const [selectedConsultationForEdit, setSelectedConsultationForEdit] = useState<Consultation | null>(null);

  // Liste des patients disponibles pour les ordonnances
  const availablePatients = [
    { id: "1", name: "Jean Dupont", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: "2", name: "Marie Martin", avatar: "https://randomuser.me/api/portraits/women/28.jpg" },
    { id: "3", name: "Pierre Durand", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
    { id: "4", name: "Sophie Moreau", avatar: "https://randomuser.me/api/portraits/women/35.jpg" }
  ];

  // États pour l'ajout/suppression d'éléments
  const [newAllergy, setNewAllergy] = useState('');
  const [newCondition, setNewCondition] = useState('');
  const [newMedication, setNewMedication] = useState('');

  // Récupérer les données du patient depuis la navigation ou utiliser des données par défaut
  const selectedPatient = location.state?.patient;
  const initialMode = location.state?.mode || 'dossier';

  // Ajuster le segment initial selon le mode
  useEffect(() => {
    if (initialMode === 'consultation') {
      setSelectedSegment('nouvelle');
    } else {
      setSelectedSegment('dossier');
    }
  }, [initialMode]);

  // Mettre à jour l'historique et les infos modifiables quand le patient change
  useEffect(() => {
    // Calculer les données du patient directement ici
    let currentPatientRecord: PatientRecord;
    
    if (selectedPatient) {
      const patientId = selectedPatient.id;
      
      // Charger les données sauvegardées depuis localStorage
      const savedPatientInfo = localStorage.getItem(`patient_info_${patientId}`);
      
      if (savedPatientInfo) {
        const parsedInfo = JSON.parse(savedPatientInfo);
        currentPatientRecord = {
          id: selectedPatient.id,
          name: selectedPatient.patientName,
          avatar: selectedPatient.patientAvatar,
          age: 45,
          gender: "Non spécifié",
          bloodType: "Non spécifié",
          allergies: parsedInfo.allergies || [],
          chronicConditions: parsedInfo.chronicConditions || [],
          currentMedications: parsedInfo.currentMedications || [],
          lastVisit: selectedPatient.date,
          weight: parsedInfo.weight || 70,
          height: 170,
          bloodPressure: parsedInfo.bloodPressure || "120/80"
        };
      } else {
        // Données par défaut pour un nouveau patient
        currentPatientRecord = {
          id: selectedPatient.id,
          name: selectedPatient.patientName,
          avatar: selectedPatient.patientAvatar,
          age: 45,
          gender: "Non spécifié",
          bloodType: "Non spécifié",
          allergies: [],
          chronicConditions: [],
          currentMedications: [],
          lastVisit: selectedPatient.date,
          weight: 70,
          height: 170,
          bloodPressure: "120/80"
        };
      }
    } else {
      // Données par défaut si aucun patient n'est sélectionné
      currentPatientRecord = {
        id: "P001",
        name: "Jean Dupont",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        age: 45,
        gender: "Masculin",
        bloodType: "A+",
        allergies: ["Pénicilline", "Acariens"],
        chronicConditions: ["Hypertension", "Diabète de type 2"],
        currentMedications: ["Lisinopril 10mg", "Metformine 500mg"],
        lastVisit: "2024-09-15",
        weight: 78,
        height: 175,
        bloodPressure: "140/90"
      };
    }
    
    // Mettre à jour les données du patient
    setPatientRecord(currentPatientRecord);
    
    // Mettre à jour le patient sélectionné pour l'ordonnance (automatiquement le patient en consultation)
    setPrescriptionPatient(selectedPatient?.id || "1");
    
    const newHistory = getPatientConsultationHistory();
    setConsultationHistory(newHistory);
    
    const newPrescriptions = getPatientPrescriptions();
    setPatientPrescriptions(newPrescriptions);
    
    // Charger les données sauvegardées ou utiliser les données par défaut
    setEditablePatientInfo({
      weight: currentPatientRecord.weight,
      bloodPressure: currentPatientRecord.bloodPressure,
      allergies: currentPatientRecord.allergies,
      chronicConditions: currentPatientRecord.chronicConditions,
      currentMedications: currentPatientRecord.currentMedications
    });
  }, [selectedPatient]);

  // Données par défaut pour initialisation
  const defaultPatientRecord: PatientRecord = {
    id: "P001",
    name: "Jean Dupont",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    age: 45,
    gender: "Masculin",
    bloodType: "A+",
    allergies: ["Pénicilline", "Acariens"],
    chronicConditions: ["Hypertension", "Diabète de type 2"],
    currentMedications: ["Lisinopril 10mg", "Metformine 500mg"],
    lastVisit: "2024-09-15",
    weight: 78,
    height: 175,
    bloodPressure: "140/90"
  };

  // État pour les données du patient qui se met à jour
  const [patientRecord, setPatientRecord] = useState<PatientRecord>(defaultPatientRecord);

  // État pour les informations modifiables du patient
  const [editablePatientInfo, setEditablePatientInfo] = useState({
    weight: defaultPatientRecord.weight,
    bloodPressure: defaultPatientRecord.bloodPressure,
    allergies: defaultPatientRecord.allergies,
    chronicConditions: defaultPatientRecord.chronicConditions,
    currentMedications: defaultPatientRecord.currentMedications
  });

  // Historique des consultations par patient - utiliser localStorage pour persistance
  const getPatientConsultationHistory = (): Consultation[] => {
    const patientId = selectedPatient?.id || "P001";
    const patientName = selectedPatient?.patientName || "Jean Dupont";
    const consultationsKey = `consultations_${patientId}`;
    const storedHistory = localStorage.getItem(consultationsKey);
    
    if (storedHistory) {
      return JSON.parse(storedHistory);
    }
    
    // Historique par défaut pour Jean Dupont uniquement
    if (patientId === "P001" || patientId === "1" || patientName === "Jean Dupont") {
      const defaultConsultations = [
        {
          id: "consultation_1",
          date: "2024-09-15",
          symptoms: "Fatigue, soif excessive",
          diagnosis: "Déséquilibre glycémique",
          treatment: "Ajustement posologie Metformine",
          notes: "Patient à revoir dans 3 mois",
          vitals: {
            bloodPressure: "135/85",
            weight: 79
          }
        },
        {
          id: "consultation_2",
          date: "2024-06-10",
          symptoms: "Maux de tête fréquents",
          diagnosis: "Hypertension non contrôlée",
          treatment: "Augmentation Lisinopril à 15mg",
          notes: "Surveillance tension à domicile recommandée",
          vitals: {
            bloodPressure: "150/95",
            weight: 80
          }
        }
      ];
      
      // Sauvegarder les consultations par défaut dans localStorage pour pouvoir les modifier/supprimer
      localStorage.setItem(consultationsKey, JSON.stringify(defaultConsultations));
      
      return defaultConsultations;
    }
    
    // Retourner un tableau vide pour les nouveaux patients
    return [];
  };

  const [consultationHistory, setConsultationHistory] = useState<Consultation[]>([]);

  // Fonction pour récupérer les ordonnances du patient
  const getPatientPrescriptions = (): Prescription[] => {
    const patientId = selectedPatient?.id || "P001";
    const storedPrescriptions = localStorage.getItem(`prescriptions_${patientId}`);
    
    if (storedPrescriptions) {
      return JSON.parse(storedPrescriptions);
    }
    
    // Ajouter des ordonnances de démonstration pour Sophie Bernard
    if (selectedPatient?.patientName === "Sophie Bernard") {
      const demoPrescriptions: Prescription[] = [
        {
          id: "pres_sb_1",
          patientName: "Sophie Bernard",
          diagnosis: "Hypertension artérielle",
          treatment: "Lisinopril 10mg, 1 comprimé le matin\nAmlodipine 5mg, 1 comprimé le soir",
          notes: "Contrôle de la tension dans 1 mois",
          date: "2024-10-15",
          vitals: {
            bloodPressure: "140/90",
            weight: 68
          }
        },
        {
          id: "pres_sb_2", 
          patientName: "Sophie Bernard",
          diagnosis: "Douleurs articulaires",
          treatment: "Ibuprofène 400mg, 1 comprimé matin et soir après les repas\nParacétamol 1g en cas de douleur",
          notes: "Durée du traitement : 7 jours",
          date: "2024-10-10",
          vitals: {
            bloodPressure: "135/85",
            weight: 68
          }
        }
      ];
      
      // Sauvegarder les ordonnances de démonstration
      localStorage.setItem(`prescriptions_${patientId}`, JSON.stringify(demoPrescriptions));
      return demoPrescriptions;
    }
    
    // Retourner un tableau vide pour les autres patients
    return [];
  };

  const [patientPrescriptions, setPatientPrescriptions] = useState<Prescription[]>([]);

  // État pour la nouvelle consultation
  const [newConsultation, setNewConsultation] = useState({
    symptoms: "",
    diagnosis: "",
    treatment: "",
    notes: "",
    vitals: {
      bloodPressure: "",
      weight: 0
    }
  });

  const handleSaveConsultation = () => {
    setShowSaveAlert(true);
  };

  const confirmSave = () => {
    // Vérifier que les champs obligatoires sont remplis
    if (!newConsultation.symptoms || !newConsultation.diagnosis) {
      alert("Veuillez remplir au moins les symptômes et le diagnostic.");
      return;
    }

    const patientId = selectedPatient?.id || "P001";
    
    if (isEditingConsultation && selectedConsultationForEdit) {
      // Mode édition - mettre à jour la consultation existante
      const consultationsKey = `consultations_${patientId}`;
      const existingConsultations = JSON.parse(localStorage.getItem(consultationsKey) || "[]");
      
      const updatedConsultations = existingConsultations.map((c: Consultation) => 
        c.id === selectedConsultationForEdit.id 
          ? {
              ...c,
              symptoms: newConsultation.symptoms,
              diagnosis: newConsultation.diagnosis,
              treatment: newConsultation.treatment,
              notes: newConsultation.notes,
              vitals: {
                bloodPressure: newConsultation.vitals.bloodPressure || "Non mesuré",
                weight: newConsultation.vitals.weight || 0
              },
              date: new Date().toISOString().split('T')[0] // Mise à jour de la date
            }
          : c
      );
      
      setConsultationHistory(updatedConsultations);
      localStorage.setItem(consultationsKey, JSON.stringify(updatedConsultations));
      
      setIsEditingConsultation(false);
      setSelectedConsultationForEdit(null);
    } else {
      // Mode création - créer une nouvelle consultation
      const todayConsultation: Consultation = {
        id: `consultation_${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        symptoms: newConsultation.symptoms,
        diagnosis: newConsultation.diagnosis,
        treatment: newConsultation.treatment,
        notes: newConsultation.notes,
        vitals: {
          bloodPressure: newConsultation.vitals.bloodPressure || "Non mesuré",
          weight: newConsultation.vitals.weight || 0
        }
      };

      // Ajouter la consultation à l'historique (en premier pour avoir les plus récentes en haut)
      const updatedHistory = [todayConsultation, ...consultationHistory];
      setConsultationHistory(updatedHistory);

      // Sauvegarder dans localStorage pour ce patient spécifique
      localStorage.setItem(`consultations_${patientId}`, JSON.stringify(updatedHistory));
    }

    // Afficher le message de succès
    setShowSuccessToast(true);
    setShowSaveAlert(false);
    
    // Reset form
    setNewConsultation({
      symptoms: "",
      diagnosis: "",
      treatment: "",
      notes: "",
      vitals: {
        bloodPressure: "",
        weight: 0
      }
    });

    // Basculer automatiquement vers l'historique pour voir la consultation ajoutée/modifiée
    setTimeout(() => {
      setSelectedSegment('historique');
    }, 1000);
  };

  const generatePrescription = () => {
    // Vérifier qu'il y a un traitement à prescrire
    if (!newConsultation.treatment) {
      alert("Veuillez d'abord ajouter un traitement pour générer une ordonnance.");
      return;
    }
    
    // Mode normal depuis nouvelle consultation
    setIsPrescriptionDirectMode(false);
    
    // Définir automatiquement le patient en consultation
    setPrescriptionPatient(selectedPatient?.id || "1");
    
    // Ouvrir le modal d'ordonnance
    setShowPrescriptionModal(true);
  };

  const openDirectPrescription = () => {
    // Mode prescription directe depuis le dossier
    setIsPrescriptionDirectMode(true);
    
    // Définir automatiquement le patient en consultation
    setPrescriptionPatient(selectedPatient?.id || "1");
    
    // Ouvrir le modal d'ordonnance
    setShowPrescriptionModal(true);
  };

  // Fonctions pour gérer les ordonnances
  const viewPrescription = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setShowPrescriptionDetailModal(true);
  };

  const editPrescription = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setIsEditingPrescription(true);
    
    // Déterminer le mode : si on est sur l'onglet dossier, utiliser le mode direct
    const isDossierMode = selectedSegment === 'dossier';
    
    if (isDossierMode) {
      setIsPrescriptionDirectMode(true);
      setDirectPrescription({
        diagnosis: prescription.diagnosis,
        treatment: prescription.treatment,
        notes: prescription.notes || ""
      });
    } else {
      setIsPrescriptionDirectMode(false);
      setNewConsultation({
        ...newConsultation,
        diagnosis: prescription.diagnosis,
        treatment: prescription.treatment,
        notes: prescription.notes || ""
      });
      // Trouver le patient correspondant dans la liste
      const patient = availablePatients.find(p => p.name === prescription.patientName);
      if (patient) {
        setPrescriptionPatient(patient.id);
      }
    }
    
    setShowPrescriptionModal(true);
  };

  const deletePrescription = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setShowDeletePrescriptionAlert(true);
  };

  const confirmDeletePrescription = () => {
    if (!selectedPrescription || !selectedPatient) return;
    
    const prescriptionsKey = `prescriptions_${selectedPatient.id}`;
    const existingPrescriptions = JSON.parse(localStorage.getItem(prescriptionsKey) || "[]");
    
    const updatedPrescriptions = existingPrescriptions.filter(
      (p: Prescription) => p.id !== selectedPrescription.id
    );
    
    localStorage.setItem(prescriptionsKey, JSON.stringify(updatedPrescriptions));
    
    // Mettre à jour l'état local
    setPatientPrescriptions(updatedPrescriptions);
    
    setShowDeletePrescriptionAlert(false);
    setSelectedPrescription(null);
  };

  // Fonctions pour gérer l'historique des consultations
  const editConsultation = (consultation: Consultation) => {
    setSelectedConsultationForEdit(consultation);
    setIsEditingConsultation(true);
    
    // Remplir le formulaire avec les données de la consultation existante
    setNewConsultation({
      symptoms: consultation.symptoms,
      diagnosis: consultation.diagnosis,
      treatment: consultation.treatment,
      notes: consultation.notes,
      vitals: consultation.vitals
    });
    
    // Changer vers l'onglet nouvelle consultation
    setSelectedSegment('nouvelle');
  };

  const deleteConsultation = (consultationId: string) => {
    setConsultationToDelete(consultationId);
    setShowDeleteConsultationAlert(true);
  };

  const confirmDeleteConsultation = () => {
    if (consultationToDelete === null || !selectedPatient) return;
    
    const consultationsKey = `consultations_${selectedPatient.id}`;
    const existingConsultations = JSON.parse(localStorage.getItem(consultationsKey) || "[]");
    
    const updatedConsultations = existingConsultations.filter(
      (c: any) => c.id !== consultationToDelete
    );
    
    localStorage.setItem(consultationsKey, JSON.stringify(updatedConsultations));
    
    // Mettre à jour l'état local
    setConsultationHistory(updatedConsultations);
    
    setShowDeleteConsultationAlert(false);
    setConsultationToDelete(null);
  };

  const openHistoryDetail = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setShowHistoryDetailModal(true);
  };

  const savePrescription = () => {
    // Trouver le patient sélectionné pour l'ordonnance
    const selectedPrescriptionPatient = availablePatients.find(p => p.id === prescriptionPatient);
    
    // Vérifier les données selon le mode
    const prescriptionData = isPrescriptionDirectMode ? directPrescription : newConsultation;
    
    // Vérifier qu'il y a un traitement
    if (!prescriptionData.treatment) {
      alert("Veuillez ajouter un traitement pour créer l'ordonnance.");
      return;
    }

    const patientId = prescriptionPatient || selectedPatient?.id || "P001";
    const prescriptionsKey = `prescriptions_${patientId}`;
    const existingPrescriptions = JSON.parse(localStorage.getItem(prescriptionsKey) || "[]");
    
    if (isEditingPrescription && selectedPrescription) {
      // Mode édition - mettre à jour l'ordonnance existante
      const updatedPrescriptions = existingPrescriptions.map((p: Prescription) => 
        p.id === selectedPrescription.id 
          ? {
              ...p,
              diagnosis: prescriptionData.diagnosis,
              treatment: prescriptionData.treatment,
              notes: prescriptionData.notes,
              date: new Date().toISOString() // Mise à jour de la date
            }
          : p
      );
      
      localStorage.setItem(prescriptionsKey, JSON.stringify(updatedPrescriptions));
      
      // Mettre à jour l'état local si c'est le patient actuellement affiché
      const currentPatientId = selectedPatient?.id || "P001";
      if (patientId === currentPatientId) {
        setPatientPrescriptions(updatedPrescriptions);
      }
      
      setIsEditingPrescription(false);
      setSelectedPrescription(null);
    } else {
      // Mode création - créer une nouvelle ordonnance
      const prescription: Prescription = {
        id: `prescription_${Date.now()}`,
        date: new Date().toISOString(),
        patientName: selectedPrescriptionPatient?.name || patientRecord.name,
        diagnosis: prescriptionData.diagnosis,
        treatment: prescriptionData.treatment,
        notes: prescriptionData.notes,
        vitals: isPrescriptionDirectMode ? { bloodPressure: "", weight: 0 } : newConsultation.vitals
      };

      const updatedPrescriptions = [...existingPrescriptions, prescription];
      localStorage.setItem(prescriptionsKey, JSON.stringify(updatedPrescriptions));

      // Mettre à jour l'état local seulement si c'est le patient actuellement affiché
      const currentPatientId = selectedPatient?.id || "P001";
      if (patientId === currentPatientId) {
        setPatientPrescriptions(updatedPrescriptions);
      }
    }

    // Reset du formulaire si mode direct
    if (isPrescriptionDirectMode) {
      setDirectPrescription({
        diagnosis: "",
        treatment: "",
        notes: ""
      });
    }

    // Fermer le modal et afficher message de succès
    setShowPrescriptionModal(false);
    setShowSuccessToast(true);
  };

  // Fonctions pour gérer les allergies, pathologies et médicaments
  const addAllergy = () => {
    if (newAllergy.trim() && !editablePatientInfo.allergies.includes(newAllergy.trim())) {
      setEditablePatientInfo({
        ...editablePatientInfo,
        allergies: [...editablePatientInfo.allergies, newAllergy.trim()]
      });
      setNewAllergy('');
    }
  };

  const removeAllergy = (allergyToRemove: string) => {
    setEditablePatientInfo({
      ...editablePatientInfo,
      allergies: editablePatientInfo.allergies.filter(allergy => allergy !== allergyToRemove)
    });
  };

  const addCondition = () => {
    if (newCondition.trim() && !editablePatientInfo.chronicConditions.includes(newCondition.trim())) {
      setEditablePatientInfo({
        ...editablePatientInfo,
        chronicConditions: [...editablePatientInfo.chronicConditions, newCondition.trim()]
      });
      setNewCondition('');
    }
  };

  const removeCondition = (conditionToRemove: string) => {
    setEditablePatientInfo({
      ...editablePatientInfo,
      chronicConditions: editablePatientInfo.chronicConditions.filter(condition => condition !== conditionToRemove)
    });
  };

  const addMedication = () => {
    if (newMedication.trim() && !editablePatientInfo.currentMedications.includes(newMedication.trim())) {
      setEditablePatientInfo({
        ...editablePatientInfo,
        currentMedications: [...editablePatientInfo.currentMedications, newMedication.trim()]
      });
      setNewMedication('');
    }
  };

  const removeMedication = (medicationToRemove: string) => {
    setEditablePatientInfo({
      ...editablePatientInfo,
      currentMedications: editablePatientInfo.currentMedications.filter(medication => medication !== medicationToRemove)
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Consultation - {patientRecord.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={() => setIsNewConsultationModal(true)}>
              <IonIcon icon={addOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Informations patient */}
        <IonCard>
          <IonCardContent>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <IonAvatar style={{ width: "60px", height: "60px" }}>
                <img src={patientRecord.avatar} alt={patientRecord.name} />
              </IonAvatar>
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: "0", fontWeight: "bold" }}>{patientRecord.name}</h2>
                <p style={{ margin: "0", color: "var(--ion-color-medium)" }}>
                  {patientRecord.age} ans • {patientRecord.gender} • Groupe {patientRecord.bloodType}
                </p>
                <p style={{ margin: "0", fontSize: "0.9rem" }}>
                  Dernière visite: {new Date(patientRecord.lastVisit).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Segmented control */}
        <IonCard>
          <IonCardContent>
            <IonSegment value={selectedSegment} onIonChange={e => setSelectedSegment(e.detail.value as string)}>
              <IonSegmentButton value="dossier">
                <IonLabel>Dossier</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="nouvelle">
                <IonLabel>Nouvelle consultation</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="historique">
                <IonLabel>Historique</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonCardContent>
        </IonCard>

        {/* Dossier médical */}
        {selectedSegment === 'dossier' && (
          <>
            {/* Constantes vitales actuelles */}
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  <IonIcon icon={pulseOutline} style={{ marginRight: "8px" }} />
                  Constantes vitales
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  <IonItem>
                    <IonIcon icon={heartOutline} slot="start" color="danger" />
                    <IonLabel position="stacked">Tension artérielle</IonLabel>
                    <IonInput
                      value={editablePatientInfo.bloodPressure}
                      placeholder="Ex: 120/80"
                      onIonInput={(e) => setEditablePatientInfo({
                        ...editablePatientInfo,
                        bloodPressure: e.detail.value!
                      })}
                    />
                  </IonItem>
                  <IonItem>
                    <IonIcon icon={scaleOutline} slot="start" color="success" />
                    <IonLabel position="stacked">Poids (kg)</IonLabel>
                    <IonInput
                      type="number"
                      value={editablePatientInfo.weight}
                      placeholder="Ex: 70"
                      onIonInput={(e) => setEditablePatientInfo({
                        ...editablePatientInfo,
                        weight: parseFloat(e.detail.value!) || 0
                      })}
                    />
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>

            {/* Informations médicales */}
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  <IonIcon icon={medkitOutline} style={{ marginRight: "8px" }} />
                  Informations médicales
                </IonCardTitle>
              </IonCardHeader>
              <IonAccordionGroup>
                <IonAccordion value="allergies">
                  <IonItem slot="header">
                    <IonIcon icon={warningOutline} slot="start" color="danger" />
                    <IonLabel>Allergies ({editablePatientInfo.allergies.length})</IonLabel>
                  </IonItem>
                  <div slot="content" style={{ padding: "1rem" }}>
                    <IonItem>
                      <IonInput
                        placeholder="Ajouter une allergie..."
                        value={newAllergy}
                        onIonInput={(e) => setNewAllergy(e.detail.value!)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            addAllergy();
                          }
                        }}
                      />
                      <IonButton 
                        fill="clear" 
                        slot="end" 
                        onClick={addAllergy}
                        disabled={!newAllergy.trim()}
                      >
                        <IonIcon icon={addOutline} />
                      </IonButton>
                    </IonItem>
                    <div style={{ marginTop: "0.5rem" }}>
                      {editablePatientInfo.allergies.map((allergy, index) => (
                        <IonChip 
                          key={index} 
                          color="danger" 
                          style={{ margin: "2px", cursor: "pointer" }}
                          onClick={() => removeAllergy(allergy)}
                        >
                          {allergy}
                          <IonIcon icon={closeOutline} />
                        </IonChip>
                      ))}
                    </div>
                  </div>
                </IonAccordion>

                <IonAccordion value="conditions">
                  <IonItem slot="header">
                    <IonIcon icon={medkitOutline} slot="start" color="warning" />
                    <IonLabel>Pathologies chroniques ({editablePatientInfo.chronicConditions.length})</IonLabel>
                  </IonItem>
                  <div slot="content" style={{ padding: "1rem" }}>
                    <IonItem>
                      <IonInput
                        placeholder="Ajouter une pathologie..."
                        value={newCondition}
                        onIonInput={(e) => setNewCondition(e.detail.value!)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            addCondition();
                          }
                        }}
                      />
                      <IonButton 
                        fill="clear" 
                        slot="end" 
                        onClick={addCondition}
                        disabled={!newCondition.trim()}
                      >
                        <IonIcon icon={addOutline} />
                      </IonButton>
                    </IonItem>
                    <div style={{ marginTop: "0.5rem" }}>
                      {editablePatientInfo.chronicConditions.map((condition, index) => (
                        <IonChip 
                          key={index} 
                          color="warning" 
                          style={{ margin: "2px", cursor: "pointer" }}
                          onClick={() => removeCondition(condition)}
                        >
                          {condition}
                          <IonIcon icon={closeOutline} />
                        </IonChip>
                      ))}
                    </div>
                  </div>
                </IonAccordion>

                <IonAccordion value="medications">
                  <IonItem slot="header">
                    <IonIcon icon={medkitOutline} slot="start" color="primary" />
                    <IonLabel>Traitements actuels ({editablePatientInfo.currentMedications.length})</IonLabel>
                  </IonItem>
                  <div slot="content" style={{ padding: "1rem" }}>
                    <IonItem>
                      <IonInput
                        placeholder="Ajouter un médicament..."
                        value={newMedication}
                        onIonInput={(e) => setNewMedication(e.detail.value!)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            addMedication();
                          }
                        }}
                      />
                      <IonButton 
                        fill="clear" 
                        slot="end" 
                        onClick={addMedication}
                        disabled={!newMedication.trim()}
                      >
                        <IonIcon icon={addOutline} />
                      </IonButton>
                    </IonItem>
                    <div style={{ marginTop: "0.5rem" }}>
                      {editablePatientInfo.currentMedications.map((medication, index) => (
                        <IonChip 
                          key={index} 
                          color="primary" 
                          style={{ margin: "2px", cursor: "pointer" }}
                          onClick={() => removeMedication(medication)}
                        >
                          {medication}
                          <IonIcon icon={closeOutline} />
                        </IonChip>
                      ))}
                    </div>
                  </div>
                </IonAccordion>
              </IonAccordionGroup>
            </IonCard>

            {/* Section Ordonnances */}
            <IonCard style={{ marginTop: "1rem" }}>
              <IonCardHeader>
                <IonCardTitle>
                  <IonIcon icon={documentTextOutline} style={{ marginRight: "8px" }} />
                  Ordonnances ({patientPrescriptions.length})
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {patientPrescriptions.length === 0 ? (
                  <p style={{ textAlign: 'center', color: 'var(--ion-color-medium)', fontStyle: 'italic' }}>
                    Aucune ordonnance enregistrée
                  </p>
                ) : (
                  <IonList>
                    {patientPrescriptions.map((prescription, index) => (
                      <IonItem key={prescription.id}>
                        <IonIcon icon={medkitOutline} slot="start" color="primary" />
                        <IonLabel>
                          <h3>Ordonnance du {new Date(prescription.date).toLocaleDateString('fr-FR')}</h3>
                          <p><strong>Diagnostic:</strong> {prescription.diagnosis}</p>
                          <p><strong>Traitement:</strong> {prescription.treatment}</p>
                          {prescription.notes && (
                            <p style={{ color: 'var(--ion-color-medium)' }}>
                              <em>{prescription.notes}</em>
                            </p>
                          )}
                        </IonLabel>
                        <div slot="end" style={{ display: 'flex', gap: '8px' }}>
                          <IonButton 
                            fill="clear" 
                            size="small" 
                            color="primary"
                            onClick={() => viewPrescription(prescription)}
                          >
                            <IonIcon icon={eyeOutline} />
                          </IonButton>
                          <IonButton 
                            fill="clear" 
                            size="small" 
                            color="warning"
                            onClick={() => editPrescription(prescription)}
                          >
                            <IonIcon icon={createOutline} />
                          </IonButton>
                          <IonButton 
                            fill="clear" 
                            size="small" 
                            color="danger"
                            onClick={() => deletePrescription(prescription)}
                          >
                            <IonIcon icon={trashOutline} />
                          </IonButton>
                        </div>
                      </IonItem>
                    ))}
                  </IonList>
                )}
                
                {/* Bouton pour ajouter une ordonnance */}
                <div style={{ marginTop: "1rem" }}>
                  <IonButton 
                    expand="block" 
                    fill="outline" 
                    color="primary"
                    onClick={openDirectPrescription}
                  >
                    <IonIcon icon={addOutline} slot="start" />
                    Ajouter une ordonnance
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>

            {/* Bouton de sauvegarde du dossier */}
            <IonCard>
              <IonCardContent>
                <IonButton 
                  expand="block" 
                  fill="solid" 
                  color="success"
                  onClick={() => {
                    // Sauvegarder les modifications dans le localStorage
                    const patientId = selectedPatient?.id || "P001";
                    localStorage.setItem(`patient_info_${patientId}`, JSON.stringify(editablePatientInfo));
                    
                    // Afficher un message de confirmation
                    setShowSuccessToast(true);
                  }}
                >
                  <IonIcon icon={saveOutline} slot="start" />
                  Sauvegarder les modifications
                </IonButton>
              </IonCardContent>
            </IonCard>
          </>
        )}

        {/* Nouvelle consultation */}
        {selectedSegment === 'nouvelle' && (
          <>
            {/* Consultation */}
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Consultation</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  <IonItem>
                    <IonLabel position="stacked">Symptômes observés</IonLabel>
                    <IonTextarea
                      value={newConsultation.symptoms}
                      placeholder="Décrivez les symptômes du patient..."
                      rows={3}
                      onIonInput={e => setNewConsultation({
                        ...newConsultation,
                        symptoms: e.detail.value!
                      })}
                    />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">Diagnostic</IonLabel>
                    <IonTextarea
                      value={newConsultation.diagnosis}
                      placeholder="Votre diagnostic..."
                      rows={2}
                      onIonInput={e => setNewConsultation({
                        ...newConsultation,
                        diagnosis: e.detail.value!
                      })}
                    />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">Traitement prescrit</IonLabel>
                    <IonTextarea
                      value={newConsultation.treatment}
                      placeholder="Traitement et posologie..."
                      rows={3}
                      onIonInput={e => setNewConsultation({
                        ...newConsultation,
                        treatment: e.detail.value!
                      })}
                    />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">Notes de suivi</IonLabel>
                    <IonTextarea
                      value={newConsultation.notes}
                      placeholder="Notes additionnelles, recommandations..."
                      rows={2}
                      onIonInput={e => setNewConsultation({
                        ...newConsultation,
                        notes: e.detail.value!
                      })}
                    />
                  </IonItem>
                </IonList>

                <div style={{ marginTop: "1rem", display: "flex", gap: "8px" }}>
                  <IonButton expand="block" onClick={handleSaveConsultation}>
                    <IonIcon icon={saveOutline} slot="start" />
                    Enregistrer
                  </IonButton>
                  <IonButton expand="block" fill="outline" onClick={generatePrescription}>
                    <IonIcon icon={printOutline} slot="start" />
                    Ordonnance
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </>
        )}

        {/* Historique des consultations */}
        {selectedSegment === 'historique' && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                <IonIcon icon={documentTextOutline} style={{ marginRight: "8px" }} />
                Historique des consultations
              </IonCardTitle>
            </IonCardHeader>
            <IonList>
              {consultationHistory.length === 0 ? (
                <IonItem>
                  <IonLabel>
                    <h3 style={{ textAlign: 'center', color: 'var(--ion-color-medium)' }}>
                      Aucune consultation dans l'historique
                    </h3>
                  </IonLabel>
                </IonItem>
              ) : (
                consultationHistory.map((consultation, index) => (
                  <IonItem key={index}>
                    <IonIcon icon={calendarOutline} slot="start" />
                    <IonLabel>
                      <h2>{new Date(consultation.date).toLocaleDateString('fr-FR')}</h2>
                      <h3>{consultation.diagnosis}</h3>
                      <p>{consultation.symptoms}</p>
                      <IonNote>
                        TA: {consultation.vitals.bloodPressure} | 
                        Poids: {consultation.vitals.weight}kg
                      </IonNote>
                    </IonLabel>
                    <div slot="end" style={{ display: 'flex', gap: '8px' }}>
                      <IonButton 
                        fill="clear" 
                        size="small" 
                        color="primary"
                        onClick={() => openHistoryDetail(consultation)}
                      >
                        <IonIcon icon={eyeOutline} />
                      </IonButton>
                      <IonButton 
                        fill="clear" 
                        size="small" 
                        color="warning"
                        onClick={() => editConsultation(consultation)}
                      >
                        <IonIcon icon={createOutline} />
                      </IonButton>
                      <IonButton 
                        fill="clear" 
                        size="small" 
                        color="danger"
                        onClick={() => deleteConsultation(consultation.id)}
                      >
                        <IonIcon icon={trashOutline} />
                      </IonButton>
                    </div>
                  </IonItem>
                ))
              )}
            </IonList>
          </IonCard>
        )}

        {/* Alert de confirmation */}
        <IonAlert
          isOpen={showSaveAlert}
          onDidDismiss={() => setShowSaveAlert(false)}
          header="Confirmer la sauvegarde"
          message="Voulez-vous enregistrer cette consultation ?"
          buttons={[
            {
              text: 'Annuler',
              role: 'cancel'
            },
            {
              text: 'Confirmer',
              handler: confirmSave
            }
          ]}
        />

        {/* Toast de succès */}
        <IonToast
          isOpen={showSuccessToast}
          onDidDismiss={() => setShowSuccessToast(false)}
          message="Consultation enregistrée avec succès"
          duration={3000}
          color="success"
        />

        {/* Modal d'ordonnance */}
        <IonModal 
          isOpen={showPrescriptionModal} 
          onDidDismiss={() => setShowPrescriptionModal(false)}
          backdropDismiss={false}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Ordonnance</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowPrescriptionModal(false)}>Fermer</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div style={{ padding: "1rem", fontFamily: "monospace", whiteSpace: "pre-line" }}>
              {/* Formulaire de prescription directe */}
              {isPrescriptionDirectMode && (
                <IonCard style={{ marginBottom: "1rem" }}>
                  <IonCardHeader>
                    <IonCardTitle>Informations de l'ordonnance</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonList>
                      <IonItem>
                        <IonLabel position="stacked">Diagnostic</IonLabel>
                        <IonTextarea
                          value={directPrescription.diagnosis}
                          placeholder="Ex: Hypertension artérielle"
                          rows={2}
                          onIonInput={(e: any) => setDirectPrescription({
                            ...directPrescription,
                            diagnosis: e.detail.value!
                          })}
                        />
                      </IonItem>
                      
                      <IonItem>
                        <IonLabel position="stacked">Traitement prescrit *</IonLabel>
                        <IonTextarea
                          value={directPrescription.treatment}
                          placeholder="Ex: Lisinopril 10mg, 1 comprimé le matin"
                          rows={3}
                          onIonInput={(e: any) => setDirectPrescription({
                            ...directPrescription,
                            treatment: e.detail.value!
                          })}
                        />
                      </IonItem>
                      
                      <IonItem>
                        <IonLabel position="stacked">Notes additionnelles</IonLabel>
                        <IonTextarea
                          value={directPrescription.notes}
                          placeholder="Notes, recommandations..."
                          rows={2}
                          onIonInput={(e: any) => setDirectPrescription({
                            ...directPrescription,
                            notes: e.detail.value!
                          })}
                        />
                      </IonItem>
                    </IonList>
                  </IonCardContent>
                </IonCard>
              )}

              <IonCard>
                <IonCardHeader>
                  <IonCardTitle style={{ textAlign: "center", fontSize: "1.2rem" }}>
                    🏥 ORDONNANCE MÉDICALE
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p><strong>Date:</strong> {new Date().toLocaleDateString('fr-FR')}</p>
                  <p><strong>Patient:</strong> {availablePatients.find(p => p.id === prescriptionPatient)?.name || patientRecord.name}</p>
                  <p><strong>Médecin:</strong> Dr. [Nom du médecin]</p>
                  
                  <hr style={{ margin: "1rem 0" }} />
                  
                  <h3>🔍 DIAGNOSTIC:</h3>
                  <p style={{ marginLeft: "1rem", fontStyle: "italic" }}>
                    {isPrescriptionDirectMode ? (directPrescription.diagnosis || 'Non spécifié') : (newConsultation.diagnosis || 'Non spécifié')}
                  </p>
                  
                  <h3>💊 TRAITEMENT PRESCRIT:</h3>
                  <p style={{ marginLeft: "1rem", backgroundColor: "#f0f8ff", padding: "0.5rem", borderRadius: "4px" }}>
                    {isPrescriptionDirectMode ? directPrescription.treatment : newConsultation.treatment}
                  </p>
                  
                  {(isPrescriptionDirectMode ? directPrescription.notes : newConsultation.notes) && (
                    <>
                      <h3>📝 NOTES MÉDICALES:</h3>
                      <p style={{ marginLeft: "1rem" }}>
                        {isPrescriptionDirectMode ? directPrescription.notes : newConsultation.notes}
                      </p>
                    </>
                  )}
                  
                  <hr style={{ margin: "1rem 0" }} />
                  
                  <div style={{ textAlign: "right", marginTop: "2rem" }}>
                    <p><strong>Signature du médecin:</strong></p>
                    <div style={{ border: "1px solid #ccc", height: "60px", width: "200px", marginLeft: "auto", marginTop: "0.5rem" }}></div>
                  </div>
                </IonCardContent>
              </IonCard>
              
              <div style={{ textAlign: "center", marginTop: "1rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
                <IonButton fill="solid" color="success" onClick={savePrescription}>
                  <IonIcon icon={saveOutline} slot="start" />
                  Enregistrer
                </IonButton>
                <IonButton fill="solid" color="primary">
                  <IonIcon icon={printOutline} slot="start" />
                  Imprimer
                </IonButton>
              </div>
            </div>
          </IonContent>
        </IonModal>

        {/* Modal de détail d'historique */}
        <IonModal isOpen={showHistoryDetailModal} onDidDismiss={() => setShowHistoryDetailModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Détail de la consultation</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowHistoryDetailModal(false)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {selectedConsultation && (
              <div>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>
                      <IonIcon icon={calendarOutline} style={{ marginRight: "8px" }} />
                      {new Date(selectedConsultation.date).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonList>
                      <IonItem>
                        <IonLabel>
                          <h3>Constantes vitales</h3>
                          <p>Tension artérielle: {selectedConsultation.vitals.bloodPressure}</p>
                          <p>Poids: {selectedConsultation.vitals.weight} kg</p>
                        </IonLabel>
                      </IonItem>
                      
                      <IonItem>
                        <IonLabel>
                          <h3>Symptômes observés</h3>
                          <p>{selectedConsultation.symptoms || "Aucun symptôme renseigné"}</p>
                        </IonLabel>
                      </IonItem>
                      
                      <IonItem>
                        <IonLabel>
                          <h3>Diagnostic</h3>
                          <p>{selectedConsultation.diagnosis || "Aucun diagnostic renseigné"}</p>
                        </IonLabel>
                      </IonItem>
                      
                      <IonItem>
                        <IonLabel>
                          <h3>Traitement prescrit</h3>
                          <p>{selectedConsultation.treatment || "Aucun traitement prescrit"}</p>
                        </IonLabel>
                      </IonItem>
                      
                      <IonItem>
                        <IonLabel>
                          <h3>Notes de suivi</h3>
                          <p>{selectedConsultation.notes || "Aucune note de suivi"}</p>
                        </IonLabel>
                      </IonItem>
                    </IonList>
                  </IonCardContent>
                </IonCard>
              </div>
            )}
          </IonContent>
        </IonModal>

        {/* Modal de détail d'ordonnance */}
        <IonModal isOpen={showPrescriptionDetailModal} onDidDismiss={() => setShowPrescriptionDetailModal(false)}>
          <IonContent>
            <div style={{ padding: "1rem" }}>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Détail de l'ordonnance</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {selectedPrescription && (
                    <IonList>
                      <IonItem>
                        <IonLabel>
                          <h3>Date</h3>
                          <p>{new Date(selectedPrescription.date).toLocaleDateString('fr-FR')}</p>
                        </IonLabel>
                      </IonItem>
                      
                      <IonItem>
                        <IonLabel>
                          <h3>Patient</h3>
                          <p>{selectedPrescription.patientName}</p>
                        </IonLabel>
                      </IonItem>
                      
                      <IonItem>
                        <IonLabel>
                          <h3>Diagnostic</h3>
                          <p>{selectedPrescription.diagnosis || "Aucun diagnostic renseigné"}</p>
                        </IonLabel>
                      </IonItem>
                      
                      <IonItem>
                        <IonLabel>
                          <h3>Traitement prescrit</h3>
                          <p>{selectedPrescription.treatment}</p>
                        </IonLabel>
                      </IonItem>
                      
                      <IonItem>
                        <IonLabel>
                          <h3>Notes</h3>
                          <p>{selectedPrescription.notes || "Aucune note"}</p>
                        </IonLabel>
                      </IonItem>
                    </IonList>
                  )}
                  
                  <IonButton 
                    expand="block" 
                    color="medium" 
                    onClick={() => setShowPrescriptionDetailModal(false)}
                    style={{ marginTop: "1rem" }}
                  >
                    Fermer
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </div>
          </IonContent>
        </IonModal>

        {/* Alert de suppression d'ordonnance */}
        <IonAlert
          isOpen={showDeletePrescriptionAlert}
          onDidDismiss={() => setShowDeletePrescriptionAlert(false)}
          header="Supprimer l'ordonnance"
          message="Êtes-vous sûr de vouloir supprimer cette ordonnance ? Cette action est irréversible."
          buttons={[
            {
              text: 'Annuler',
              role: 'cancel',
            },
            {
              text: 'Supprimer',
              role: 'destructive',
              handler: confirmDeletePrescription
            }
          ]}
        />

        {/* Alert de suppression de consultation */}
        <IonAlert
          isOpen={showDeleteConsultationAlert}
          onDidDismiss={() => setShowDeleteConsultationAlert(false)}
          header="Supprimer la consultation"
          message="Êtes-vous sûr de vouloir supprimer cette consultation ? Cette action est irréversible."
          buttons={[
            {
              text: 'Annuler',
              role: 'cancel',
            },
            {
              text: 'Supprimer',
              role: 'destructive',
              handler: confirmDeleteConsultation
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default DoctorConsultation;