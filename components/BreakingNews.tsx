import { View, Text, StyleSheet, ViewToken } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import SliderItems from './SliderItems'
import { ApiContext } from '@/context/ApiContext'
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import Pagination from './Pagination'
import { Colors } from '@/constants/Colors'
import { heightPercentageToDP } from 'react-native-responsive-screen'




const BreakingNews = () => {
  const { ApiCall, newsData } = useContext<any>(ApiContext)

  const [paginationIndex, setPaginationIndex] = useState<number>(0);
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();
  const configData = newsData;
  const maxLength = 5;
  const filterData = configData.slice(0, maxLength)
  const [data, setData] = useState<Object[]>(filterData)


  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0].index !== undefined && viewableItems[0].index !== null) {
      setPaginationIndex(viewableItems[0].index % newsData.length)
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  }
  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged }
  ])

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x
    }
  });

  return (
    <View >
      <Text style={styles.heading}>BreakingNews</Text>

      <Animated.FlatList
        ref={ref}
        horizontal
        onScroll={onScrollHandler}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={filterData}
        // data={newsData}

        onEndReachedThreshold={0.5}
        onEndReached={() => setData([...filterData, ...newsData])}
        viewabilityConfigCallbackPairs={
          viewabilityConfigCallbackPairs.current
        }
        renderItem={(({ item, index }) => (
          <SliderItems slideItem={item} index={index} scrollX={scrollX} />
        ))} />
      <Pagination items={filterData} paginationIndex={paginationIndex} scrollX={scrollX} />
    </View>
  )
}
const styles = StyleSheet.create({

  heading: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    fontFamily: 'spaceBold',
    fontSize: heightPercentageToDP(2.4),
    color: Colors.PRIMARY
  }
})
export default React.memo(BreakingNews)