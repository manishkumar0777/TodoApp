import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

//firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//constants
import { colors } from '../constants/colors';

//Icons
import Icon from 'react-native-vector-icons/MaterialIcons';

//for navigatioon
import { CommonActions, useNavigation } from '@react-navigation/native';



const SignUp = () => {

  //state 
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();

  //handleSignUp

  const handleSignup = () => {

    if (name && email && password && termsAccepted) {
      auth().createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {

          const user = userCredentials.user;

          user.updateProfile({ displayName: name });


          //storing the data in firebase
         firestore().collection('users').doc(user.uid).set({
            name: name,
            email: email,
            password: password,
            createdAt: firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              })
            );
          })
          .catch((Error: string | undefined) => {
            Alert.alert("firebase Storing failed" , Error)
          })
        })
          .catch(Error => {
          Alert.alert("Signup Error", Error)
          })
    } else {
      Alert.alert("Enter all the details")
    }
  }

  return (
    <View style={styles.container}>

      {/* back button to go back  */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-ios" size={24} />
      </TouchableOpacity>

      {/* heading line of the signUp page  */}
      <Text style={styles.title}>Create Account👋</Text>
      <Text style={styles.subTitle}>Please register to continue using our service.</Text>


      {/* taking input from the user and setting it to the the const on changing the state */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="example@mail.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="**********"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* check box for accepting the terms and condition  */}
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setTermsAccepted(!termsAccepted)}>
          <Icon
            name={termsAccepted ? 'check-box' : 'check-box-outline-blank'}
            size={24}
            color="#333"
          />
        </TouchableOpacity>
        <Text style={styles.checkboxText}>I agree to privacy policy & terms</Text>
      </View>

      {/* sign up process and button */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {/* a text in centre Or */}
      <Text style={styles.orText}>------------------------------------------ Or ------------------------------------------</Text>

      {/* Other Login or sign up options */}
      <View style={styles.socialIcons}>
        <TouchableOpacity style={{borderWidth : 1,borderRadius : 10, paddingVertical: 15,alignItems : 'center', justifyContent : 'center',width : '40%'}}>
          <Icon name="google" size={40} color="#EA4335" />
        </TouchableOpacity>
        <TouchableOpacity style={{borderWidth : 1,borderRadius : 10, paddingVertical: 15,alignItems : 'center', justifyContent : 'center',width : '40%'}}>
          <Icon name="facebook" size={40} color="#3b5998" />
        </TouchableOpacity>
      </View>

      {/* Navigaton hndling if user is already signed up  */}
      <Text>Already have an account?
        <Text  style={{color : '#FF6243', fontWeight : 'bold'}} onPress={() => navigation.navigate('Login')}>Sign in instead</Text></Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#FF6243',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  orText: {
    textAlign: 'center',
    color: '#777',
    marginVertical: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 30,
    marginVertical : 10,

  },
  signinText: {
    textAlign: 'center',
    color: '#FF6243',
    fontSize: 14,
  },

  backButton: {
    backgroundColor: 'rgba(255, 99, 71, 0.1)', // Light coral with opacity
    padding: 15,
    borderRadius: 10,
    width : 55,
    height : 55,
  },
});

export default SignUp;