import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Colors } from '@/constants/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

 
interface Props{
  title: String
  iconFunc?: ()=> void
}
const NavigationHeader:React.FC<Props> = ({title, iconFunc}) => {
  return (
    <View style={styles.main}>
      <TouchableOpacity style={{paddingTop: 5}} onPress={iconFunc}>
        {
          iconFunc ? (<FontAwesome6  name="arrow-left" size={hp(3)} color={Colors.PRIMARY} />): null
        }
      
      </TouchableOpacity>
      <View>
        
        <Text style={[styles.text, {paddingRight: iconFunc ? hp(5): 0}]} >{title}</Text>
      </View>
      <View></View>
    </View>
  )
}

export default React.memo(NavigationHeader)

const styles = StyleSheet.create({
  main:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(100),
    height: hp(5)
  },
  text:{
    fontFamily: 'spaceBold',
    color: Colors.PRIMARY,
    fontSize: hp(2.4)
  }
})