import { View, Text, Button } from 'react-native'
import React, { useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { useSearchParams } from 'expo-router/build/hooks'
import { AuthContext } from '@/context/AuthContext'

const HomeWindow = () => {
  const {isLoggedUid,userLoggedOut} = useContext<null | any>(AuthContext)
  const router  = useRouter()
  const onContinue = ()=>{
    userLoggedOut()
    router.navigate('/Login');
  }
  return (
    <>
    <View >
      <Button title='Logout' onPress={onContinue}/>
    </View>
    </>
  )
}

export default HomeWindow