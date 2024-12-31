import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Main from './Main'
import { AuthContext, AuthProvider } from '@/context/AuthContext'
import { ApiProvider } from '@/context/ApiContext'
import NetInfo from '@react-native-community/netinfo';


const index = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
    useEffect(()=>{
      const unsubscribe = NetInfo.addEventListener(state => {
        setIsConnected(state.isConnected);
      });

      return ()=>{
        unsubscribe();
      }
    },[])

    if (!isConnected) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No internet connection. Please check your network settings.</Text>
        </View>
      );
    }
  return (
    <ApiProvider>
      <Main/>
      </ApiProvider>
  )
}

export default React.memo(index)