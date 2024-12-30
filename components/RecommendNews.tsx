import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import NewsScrollView from './NewsScrollView'
import { ApiContext } from '@/context/ApiContext'
import { Colors } from '@/constants/Colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const RecommendNews = () => {
  const {newsData} =useContext<any>(ApiContext)
  return (
    <View style={styles.main}>
      <Text style={styles.heading}>Recommend News</Text>
      <FlatList showsVerticalScrollIndicator={false} data={newsData} renderItem={(({ item, index }) => (
          <NewsScrollView index={index} items={item}/>
        ))}/>
      
    </View>
  )
}

export default React.memo(RecommendNews)

const styles = StyleSheet.create({
  main:{
    height: hp(100)
  },
    heading:{
        paddingLeft: 20,
        paddingBottom: 10,
        paddingTop: 10,
        fontFamily:'spaceBold',
        fontSize: hp(2.4),
        color: Colors.PRIMARY
    }
})