import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonItem,
  IonLabel,
  IonImg,
  IonButton,
  IonInput,
  IonIcon,
  IonAlert,
  IonToast,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons
} from "@ionic/react";
import { 
  pencilOutline, 
  checkmarkOutline, 
  logOutOutline
} from "ionicons/icons";

const UserProfile: React.FC = () => {
  const history = useHistory();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("Iheb");
  const [lastName, setLastName] = useState("Ben Nasr");
  const [email, setEmail] = useState("iheb@gmail.com");
  const [role] = useState("Patient");
  const [photoUrl] = useState("https://randomuser.me/api/portraits/men/75.jpg");
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    setShowSuccessToast(true);
  };

  const handleLogout = () => {
    setShowLogoutAlert(true);
  };

  const confirmLogout = () => {
    setShowSuccessToast(true);
    setTimeout(() => {
      history.push('/login');
    }, 1000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mon Profil</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>
              <IonIcon icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <IonCard style={{ textAlign: "center", padding: "1rem" }}>
          <IonItem lines="none" style={{ justifyContent: "center" }}>
            <IonImg
              src={photoUrl}
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </IonItem>

          <IonCardHeader>
            <IonCardTitle>{firstName} {lastName}</IonCardTitle>
            <IonCardSubtitle>{role}</IonCardSubtitle>
            <IonLabel style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
              {email}
            </IonLabel>
          </IonCardHeader>

          <IonButton
            expand="block"
            color={isEditing ? "success" : "primary"}
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            style={{ margin: "0.5rem" }}
          >
            <IonIcon
              icon={isEditing ? checkmarkOutline : pencilOutline}
              slot="start"
            />
            {isEditing ? "Enregistrer" : "Modifier mes informations"}
          </IonButton>
        </IonCard>

        {isEditing && (
          <IonCard style={{ padding: "1rem" }}>
            <IonItem>
              <IonLabel position="stacked">Prénom</IonLabel>
              <IonInput
                value={firstName}
                onIonInput={(e) => setFirstName(e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Nom</IonLabel>
              <IonInput
                value={lastName}
                onIonInput={(e) => setLastName(e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput
                type="email"
                value={email}
                onIonInput={(e) => setEmail(e.detail.value!)}
              />
            </IonItem>

            <IonButton 
              expand="block" 
              color="danger" 
              onClick={handleLogout}
              style={{ margin: "1rem 0" }}
            >
              <IonIcon icon={logOutOutline} slot="start" />
              Se déconnecter
            </IonButton>
          </IonCard>
        )}

        <IonAlert
          isOpen={showLogoutAlert}
          onDidDismiss={() => setShowLogoutAlert(false)}
          header="Déconnexion"
          message="Voulez-vous vraiment vous déconnecter ?"
          buttons={[
            {
              text: 'Annuler',
              role: 'cancel'
            },
            {
              text: 'Déconnexion',
              handler: confirmLogout
            }
          ]}
        />

        <IonToast
          isOpen={showSuccessToast}
          onDidDismiss={() => setShowSuccessToast(false)}
          message={isEditing ? "Informations sauvegardées" : "Déconnexion réussie"}
          duration={2000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;