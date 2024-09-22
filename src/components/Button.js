import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Button = ({title, onPress, style}) => (
    <TouchableOpacity 
    style={[styles.button, style]}
    onPress={onPress}
    >
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#6C63FF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
      text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
      },
})

export default Button

