import React from "react";
import RDV_patiant from "./Rendezvous_patiant";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonItem,
  IonLabel,
  IonImg,
  IonContent,
  IonPage,
} from "@ionic/react";

interface UserProfileProps {
  firstName: string;
  lastName: string;
  email?: string;
  role?: string;
  photoUrl?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  firstName,
  lastName,
  email,
  role,
  photoUrl,
}) => {
  return (
    <IonPage>
      <IonContent>

        
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
              src={
                photoUrl ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              style={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </IonItem>

          <IonCardHeader>
            <IonCardTitle style={{ fontSize: "1.2rem", fontWeight: 600 }}>
              {firstName} {lastName}
            </IonCardTitle>
            {role && (
              <IonCardSubtitle style={{ color: "#6b7280", marginTop: 4 }}>
                {role}
              </IonCardSubtitle>
            )}
            {email && (
              <IonLabel style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
                {email}
              </IonLabel>
            )}
          </IonCardHeader>
        </IonCard>



  {/* partie rendez vous  */}
        <IonCard style={{ padding: "1rem" }}>
          <IonCardHeader>
            <IonCardTitle>Mes rendez-vous</IonCardTitle>
          </IonCardHeader>

          <RDV_patiant />
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;
