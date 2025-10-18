import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonText } from '@ionic/react';
import './Home.css';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!username || !firstName || !lastName || !email || !password || !confirm) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    // perform registration action here
    console.log('Register', { username, firstName, lastName, email, password });
    setError(null);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar
          style={{
            background: 'linear-gradient(90deg, #0070f3, #60a5fa)',
            color: '#0a0101ff',
            textAlign: 'center',
            fontWeight: 600,
            letterSpacing: '1px',
          }}
        >
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onIonChange={(e) => { if (e.detail.value) setUsername(e.detail.value); }}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            value={firstName}
            onIonChange={(e) => { if (e.detail.value) setFirstName(e.detail.value); }}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            value={lastName}
            onIonChange={(e) => { if (e.detail.value) setLastName(e.detail.value); }}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onIonChange={(e) => { if (e.detail.value) setEmail(e.detail.value); }}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Password"
            type="password"
            placeholder="Enter password"
            value={password}
            onIonChange={(e) => { if (e.detail.value) setPassword(e.detail.value); }}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Confirm"
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onIonChange={(e) => { if (e.detail.value) setConfirm(e.detail.value); }}
          />
        </IonItem>
        {error && (
          <IonText color="danger">
            <p style={{ padding: 12 }}>{error}</p>
          </IonText>
        )}
        <IonButton expand="block" onClick={handleSubmit}>
          S'inscrire
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Register;