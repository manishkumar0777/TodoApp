import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TaskList = ({task, onTaskPress}) => {
  return (
    <FlatList 
    data={tasks}
    renderItem={({ item }) => (
        <TaskCard task={item} onPress={() => onTaskPress(item)} />
    )}
    keyExtractor={(item) => item.id}
/>
  )
}



export default TaskList

