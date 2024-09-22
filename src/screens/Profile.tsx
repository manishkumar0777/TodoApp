import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

//firebase
import auth from '@react-native-firebase/auth'

//For navigation
import { CommonActions, useNavigation } from '@react-navigation/native';

const Profile = () => {

  const navigation  = useNavigation();

  //Logout section 
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        );
      }); // Redirect to login on sign out
  };
  return (
    <View>
      <Text>Profile</Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})