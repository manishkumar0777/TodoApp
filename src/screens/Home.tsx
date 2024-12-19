import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

//Icons and progress import
import { CircularProgress } from 'react-native-circular-progress';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//firebase
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

//navigation
import { CommonActions, useNavigation } from '@react-navigation/native';

//styles

import style from '../styles';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

const HomeScreen = () => {

  //for navigation
  const navigation = useNavigation();

  //for state like task  username etc
  const [tasks, setTasks] = useState([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  //feting the data from the cloudfirestore 

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth().currentUser;
      if (user) {
        const userId = user.uid;

        // Fetch user's profile name
        const userDoc = await firestore().collection('users').doc(userId).get();
        if (userDoc.exists) {
          const fullName = userDoc.data().name;
          const firstName = fullName.split(' ')[0]; 
          setUserName(firstName);
        }

        // Fetch user's tasks and calculate progress based on subtasks
        const taskSubscriber = firestore()
          .collection('users')
          .doc(userId)
          .collection('tasks')
          .onSnapshot(async querySnapshot => {
            const tasksData = await Promise.all(
              querySnapshot.docs.map(async doc => {
                const taskId = doc.id;
                const task = doc.data();

                return {
                  ...task,
                  id: taskId,
                  progress : task.progress || 0,
                };
              })
            );

            setTasks(tasksData);
            setLoading(false);
          });

        return () => taskSubscriber();
      }
    };

    fetchUserData();
  }, []);


  //handel the deletion of the task
  const deleteTask = async (taskId) => {
    try {
      const user = auth().currentUser;
      if (user) {
        const userId = user.uid;
        await firestore()
          .collection('users')
          .doc(userId)
          .collection('tasks')
          .doc(taskId)
          .delete();
      }
    } catch (error) {
      console.error('Error deleting the tasks', error)
    }
  };


  //rendering the task list 
  const renderTask = ({ item }) => {

    return (
      <Swipeable
        renderRightActions={() => (
          <RectButton style={styles.deleteButton} onPress={() => deleteTask(item.id)}>
            <MaterialIcons name="delete-outline" size={30} color='#fff' />
          </RectButton>
        )}
      >
        <TouchableOpacity style={styles.taskItem}
          onPress={() => navigation.navigate('TaskManager', { taskId: item.id })}
        >
          <View style={styles.taskDetails}>
            <Text style={styles.taskTitle}>{item.taskTitle}</Text>
            <Text style={styles.taskCategory}>{item.category}</Text>
            <Text style={style.taskCount}>{item.taskCount} Tasks</Text>
          </View>
          <CircularProgress
            size={60}
            width={5}
            fill={item.progress}
            tintColor={'#000'}
            backgroundColor="#F0F0F0"
          >
            
          </CircularProgress>
        </TouchableOpacity>
      </Swipeable>
    )
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }



  return (
    <View style={styles.container}>

      {/* Header profile and gridicon */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: 'https://i.pravatar.cc/300' }} style={styles.profileImage} />
          <View>
            <Text style={styles.welcomeText}>Hi, {userName} 👋</Text>
            <Text style={styles.subtitle}>Your daily adventure starts now</Text>
          </View>
        </View>

        {/* Icon */}
        <TouchableOpacity style={styles.gridbtn}>
          <MaterialIcons name="grid-view" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Task categories for ongoing processing completed and deleted */}
      <View style={styles.categoriesContainer}>
        <View style={[styles.category, { backgroundColor: '#3B82F6' }]}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="directions-bike" size={30} color="#fff" />
          </View>
          <View>
            <Text style={styles.categoryText}>On going</Text>
            <Text style={styles.categoryCount}>24 Tasks</Text>
          </View>
        </View>

        <View style={[styles.category, { backgroundColor: '#F59E0B' }]}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="pending" size={30} color="#fff" />
          </View>
          <View>
            <Text style={styles.categoryText}>In Process</Text>
            <Text style={styles.categoryCount}>12 Tasks</Text>
          </View>
        </View>

        <View style={[styles.category, { backgroundColor: '#10B981' }]}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="done" size={30} color="#fff" />
          </View>
          <View>
            <Text style={styles.categoryText}>Completed</Text>
            <Text style={styles.categoryCount}>42 Tasks</Text>
          </View>
        </View>

        <View style={[styles.category, { backgroundColor: '#EF4444' }]}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="cancel" size={30} color="#fff" />
          </View>
          <View>
            <Text style={styles.categoryText}>Canceled</Text>
            <Text style={styles.categoryCount}>8 Tasks</Text>
          </View>
        </View>
      </View>

      {/* Recent Tasks  */}
      <Text style={styles.recentTasksTitle}>Recent Task</Text>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
      />

      {/* Bottom navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity>
          <MaterialIcons name="home" size={30} color="#FF6347" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => { navigation.navigate('AddTask') }}>
          <MaterialIcons name="add-circle" size={60} color="#FF6347" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('Profile')}}>
          <MaterialIcons name="person" size={30} color="#B0B0B0" />
        </TouchableOpacity>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Red background for delete
    width: 80, // Width of the swipeable button
    height: 100,
    marginTop: 10,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 100,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000'
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  category: {
    width: '47%',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row', // Align icon and text side by side
    alignItems: 'center',
    marginVertical: 10,
  },
  iconContainer: {
    marginRight: 10, // Add space between icon and text
  },
  categoryText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  categoryCount: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
  },
  recentTasksTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  taskItem: {
    flexDirection: 'row',
    height : 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000'
  },
  taskCategory: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
    marginLeft: 4
  },

  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  gridbtn: {
    backgroundColor: 'rgba(211, 211, 211, 0.3)',
    height: 45,
    width: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButton: {
    bottom: 1
  },
});
export default HomeScreen;