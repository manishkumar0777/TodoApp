import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

//firebase
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

//For navigation
import { CommonActions, useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Profile = () => {

  //for the navigation 
  const navigation = useNavigation();

  //for the change in value and setting the value
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [inProcessTasks, setInProcessTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  //using hook to retrive the data from the firebase 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth().currentUser?.uid;
        if (userId) {
          const userDoc = await firestore().collection('users').doc(userId).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setUserName(userData?.name || 'Unknown');
            setRole(userData?.role || 'Unknown');
            setProfilePic(userData?.profilePic || 'https://i.pravatar.cc/300');

            //fetch the task and count on the basis of the progress
            const taskSnapshot = await firestore()
              .collection('users')
              .doc(userId)
              .collection('tasks')
              .get()

            let inProcess = 0;
            let completed = 0;

            taskSnapshot.forEach(doc => {
              const task = doc.data();
              if (task.progress === 100) {
                completed += 1;
              } else if (task.progress > 0 && task.progress < 100) {
                inProcess += 1;
              }
            });

            setInProcessTasks(inProcess);
            setCompletedTasks(completed);
          }
        }

      } catch (Error) {
        Alert.alert('Error fetching user data');
      }
    };
    fetchUserData();

  }, [])


  //Logout section 
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        );
      }); // Redirect to login on sign out
  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.gridbtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name='close' size={24}></MaterialIcons>
        </TouchableOpacity>

        <Text style={styles.statusBadge} onPress={() => handleLogout()}>Log out</Text>
      </View>

      {/* profile header  */}

      <View style={styles.profileHeader}>
        <Image source={{ uri: profilePic }} style={styles.profileImage} />
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userRole}>{role}</Text>

        {/* Edit Profile */}
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Task Stats */}
      <View style={styles.taskStats}>
        <View style={styles.taskStat}>
          <Text style={styles.taskStatNumber}>{inProcessTasks}</Text>
          <Text style={styles.taskStatLabel}>In Process tasks</Text>
        </View>
        <View style={styles.taskStat}>
          <Text style={styles.taskStatNumber}>{completedTasks}</Text>
          <Text style={styles.taskStatLabel}>Completed tasks</Text>
        </View>
      </View>

       {/* Options */}
       <FlatList
        data={options}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.optionButton} onPress={() => Alert.alert('Feature is Not availabe yet !! sorry')}>
            <View style={styles.optionIcon}>
              <MaterialIcons name={item.icon} size={25} color="#000" />
            </View>
            <Text style={styles.optionText}>{item.label}</Text>
            <MaterialIcons name="keyboard-arrow-right" size={25} color="#000" />
          </TouchableOpacity>
        )}
      />

      {/* Bottom navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity>
          <MaterialIcons name="home" size={30} color="#B0B0B0" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="calendar-today" size={30} color="#B0B0B0" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => { navigation.navigate('AddTask') }}>
          <MaterialIcons name="add-circle" size={60} color="#FF6347" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="notifications" size={30} color="#B0B0B0" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('Profile') }}>
          <MaterialIcons name="person" size={30} color="#FF6347" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const options = [
  { id: '1', label: 'Notification', icon: 'notifications', screen: 'NotificationScreen' },
  { id: '2', label: 'Security', icon: 'security', screen: 'SecurityScreen' },
  { id: '3', label: 'Language & Region', icon: 'language', screen: 'LanguageScreen' },
  { id: '4', label: 'Go Premium', icon: 'star', screen: 'PremiumScreen' },
  { id: '5', label: 'Help Center', icon: 'help', screen: 'HelpCenterScreen' },
];

export default Profile

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
  },

  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    color : '#ff6347',
    fontSize : 16,
    fontWeight: '600',
  },

  addButton: {
    bottom: 1
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

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },

  gridbtn: {
    backgroundColor: 'rgba(211, 211, 211, 0.3)',
    height: 45,
    width: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  profileHeader: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  userRole: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  editProfileButton: {
    backgroundColor: '#FF6347',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  editProfileText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  taskStat: {
    alignItems: 'center',
  },
  taskStatNumber: {
    fontSize: 24,
    color : '#000',
    fontWeight: 'bold',
  },
  taskStatLabel: {
    fontSize: 14,
    color: '#666',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  optionIcon: {
    marginRight: 15,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
})