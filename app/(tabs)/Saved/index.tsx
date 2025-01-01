import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect } from 'react'
import { Colors } from '@/constants/Colors'
import { ApiContext } from '@/context/ApiContext'
import NewsScrollView from '@/components/NewsScrollView'
import { useFocusEffect } from '@react-navigation/native'
import NavigationHeader from '@/components/NavigationHeader'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const {width} = Dimensions.get('window');
const height = width < 400 ? hp(64) : hp(76);

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
      <View style={{ height: height, marginLeft: wp(-5) }} >
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
    width: wp(100),
    height: hp(100)
  },
  headingContainer:{
    flexDirection: 'row',
    width: wp(90),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'spaceBold',
    fontSize: hp(3),
    color: Colors.PRIMARY,
  },
  clearBtn:{
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    borderRadius: 5,
    backgroundColor: Colors.DARK
  }
})