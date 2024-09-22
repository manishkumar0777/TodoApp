import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const InputField = ({placeholder, value, onChangeText}) => (
    <TextInput
    style= {styles.input}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    />

)

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
      },
})

export default InputField

