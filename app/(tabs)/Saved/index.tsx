import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect } from 'react'
import { Colors } from '@/constants/Colors'
import { ApiContext } from '@/context/ApiContext'
import NewsScrollView from '@/components/NewsScrollView'
import { useFocusEffect } from '@react-navigation/native'
import NavigationHeader from '@/components/NavigationHeader'

const SavedArticles = () => {
  const { clearBookmark, savedArticle, loadBookmark, } = useContext<any>(ApiContext)

  useFocusEffect(
    useCallback(() => {
      loadBookmark();

    }, [])
  )
  return (
    <View style={styles.main}>
      <NavigationHeader title={'BookMarks'}/>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Saved Articles</Text>
        <TouchableOpacity activeOpacity={0.6} style={styles.clearBtn} onPress={clearBookmark}>
          <Text  style={{ color: Colors.WHITE, fontFamily:'poppinsRegular', paddingTop: 5 }}>Clear all</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }} >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={savedArticle}
          renderItem={({ item, index }) => <NewsScrollView index={index} items={item} />}
        />
      </View>
    </View>
  )
}

export default React.memo(SavedArticles)

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
    gap: 20,
    width: '100%',
  },
  headingContainer:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'spaceBold',
    fontSize: 30,
    color: Colors.PRIMARY,
  },
  clearBtn:{
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: Colors.DARK
  }
})