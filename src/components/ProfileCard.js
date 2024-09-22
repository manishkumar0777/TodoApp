import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProfileCard = ({username, email}) => (
    <View style={styles.card}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.email}>{email}</Text>

    </View>
)
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 8,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 4 },
      },
      username: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
      },
      email: {
        fontSize: 16,
        color: '#666',
      },
})

export default ProfileCard

