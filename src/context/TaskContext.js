import { StyleSheet, Text, View } from 'react-native'
import React, { Children, createContext, useState } from 'react'

export const TaskContext = createContext();

export const TaskProvider = ({Children}) => {
    const [task, setTask] = useState([]);
}
