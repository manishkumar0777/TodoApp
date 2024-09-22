//react-native imports
import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import Button from './Button';


const TaskForm = ({navigation}) => {

    //state 
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    //handling the submission
    const handlesubmit = () => {
        db.collection('tasks').add({
            title,
            description,
            completed : false,
            createdAt : new Date(),
        }).then(() => {
            navigation.goBack();
        }).catch(error => console.log("Error Adding Task: ", error));
    };
    
  return (
      <View style={styles.container}>
          <TextInput
              placeholder='Task title'
              value={title}
              onChangeText={setTitle}
              style={styles.input}
          />

          <TextInput
              placeholder="Task Description"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
          />

          <Button title="Add Task" onPress={handlesubmit} />
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
});

export default TaskForm
