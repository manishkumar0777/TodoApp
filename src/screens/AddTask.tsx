import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Switch, TouchableOpacity, Platform } from 'react-native';

//firebase import 
import firestore from '@react-native-firebase/firestore';
import  auth  from '@react-native-firebase/auth';

//Navigation imports 
import { useNavigation } from '@react-navigation/native';

//icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker  from '@react-native-community/datetimepicker';



const AddTask= () => {


  //state for setting up input details of the task 
  const [taskTitle, setTaskTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [taskDetails, setTaskDetails] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState('');
  const [alertEnabled, setAlertEnabled] = useState(false);

  //for navigation
  const navigation = useNavigation();

  // Handle date change for both Android and iOS
  const handleDateChange = (event, selectedDate) => {
    if (event.type === "set") { // 'set' means user picked a date
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setShowDatePicker(false); // Hide the picker
    } else {
      setShowDatePicker(false); // 'dismissed' event on Android
    }
  };

  //creating the task in app and storing in the firestore database
  const createTask = async () => {
    const userId = auth().currentUser?.uid;

    await firestore().collection('tasks').add({
      userId,
      taskTitle,
      date: date.toISOString(),
      taskDetails,
      alertEnabled,
      category,
      createdAt: firestore.FieldValue.serverTimestamp(),
      progress: 0, 
    });
    navigation.goBack();
  };


  return (
    <View style={styles.container}>

      {/* Top Icons (Cross and Search) */}
      <View style={styles.topIconsContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.gridbtn}>
          <MaterialIcons name="close" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridbtn}>
          <MaterialIcons name="search" size={30}/>
        </TouchableOpacity>
      </View>


      <Text style={styles.newTaskHeader}>New Task</Text>


       {/* Task Title Input */}
       <TextInput
        placeholder="Task Title"
        value={taskTitle}
        onChangeText={setTaskTitle}
        style={styles.input}
      />

      {/* Date Picker */}
      <View style={styles.input}>
        <Text>
          {date.toDateString()} {/* Displays the selected date */}
        </Text>
        <MaterialIcons name = "keyboard-arrow-down" size={30} onPress={() => setShowDatePicker(true)} />
      </View>

      {/* Show DateTimePicker */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}

      {/* Task Description Input */}
      <TextInput
        placeholder="Add your task details"
        value={taskDetails}
        onChangeText={setTaskDetails}
        style={[styles.input, styles.taskDescriptionInput]}
        multiline
      />

      {/* Icons: Grid, A, Link */}
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={{margin : 5}}>
          <MaterialIcons name="grid-view" size={35}  />
        </TouchableOpacity>
        <TouchableOpacity style={{margin : 5}}>
          <MaterialIcons name="text-format" size={40} />
        </TouchableOpacity>
        <TouchableOpacity style={{margin : 5}}>
          <MaterialIcons name="add-link" size={40}  />
        </TouchableOpacity>
      </View>


      {/* Category Section */}
      <Text style={styles.sectionTitle}>Category</Text>
      <View style={styles.categoryContainer}>
        <TouchableOpacity onPress={() => setCategory('Design')}>
          <Text style={category === 'Design' ? styles.selectedCategory : styles.category}>Design</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCategory('Development')}>
          <Text style={category === 'Development' ? styles.selectedCategory : styles.category}>Development</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCategory('Coding')}>
          <Text style={category === 'Coding' ? styles.selectedCategory : styles.category}>Coding</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryContainer}>
        <TouchableOpacity onPress={() => setCategory('Personal Task')}>
          <Text style={category === 'Personal Task' ? styles.selectedCategory : styles.category}>Personal Task</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCategory('Meeting')}>
          <Text style={category === 'Meeting' ? styles.selectedCategory : styles.category}>Meeting</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCategory('User Experience')}>
          <Text style={category === 'User Experience' ? styles.selectedCategory : styles.category}>User Experience</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryContainer}>
        <TouchableOpacity onPress={() => setCategory('Goals')}>
          <Text style={category === 'Goals' ? styles.selectedCategory : styles.category}>Goals</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCategory('Study')}>
          <Text style={category === 'Study' ? styles.selectedCategory : styles.category}>Study</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCategory('Improvement')}>
          <Text style={category === 'Improvement' ? styles.selectedCategory : styles.category}>Improvement</Text>
        </TouchableOpacity>
      </View>

      {/* Alert Slider */}
      <View style={styles.alertContainer}>
        <Text style={styles.alertText}>Get alert for this task</Text>
        <Switch
          value={alertEnabled}
          onValueChange={setAlertEnabled}
          trackColor={{ false: '#767577', true: '#FF6347' }}
          thumbColor={alertEnabled ? '#FF6347' : '#f4f3f4'}
        />
      </View>

      {/* Create Task Button */}
      <TouchableOpacity style={styles.createTaskButton} onPress={createTask}>
        <Text style={styles.createTaskButtonText}>Create Task</Text>
      </TouchableOpacity>


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  topIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  newTaskHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    alignItems : 'center',
    justifyContent : 'space-between',
    flexDirection : 'row'
  },
  taskDescriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  iconsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    padding : 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  category: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    color: '#333',
    marginHorizontal : 3,
  },
  selectedCategory: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#FF6347',
    borderRadius: 10,
    backgroundColor: '#FF6347',
    color: '#fff',
  },
  alertContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  alertText: {
    fontSize: 16,
  },
  createTaskButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createTaskButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },

  gridbtn: {
    backgroundColor: 'rgba(211, 211, 211, 0.3)',
    height: 45,
    width: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
export default AddTask
