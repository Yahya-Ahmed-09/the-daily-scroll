import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface Props{
    title: string,
    navigation: ()=>void
    icon: String
}
const AccountListCard: React.FC<Props> = ({title, navigation, icon}) => {
    return (
        <View>
            <TouchableOpacity activeOpacity={0.6}  onPress={navigation} style={styles.card}>
                <View style={styles.cardDetail}>
                <FontAwesome style={{paddingTop: hp(0.5)}} name={icon} size={hp(2.4)} color={Colors.PRIMARY} />
                <Text style={styles.text}>{title}</Text>
                
                </View>
                <Ionicons name="chevron-forward" size={24} color={Colors.PRIMARY} />
            </TouchableOpacity>
        </View>
    )
}

export default React.memo( AccountListCard)

const styles = StyleSheet.create({
    card:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: hp(1.5),
        borderRadius: wp(3),
        borderColor: Colors.PRIMARY,
        borderWidth: 1,
        marginBottom: 20
    },
    cardDetail:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    text:{
        fontSize: hp(1.4),
        fontFamily: 'poppinsBold',
        color: Colors.PRIMARY,
        paddingTop: 5
    }
})