import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, PixelRatio } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { ApiContext } from '@/context/ApiContext'
import { Link, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props{
    category?: string,
    items: any,
    index: number,
}

const NewsScrollView: React.FC<Props> = ({index, items}) => {
    const maxLength = 10;
    const titleLimit = 25;
    const router = useRouter()

    const {savedArticle, getSavedNews, loadBookmark } = useContext<any>(ApiContext)
    const status = savedArticle.find((article:any) => article.title === items.title); 
    
    useEffect(() => {
        loadBookmark()
        // console.log(indexOfArticle) 
    }, [])
    const onClick = () => {
        getSavedNews(items, index)
    }
    const size = 50
  return (
    <View style={styles.main}>
      <View  style={styles.newsMainContainer} key={index}>
        <TouchableOpacity activeOpacity={0.6} style={styles.touchableContainer} onPress={()=> router.push(items.url)}>
         <View style={styles.newsImageContainer}>
            <Image style={styles.newsImage} source={{uri: items.urlToImage}}/>
         </View>
         <View style={styles.newsDataContainer}>
            <Text style={styles.newsDataTitle} numberOfLines={1}>{items.title.slice(0,titleLimit)+ '...'}</Text>
            <Text style={styles.newsDataDescription} numberOfLines={2}>{items.description}</Text>
            <Text style={styles.newsDataPublished} >{items.publishedAt.slice(0, maxLength)}</Text>
         </View>
         </TouchableOpacity >
         <TouchableOpacity onPress={onClick} style={styles.newsBookmarkContainer}>
         <Ionicons name={status ? "bookmark" : "bookmark-outline"} size={40} color={Colors.PRIMARY} />
         </TouchableOpacity>
      </View>
    </View>
  )
}

export default React.memo(NewsScrollView)

const styles = StyleSheet.create({
    main:{
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    newsMainContainer:{
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
    },
    newsImageContainer:{
        width: 100,
        height: 100,
        marginRight: 15,
    },
    touchableContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    newsImage:{
        // width: '100%',
        // height: '100%',
        width: PixelRatio.getPixelSizeForLayoutSize(70),
        height: PixelRatio.getPixelSizeForLayoutSize(70),
        borderRadius: 15,
    },
    newsDataContainer:{
        width: '70%',
        paddingRight: '10%',
    },
    newsDataTitle:{
        fontSize: 12,
        fontFamily: 'poppinsSemiBoldItalic',
        color: Colors.PRIMARY
    },
    newsDataDescription:{
        fontSize: 12,
        fontFamily:'poppinsRegular'
    },
    newsDataPublished:{
        fontSize: 12,
        fontFamily: 'poppinsRegular',
        color: Colors.DARK
    },
    newsBookmarkContainer:{
    }

})