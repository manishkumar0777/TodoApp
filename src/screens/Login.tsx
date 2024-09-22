import { Alert, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'


//forebase config importing 
import auth, { firebase } from '@react-native-firebase/auth';

//constants
import { colors } from '../constants/colors';

//navigatoin
import { CommonActions, useNavigation } from '@react-navigation/native';


const Login = () => {

  //State for the login page to set the value and loadingtocheck for usr is alrady
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  //using navigaton
  const navigation = useNavigation();


  //checking the user logged in before or not 
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        ); 
      } else {
        setLoading(false); // Stop loading if user is not logged in
      }
    });
    return unsubscribe; // Cleanup the subscription
  }, []);
  

  //handling the login process
  const handleLogin = () => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setLoading(false);
      });
  };

  //if loading then showing the activity indicator
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* header  */}
      <Text style={{fontSize: 28, fontWeight: '600', marginTop : 20,}}>Hey,</Text>
      <Text style={styles.title}>Welcome Back ✌️</Text>
      <Text style={styles.subTitle}>Please Login to continue where you left</Text>

      {/* all the inputs user need to Enter */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* those who dont have the acccount befor go to signup page  */}
      <Text>Don't have an account? 
        <Text style={{color : '#ff6b6b', fontWeight: 'bold' }} 
        onPress={() =>{ 
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'SignUp' }],
            })
          );
          }}>Sign up</Text></Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical : 30,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '600',
    marginTop : 10,
    marginBottom: 10,
    
  },
  subTitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 30,
  },
  
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default Login;