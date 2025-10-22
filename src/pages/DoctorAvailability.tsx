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
  IonToggle,
  IonCheckbox,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonAlert,
  IonToast,
  IonModal,
  IonDatetime,
  IonSegment,
  IonSegmentButton,
  IonNote,
  IonBadge
} from "@ionic/react";
import {
  timeOutline,
  calendarOutline,
  addOutline,
  removeOutline,
  saveOutline,
  warningOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  settingsOutline,
  peopleOutline
} from "ionicons/icons";

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  maxPatients: number;
  currentBookings: number;
}

interface DaySchedule {
  day: string;
  dayName: string;
  isWorking: boolean;
  timeSlots: TimeSlot[];
}

interface SpecialSchedule {
  id: string;
  date: string;
  reason: string;
  isUnavailable: boolean;
  customSlots?: TimeSlot[];
}

const DoctorAvailability: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<string>('planning');
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [isSpecialDateModal, setIsSpecialDateModal] = useState(false);

  // Planning hebdomadaire par défaut
  const [weeklySchedule, setWeeklySchedule] = useState<DaySchedule[]>([
    {
      day: "monday",
      dayName: "Lundi",
      isWorking: true,
      timeSlots: [
        { id: "m1", startTime: "08:00", endTime: "12:00", isAvailable: true, maxPatients: 8, currentBookings: 5 },
        { id: "m2", startTime: "14:00", endTime: "18:00", isAvailable: true, maxPatients: 8, currentBookings: 3 }
      ]
    },
    {
      day: "tuesday",
      dayName: "Mardi",
      isWorking: true,
      timeSlots: [
        { id: "t1", startTime: "08:00", endTime: "12:00", isAvailable: true, maxPatients: 8, currentBookings: 6 },
        { id: "t2", startTime: "14:00", endTime: "18:00", isAvailable: true, maxPatients: 8, currentBookings: 4 }
      ]
    },
    {
      day: "wednesday",
      dayName: "Mercredi",
      isWorking: true,
      timeSlots: [
        { id: "w1", startTime: "08:00", endTime: "12:00", isAvailable: true, maxPatients: 8, currentBookings: 2 }
      ]
    },
    {
      day: "thursday",
      dayName: "Jeudi",
      isWorking: true,
      timeSlots: [
        { id: "th1", startTime: "08:00", endTime: "12:00", isAvailable: true, maxPatients: 8, currentBookings: 7 },
        { id: "th2", startTime: "14:00", endTime: "18:00", isAvailable: true, maxPatients: 8, currentBookings: 5 }
      ]
    },
    {
      day: "friday",
      dayName: "Vendredi",
      isWorking: true,
      timeSlots: [
        { id: "f1", startTime: "08:00", endTime: "12:00", isAvailable: true, maxPatients: 8, currentBookings: 4 }
      ]
    },
    {
      day: "saturday",
      dayName: "Samedi",
      isWorking: false,
      timeSlots: []
    },
    {
      day: "sunday",
      dayName: "Dimanche",
      isWorking: false,
      timeSlots: []
    }
  ]);

  // Dates spéciales (congés, modifications)
  const [specialDates, setSpecialDates] = useState<SpecialSchedule[]>([
    {
      id: "1",
      date: "2024-12-25",
      reason: "Congés de Noël",
      isUnavailable: true
    },
    {
      id: "2",
      date: "2024-11-15",
      reason: "Formation médicale",
      isUnavailable: true
    }
  ]);

  const [newSpecialDate, setNewSpecialDate] = useState({
    date: new Date().toISOString(),
    reason: "",
    isUnavailable: true
  });

  const toggleDayWorking = (dayIndex: number) => {
    const newSchedule = [...weeklySchedule];
    newSchedule[dayIndex].isWorking = !newSchedule[dayIndex].isWorking;
    setWeeklySchedule(newSchedule);
  };

  const toggleTimeSlotAvailability = (dayIndex: number, slotIndex: number) => {
    const newSchedule = [...weeklySchedule];
    newSchedule[dayIndex].timeSlots[slotIndex].isAvailable = 
      !newSchedule[dayIndex].timeSlots[slotIndex].isAvailable;
    setWeeklySchedule(newSchedule);
  };

  const addTimeSlot = (dayIndex: number) => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      startTime: "09:00",
      endTime: "17:00",
      isAvailable: true,
      maxPatients: 8,
      currentBookings: 0
    };
    
    const newSchedule = [...weeklySchedule];
    newSchedule[dayIndex].timeSlots.push(newSlot);
    setWeeklySchedule(newSchedule);
  };

  const removeTimeSlot = (dayIndex: number, slotIndex: number) => {
    const newSchedule = [...weeklySchedule];
    newSchedule[dayIndex].timeSlots.splice(slotIndex, 1);
    setWeeklySchedule(newSchedule);
  };

  const updateTimeSlot = (dayIndex: number, slotIndex: number, field: keyof TimeSlot, value: any) => {
    const newSchedule = [...weeklySchedule];
    newSchedule[dayIndex].timeSlots[slotIndex] = {
      ...newSchedule[dayIndex].timeSlots[slotIndex],
      [field]: value
    };
    setWeeklySchedule(newSchedule);
  };

  const addSpecialDate = () => {
    if (newSpecialDate.reason) {
      const specialDate: SpecialSchedule = {
        id: Date.now().toString(),
        date: newSpecialDate.date.split('T')[0],
        reason: newSpecialDate.reason,
        isUnavailable: newSpecialDate.isUnavailable
      };
      
      setSpecialDates([...specialDates, specialDate]);
      setNewSpecialDate({
        date: new Date().toISOString(),
        reason: "",
        isUnavailable: true
      });
      setIsSpecialDateModal(false);
    }
  };

  const removeSpecialDate = (id: string) => {
    setSpecialDates(specialDates.filter(date => date.id !== id));
  };

  const saveSchedule = () => {
    setShowSaveAlert(true);
  };

  const confirmSave = () => {
    setShowSuccessToast(true);
    setShowSaveAlert(false);
  };

  const getAvailabilityStats = () => {
    const totalSlots = weeklySchedule.reduce((acc, day) => 
      acc + (day.isWorking ? day.timeSlots.length : 0), 0
    );
    const availableSlots = weeklySchedule.reduce((acc, day) => 
      acc + (day.isWorking ? day.timeSlots.filter(slot => slot.isAvailable).length : 0), 0
    );
    const totalBookings = weeklySchedule.reduce((acc, day) => 
      acc + day.timeSlots.reduce((slotAcc, slot) => slotAcc + slot.currentBookings, 0), 0
    );
    
    return { totalSlots, availableSlots, totalBookings };
  };

  const stats = getAvailabilityStats();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestion des Disponibilités</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Statistiques */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={settingsOutline} style={{ marginRight: "8px" }} />
              Aperçu de la semaine
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="4" style={{ textAlign: "center" }}>
                  <h2 style={{ margin: "0", color: "var(--ion-color-primary)" }}>{stats.totalSlots}</h2>
                  <p style={{ margin: "0", fontSize: "0.9rem" }}>Créneaux totaux</p>
                </IonCol>
                <IonCol size="4" style={{ textAlign: "center" }}>
                  <h2 style={{ margin: "0", color: "var(--ion-color-success)" }}>{stats.availableSlots}</h2>
                  <p style={{ margin: "0", fontSize: "0.9rem" }}>Disponibles</p>
                </IonCol>
                <IonCol size="4" style={{ textAlign: "center" }}>
                  <h2 style={{ margin: "0", color: "var(--ion-color-warning)" }}>{stats.totalBookings}</h2>
                  <p style={{ margin: "0", fontSize: "0.9rem" }}>Réservations</p>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Sélecteur de vue */}
        <IonCard>
          <IonCardContent>
            <IonSegment value={selectedSegment} onIonChange={e => setSelectedSegment(e.detail.value as string)}>
              <IonSegmentButton value="planning">
                <IonLabel>Planning</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="exceptions">
                <IonLabel>Exceptions</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonCardContent>
        </IonCard>

        {/* Planning hebdomadaire */}
        {selectedSegment === 'planning' && (
          <>
            {weeklySchedule.map((daySchedule, dayIndex) => (
              <IonCard key={daySchedule.day}>
                <IonCardHeader>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <IonCardTitle>{daySchedule.dayName}</IonCardTitle>
                    <IonToggle
                      checked={daySchedule.isWorking}
                      onIonChange={() => toggleDayWorking(dayIndex)}
                    />
                  </div>
                </IonCardHeader>
                
                {daySchedule.isWorking && (
                  <IonCardContent>
                    {daySchedule.timeSlots.map((slot, slotIndex) => (
                      <IonCard key={slot.id} style={{ margin: "0.5rem 0", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
                        <IonCardContent>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.5rem" }}>
                                <IonInput
                                  value={slot.startTime}
                                  type="time"
                                  style={{ maxWidth: "100px" }}
                                  onIonInput={e => updateTimeSlot(dayIndex, slotIndex, 'startTime', e.detail.value!)}
                                />
                                <span>-</span>
                                <IonInput
                                  value={slot.endTime}
                                  type="time"
                                  style={{ maxWidth: "100px" }}
                                  onIonInput={e => updateTimeSlot(dayIndex, slotIndex, 'endTime', e.detail.value!)}
                                />
                              </div>
                              
                              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                <IonLabel style={{ fontSize: "0.9rem" }}>Max patients:</IonLabel>
                                <IonInput
                                  value={slot.maxPatients}
                                  type="number"
                                  style={{ maxWidth: "80px" }}
                                  onIonInput={e => updateTimeSlot(dayIndex, slotIndex, 'maxPatients', parseInt(e.detail.value!))}
                                />
                                <IonBadge color={slot.currentBookings >= slot.maxPatients ? "danger" : "primary"}>
                                  {slot.currentBookings}/{slot.maxPatients}
                                </IonBadge>
                              </div>
                            </div>
                            
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
                              <IonToggle
                                checked={slot.isAvailable}
                                onIonChange={() => toggleTimeSlotAvailability(dayIndex, slotIndex)}
                              />
                              <IonButton
                                fill="clear"
                                size="small"
                                color="danger"
                                onClick={() => removeTimeSlot(dayIndex, slotIndex)}
                              >
                                <IonIcon icon={removeOutline} />
                              </IonButton>
                            </div>
                          </div>
                        </IonCardContent>
                      </IonCard>
                    ))}
                    
                    <IonButton
                      fill="outline"
                      size="small"
                      expand="block"
                      onClick={() => addTimeSlot(dayIndex)}
                      style={{ marginTop: "1rem" }}
                    >
                      <IonIcon icon={addOutline} slot="start" />
                      Ajouter un créneau
                    </IonButton>
                  </IonCardContent>
                )}
                
                {!daySchedule.isWorking && (
                  <IonCardContent>
                    <p style={{ textAlign: "center", color: "var(--ion-color-medium)", fontStyle: "italic" }}>
                      Jour de repos
                    </p>
                  </IonCardContent>
                )}
              </IonCard>
            ))}

            <IonCard>
              <IonCardContent>
                <IonButton expand="block" onClick={saveSchedule}>
                  <IonIcon icon={saveOutline} slot="start" />
                  Enregistrer le planning
                </IonButton>
              </IonCardContent>
            </IonCard>
          </>
        )}

        {/* Gestion des exceptions */}
        {selectedSegment === 'exceptions' && (
          <>
            <IonCard>
              <IonCardHeader>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <IonCardTitle>
                    <IonIcon icon={warningOutline} style={{ marginRight: "8px" }} />
                    Dates spéciales
                  </IonCardTitle>
                  <IonButton fill="clear" onClick={() => setIsSpecialDateModal(true)}>
                    <IonIcon icon={addOutline} />
                  </IonButton>
                </div>
              </IonCardHeader>
              
              <IonList>
                {specialDates.map(date => (
                  <IonItem key={date.id}>
                    <IonIcon 
                      icon={date.isUnavailable ? closeCircleOutline : checkmarkCircleOutline} 
                      slot="start" 
                      color={date.isUnavailable ? "danger" : "success"}
                    />
                    <IonLabel>
                      <h2>{new Date(date.date).toLocaleDateString('fr-FR')}</h2>
                      <p>{date.reason}</p>
                      <IonNote>
                        {date.isUnavailable ? "Indisponible" : "Horaires modifiés"}
                      </IonNote>
                    </IonLabel>
                    <IonButton
                      fill="clear"
                      size="small"
                      color="danger"
                      onClick={() => removeSpecialDate(date.id)}
                    >
                      <IonIcon icon={removeOutline} />
                    </IonButton>
                  </IonItem>
                ))}
                
                {specialDates.length === 0 && (
                  <IonItem>
                    <IonLabel style={{ textAlign: "center", color: "var(--ion-color-medium)" }}>
                      Aucune exception programmée
                    </IonLabel>
                  </IonItem>
                )}
              </IonList>
            </IonCard>
          </>
        )}

        {/* Modal pour ajouter une date spéciale */}
        <IonModal isOpen={isSpecialDateModal} onDidDismiss={() => setIsSpecialDateModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Ajouter une exception</IonTitle>
              <IonButton slot="end" fill="clear" onClick={() => setIsSpecialDateModal(false)}>
                <IonIcon icon={closeCircleOutline} />
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div style={{ padding: "1rem" }}>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Date</IonLabel>
                  <IonDatetime
                    value={newSpecialDate.date}
                    presentation="date"
                    onIonChange={e => setNewSpecialDate({...newSpecialDate, date: e.detail.value as string})}
                  />
                </IonItem>
                
                <IonItem>
                  <IonLabel position="stacked">Motif</IonLabel>
                  <IonInput
                    value={newSpecialDate.reason}
                    placeholder="Ex: Congés, Formation..."
                    onIonInput={e => setNewSpecialDate({...newSpecialDate, reason: e.detail.value!})}
                  />
                </IonItem>
                
                <IonItem>
                  <IonCheckbox
                    checked={newSpecialDate.isUnavailable}
                    onIonChange={e => setNewSpecialDate({...newSpecialDate, isUnavailable: e.detail.checked})}
                  />
                  <IonLabel style={{ marginLeft: "10px" }}>Journée indisponible</IonLabel>
                </IonItem>
              </IonList>
              
              <IonButton expand="block" onClick={addSpecialDate} style={{ marginTop: "1rem" }}>
                <IonIcon icon={addOutline} slot="start" />
                Ajouter l'exception
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        {/* Alert de confirmation */}
        <IonAlert
          isOpen={showSaveAlert}
          onDidDismiss={() => setShowSaveAlert(false)}
          header="Confirmer les modifications"
          message="Voulez-vous enregistrer les modifications du planning ?"
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
          message="Planning mis à jour avec succès"
          duration={3000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default DoctorAvailability;