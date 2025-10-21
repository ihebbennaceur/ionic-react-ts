import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSplitPane,IonMenu } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank try</IonTitle>
          </IonToolbar>
        </IonHeader>
          <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
