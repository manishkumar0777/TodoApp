import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'

//icons 
import Icon from  'react-native-vector-icons/MaterialIcons'
import { COLORS } from '../constants/colors'

const FloatingActionButton = () => {
    return(
        <TouchableOpacity>
           <Icon name= 'add' size={24} color={COLORS.white} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      backgroundColor: COLORS.primary,
      borderRadius: 30,
      padding: 15,
    },
  });

export default FloatingActionButton
