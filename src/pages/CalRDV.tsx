
import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';

const CalRDV: React.FC = () => {
  return (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Calendrier des Rendez-vous</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            <h2>Calendrier des Rendez-vous</h2>
            {/* Contenu du calendrier des rendez-vous à ajouter ici */} 
        </IonContent>
    </IonPage>
    );
};

export default CalRDV;