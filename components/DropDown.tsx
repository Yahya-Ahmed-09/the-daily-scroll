import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { AuthContext } from '@/context/AuthContext';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface Props{
    genders: Array<String>
}

const DropDown: React.FC<Props> = ({genders}) => {
    const {genData, userData} = useContext<any>(AuthContext)
    const [option, setOption] = useState(!userData?.gender ? "Select Gender": userData?.gender)
    const [isClicked, setIsClicked] = useState(false)
    
    useEffect(()=>{
        genData(option)
    },[option])
    
    const onSelectGender =()=>{
        setIsClicked(!isClicked)
    }
    const onClick = (gender:any)=>{
        setOption(gender)
        setIsClicked(false)
    }
    return (
        <View style={{ gap: 10 }}>
            <TouchableOpacity activeOpacity={0.6} style={styles.box} onPress={onSelectGender}>
                <Text style={[styles.gender, {color: option === userData?.gender ? Colors.LIGHT_GREY: Colors.BLACK}]}>{option}</Text>

                <Ionicons name={isClicked ? "chevron-up" : "chevron-down"} size={24} color="black" />
            </TouchableOpacity>
            {
                isClicked ? (
                    <View style={styles.dataContainer}>
                
                    {genders.map((item, index)=> (
                        <TouchableOpacity key={index} activeOpacity={0.6} onPress={()=> onClick(item)}>
                        <Text style={styles.text}>-{item}</Text>
                        </TouchableOpacity>
                    ))}
                    
                
            </View>
                ) : null
            }
            
        </View>
    )
}

export default React.memo(DropDown)

const styles = StyleSheet.create({
    box: {
        height: hp(7),
        borderWidth: 2,
        fontFamily: 'interMedium',
        paddingLeft: 10,
        borderRadius: 15,
        borderColor: '#E1E1E1',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp(1.5)
    },
    gender:{
        fontFamily: 'poppinsRegular',
        paddingTop: 5,
        fontSize: hp(1.4)
    },
    dataContainer: {
        width: '100%',
        backgroundColor: '#f2f2f2',
        borderRadius: 15,
        padding: 10,
        paddingVertical: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        gap: 20, 
        position: 'absolute',
        zIndex: 1,
        top: hp(7)
    },
    text:{
        fontFamily: 'poppinsRegular',
        fontSize: hp(1.6)
    }
})