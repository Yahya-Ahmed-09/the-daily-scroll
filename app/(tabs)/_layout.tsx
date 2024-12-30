import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



const TabLayout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor:Colors.PRIMARY,
      headerTitleAlign: 'center',
      headerShown: false,
      tabBarStyle:{
        backgroundColor: Colors.DARK,
        margin:20,
        height: 80,
        paddingTop: 10,
        borderRadius: 30,
        shadowColor: 'transparent',
      },
      tabBarLabelStyle:{
        fontFamily: 'poppinsRegular',
        fontSize: hp(1.2)
      },
      headerTitleStyle:{
        fontFamily: 'poppinsBold',
      }
       }}>
        
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          headerTitle: 'The Daily Scroll',
          tabBarIcon: ({color})=> <Ionicons name="home" size={hp(2.4)} color={color} />,
        }} />
      
      <Tabs.Screen
        name='Category'
        options={{
          title: 'Explore',
          tabBarIcon: ({color})=> <Ionicons name="compass-outline" size={hp(2.4)} color={color} />
        }} />
      
      <Tabs.Screen
        name='Saved'
        options={{
          title: 'Saved',
          tabBarIcon: ({color})=> <Ionicons name="bookmarks-outline" size={hp(2.4)} color={color} />
        }} />

      <Tabs.Screen
        name='account'
        options={({ route }) => ({
          title:'Account',
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={hp(2.4)} color={color} />,
        })} />
    </Tabs>
  )
}

export default TabLayout