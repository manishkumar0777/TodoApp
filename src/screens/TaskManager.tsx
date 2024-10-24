import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Button, Alert } from 'react-native';

//firebase
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'

//navigation
import { useNavigation, useRoute } from '@react-navigation/native';

//styling component 
import style from '../styles';

//Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

//datetimepicker
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';



const TaskManager = () => {

  //states fot the setting the name of the task andthe description 
  const [task, setTask] = useState(null);
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState('');
  const [selectedTab, setSelectedTab] = useState('Detail'); // Track selected tab
  const [status, setStatus] = useState('In Progress');
  const [showDatePicker, setShowDatePicker] = useState(false); // For showing the date picker
  const [deadline, setDeadline] = useState(null);
  const [attachments, setAttachments] = useState([]);

  //using routes for the parameter passing from prevois screen to this screen with the task id
  const route = useRoute();
  const { taskId } = route.params;

  //for navigation
  const navigation = useNavigation();


  //setting up the task in the taskmanager screen and giving option to also store the subtasks inside the task
  useEffect(() => {

    const fetchTaskDetails = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const userId = user.uid;

          //Fetch Task Details
          const taskDoc = await firestore()
            .collection('users')
            .doc(userId)
            .collection('tasks')
            .doc(taskId)
            .get();

          if (taskDoc.exists) {
            setTask(taskDoc.data());
          } else {
            console.log('TasK Doesnt Exist');
          }

          //loading the substask if availabel
          const subtaskSubscriber = firestore()
            .collection('users')
            .doc(userId)
            .collection('tasks')
            .doc(taskId)
            .collection('subtasks')
            .onSnapshot(querySnapshot => {
              const subTasks = [];
              querySnapshot.forEach(documentSnapshot => {
                subTasks.push({
                  ...documentSnapshot.data(),
                  id: documentSnapshot.id,
                });
              });
              console.log("Fetched subtasks: ", subTasks);
              setSubtasks(subTasks);
            });

          // Subscribe to attachments
          const attachmentSubscriber = firestore()
            .collection('users')
            .doc(userId)
            .collection('tasks')
            .doc(taskId)
            .collection('attachments')
            .onSnapshot(querySnapshot => {
              const attachments = [];
              querySnapshot.forEach(documentSnapshot => {
                attachments.push({
                  ...documentSnapshot.data(),
                  id: documentSnapshot.id,
                });
              });
              console.log("Fetched attachments: ", attachments);
              setAttachments(attachments);
            });

          //return 
          return () => {
            subtaskSubscriber();
            attachmentSubscriber();
          };

        } else {
          console.log("User is not logged in.");
        }
      } catch (error) {
        console.error("Error fetching task data: ", error);
      }
    };

    fetchTaskDetails();
  }, [taskId]);



  //handleing the adding sbstask 
  const addSubtask = async () => {
    const user = auth().currentUser;
    if (user) {
      const userId = user.uid;
      if (newSubtask.trim()) {
        await firestore()
          .collection('users')
          .doc(userId)
          .collection('tasks')
          .doc(taskId)
          .collection('subtasks')
          .add({
            name: newSubtask,
            completed: false,
          });
        setNewSubtask('');
        console.log('Subtask added!');
      } else {
        Alert.alert('Please enter a valid subtask.');
      }
    }
  };

  //for the toggel switch of completion 
  const toggleCompletion = async (subtaskId: string, currentStatus: boolean) => {
    const user = auth().currentUser;
    if (user) {
      const userId = user.uid;
      await firestore()
        .collection('users')
        .doc(userId)
        .collection('tasks')
        .doc(taskId)
        .collection('subtasks')
        .doc(subtaskId)
        .update({
          completed: !currentStatus,
        });

      //Fetch the updated subtasks for the task
      const subtasksSnapshot = await firestore()
        .collection('users')
        .doc(userId)
        .collection('tasks')
        .doc(taskId)
        .collection('subtasks')
        .get();

      const subtasks = subtasksSnapshot.docs.map(doc => doc.data());
      const completedSubtasks = subtasks.filter(subtask => subtask.completed).length;
      const totalSubtasks = subtasks.length;

      //Calculate the new progress
      const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

      //Update the task document with the new progress
      await firestore()
        .collection('users')
        .doc(userId)
        .collection('tasks')
        .doc(taskId)
        .update({
          progress,  // Store the progress in the task document
        });
    }
  };

  //for deleting the subtasks
  const deleteSubtask = async (subtaskId: string) => {
    const user = auth().currentUser;
    if (user) {
      const userId = user.uid;
      await firestore()
        .collection('users')
        .doc(userId)
        .collection('tasks')
        .doc(taskId)
        .collection('subtasks')
        .doc(subtaskId)
        .delete();
    }
  };

  //tab component 
  const TabComponent = ({ title }: { title: string }) => (
    <TouchableOpacity
      onPress={() => setSelectedTab(title)}
      style={[
        styles.tab,
        { backgroundColor: selectedTab === title ? '#FC8F7C' : '#F3F4F6' },
      ]}
    >
      <Text
        style={[
          styles.tabText,
          selectedTab === title ? { color: '#111827' } : {},
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>

      {/* header with the back icon and the status of the work shown  */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.gridbtn}>
          <MaterialIcons name="arrow-back-ios" size={24} style={{ marginLeft: 8 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { }}>
          <Text style={styles.statusBadge}>{status}</Text>
        </TouchableOpacity>
      </View>

      {task && (
        <>
          <Text style={styles.taskTitle}>{task.taskTitle}</Text>
          <Text style={styles.taskDescription}>{task.taskDetails}</Text>
        </>
      )}

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TabComponent title="Detail" />
        <TabComponent title="Attachment" />
      </View>

      {/* Add Subtask Section */}
      {selectedTab === 'Detail' ? (
        <>
          {/* checklist of the subtasks */}
          <Text style={styles.checklistTitle}>Checklist</Text>
          <FlatList
            data={subtasks}
            renderItem={({ item }) => (
              <Swipeable
                renderRightActions={() => (
                  <RectButton style={styles.deleteButton} onPress={() => deleteSubtask(item.id)}>
                    <MaterialIcons name="delete-outline" size={24} color='#fff' />
                  </RectButton>
                )}
              >
                <View style={styles.subtaskItem}>
                  <TouchableOpacity
                    onPress={() => toggleCompletion(item.id, item.completed)}
                    style={styles.checkbox}
                  >
                    <Icon
                      name={item.completed ? 'checkbox-outline' : 'square-outline'}
                      size={28}
                      color={item.completed ? '#10B981' : '#6B7280'}
                    />
                  </TouchableOpacity>

                  <Text
                    style={[
                      styles.subtaskText,
                      item.completed ? { textDecorationLine: 'line-through', color: '#6B7280' } : {},
                    ]}
                  >
                    {item.name}
                  </Text>
                </View>
              </Swipeable>
            )}
            keyExtractor={item => item.id}
          />

          {/* Add subtask */}
          <View style={styles.addSubtaskContainer} >
            <TextInput
              style={styles.input}
              placeholder='Enter new subtask..'
              value={newSubtask}
              onChangeText={setNewSubtask}
            />
            <TouchableOpacity onPress={addSubtask} style={styles.addSubtaskButton}>
              <Text style={styles.addSubtaskText}>Add Subtask</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          {/* Attachment section */}
          <Text style={styles.checklistTitle}>Attachments</Text>
          <FlatList
            data={attachments}
            renderItem={({ item }) => (
              <View style={styles.attachmentItem}>
                <Text style={styles.attachmentText}>{item.name}</Text>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </>
      )}

    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    backgroundColor: '#FCD34D',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    fontWeight: '600',
  },
  taskTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
    color: '#111827',
  },
  taskDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tab: {
    padding: 10,
    marginRight: 8,
    borderRadius: 8,
    elevation: 3,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  checklistTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtaskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    height: 60,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  checkbox: {
    marginRight: 12,
  },
  subtaskText: {
    fontSize: 18,
    fontWeight: '500',
    flex: 1,
  },
  addSubtaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  input: {
    flex: 1,
    borderColor: '#6B7280',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  addSubtaskButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#FF6347',
    borderRadius: 8,
  },
  addSubtaskText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  attachmentItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    marginBottom: 8,
  },
  attachmentText: {
    fontSize: 14,
    color: '#374151',
  },

  gridbtn: {
    backgroundColor: 'rgba(211, 211, 211, 0.3)',
    height: 45,
    width: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EF4444', // Red background for delete
    width: 80, // Width of the swipeable button
    height: 60,
    borderRadius: 8,
  },
});


export default TaskManager
