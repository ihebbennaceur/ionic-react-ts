import React from 'react';
import './Home.css';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {  IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';

import { useState }  from 'react';


const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const Login: React.FC = () => {
  return (
    <IonPage>
        <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
        </IonHeader>
      


<IonContent className="ion-padding">
  <IonItem>
    <IonLabel position="floating">Email</IonLabel>
    <IonInput
      type="email"
      value={email}
      onIonChange={e => setEmail(e.detail.value!)}
    />
  </IonItem>

  <IonItem>
    <IonLabel position="floating">Mot de passe</IonLabel>
    <IonInput
      type="password"
      value={password}
      onIonChange={e => setPassword(e.detail.value!)}
    />
  </IonItem>

  <IonButton expand="block" onClick={() => console.log(email, password)}>
    Se connecter
  </IonButton>
</IonContent>






        
    </IonPage>
    );  
};

export default Login;