import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, PixelRatio } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { ApiContext } from '@/context/ApiContext'
import { Link, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
         
            <Image style={styles.newsImage} source={{uri: items.urlToImage}}/>
         
         <View style={styles.newsDataContainer}>
            <Text style={styles.newsDataTitle} numberOfLines={1}>{items.title.slice(0,titleLimit)+ '...'}</Text>
            <Text style={styles.newsDataDescription} numberOfLines={2}>{items.description}</Text>
            <Text style={styles.newsDataPublished} >{items.publishedAt.slice(0, maxLength)}</Text>
         </View>
         </TouchableOpacity >
         <TouchableOpacity onPress={onClick} style={styles.newsBookmarkContainer}>
         <Ionicons name={status ? "bookmark" : "bookmark-outline"} size={hp(4)} color={Colors.PRIMARY} />
         </TouchableOpacity>
      </View>
    </View>
  )
}

export default React.memo(NewsScrollView)

const styles = StyleSheet.create({
    main:{
        paddingHorizontal: wp(6),
        paddingBottom: hp(2),
        // width: wp(100),
        // height: hp(15)
        
    },
    newsMainContainer:{
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        width: wp(80),
    },

    touchableContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: wp(80)
    },
    newsImage:{
        width: wp(20),
        height: hp(10),
        borderRadius: 15,
    },
    newsDataContainer:{
        width: wp(55),
        paddingRight: wp(8),
    },
    newsDataTitle:{
        fontSize: hp(1.2),
        fontFamily: 'poppinsSemiBoldItalic',
        color: Colors.PRIMARY
    },
    newsDataDescription:{
        fontSize: hp(1.2),
        fontFamily:'poppinsRegular'
    },
    newsDataPublished:{
        fontSize: hp(1.2),
        fontFamily: 'poppinsRegular',
        color: Colors.DARK
    },
    newsBookmarkContainer:{
    }

})