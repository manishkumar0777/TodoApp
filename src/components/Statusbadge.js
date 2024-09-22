import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Statusbadge = ({status}) => (
    <View style={[styles.badge, status=== 'completed'? styles.completed : styles.inProgress]}>
        <Text style={styles.text}>{status}</Text>
    </View>

)

const styles = StyleSheet.create({
    badge: {
      padding: 5,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    completed: {
      backgroundColor: '#4CAF50',
    },
    inProgress: {
      backgroundColor: '#FFC107',
    },
    text: {
      color: '#FFF',
      fontWeight: 'bold',
    },
  });

export default Statusbadge

