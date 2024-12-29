import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';

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
                <FontAwesome name={icon} size={24} color={Colors.PRIMARY} />
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
        padding: 20,
        borderRadius: 30,
        borderColor: Colors.PRIMARY,
        borderWidth: 1,
        marginBottom: 20
    },
    cardDetail:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },
    text:{
        fontSize: 14,
        fontFamily: 'poppinsBold',
        color: Colors.PRIMARY,
        paddingTop: 5
    }
})