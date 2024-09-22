import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

//constant for color 
import { colors } from '../constants/colors'

const TaskCard = ({task, onPress}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    style={styles.card}
    >

      <Text style={styles.taskTitle}>{task.title}</Text>
      <Text>{task.description}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.light,
        padding: 15,
        borderRadius: 5,
        marginVertical : 10,
        elevation : 2,
        shadowColor: colors.dark,
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        shadowOffset: { width: 0, height: 1 },
      },
      taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      
})

export default TaskCard

