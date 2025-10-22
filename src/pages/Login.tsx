import React from 'react';
import './Home.css';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonToast,
  IonSpinner
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { logInOutline, personOutline, medkitOutline, businessOutline, shieldOutline } from 'ionicons/icons';

// Base de données des utilisateurs fictive
const usersDatabase = [
  // Patients
  { email: 'patient@demo.com', password: 'demo123', role: 'patient', name: 'Jean Patient' },
  { email: 'marie.patient@example.com', password: 'patient123', role: 'patient', name: 'Marie Dubois' },
  
  // Médecins  
  { email: 'docteur@demo.com', password: 'demo123', role: 'doctor', name: 'Dr. Martin' },
  { email: 'marie.dupont@clinique.com', password: 'mdp123', role: 'doctor', name: 'Dr. Marie Dupont' },
  { email: 'jean.martin@clinique.com', password: 'mdp456', role: 'doctor', name: 'Dr. Jean Martin' },
  
  // Réceptionnistes
  { email: 'receptionniste@demo.com', password: 'demo123', role: 'receptionist', name: 'Sophie Réceptionniste' },
  { email: 'sophie.laurent@clinique.com', password: 'rec123', role: 'receptionist', name: 'Sophie Laurent' },
  { email: 'thomas.moreau@clinique.com', password: 'rec456', role: 'receptionist', name: 'Thomas Moreau' },
  
  // Administrateurs
  { email: 'admin@demo.com', password: 'admin123', role: 'admin', name: 'Admin Principal' },
  { email: 'admin@clinique.com', password: 'admin456', role: 'admin', name: 'Admin Système' }
];

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleLogin = async () => {
    if (!email || !password) {
      setToastMessage('Veuillez remplir tous les champs');
      setShowToast(true);
      return;
    }

    setIsLoading(true);

    // Simulation d'une vérification d'authentification
    setTimeout(() => {
      // Rechercher l'utilisateur dans la base de données
      const user = usersDatabase.find(u => u.email === email && u.password === password);
      
      if (!user) {
        setToastMessage('Email ou mot de passe incorrect');
        setShowToast(true);
        setIsLoading(false);
        return;
      }

      // Sauvegarder les informations utilisateur (simulation)
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Redirection automatique selon le rôle
      setToastMessage(`Connexion réussie ! Bienvenue ${user.name}`);
      setShowToast(true);
      
      setTimeout(() => {
        switch (user.role) {
          case 'doctor':
            history.push('/doctor-tabs/agenda');
            break;
          case 'receptionist':
            history.push('/receptionist-tabs/profile');
            break;
          case 'admin':
            history.push('/admin-tabs/profile');
            break;
          default:
            history.push('/tabs/home');
            break;
        }
      }, 1500);

      setIsLoading(false);
    }, 1000); // Simulation du délai de connexion
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'doctor': return medkitOutline;
      case 'receptionist': return businessOutline;
      case 'admin': return shieldOutline;
      default: return personOutline;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'doctor': return 'success';
      case 'receptionist': return 'warning';
      case 'admin': return 'danger';
      default: return 'primary';
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar
          style={{
            background: 'linear-gradient(90deg, #0070f3, #60a5fa)',
            color: '#ffffff',
            textAlign: 'center',
            fontWeight: 600,
            letterSpacing: '1px',
          }}
        >
          <IonTitle>Connexion MedFlow</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Formulaire de connexion principal */}
        <IonCard style={{ marginTop: '2rem' }}>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={logInOutline} style={{ marginRight: '8px' }} />
              Connexion Unifiée
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonInput  
                label="Email" 
                type="email"
                placeholder="Entrez votre email"
                value={email}
                onIonChange={(e) => {
                  if (e.detail.value) {
                    setEmail(e.detail.value);
                  }
                }}
              />
            </IonItem>

            <IonItem>
              <IonInput
                label="Mot de passe"
                type="password"
                placeholder="Entrez votre mot de passe"
                value={password}
                onIonChange={(e) => {
                  if (e.detail.value) {
                    setPassword(e.detail.value);
                  }
                }}
              />
            </IonItem>

            <IonButton 
              expand="block" 
              onClick={handleLogin}
              disabled={isLoading}
              style={{ marginTop: '1rem' }}
            >
              {isLoading ? (
                <>
                  <IonSpinner name="crescent" style={{ marginRight: '8px' }} />
                  Connexion en cours...
                </>
              ) : (
                <>
                  <IonIcon icon={logInOutline} slot="start" />
                  Se connecter
                </>
              )}
            </IonButton>
          </IonCardContent>
        </IonCard>

        {/* Comptes de démonstration */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Comptes de démonstration</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Patient */}
              <div style={{ padding: '0.5rem', border: '1px solid var(--ion-color-primary)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <IonIcon icon={getRoleIcon('patient')} color={getRoleColor('patient')} style={{ marginRight: '8px' }} />
                  <strong>Patient</strong>
                </div>
                <p style={{ margin: '0', fontSize: '0.9rem' }}>Email: patient@demo.com</p>
                <p style={{ margin: '0', fontSize: '0.9rem' }}>Mot de passe: demo123</p>
              </div>

              {/* Médecin */}
              <div style={{ padding: '0.5rem', border: '1px solid var(--ion-color-success)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <IonIcon icon={getRoleIcon('doctor')} color={getRoleColor('doctor')} style={{ marginRight: '8px' }} />
                  <strong>Médecin</strong>
                </div>
                <p style={{ margin: '0', fontSize: '0.9rem' }}>Email: docteur@demo.com</p>
                <p style={{ margin: '0', fontSize: '0.9rem' }}>Mot de passe: demo123</p>
              </div>

              {/* Réceptionniste */}
              <div style={{ padding: '0.5rem', border: '1px solid var(--ion-color-warning)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <IonIcon icon={getRoleIcon('receptionist')} color={getRoleColor('receptionist')} style={{ marginRight: '8px' }} />
                  <strong>Réceptionniste</strong>
                </div>
                <p style={{ margin: '0', fontSize: '0.9rem' }}>Email: receptionniste@demo.com</p>
                <p style={{ margin: '0', fontSize: '0.9rem' }}>Mot de passe: demo123</p>
              </div>

              {/* Admin */}
              <div style={{ padding: '0.5rem', border: '1px solid var(--ion-color-danger)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <IonIcon icon={getRoleIcon('admin')} color={getRoleColor('admin')} style={{ marginRight: '8px' }} />
                  <strong>Administrateur</strong>
                </div>
                <p style={{ margin: '0', fontSize: '0.9rem' }}>Email: admin@demo.com</p>
                <p style={{ margin: '0', fontSize: '0.9rem' }}>Mot de passe: admin123</p>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Informations */}
        <IonCard>
          <IonCardContent>
            <div style={{ textAlign: 'center', color: 'var(--ion-color-medium)' }}>
              <p style={{ margin: '0', fontSize: '0.9rem' }}>
                🔒 <strong>Connexion automatique</strong>
              </p>
              <p style={{ margin: '0', fontSize: '0.8rem' }}>
                Saisissez vos identifiants et vous serez automatiquement dirigé vers votre interface selon votre rôle
              </p>
            </div>
          </IonCardContent>
        </IonCard>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          color={toastMessage.includes('réussie') ? 'success' : 'warning'}
        />
      </IonContent>
    </IonPage>
  );  
};

export default Login;