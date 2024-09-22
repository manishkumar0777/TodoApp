import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

//constants 
import { SIZE } from '../constants/SIZES';
import { COLORS } from '../constants/colors';
import { STRING } from '../constants/STRINGS';


const ListEmptyComponent = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{STRING.noTask}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: SIZE.base,
    },
    emptyText: {
      color: COLORS.gray,
      fontSize: SIZE.font,
    },
  });

export default ListEmptyComponent
