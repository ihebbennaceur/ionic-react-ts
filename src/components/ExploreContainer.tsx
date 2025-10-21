import './ExploreContainer.css';
import { IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuToggle, IonButton, IonIcon } from '@ionic/react';
import { menu } from 'ionicons/icons';
import React from 'react';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div id="container">
      <strong>Ready to create an app?</strong>
      <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
  );
};

export default ExploreContainer;