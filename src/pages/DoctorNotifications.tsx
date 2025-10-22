import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonBadge,
  IonSegment,
  IonSegmentButton,
  IonNote,
  IonAvatar,
  IonChip,
  IonAlert,
  IonToast,
  IonRefresher,
  IonRefresherContent,
  IonToggle,
  IonFab,
  IonFabButton
} from "@ionic/react";
import {
  notificationsOutline,
  calendarOutline,
  personOutline,
  timeOutline,
  checkmarkOutline,
  closeOutline,
  warningOutline,
  informationCircleOutline,
  settingsOutline,
  trashOutline,
  ellipsisVerticalOutline
} from "ionicons/icons";

interface Notification {
  id: string;
  type: 'appointment' | 'cancellation' | 'emergency' | 'reminder' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  patientName?: string;
  patientAvatar?: string;
  appointmentTime?: string;
  actions?: NotificationAction[];
}

interface NotificationAction {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'danger';
  action: () => void;
}

const DoctorNotifications: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState<string | null>(null);
  const [notificationSettings, setNotificationSettings] = useState({
    appointments: true,
    cancellations: true,
    reminders: true,
    emergencies: true,
    system: false
  });

  // Données fictives des notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "appointment",
      title: "Nouveau rendez-vous",
      message: "Marie Martin a réservé un rendez-vous pour demain à 14h30",
      timestamp: "2024-10-21T10:30:00",
      isRead: false,
      priority: "medium",
      patientName: "Marie Martin",
      patientAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
      appointmentTime: "2024-10-22T14:30:00",
      actions: [
        {
          id: "confirm",
          label: "Confirmer",
          type: "primary",
          action: () => handleConfirmAppointment("1")
        },
        {
          id: "reschedule",
          label: "Reprogrammer",
          type: "secondary", 
          action: () => handleRescheduleAppointment("1")
        }
      ]
    },
    {
      id: "2",
      type: "cancellation",
      title: "Annulation de rendez-vous",
      message: "Jean Dupont a annulé son rendez-vous de 16h aujourd'hui",
      timestamp: "2024-10-21T09:15:00",
      isRead: false,
      priority: "high",
      patientName: "Jean Dupont",
      patientAvatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: "3",
      type: "emergency",
      title: "Appel d'urgence",
      message: "Patient Pierre Durand signale des douleurs thoraciques",
      timestamp: "2024-10-21T08:45:00",
      isRead: true,
      priority: "high",
      patientName: "Pierre Durand",
      actions: [
        {
          id: "call",
          label: "Appeler",
          type: "danger",
          action: () => handleEmergencyCall("3")
        }
      ]
    },
    {
      id: "4",
      type: "reminder",
      title: "Rappel consultation",
      message: "N'oubliez pas votre consultation avec Sophie Leroy à 11h",
      timestamp: "2024-10-21T08:00:00",
      isRead: true,
      priority: "low",
      patientName: "Sophie Leroy",
      patientAvatar: "https://randomuser.me/api/portraits/women/35.jpg"
    },
    {
      id: "5",
      type: "system",
      title: "Mise à jour système",
      message: "Une nouvelle version de MedFlow est disponible",
      timestamp: "2024-10-20T18:00:00",
      isRead: true,
      priority: "low"
    }
  ]);

  const handleConfirmAppointment = (notificationId: string) => {
    console.log("Confirming appointment for notification:", notificationId);
    markAsRead(notificationId);
  };

  const handleRescheduleAppointment = (notificationId: string) => {
    console.log("Rescheduling appointment for notification:", notificationId);
    markAsRead(notificationId);
  };

  const handleEmergencyCall = (notificationId: string) => {
    console.log("Emergency call for notification:", notificationId);
    markAsRead(notificationId);
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotificationToDelete(notificationId);
    setShowDeleteAlert(true);
  };

  const confirmDelete = () => {
    if (notificationToDelete) {
      setNotifications(prev => 
        prev.filter(notif => notif.id !== notificationToDelete)
      );
      setNotificationToDelete(null);
      setShowDeleteAlert(false);
      setShowSuccessToast(true);
    }
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setShowSuccessToast(true);
  };

  const getFilteredNotifications = () => {
    switch (selectedSegment) {
      case 'unread':
        return notifications.filter(notif => !notif.isRead);
      case 'appointments':
        return notifications.filter(notif => 
          notif.type === 'appointment' || notif.type === 'cancellation'
        );
      case 'emergencies':
        return notifications.filter(notif => notif.type === 'emergency');
      default:
        return notifications;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment': return calendarOutline;
      case 'cancellation': return closeOutline;
      case 'emergency': return warningOutline;
      case 'reminder': return timeOutline;
      case 'system': return informationCircleOutline;
      default: return notificationsOutline;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') return 'danger';
    if (type === 'emergency') return 'danger';
    if (type === 'appointment') return 'primary';
    if (type === 'cancellation') return 'warning';
    return 'medium';
  };

  const getPriorityChip = (priority: string) => {
    const colors = {
      high: 'danger',
      medium: 'warning', 
      low: 'success'
    };
    const labels = {
      high: 'Urgent',
      medium: 'Normal',
      low: 'Info'
    };
    return { color: colors[priority as keyof typeof colors], label: labels[priority as keyof typeof labels] };
  };

  const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      // Simulation du rafraîchissement
      event.detail.complete();
    }, 2000);
  };

  const unreadCount = notifications.filter(notif => !notif.isRead).length;
  const filteredNotifications = getFilteredNotifications();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Notifications
            {unreadCount > 0 && (
              <IonBadge color="danger" style={{ marginLeft: "8px" }}>
                {unreadCount}
              </IonBadge>
            )}
          </IonTitle>
          <IonButton slot="end" fill="clear" onClick={markAllAsRead}>
            <IonIcon icon={checkmarkOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {/* Statistiques */}
        <IonCard>
          <IonCardContent>
            <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center" }}>
              <div>
                <h2 style={{ margin: "0", color: "var(--ion-color-primary)" }}>{notifications.length}</h2>
                <p style={{ margin: "0", fontSize: "0.9rem" }}>Total</p>
              </div>
              <div>
                <h2 style={{ margin: "0", color: "var(--ion-color-danger)" }}>{unreadCount}</h2>
                <p style={{ margin: "0", fontSize: "0.9rem" }}>Non lues</p>
              </div>
              <div>
                <h2 style={{ margin: "0", color: "var(--ion-color-warning)" }}>
                  {notifications.filter(n => n.priority === 'high').length}
                </h2>
                <p style={{ margin: "0", fontSize: "0.9rem" }}>Urgentes</p>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Filtres */}
        <IonCard>
          <IonCardContent>
            <IonSegment value={selectedSegment} onIonChange={e => setSelectedSegment(e.detail.value as string)}>
              <IonSegmentButton value="all">
                <IonLabel>Toutes</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="unread">
                <IonLabel>Non lues</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="appointments">
                <IonLabel>RDV</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="emergencies">
                <IonLabel>Urgences</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonCardContent>
        </IonCard>

        {/* Liste des notifications */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              {selectedSegment === 'all' && 'Toutes les notifications'}
              {selectedSegment === 'unread' && 'Notifications non lues'}
              {selectedSegment === 'appointments' && 'Rendez-vous'}
              {selectedSegment === 'emergencies' && 'Urgences'}
              ({filteredNotifications.length})
            </IonCardTitle>
          </IonCardHeader>
          
          <IonList>
            {filteredNotifications.map(notification => (
              <IonItem 
                key={notification.id}
                style={{
                  '--background': notification.isRead ? 'transparent' : 'var(--ion-color-light)',
                  borderLeft: notification.isRead ? 'none' : '4px solid var(--ion-color-primary)'
                }}
              >
                <IonIcon 
                  icon={getNotificationIcon(notification.type)} 
                  slot="start" 
                  color={getNotificationColor(notification.type, notification.priority)}
                />
                
                <IonLabel>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <h2 style={{ fontWeight: notification.isRead ? "normal" : "bold" }}>
                        {notification.title}
                      </h2>
                      <p>{notification.message}</p>
                      
                      <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "4px" }}>
                        <IonNote style={{ fontSize: "0.8rem" }}>
                          {new Date(notification.timestamp).toLocaleString('fr-FR')}
                        </IonNote>
                        
                        <IonChip 
                          color={getPriorityChip(notification.priority).color} 
                          style={{ fontSize: "0.7rem", height: "20px" }}
                        >
                          {getPriorityChip(notification.priority).label}
                        </IonChip>
                      </div>

                      {notification.patientName && (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
                          {notification.patientAvatar && (
                            <IonAvatar style={{ width: "30px", height: "30px" }}>
                              <img src={notification.patientAvatar} alt={notification.patientName} />
                            </IonAvatar>
                          )}
                          <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>
                            {notification.patientName}
                          </span>
                        </div>
                      )}

                      {notification.actions && (
                        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                          {notification.actions.map(action => (
                            <IonButton 
                              key={action.id}
                              size="small"
                              fill={action.type === 'primary' ? 'solid' : 'outline'}
                              color={action.type === 'danger' ? 'danger' : 'primary'}
                              onClick={action.action}
                            >
                              {action.label}
                            </IonButton>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      {!notification.isRead && (
                        <IonButton 
                          fill="clear" 
                          size="small"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <IonIcon icon={checkmarkOutline} />
                        </IonButton>
                      )}
                      <IonButton 
                        fill="clear" 
                        size="small" 
                        color="danger"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <IonIcon icon={trashOutline} />
                      </IonButton>
                    </div>
                  </div>
                </IonLabel>
              </IonItem>
            ))}
            
            {filteredNotifications.length === 0 && (
              <IonItem>
                <IonLabel style={{ textAlign: "center", color: "var(--ion-color-medium)" }}>
                  Aucune notification à afficher
                </IonLabel>
              </IonItem>
            )}
          </IonList>
        </IonCard>

        {/* Paramètres de notifications */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={settingsOutline} style={{ marginRight: "8px" }} />
              Paramètres des notifications
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>Nouveaux rendez-vous</IonLabel>
                <IonToggle 
                  checked={notificationSettings.appointments}
                  onIonChange={e => setNotificationSettings({
                    ...notificationSettings, 
                    appointments: e.detail.checked
                  })}
                />
              </IonItem>
              <IonItem>
                <IonLabel>Annulations</IonLabel>
                <IonToggle 
                  checked={notificationSettings.cancellations}
                  onIonChange={e => setNotificationSettings({
                    ...notificationSettings, 
                    cancellations: e.detail.checked
                  })}
                />
              </IonItem>
              <IonItem>
                <IonLabel>Rappels</IonLabel>
                <IonToggle 
                  checked={notificationSettings.reminders}
                  onIonChange={e => setNotificationSettings({
                    ...notificationSettings, 
                    reminders: e.detail.checked
                  })}
                />
              </IonItem>
              <IonItem>
                <IonLabel>Urgences</IonLabel>
                <IonToggle 
                  checked={notificationSettings.emergencies}
                  onIonChange={e => setNotificationSettings({
                    ...notificationSettings, 
                    emergencies: e.detail.checked
                  })}
                />
              </IonItem>
              <IonItem>
                <IonLabel>Notifications système</IonLabel>
                <IonToggle 
                  checked={notificationSettings.system}
                  onIonChange={e => setNotificationSettings({
                    ...notificationSettings, 
                    system: e.detail.checked
                  })}
                />
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Bouton d'actions */}
        {notifications.length > 0 && (
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={clearAllNotifications}>
              <IonIcon icon={trashOutline} />
            </IonFabButton>
          </IonFab>
        )}

        {/* Alert de suppression */}
        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header="Supprimer la notification"
          message="Voulez-vous vraiment supprimer cette notification ?"
          buttons={[
            {
              text: 'Annuler',
              role: 'cancel'
            },
            {
              text: 'Supprimer',
              handler: confirmDelete
            }
          ]}
        />

        {/* Toast de succès */}
        <IonToast
          isOpen={showSuccessToast}
          onDidDismiss={() => setShowSuccessToast(false)}
          message="Action effectuée avec succès"
          duration={2000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default DoctorNotifications;