//firebase 
import { firebase } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';



 export const firebaseConfig = {
    apiKey: "AIzaSyCmrzKgxV_r1VdPEZbp7UljefSeRKghExY",
    authDomain: "tomakeusergreat.firebaseapp.com",
    projectId: "tomakeusergreat",
    storageBucket: "tomakeusergreat.appspot.com",
    messagingSenderId: "1062257543430",
    appId: "1:1062257543430:android:66a78fccb992c3c2fc7687",
  };

//firebase initialization

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default {auth}

