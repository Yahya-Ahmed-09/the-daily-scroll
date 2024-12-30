import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { SharedValue } from 'react-native-reanimated'
import { Colors } from '@/constants/Colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
        height: hp(3),
        justifyContent: 'center',
        alignItems: 'center'
    },
    dot:{
        height: hp(0.8),
        width: wp(1.6), 
        marginHorizontal: 2,
        borderRadius: 8,
        backgroundColor: '#333'
    }
})