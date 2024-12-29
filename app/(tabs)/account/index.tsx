import { View, Text, Button, ImageBackground, StyleSheet, Image, ActivityIndicator } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link, useFocusEffect, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import AccountListCard from '@/components/AccountListCard'
import { AuthContext } from '@/context/AuthContext'
import NavigationHeader from '@/components/NavigationHeader'



const Account = () => {
  const { userLoggedOut, userData, getUserData, loading } = useContext<null | any>(AuthContext)
  const userImage = require('@/assets/images/dummy-user.webp')


  useFocusEffect(
    useCallback(() => {
      getUserData()
    }, [])
  )
  const router = useRouter()
  const onProfile = () => {
    router.push('/(tabs)/account/profile')
  }
  const onLogout = () => {
    userLoggedOut()
  }
  if (loading) {
    return <ActivityIndicator size={50} color={Colors.PRIMARY} />
  }
  return (
    <View style={styles.mainContainer}>
      <NavigationHeader  title={'Account'}/>
      <View style={styles.topContainer}>
        
        <ImageBackground
          source={require('@/assets/images/signup-bg.png')}
          style={styles.TopContainerBGImage}
        >
          {
            userData.image ? (<Image source={{ uri: userData.image }} style={styles.userImage} />) :
              (<Image source={userImage} style={styles.userImage} />)
          }
          <View style={styles.userDetailsContainer}>
            <View style={styles.userDataContainer}>
              <Text style={styles.data}>Full Name:</Text>
              <Text style={styles.data}>Email Address:</Text>
              <Text style={styles.data}>Phone Number:</Text>
              <Text style={styles.data}>Gender:</Text>
            </View>

            <View style={styles.userDetails}>
              <Text style={styles.userData}>{userData.fullName}</Text>
              <Text  style={styles.userData}>{userData.email}</Text>
              <Text style={styles.userData}>{userData.phone}</Text>
              <Text style={styles.userData}>{userData.gender}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.bottomContainer}>
        <AccountListCard title='Edit Profile' navigation={onProfile} icon='edit'/>
        <AccountListCard title='Log Out' navigation={onLogout} icon='sign-out'/>
      </View>
    </View>
  )
}

export default React.memo(Account)

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingVertical: 20,
    gap: 20
  },
  topContainer: {
  },
  TopContainerBGImage: {
    width: '100%',
    height: 330,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderBottomRightRadius: 50,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  userDetailsContainer:{
    flexDirection: 'row',
    gap: 30
  },
  userDataContainer: {
    alignItems: 'center'
  },
  userDetails:{
   alignItems: 'center'
  },
  userData: {
    fontSize: 12,
    fontFamily: 'poppinsRegular',
    color: Colors.WHITE
  },
  data: {
    fontSize: 12,
    fontFamily: 'poppinsBold',
    color: Colors.WHITE,
  },
  bottomContainer: {
    padding: 20
  }
})