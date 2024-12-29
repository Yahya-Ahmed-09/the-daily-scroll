import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '@/constants/Colors'
import NewsScrollView from '@/components/NewsScrollView'
import { ApiContext } from '@/context/ApiContext'
import NavigationHeader from '@/components/NavigationHeader'
import { useRouter } from 'expo-router'



const Search = () => {
    const {newsData} = useContext<any>(ApiContext)
    const [search, setSearch] = useState('')
    const router = useRouter()
    const goBack =()=>{
      router.push('/(tabs)/Category')
    }

    const filteredNews = newsData.filter((item:any) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    )
  return (
    <View style={styles.main}>
        <NavigationHeader title={'Search'} iconFunc={goBack}/>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={24} color={Colors.LIGHT_GREY} />
          <TextInput style={{width:370}} placeholder='Search for news' onChangeText={newText => setSearch(newText)}/>
        </View>
      {
        search !== '' ? (<View style={{flex: 1, marginLeft: -20}} >
            <FlatList
              showsVerticalScrollIndicator={false}
              data={filteredNews}
              renderItem={({ item, index }) => <NewsScrollView index={index} items={item} />}
              
            />
          </View>) : null 
      }
        
    </View>
  )
}

export default React.memo(Search)

const styles = StyleSheet.create({
    main:{
        flex: 1,
        padding: 20,
        gap: 30
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.SLIGHTBG,
        padding: 10,
        gap: 20,
        borderRadius: 10,
      },
})