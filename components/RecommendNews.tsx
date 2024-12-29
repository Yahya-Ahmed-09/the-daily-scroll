import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import NewsScrollView from './NewsScrollView'
import { ApiContext } from '@/context/ApiContext'
import { Colors } from '@/constants/Colors'

const RecommendNews = () => {
  const {newsData} =useContext<any>(ApiContext)
  return (
    <View>
      <Text style={styles.heading}>Recommend News</Text>
      <FlatList showsVerticalScrollIndicator={false} data={newsData} renderItem={(({ item, index }) => (
          <NewsScrollView index={index} items={item}/>
        ))}/>
      
    </View>
  )
}

export default React.memo(RecommendNews)

const styles = StyleSheet.create({
    heading:{
        padding: 20,
        fontFamily:'spaceBold',
        fontSize: 24,
        color: Colors.PRIMARY
    }
})