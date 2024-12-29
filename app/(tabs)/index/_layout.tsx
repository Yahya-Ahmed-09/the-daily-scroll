import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from '@/constants/Colors'

const HomeLayout = () => {
  return (
   <Stack screenOptions={{
         headerTintColor: Colors.BLACK,
         headerTitleAlign: 'center',
         headerShown: false,
         headerTitleStyle:{
          fontFamily: 'poppinsBold',
         },
          }} >
            <Stack.Screen name='index' options={{
                headerTitle: 'The Daily Scroll'
            }} />
          </Stack>
  )
}

export default HomeLayout