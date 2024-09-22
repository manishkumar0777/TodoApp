import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

//for colors 

import { colors } from '../constants/colors'

const Header = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        padding: 20,
        backgroundColor: colors.primary,
        alignItems: 'center',
      },

      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.white,
      },
})

export default Header

