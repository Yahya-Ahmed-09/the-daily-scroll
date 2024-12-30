import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { useFocusEffect } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const HomeHeader = () => {
    const logo = require('@/assets/images/header-logo.webp')
    const userImage = require('@/assets/images/dummy-user.webp')
    const { userData, getUserData, loading } = useContext<any>(AuthContext)
    const router = useRouter()

    useFocusEffect(
        useCallback(() => {
            getUserData()
        }, [])
    )

    return (
        <>
            <View style={styles.headerContainer}>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                </View>

                <View style={styles.rightContainer}>
                    <TouchableOpacity style={styles.iconButton} onPress={()=> router.navigate('/(tabs)/Category/Search')} activeOpacity={0.6}>
                        <Ionicons name="search-sharp" size={hp(4)} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={()=> router.push('/(tabs)/account')} activeOpacity={0.6}>
                        {userData.image ? (
                            <Image source={{ uri: userData.image }} style={styles.userImage} />
                        ) : (
                            <Image source={userImage} style={styles.userImage} />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            
        </>
    )
}

export default React.memo(HomeHeader)

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        height: hp(10)
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(8),
    },
    logo: {
        width: wp(35),
        height: hp(30),
        objectFit: 'contain'
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginHorizontal: 10,
    },
    userImage: {
        width: wp(10),
        height: hp(5),
        borderRadius: 30,
        resizeMode: 'cover',
    },
})