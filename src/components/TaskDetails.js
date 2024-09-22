import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TaskDetails = ({route}) => {

    //parameter 
    const {task} = route.params;


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text>{task.description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default TaskDetails