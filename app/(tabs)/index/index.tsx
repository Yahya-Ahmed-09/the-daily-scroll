import { View, Text, Button, ActivityIndicator, BackHandler, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { ApiContext } from '@/context/ApiContext'
import BreakingNews from '@/components/BreakingNews'
import RecommendNews from '@/components/RecommendNews'
import HomeHeader from '@/components/HomeHeader';
import { AuthContext } from '@/context/AuthContext';
import { Colors } from '@/constants/Colors';


const Home = () => {
 const {isLoading, ApiCall} = useContext<any>(ApiContext);
 const {loading, getUserData} = useContext<any>(AuthContext)

 const [isConnected, setIsConnected] = useState<boolean | null>(true);
  useEffect(()=>{

    
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      
      backHandler.remove();
    };
  },[])
 useFocusEffect(
  React.useCallback(() => {
    ApiCall(50);
    getUserData()
  }, [])
  
);



if(loading){
   return <ActivityIndicator size={50} color={Colors.PRIMARY} />
}
  return (
    <View style={{flex: 1,}}>
      <HomeHeader />
      {
        isLoading ? (
          <ActivityIndicator size={50} color={Colors.PRIMARY}/>
        ): (
        <>
        <BreakingNews />
         <RecommendNews />
         </>)
      }
      
     
    </View>
  )
}

export default React.memo(Home)