import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonText } from '@ionic/react';
import './Home.css';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = () => {
        if (password !== confirm) {
            setError('Passwords do not match');
            return;
        }
        // perform registration action here
        console.log('Register', { email, password });
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