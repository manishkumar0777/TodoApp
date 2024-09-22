import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { firebaseConfig } from './Firebase/Config';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


//Navigation component
import AppNavigation from './navigation/AppNavigation';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App(): React.JSX.Element {

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return (
    <AppNavigation></AppNavigation>
  );
}


export default App;
