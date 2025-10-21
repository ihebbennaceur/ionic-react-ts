import React from "react";
import RDV_patiant from "./Rendezvous_patiant";
import { useState } from "react";

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
} from "@ionic/react";

import { pencilOutline, checkmarkOutline } from "ionicons/icons";




const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("Iheb");
  const [lastName, setLastName] = useState("Ben Nasr");
  const [email, setEmail] = useState("ieh@gmail.com");
  const [role, setRole] = useState("Patient");
  const [photoUrl] = 
  useState("https://randomuser.me/api/portraits/men/75.jpg");


  const handleSave = () => {
    setIsEditing(false);
    // ici tu pourrais ajouter un appel API pour sauvegarder dans la DB
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* --- Carte du profil --- */}
        <IonCard
          style={{
            textAlign: "center",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            borderRadius: "20px",
            boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
          }}
        >
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
            <IonCardTitle style={{ fontSize: "1.3rem", fontWeight: 600 }}>
              {firstName} {lastName}
            </IonCardTitle>
            <IonCardSubtitle style={{ color: "#6b7280" }}>{role}</IonCardSubtitle>
            <IonLabel style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
              {email}
            </IonLabel>
          </IonCardHeader>

          <IonButton
            expand="block"
            color={isEditing ? "success" : "primary"}
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            style={{ margin: "0.5rem 1.5rem" }}
          >
            <IonIcon
              icon={isEditing ? checkmarkOutline : pencilOutline}
              slot="start"
            />
            {isEditing ? "Enregistrer" : "Modifier mes informations"}
          </IonButton>
        </IonCard>

        {/* --- Formulaire d’édition (affiché seulement si édition active) --- */}
        {isEditing && (
          <IonCard style={{ padding: "1rem" }}>
            <IonItem>
              <IonLabel position="stacked">Prénom</IonLabel>
              <IonInput
                value={firstName}
                onIonChange={(e) => setFirstName(e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Nom</IonLabel>
              <IonInput
                value={lastName}
                onIonChange={(e) => setLastName(e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Rôle</IonLabel>
              <IonLabel>{role}</IonLabel>
               
         
            </IonItem>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;