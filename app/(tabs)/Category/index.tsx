import React, { useCallback, useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import CategoriesCard from '@/components/CategoriesCard';
import { categories } from '@/constants/Categories';
import NewsScrollView from '@/components/NewsScrollView';
import { ApiContext } from '@/context/ApiContext';
import { useRouter } from 'expo-router';
import NavigationHeader from '@/components/NavigationHeader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Category = () => {
  const [activeCategory, setActiveCategory] = useState<String>('&category=business');
  const [page, setPage] = useState(1);
  const { newsData, setNewsData, CategoryApiCall, isLoading } = useContext<any>(ApiContext);
  const router = useRouter()

  const handleChangeCategory = (category: String) => {
    setActiveCategory(`&category=${category}`);
    setNewsData([]); // Clear existing data
    setPage(1);
  };

  let data = activeCategory.charAt(10).toUpperCase() + activeCategory.slice(11);

  useFocusEffect(
    React.useCallback(() => {
      CategoryApiCall(10, activeCategory, page);
    }, [activeCategory, page])
  );

  const loadMoreData = () => {
    if (!isLoading) {
      setPage(prevPage => prevPage + 1);
    }
  };
  const renderItem = useCallback(({ item, index }) => <NewsScrollView index={index} items={item} />, [newsData]);

  return (
    <View style={styles.main}>
      <NavigationHeader title={'Explore'} />
      <View style={{ paddingLeft: 20 }}>
        <Text style={styles.heading}>Discover</Text>
        <Text style={styles.subHeading}>News from all over the world!</Text>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <TouchableOpacity style={styles.searchBar} onPress={() => router.navigate('/(tabs)/Category/Search')}>
          <Ionicons name="search" size={24} color={Colors.LIGHT_GREY} />
          <Text style={styles.searchNewstext}>Search for news..</Text>
        </TouchableOpacity>
      </View>
      <View>
        <CategoriesCard categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />
      </View>
      <View style={{width: wp(100), height: hp(100)}}>
        <View>
          <Text style={[styles.heading, { fontSize: 18, color: Colors.DARK, paddingLeft: 20 }]}>{data}</Text>
        </View>
        <View style={{ flex: 1, }} >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={newsData}
            // renderItem={({ item, index }) => <NewsScrollView index={index} items={item} />}
            renderItem={renderItem}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
            ListFooterComponent={isLoading ? <ActivityIndicator size="large" color={Colors.PRIMARY} /> : null}
          />
        </View>
      </View>
    </View>
  );
};

export default React.memo(Category)

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // padding: 20,
    gap: hp(2),
  },
  heading: {
    fontFamily: 'spaceBold',
    fontSize: hp(2.4),
    color: Colors.PRIMARY,
  },
  searchNewstext: {
    fontFamily: 'poppinsRegular',
    paddingTop: 5,
    color: Colors.LIGHT_GREY
  },
  subHeading: {
    fontFamily: 'poppinsRegular',
    fontSize: hp(1.2),
    color: Colors.LIGHT_GREY,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.SLIGHTBG,
    padding: 10,
    paddingVertical: hp(1.6),
    gap: 20,
    borderRadius: 10,
  },
});