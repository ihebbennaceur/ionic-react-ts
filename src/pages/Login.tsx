import React from 'react';
import './Home.css';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {  IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';

import { useState }  from 'react';




const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  return (
    <IonPage>
        <IonHeader>

        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>

        </IonHeader>
      


<IonContent className="ion-padding">

  <IonItem>
  
    <IonInput  label =" Email" 
    type="email"
    placeholder="Enter your email"
    value = {email}
    
    onIonChange = {(e)=>{
        if (e.detail.value) {  // car en typscript peut etre null
        setEmail(e.detail.value)}
     } }
  
/>
  </IonItem>

















  <IonItem>

    <IonInput
    label ="Password"
    type ='password'

    onIonChange={
      
         (e)=> {

if (e.detail.value) {
    setPassword(e.detail.value)
}
  }
        
        }
  

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