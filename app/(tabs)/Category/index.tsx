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
      <NavigationHeader title={'Explore'}/>
      <View>
        <Text style={styles.heading}>Discover</Text>
        <Text style={styles.subHeading}>News from all over the world!</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.searchBar} onPress={()=> router.navigate('/(tabs)/Category/Search')}>
          <Ionicons name="search" size={24} color={Colors.LIGHT_GREY} />
          <Text style={styles.searchNewstext}>Search for news..</Text>
        </TouchableOpacity>
      </View>
      <View>
        <CategoriesCard categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />
      </View>
      <View>
        <Text style={[styles.heading, { fontSize: 18, color: Colors.DARK }]}>{data}</Text>
      </View>
      <View style={{flex: 1}} >
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
  );
};

export default React.memo(Category)

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  heading: {
    fontFamily: 'spaceBold',
    fontSize: 30,
    color: Colors.PRIMARY,
  },
  searchNewstext:{
    fontFamily: 'poppinsRegular',
    paddingTop: 5,
    color: Colors.LIGHT_GREY
  },
  subHeading: {
    fontFamily: 'poppinsRegular',
    fontSize: 12,
    color: Colors.LIGHT_GREY,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.SLIGHTBG,
    padding: 10,
    paddingVertical: 15,
    gap: 20,
    borderRadius: 10,
  },
});