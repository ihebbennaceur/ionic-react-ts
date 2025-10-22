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
  IonButtons,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonBadge,
  IonChip,
  IonSegment,
  IonSegmentButton,
  IonModal,
  IonAlert,
  IonToast,
  IonRefresher,
  IonRefresherContent,
  IonGrid,
  IonRow,
  IonCol,
  IonNote,
  IonCheckbox,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonToggle,
  IonFab,
  IonFabButton,
  IonInput,
  IonTextarea
} from "@ionic/react";
import {
  notificationsOutline,
  searchOutline,
  filterOutline,
  calendarOutline,
  timeOutline,
  personOutline,
  medkitOutline,
  callOutline,
  trashOutline,
  checkmarkOutline,
  closeOutline,
  alertCircleOutline,
  informationCircleOutline,
  eyeOutline,
  mailOutline,
  warningOutline,
  checkmarkCircleOutline,
  chatboxOutline,
  addOutline,
  sendOutline,
  settingsOutline,
  volumeHighOutline,
  volumeMuteOutline,
  phonePortraitOutline,
  mailUnreadOutline,
  businessOutline,
  documentTextOutline
} from "ionicons/icons";

interface Notification {
  id: string;
  type: 'appointment' | 'emergency' | 'system' | 'reminder' | 'message' | 'payment';
  title: string;
  message: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  timestamp: string;
  isRead: boolean;
  isArchived: boolean;
  relatedEntity?: {
    type: 'patient' | 'doctor' | 'appointment';
    id: string;
    name: string;
  };
  actions?: {
    label: string;
    action: string;
    color?: string;
  }[];
  sender?: string;
  category: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  soundEnabled: boolean;
  categories: {
    [key: string]: {
      enabled: boolean;
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
}

const ReceptionistNotifications: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [filterPriority, setFilterPriority] = useState<string>('');
  const [isNotificationModal, setIsNotificationModal] = useState(false);
  const [isSettingsModal, setIsSettingsModal] = useState(false);
  const [isNewNotificationModal, setIsNewNotificationModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Données fictives des notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "notif1",
      type: "appointment",
      title: "Nouveau rendez-vous",
      message: "Rendez-vous créé pour Pierre Durand avec Dr. Marie Dupont le 22/10/2024 à 09:00",
      priority: "normal",
      timestamp: "2024-10-21T10:30:00",
      isRead: false,
      isArchived: false,
      relatedEntity: {
        type: "appointment",
        id: "apt1",
        name: "Pierre Durand - Dr. Marie Dupont"
      },
      actions: [
        { label: "Voir", action: "view", color: "primary" },
        { label: "Modifier", action: "edit", color: "warning" }
      ],
      sender: "Système",
      category: "Rendez-vous"
    },
    {
      id: "notif2",
      type: "emergency",
      title: "Patient en urgence",
      message: "Marie Moreau (30 ans) demande un rendez-vous urgent pour douleurs abdominales sévères",
      priority: "urgent",
      timestamp: "2024-10-21T09:15:00",
      isRead: false,
      isArchived: false,
      relatedEntity: {
        type: "patient",
        id: "pat2",
        name: "Marie Moreau"
      },
      actions: [
        { label: "Créer RDV urgent", action: "create_urgent", color: "danger" },
        { label: "Appeler", action: "call", color: "primary" }
      ],
      sender: "Patient",
      category: "Urgence"
    },
    {
      id: "notif3",
      type: "reminder",
      title: "Rappel confirmation",
      message: "3 rendez-vous à confirmer pour demain (22/10/2024)",
      priority: "high",
      timestamp: "2024-10-21T08:00:00",
      isRead: true,
      isArchived: false,
      actions: [
        { label: "Voir les RDV", action: "view_appointments", color: "warning" }
      ],
      sender: "Système",
      category: "Rappel"
    },
    {
      id: "notif4",
      type: "system",
      title: "Mise à jour disponible",
      message: "Une nouvelle version du système de gestion est disponible (v2.1.3)",
      priority: "low",
      timestamp: "2024-10-21T07:30:00",
      isRead: true,
      isArchived: false,
      actions: [
        { label: "Voir détails", action: "view_update", color: "tertiary" }
      ],
      sender: "Admin système",
      category: "Système"
    },
    {
      id: "notif5",
      type: "message",
      title: "Message de Dr. Jean Martin",
      message: "Pouvez-vous reprogrammer le RDV de Sophie Bernard? Je serai en retard de 30 minutes.",
      priority: "normal",
      timestamp: "2024-10-21T07:00:00",
      isRead: false,
      isArchived: false,
      relatedEntity: {
        type: "doctor",
        id: "doc2",
        name: "Dr. Jean Martin"
      },
      actions: [
        { label: "Répondre", action: "reply", color: "primary" },
        { label: "Reprogrammer", action: "reschedule", color: "warning" }
      ],
      sender: "Dr. Jean Martin",
      category: "Message"
    },
    {
      id: "notif6",
      type: "payment",
      title: "Paiement en attente",
      message: "Facture #F-2024-0158 de Thomas Petit (250€) en attente de règlement depuis 15 jours",
      priority: "high",
      timestamp: "2024-10-20T16:00:00",
      isRead: true,
      isArchived: false,
      relatedEntity: {
        type: "patient",
        id: "pat4",
        name: "Thomas Petit"
      },
      actions: [
        { label: "Voir facture", action: "view_invoice", color: "primary" },
        { label: "Contacter", action: "contact", color: "warning" }
      ],
      sender: "Service comptabilité",
      category: "Paiement"
    },
    {
      id: "notif7",
      type: "appointment",
      title: "Annulation de rendez-vous",
      message: "Sophie Bernard a annulé son RDV du 21/10/2024 à 15:30 avec Dr. Sarah Leroy",
      priority: "normal",
      timestamp: "2024-10-20T14:20:00",
      isRead: true,
      isArchived: false,
      relatedEntity: {
        type: "appointment",
        id: "apt3",
        name: "Sophie Bernard - Dr. Sarah Leroy"
      },
      actions: [
        { label: "Reprogrammer", action: "reschedule", color: "primary" }
      ],
      sender: "Patient",
      category: "Rendez-vous"
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    soundEnabled: true,
    categories: {
      "Rendez-vous": { enabled: true, email: true, sms: false, push: true },
      "Urgence": { enabled: true, email: true, sms: true, push: true },
      "Rappel": { enabled: true, email: false, sms: false, push: true },
      "Système": { enabled: true, email: true, sms: false, push: false },
      "Message": { enabled: true, email: false, sms: false, push: true },
      "Paiement": { enabled: true, email: true, sms: false, push: true }
    }
  });

  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'message' as Notification['type'],
    priority: 'normal' as Notification['priority'],
    recipient: '',
    category: 'Message'
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'emergency': return 'danger';
      case 'appointment': return 'primary';
      case 'reminder': return 'warning';
      case 'system': return 'tertiary';
      case 'message': return 'secondary';
      case 'payment': return 'success';
      default: return 'medium';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'emergency': return alertCircleOutline;
      case 'appointment': return calendarOutline;
      case 'reminder': return timeOutline;
      case 'system': return settingsOutline;
      case 'message': return chatboxOutline;
      case 'payment': return businessOutline;
      default: return notificationsOutline;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'emergency': return 'Urgence';
      case 'appointment': return 'Rendez-vous';
      case 'reminder': return 'Rappel';
      case 'system': return 'Système';
      case 'message': return 'Message';
      case 'payment': return 'Paiement';
      default: return type;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'danger';
      case 'high': return 'warning';
      case 'normal': return 'primary';
      case 'low': return 'medium';
      default: return 'medium';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'Urgent';
      case 'high': return 'Élevée';
      case 'normal': return 'Normale';
      case 'low': return 'Basse';
      default: return priority;
    }
  };

  const getFilteredNotifications = () => {
    let filtered = notifications;

    // Filtre par segment
    if (selectedSegment !== 'all') {
      if (selectedSegment === 'unread') {
        filtered = filtered.filter(notif => !notif.isRead);
      } else if (selectedSegment === 'urgent') {
        filtered = filtered.filter(notif => notif.priority === 'urgent' || notif.priority === 'high');
      } else if (selectedSegment === 'archived') {
        filtered = filtered.filter(notif => notif.isArchived);
      }
    }

    // Filtre par recherche
    if (searchText) {
      filtered = filtered.filter(notif =>
        notif.title.toLowerCase().includes(searchText.toLowerCase()) ||
        notif.message.toLowerCase().includes(searchText.toLowerCase()) ||
        notif.sender?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filtre par type
    if (filterType) {
      filtered = filtered.filter(notif => notif.type === filterType);
    }

    // Filtre par priorité
    if (filterPriority) {
      filtered = filtered.filter(notif => notif.priority === filterPriority);
    }

    // Exclure les archivées sauf si on regarde les archivées
    if (selectedSegment !== 'archived') {
      filtered = filtered.filter(notif => !notif.isArchived);
    }

    return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === notificationId ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
    setToastMessage('Toutes les notifications marquées comme lues');
    setShowSuccessToast(true);
  };

  const archiveNotification = (notificationId: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === notificationId ? { ...notif, isArchived: true, isRead: true } : notif
    ));
    setToastMessage('Notification archivée');
    setShowSuccessToast(true);
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(notif => notif.id !== notificationId));
    setToastMessage('Notification supprimée');
    setShowSuccessToast(true);
  };

  const handleNotificationAction = (notification: Notification, action: string) => {
    switch (action) {
      case 'view':
        setToastMessage(`Affichage de ${notification.relatedEntity?.name}`);
        break;
      case 'edit':
        setToastMessage(`Modification de ${notification.relatedEntity?.name}`);
        break;
      case 'create_urgent':
        setToastMessage(`Création RDV urgent pour ${notification.relatedEntity?.name}`);
        break;
      case 'call':
        setToastMessage(`Appel vers ${notification.relatedEntity?.name}`);
        break;
      case 'reply':
        setToastMessage(`Réponse à ${notification.sender}`);
        break;
      case 'reschedule':
        setToastMessage(`Reprogrammation pour ${notification.relatedEntity?.name}`);
        break;
      default:
        setToastMessage(`Action: ${action}`);
    }
    setShowSuccessToast(true);
    markAsRead(notification.id);
  };

  const viewNotificationDetails = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsNotificationModal(true);
    markAsRead(notification.id);
  };

  const createNotification = () => {
    if (!newNotification.title || !newNotification.message) {
      setToastMessage('Veuillez remplir tous les champs obligatoires');
      setShowSuccessToast(true);
      return;
    }

    const notification: Notification = {
      id: Date.now().toString(),
      type: newNotification.type,
      title: newNotification.title,
      message: newNotification.message,
      priority: newNotification.priority,
      timestamp: new Date().toISOString(),
      isRead: false,
      isArchived: false,
      sender: 'Réceptionniste',
      category: newNotification.category
    };

    setNotifications([notification, ...notifications]);
    setIsNewNotificationModal(false);
    setToastMessage('Notification créée et envoyée');
    setShowSuccessToast(true);

    // Reset form
    setNewNotification({
      title: '',
      message: '',
      type: 'message',
      priority: 'normal',
      recipient: '',
      category: 'Message'
    });
  };

  const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(n => !n.isRead && !n.isArchived).length;
  const urgentCount = notifications.filter(n => (n.priority === 'urgent' || n.priority === 'high') && !n.isArchived).length;
  const todayCount = notifications.filter(n => 
    new Date(n.timestamp).toDateString() === new Date().toDateString() && !n.isArchived
  ).length;

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
          <IonButtons slot="end">
            <IonButton onClick={() => setIsSettingsModal(true)}>
              <IonIcon icon={settingsOutline} />
            </IonButton>
            <IonButton onClick={markAllAsRead}>
              <IonIcon icon={checkmarkCircleOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {/* Statistiques rapides */}
        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="3" style={{ textAlign: "center" }}>
                  <h2 style={{ margin: "0", color: "var(--ion-color-danger)" }}>{unreadCount}</h2>
                  <p style={{ margin: "0", fontSize: "0.8rem" }}>Non lues</p>
                </IonCol>
                <IonCol size="3" style={{ textAlign: "center" }}>
                  <h2 style={{ margin: "0", color: "var(--ion-color-warning)" }}>{urgentCount}</h2>
                  <p style={{ margin: "0", fontSize: "0.8rem" }}>Urgentes</p>
                </IonCol>
                <IonCol size="3" style={{ textAlign: "center" }}>
                  <h2 style={{ margin: "0", color: "var(--ion-color-primary)" }}>{todayCount}</h2>
                  <p style={{ margin: "0", fontSize: "0.8rem" }}>Aujourd'hui</p>
                </IonCol>
                <IonCol size="3" style={{ textAlign: "center" }}>
                  <h2 style={{ margin: "0", color: "var(--ion-color-tertiary)" }}>{notifications.length}</h2>
                  <p style={{ margin: "0", fontSize: "0.8rem" }}>Total</p>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Filtres */}
        <IonCard>
          <IonCardContent>
            <IonSearchbar
              value={searchText}
              onIonInput={e => setSearchText(e.detail.value!)}
              placeholder="Rechercher dans les notifications..."
              showClearButton="focus"
            />
            
            <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
              <IonSelect
                value={filterType}
                placeholder="Type"
                onIonChange={e => setFilterType(e.detail.value)}
                style={{ minWidth: "120px" }}
              >
                <IonSelectOption value="">Tous les types</IonSelectOption>
                <IonSelectOption value="emergency">Urgence</IonSelectOption>
                <IonSelectOption value="appointment">Rendez-vous</IonSelectOption>
                <IonSelectOption value="reminder">Rappel</IonSelectOption>
                <IonSelectOption value="message">Message</IonSelectOption>
                <IonSelectOption value="payment">Paiement</IonSelectOption>
                <IonSelectOption value="system">Système</IonSelectOption>
              </IonSelect>

              <IonSelect
                value={filterPriority}
                placeholder="Priorité"
                onIonChange={e => setFilterPriority(e.detail.value)}
                style={{ minWidth: "120px" }}
              >
                <IonSelectOption value="">Toutes les priorités</IonSelectOption>
                <IonSelectOption value="urgent">Urgent</IonSelectOption>
                <IonSelectOption value="high">Élevée</IonSelectOption>
                <IonSelectOption value="normal">Normale</IonSelectOption>
                <IonSelectOption value="low">Basse</IonSelectOption>
              </IonSelect>
            </div>

            <IonSegment 
              value={selectedSegment} 
              onIonChange={e => setSelectedSegment(e.detail.value as string)}
              style={{ marginTop: "8px" }}
            >
              <IonSegmentButton value="all">
                <IonLabel>Toutes</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="unread">
                <IonLabel>Non lues</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="urgent">
                <IonLabel>Urgentes</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="archived">
                <IonLabel>Archivées</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonCardContent>
        </IonCard>

        {/* Liste des notifications */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              Notifications ({filteredNotifications.length})
            </IonCardTitle>
          </IonCardHeader>
          
          <IonList>
            {filteredNotifications.map(notification => (
              <IonItemSliding key={notification.id}>
                <IonItem 
                  button 
                  onClick={() => viewNotificationDetails(notification)}
                  style={{
                    backgroundColor: notification.isRead ? 'transparent' : 'var(--ion-color-light-tint)',
                    borderLeft: `4px solid var(--ion-color-${getPriorityColor(notification.priority)})`
                  }}
                >
                  <IonIcon 
                    icon={getTypeIcon(notification.type)} 
                    slot="start" 
                    color={getTypeColor(notification.type)}
                  />
                  
                  <IonLabel>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ flex: 1 }}>
                        <h2 style={{ 
                          fontWeight: notification.isRead ? "normal" : "bold", 
                          margin: "0 0 4px 0" 
                        }}>
                          {notification.title}
                        </h2>
                        
                        <p style={{ margin: "0 0 4px 0", fontSize: "0.9rem" }}>
                          {notification.message}
                        </p>
                        
                        <div style={{ display: "flex", gap: "4px", alignItems: "center", marginBottom: "4px" }}>
                          <IonIcon icon={timeOutline} style={{ fontSize: "0.8rem" }} />
                          <span style={{ fontSize: "0.8rem", color: "var(--ion-color-medium)" }}>
                            {new Date(notification.timestamp).toLocaleString('fr-FR')}
                          </span>
                          {notification.sender && (
                            <span style={{ fontSize: "0.8rem", color: "var(--ion-color-medium)" }}>
                              • {notification.sender}
                            </span>
                          )}
                        </div>
                        
                        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "8px" }}>
                          <IonChip color={getTypeColor(notification.type)} style={{ fontSize: "0.8rem" }}>
                            {getTypeLabel(notification.type)}
                          </IonChip>
                          
                          <IonChip color={getPriorityColor(notification.priority)} style={{ fontSize: "0.8rem" }}>
                            {getPriorityLabel(notification.priority)}
                          </IonChip>
                          
                          {notification.relatedEntity && (
                            <IonChip color="tertiary" style={{ fontSize: "0.8rem" }}>
                              {notification.relatedEntity.name}
                            </IonChip>
                          )}
                        </div>
                        
                        {notification.actions && notification.actions.length > 0 && (
                          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                            {notification.actions.slice(0, 2).map((action, index) => (
                              <IonButton
                                key={index}
                                size="small"
                                fill="outline"
                                color={action.color || "primary"}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleNotificationAction(notification, action.action);
                                }}
                              >
                                {action.label}
                              </IonButton>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "8px" }}>
                        {!notification.isRead && (
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              backgroundColor: "var(--ion-color-primary)",
                              marginBottom: "4px"
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </IonLabel>
                </IonItem>
                
                <IonItemOptions side="end">
                  {!notification.isRead && (
                    <IonItemOption
                      color="primary"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <IonIcon icon={checkmarkOutline} />
                      Lue
                    </IonItemOption>
                  )}
                  
                  <IonItemOption
                    color="warning"
                    onClick={() => archiveNotification(notification.id)}
                  >
                    <IonIcon icon={documentTextOutline} />
                    Archiver
                  </IonItemOption>
                  
                  <IonItemOption
                    color="danger"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <IonIcon icon={trashOutline} />
                    Supprimer
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
            
            {filteredNotifications.length === 0 && (
              <IonItem>
                <IonLabel style={{ textAlign: "center", color: "var(--ion-color-medium)" }}>
                  Aucune notification trouvée
                </IonLabel>
              </IonItem>
            )}
          </IonList>
        </IonCard>

        {/* FAB pour nouvelle notification */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setIsNewNotificationModal(true)}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>

        {/* Modal détails notification */}
        <IonModal isOpen={isNotificationModal} onDidDismiss={() => setIsNotificationModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Détails de la notification</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsNotificationModal(false)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {selectedNotification && (
              <div style={{ padding: "1rem" }}>
                <IonCard>
                  <IonCardHeader>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <IonIcon 
                        icon={getTypeIcon(selectedNotification.type)}
                        color={getTypeColor(selectedNotification.type)}
                        style={{ fontSize: "1.5rem" }}
                      />
                      <IonCardTitle>{selectedNotification.title}</IonCardTitle>
                    </div>
                  </IonCardHeader>
                  <IonCardContent>
                    <p style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                      {selectedNotification.message}
                    </p>
                    
                    <div style={{ marginTop: "1rem" }}>
                      <IonList>
                        <IonItem>
                          <IonLabel>
                            <h3>Type</h3>
                            <p>{getTypeLabel(selectedNotification.type)}</p>
                          </IonLabel>
                        </IonItem>
                        
                        <IonItem>
                          <IonLabel>
                            <h3>Priorité</h3>
                            <p>{getPriorityLabel(selectedNotification.priority)}</p>
                          </IonLabel>
                        </IonItem>
                        
                        <IonItem>
                          <IonLabel>
                            <h3>Date et heure</h3>
                            <p>{new Date(selectedNotification.timestamp).toLocaleString('fr-FR')}</p>
                          </IonLabel>
                        </IonItem>
                        
                        {selectedNotification.sender && (
                          <IonItem>
                            <IonLabel>
                              <h3>Expéditeur</h3>
                              <p>{selectedNotification.sender}</p>
                            </IonLabel>
                          </IonItem>
                        )}
                        
                        {selectedNotification.relatedEntity && (
                          <IonItem>
                            <IonLabel>
                              <h3>Concerné</h3>
                              <p>{selectedNotification.relatedEntity.name}</p>
                            </IonLabel>
                          </IonItem>
                        )}
                      </IonList>
                    </div>
                    
                    {selectedNotification.actions && selectedNotification.actions.length > 0 && (
                      <div style={{ marginTop: "1rem" }}>
                        <h3>Actions disponibles</h3>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
                          {selectedNotification.actions.map((action, index) => (
                            <IonButton
                              key={index}
                              color={action.color || "primary"}
                              onClick={() => {
                                handleNotificationAction(selectedNotification, action.action);
                                setIsNotificationModal(false);
                              }}
                            >
                              {action.label}
                            </IonButton>
                          ))}
                        </div>
                      </div>
                    )}
                  </IonCardContent>
                </IonCard>
              </div>
            )}
          </IonContent>
        </IonModal>

        {/* Modal nouvelle notification */}
        <IonModal isOpen={isNewNotificationModal} onDidDismiss={() => setIsNewNotificationModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Nouvelle notification</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsNewNotificationModal(false)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div style={{ padding: "1rem" }}>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Titre *</IonLabel>
                  <IonInput
                    value={newNotification.title}
                    placeholder="Titre de la notification"
                    onIonInput={e => setNewNotification({...newNotification, title: e.detail.value!})}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Message *</IonLabel>
                  <IonTextarea
                    value={newNotification.message}
                    placeholder="Contenu du message..."
                    rows={4}
                    onIonInput={e => setNewNotification({...newNotification, message: e.detail.value!})}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Type</IonLabel>
                  <IonSelect
                    value={newNotification.type}
                    onIonChange={e => setNewNotification({...newNotification, type: e.detail.value})}
                  >
                    <IonSelectOption value="message">Message</IonSelectOption>
                    <IonSelectOption value="reminder">Rappel</IonSelectOption>
                    <IonSelectOption value="appointment">Rendez-vous</IonSelectOption>
                    <IonSelectOption value="emergency">Urgence</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Priorité</IonLabel>
                  <IonSelect
                    value={newNotification.priority}
                    onIonChange={e => setNewNotification({...newNotification, priority: e.detail.value})}
                  >
                    <IonSelectOption value="low">Basse</IonSelectOption>
                    <IonSelectOption value="normal">Normale</IonSelectOption>
                    <IonSelectOption value="high">Élevée</IonSelectOption>
                    <IonSelectOption value="urgent">Urgent</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Destinataire</IonLabel>
                  <IonSelect
                    value={newNotification.recipient}
                    placeholder="Sélectionner un destinataire"
                    onIonChange={e => setNewNotification({...newNotification, recipient: e.detail.value})}
                  >
                    <IonSelectOption value="all">Tous les utilisateurs</IonSelectOption>
                    <IonSelectOption value="doctors">Tous les médecins</IonSelectOption>
                    <IonSelectOption value="receptionists">Tous les réceptionnistes</IonSelectOption>
                    <IonSelectOption value="admin">Administrateurs</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonList>

              <IonButton expand="block" onClick={createNotification} style={{ marginTop: "1rem" }}>
                <IonIcon icon={sendOutline} slot="start" />
                Envoyer la notification
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        {/* Modal paramètres */}
        <IonModal isOpen={isSettingsModal} onDidDismiss={() => setIsSettingsModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Paramètres de notification</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsSettingsModal(false)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div style={{ padding: "1rem" }}>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Paramètres généraux</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <IonIcon icon={mailUnreadOutline} slot="start" />
                      <IonLabel>Notifications par email</IonLabel>
                      <IonToggle 
                        checked={notificationSettings.emailNotifications}
                        onIonChange={e => setNotificationSettings({
                          ...notificationSettings,
                          emailNotifications: e.detail.checked
                        })}
                      />
                    </IonItem>
                    
                    <IonItem>
                      <IonIcon icon={phonePortraitOutline} slot="start" />
                      <IonLabel>Notifications SMS</IonLabel>
                      <IonToggle 
                        checked={notificationSettings.smsNotifications}
                        onIonChange={e => setNotificationSettings({
                          ...notificationSettings,
                          smsNotifications: e.detail.checked
                        })}
                      />
                    </IonItem>
                    
                    <IonItem>
                      <IonIcon icon={notificationsOutline} slot="start" />
                      <IonLabel>Notifications push</IonLabel>
                      <IonToggle 
                        checked={notificationSettings.pushNotifications}
                        onIonChange={e => setNotificationSettings({
                          ...notificationSettings,
                          pushNotifications: e.detail.checked
                        })}
                      />
                    </IonItem>
                    
                    <IonItem>
                      <IonIcon 
                        icon={notificationSettings.soundEnabled ? volumeHighOutline : volumeMuteOutline} 
                        slot="start" 
                      />
                      <IonLabel>Son des notifications</IonLabel>
                      <IonToggle 
                        checked={notificationSettings.soundEnabled}
                        onIonChange={e => setNotificationSettings({
                          ...notificationSettings,
                          soundEnabled: e.detail.checked
                        })}
                      />
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Paramètres par catégorie</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {Object.entries(notificationSettings.categories).map(([category, settings]) => (
                    <IonCard key={category} style={{ marginBottom: "8px" }}>
                      <IonCardHeader>
                        <h3 style={{ margin: "0" }}>{category}</h3>
                      </IonCardHeader>
                      <IonCardContent>
                        <IonList>
                          <IonItem>
                            <IonLabel>Activé</IonLabel>
                            <IonToggle 
                              checked={settings.enabled}
                              onIonChange={e => setNotificationSettings({
                                ...notificationSettings,
                                categories: {
                                  ...notificationSettings.categories,
                                  [category]: { ...settings, enabled: e.detail.checked }
                                }
                              })}
                            />
                          </IonItem>
                          
                          <IonItem>
                            <IonLabel>Email</IonLabel>
                            <IonToggle 
                              checked={settings.email && settings.enabled}
                              disabled={!settings.enabled}
                              onIonChange={e => setNotificationSettings({
                                ...notificationSettings,
                                categories: {
                                  ...notificationSettings.categories,
                                  [category]: { ...settings, email: e.detail.checked }
                                }
                              })}
                            />
                          </IonItem>
                          
                          <IonItem>
                            <IonLabel>SMS</IonLabel>
                            <IonToggle 
                              checked={settings.sms && settings.enabled}
                              disabled={!settings.enabled}
                              onIonChange={e => setNotificationSettings({
                                ...notificationSettings,
                                categories: {
                                  ...notificationSettings.categories,
                                  [category]: { ...settings, sms: e.detail.checked }
                                }
                              })}
                            />
                          </IonItem>
                          
                          <IonItem>
                            <IonLabel>Push</IonLabel>
                            <IonToggle 
                              checked={settings.push && settings.enabled}
                              disabled={!settings.enabled}
                              onIonChange={e => setNotificationSettings({
                                ...notificationSettings,
                                categories: {
                                  ...notificationSettings.categories,
                                  [category]: { ...settings, push: e.detail.checked }
                                }
                              })}
                            />
                          </IonItem>
                        </IonList>
                      </IonCardContent>
                    </IonCard>
                  ))}
                </IonCardContent>
              </IonCard>
            </div>
          </IonContent>
        </IonModal>

        {/* Toast */}
        <IonToast
          isOpen={showSuccessToast}
          onDidDismiss={() => setShowSuccessToast(false)}
          message={toastMessage}
          duration={3000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default ReceptionistNotifications;