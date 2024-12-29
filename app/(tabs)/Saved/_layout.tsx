import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from '@/constants/Colors'

const BookMarkNewsLayout = () => {
  return (
   <Stack screenOptions={{
         headerTintColor: Colors.BLACK,
         headerTitleAlign: 'center',
         headerTitleStyle:{
          fontFamily: 'poppinsBold',
         },
         headerShown: false
          }} >
            <Stack.Screen name='index' options={{
                headerTitle: 'Saved News'
            }} />
          </Stack>
  )
}

export default BookMarkNewsLayout