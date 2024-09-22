//React imports
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

//screens
import Home from '../screens/Home'
import TaskManager from '../screens/TaskManager'
import Profile from '../screens/Profile'
import AddTask from '../screens/AddTask'
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'

//Navigation
import {  NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'




//Navigator Stack and Tab
const Stack = createStackNavigator();

//Main App Navigation
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name = 'Home' component={Home}  options={{headerShown: false}}/>
        <Stack.Screen name = 'AddTask' component={AddTask}  options={{headerShown: false}}/>
        <Stack.Screen name = 'Profile' component={Profile}  options={{headerShown: false}}/>
        <Stack.Screen name = 'TaskManager' component={TaskManager} options={{headerShown: false}}/>
        <Stack.Screen name = 'Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name = 'SignUp' component={SignUp} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation

const styles = StyleSheet.create({})