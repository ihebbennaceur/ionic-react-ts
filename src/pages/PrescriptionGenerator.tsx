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
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonCheckbox,
  IonReorder,
  IonReorderGroup,
  IonFab,
  IonFabButton,
  IonAlert,
  IonToast,
  IonModal,
  IonAvatar,
  IonNote,
  IonChip,
  ItemReorderEventDetail
} from "@ionic/react";
import {
  addOutline,
  removeOutline,
  printOutline,
  saveOutline,
  documentTextOutline,
  medkitOutline,
  timeOutline,
  warningOutline,
  checkmarkCircleOutline,
  closeOutline,
  reorderThreeOutline
} from "ionicons/icons";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  isGeneric: boolean;
}

const PrescriptionGenerator: React.FC = () => {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showPrintAlert, setShowPrintAlert] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState("pat1");

  // Liste des patients disponibles (cohérente avec AppointmentManagement)
  const patients = [
    {
      id: "pat1",
      name: "Pierre Durand",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      age: 45,
      weight: 78,
      allergies: ["Pénicilline"]
    },
    {
      id: "pat2", 
      name: "Marie Moreau",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      age: 38,
      weight: 65,
      allergies: ["Latex"]
    },
    {
      id: "pat3",
      name: "Sophie Bernard",
      avatar: "https://randomuser.me/api/portraits/women/35.jpg", 
      age: 42,
      weight: 68,
      allergies: ["Aspirine", "Fruits de mer"]
    },
    {
      id: "pat4",
      name: "Jean Dupont",
      avatar: "https://randomuser.me/api/portraits/men/40.jpg",
      age: 50,
      weight: 85,
      allergies: ["Acariens"]
    },
    {
      id: "pat5",
      name: "Sophie Moreau",
      avatar: "https://randomuser.me/api/portraits/women/40.jpg",
      age: 35,
      weight: 72,
      allergies: ["Pollen"]
    }
  ];

  // Informations du patient sélectionné
  const patientInfo = patients.find(p => p.id === selectedPatientId) || patients[0];

  // Informations du médecin
  const doctorInfo = {
    name: "Dr. Marie Dupont",
    specialty: "Cardiologie",
    license: "123456789",
    address: "123 Rue de la Santé, 75000 Paris",
    phone: "+33 1 23 45 67 89",
    email: "marie.dupont@hopital.fr"
  };

  // État des médicaments prescrits
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "1 fois par jour",
      duration: "30 jours",
      instructions: "À prendre le matin, avec un verre d'eau",
      isGeneric: true
    }
  ]);

  // Médicaments couramment prescrits
  const commonMedications = [
    "Paracétamol", "Ibuprofène", "Amoxicilline", "Lisinopril", 
    "Metformine", "Atorvastatine", "Oméprazole", "Simvastatine"
  ];

  const [newMedication, setNewMedication] = useState<Medication>({
    id: "",
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
    isGeneric: false
  });

  const addMedication = () => {
    if (newMedication.name && newMedication.dosage) {
      const medication: Medication = {
        ...newMedication,
        id: Date.now().toString()
      };
      setMedications([...medications, medication]);
      setNewMedication({
        id: "",
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
        isGeneric: false
      });
    }
  };

  const removeMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const updateMedication = (id: string, field: keyof Medication, value: any) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, [field]: value } : med
    ));
  };

  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    const reorderedMeds = [...medications];
    const itemToMove = reorderedMeds.splice(event.detail.from, 1)[0];
    reorderedMeds.splice(event.detail.to, 0, itemToMove);
    setMedications(reorderedMeds);
    event.detail.complete();
  };

  const generatePDF = () => {
    setShowPrintAlert(true);
  };

  const confirmPrint = () => {
    // Simulation de génération PDF
    setShowSuccessToast(true);
    setShowPrintAlert(false);
  };

  const savePrescription = () => {
    // Simulation de sauvegarde
    setShowSuccessToast(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Générateur d'Ordonnances</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Sélection du patient */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={medkitOutline} style={{ marginRight: "8px" }} />
              Sélectionner un patient
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel>Patient</IonLabel>
              <IonSelect
                value={selectedPatientId}
                placeholder="Choisir un patient"
                onIonChange={e => setSelectedPatientId(e.detail.value)}
              >
                {patients.map(patient => (
                  <IonSelectOption key={patient.id} value={patient.id}>
                    {patient.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonCardContent>
        </IonCard>

        {/* Informations patient */}
        <IonCard>
          <IonCardContent>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <IonAvatar style={{ width: "50px", height: "50px" }}>
                <img src={patientInfo.avatar} alt={patientInfo.name} />
              </IonAvatar>
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: "0", fontWeight: "bold" }}>{patientInfo.name}</h2>
                <p style={{ margin: "0", color: "var(--ion-color-medium)" }}>
                  {patientInfo.age} ans • {patientInfo.weight} kg
                </p>
                {patientInfo.allergies.length > 0 && (
                  <div style={{ marginTop: "4px" }}>
                    <IonIcon icon={warningOutline} color="danger" style={{ marginRight: "4px" }} />
                    <span style={{ fontSize: "0.9rem", color: "var(--ion-color-danger)" }}>
                      Allergies: {patientInfo.allergies.join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Ajouter un médicament */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={addOutline} style={{ marginRight: "8px" }} />
              Ajouter un médicament
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Nom du médicament</IonLabel>
                <IonInput
                  value={newMedication.name}
                  placeholder="Ex: Paracétamol"
                  onIonInput={e => setNewMedication({...newMedication, name: e.detail.value!})}
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Dosage</IonLabel>
                <IonInput
                  value={newMedication.dosage}
                  placeholder="Ex: 500mg"
                  onIonInput={e => setNewMedication({...newMedication, dosage: e.detail.value!})}
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Fréquence</IonLabel>
                <IonSelect
                  value={newMedication.frequency}
                  placeholder="Choisir la fréquence"
                  onIonChange={e => setNewMedication({...newMedication, frequency: e.detail.value})}
                >
                  <IonSelectOption value="1 fois par jour">1 fois par jour</IonSelectOption>
                  <IonSelectOption value="2 fois par jour">2 fois par jour</IonSelectOption>
                  <IonSelectOption value="3 fois par jour">3 fois par jour</IonSelectOption>
                  <IonSelectOption value="4 fois par jour">4 fois par jour</IonSelectOption>
                  <IonSelectOption value="Si besoin">Si besoin</IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Durée</IonLabel>
                <IonSelect
                  value={newMedication.duration}
                  placeholder="Durée du traitement"
                  onIonChange={e => setNewMedication({...newMedication, duration: e.detail.value})}
                >
                  <IonSelectOption value="7 jours">7 jours</IonSelectOption>
                  <IonSelectOption value="14 jours">14 jours</IonSelectOption>
                  <IonSelectOption value="30 jours">30 jours</IonSelectOption>
                  <IonSelectOption value="3 mois">3 mois</IonSelectOption>
                  <IonSelectOption value="Traitement au long cours">Traitement au long cours</IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Instructions particulières</IonLabel>
                <IonTextarea
                  value={newMedication.instructions}
                  placeholder="Ex: À prendre pendant les repas"
                  rows={2}
                  onIonInput={e => setNewMedication({...newMedication, instructions: e.detail.value!})}
                />
              </IonItem>
            </IonList>

            <IonButton expand="block" onClick={addMedication} style={{ marginTop: "1rem" }}>
              <IonIcon icon={addOutline} slot="start" />
              Ajouter à l'ordonnance
            </IonButton>
          </IonCardContent>
        </IonCard>

        {/* Liste des médicaments prescrits */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={medkitOutline} style={{ marginRight: "8px" }} />
              Ordonnance ({medications.length} médicament{medications.length > 1 ? 's' : ''})
            </IonCardTitle>
          </IonCardHeader>
          
          <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
            {medications.map((medication, index) => (
              <IonCard key={medication.id} style={{ margin: "0.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                <IonCardContent>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: "0 0 0.5rem 0", fontWeight: "bold" }}>
                        {index + 1}. {medication.name} {medication.dosage}
                      </h3>
                      <p style={{ margin: "0.25rem 0", fontSize: "0.9rem" }}>
                        <IonIcon icon={timeOutline} style={{ marginRight: "4px" }} />
                        {medication.frequency} - {medication.duration}
                      </p>
                      {medication.instructions && (
                        <p style={{ margin: "0.25rem 0", fontSize: "0.9rem", fontStyle: "italic" }}>
                          {medication.instructions}
                        </p>
                      )}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <IonReorder>
                        <IonIcon icon={reorderThreeOutline} />
                      </IonReorder>
                      <IonButton 
                        fill="clear" 
                        size="small" 
                        color="danger"
                        onClick={() => removeMedication(medication.id)}
                      >
                        <IonIcon icon={removeOutline} />
                      </IonButton>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </IonReorderGroup>

          {medications.length === 0 && (
            <IonCardContent>
              <p style={{ textAlign: "center", color: "var(--ion-color-medium)" }}>
                Aucun médicament ajouté à l'ordonnance
              </p>
            </IonCardContent>
          )}
        </IonCard>

        {/* Actions */}
        {medications.length > 0 && (
          <IonCard>
            <IonCardContent>
              <div style={{ display: "flex", gap: "8px" }}>
                <IonButton expand="block" onClick={generatePDF}>
                  <IonIcon icon={printOutline} slot="start" />
                  Générer PDF
                </IonButton>
                <IonButton expand="block" fill="outline" onClick={savePrescription}>
                  <IonIcon icon={saveOutline} slot="start" />
                  Sauvegarder
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        )}

        {/* Alert de confirmation d'impression */}
        <IonAlert
          isOpen={showPrintAlert}
          onDidDismiss={() => setShowPrintAlert(false)}
          header="Générer l'ordonnance"
          message="Voulez-vous générer le PDF de cette ordonnance ?"
          buttons={[
            {
              text: 'Annuler',
              role: 'cancel'
            },
            {
              text: 'Générer',
              handler: confirmPrint
            }
          ]}
        />

        {/* Toast de succès */}
        <IonToast
          isOpen={showSuccessToast}
          onDidDismiss={() => setShowSuccessToast(false)}
          message="Ordonnance générée avec succès"
          duration={3000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default PrescriptionGenerator;