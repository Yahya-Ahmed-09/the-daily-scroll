import { View, Text, Button, ActivityIndicator, BackHandler, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { ApiContext } from '@/context/ApiContext'
import BreakingNews from '@/components/BreakingNews'
import RecommendNews from '@/components/RecommendNews'
import HomeHeader from '@/components/HomeHeader';
import { AuthContext } from '@/context/AuthContext';
import { Colors } from '@/constants/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from 'expo-router';


const Home = () => {
 const {isLoading, ApiCall} = useContext<any>(ApiContext);
 const {loading, getUserData} = useContext<any>(AuthContext)
 const navigation = useNavigation();

  useEffect(()=>{

    
    
  },[])
 useFocusEffect(
  React.useCallback(() => {
  
    ApiCall(50);
    getUserData()
    const backAction = () => {
      if (navigation.isFocused()) {
        Alert.alert('Hold on!', 'Are you sure you want to exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      } else {
        navigation.goBack();
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation])
  
);



if(loading){
   return <ActivityIndicator size={50} color={Colors.PRIMARY} />
}
  return (
    <View style={{}}>
      <HomeHeader />
      {
        isLoading ? (
          <ActivityIndicator size={50} color={Colors.PRIMARY}/>
        ): (
        <>
        <BreakingNews />
        <View style={{}}>
         <RecommendNews />
         </View>
         </>)
      }
      
     
    </View>
  )
}

export default React.memo(Home)