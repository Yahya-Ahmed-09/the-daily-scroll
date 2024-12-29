import { View, Text, Dimensions, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { StyleSheet } from 'react-native';
import { ApiContext } from '@/context/ApiContext';
import { LinearGradient } from "expo-linear-gradient"
import { Colors } from '@/constants/Colors';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Link } from 'expo-router';

const width = Dimensions.get('window').width;
interface Props {
  index: number,
  slideItem: any,
  scrollX: SharedValue<number>
}
const SliderItems = ({ slideItem, index, scrollX }: Props) => {
  
  const rnStyle = useAnimatedStyle(()=>{
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index-1)* width, index * width, (index +1)* width],
            [-width * 0.15, 0, width* 0.15],
            Extrapolation.CLAMP
          )
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index-1)* width, index * width, (index +1)* width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          )
        }
      ]
    }
  })


  return (
    <Animated.View key={index} style={[styles.itemWrapper, rnStyle]}> 
      <Image style={styles.image} source={{ uri: slideItem.urlToImage }} />
      <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.background}>
      <Link href={slideItem.url} style={styles.sourceUrl}>
        <View style={styles.source}>
          <Text style={styles.sourceName}>From: {slideItem.source.name}</Text>
          <Text numberOfLines={2} style={styles.titleName}>{slideItem.title}</Text>
        </View>
        </Link>
      </LinearGradient> 
    </Animated.View>
    
  )
}
const styles = StyleSheet.create({
  itemWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,

  },
  image: {
    width: width - 60,
    height: 180,
    borderRadius: 20
  },
  background: {
    position: 'absolute',
    left: 30,
    right: 0,
    top: 0,
    width: width - 60,
    borderRadius: 20,
    height: 180,
    padding: 20,
  },
  source:{
    position: 'absolute',
    top: 50,
    gap: 10
  },
  sourceUrl:{
    top: 50
  },
  sourceName:{
    color: Colors.WHITE,
    fontFamily: 'poppinsSemiBoldItalic',
    fontSize: 16
  },
  titleName:{
    color: Colors.WHITE,
    fontFamily: 'poppinsRegular',
    fontSize: 12
  }

})
export default React.memo(SliderItems)