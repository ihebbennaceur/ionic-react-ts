import React from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import { calendarOutline, timeOutline, personOutline } from "ionicons/icons";

const rd = [
  { date: "12/06/2025", time: "10:00", doctor: "Dr. Smith" },
  { date: "15/06/2025", time: "14:00", doctor: "Dr. Johnson" },
  { date: "20/06/2026", time: "09:00", doctor: "Dr. Lee" },
];

export default function RDV_patiant() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mes Rendez-vous</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{ padding: "1rem" }}>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle style={{ textAlign: "center", fontSize: "1.4rem" }}>
                🩺 Mes Rendez-vous
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                {rd.map((r, i) => (
                  <IonItem key={i} lines="full">
                    <IonLabel>
                      <h2 style={{ marginBottom: "0.3rem", fontWeight: "bold" }}>
                        <IonIcon icon={calendarOutline} /> {r.date}
                      </h2>
                      <p style={{ margin: "0.2rem 0" }}>
                        <IonIcon icon={timeOutline} /> <strong>Heure:</strong> {r.time}
                      </p>
                      <p style={{ margin: "0.2rem 0" }}>
                        <IonIcon icon={personOutline} /> <strong>Médecin:</strong> {r.doctor}
                      </p>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
}