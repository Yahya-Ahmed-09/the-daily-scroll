import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from '@/constants/Colors'

const CategoryLayout = () => {
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
                headerTitle: 'Category'
            }} />
          </Stack>
  )
}

export default CategoryLayout