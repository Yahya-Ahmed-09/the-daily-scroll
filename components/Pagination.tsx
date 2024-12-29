import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { SharedValue } from 'react-native-reanimated'
import { Colors } from '@/constants/Colors'

interface Props {
  paginationIndex: number,
  items: any[],
  scrollX: SharedValue<number>
}

const Pagination: React.FC<Props> = ({items, paginationIndex, scrollX}) => {

  return (
    <View style={styles.container}>
        {items.map((_, index)=>{
            return <Animated.View key={index} style={[styles.dot,{backgroundColor: paginationIndex === index ? Colors.PRIMARY: Colors.DARK}]} />
        })}
    </View>
  )
}

export default React.memo(Pagination)

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dot:{
        height: 8,
        width: 8, 
        marginHorizontal: 2,
        borderRadius: 8,
        backgroundColor: '#333'
    }
})