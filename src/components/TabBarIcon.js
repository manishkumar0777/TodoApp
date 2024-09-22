import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Icon from 'react-native-vector-icons/Ionicons'

const TabBarIcon = ({name,size,color}) => (
    <Icon name ={name} size={size} color={color} />
)

export default TabBarIcon;
