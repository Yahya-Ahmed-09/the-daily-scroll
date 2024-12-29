import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Colors } from '@/constants/Colors';
 
interface Props{
  title: String
  iconFunc?: ()=> void
}
const NavigationHeader:React.FC<Props> = ({title, iconFunc}) => {
  return (
    <View style={styles.main}>
      <TouchableOpacity style={{paddingTop: 5}} onPress={iconFunc}>
        {
          iconFunc ? (<FontAwesome6  name="arrow-left" size={34} color={Colors.PRIMARY} />): null
        }
      
      </TouchableOpacity>
      <View>
        <Text style={styles.text} >{title}</Text>
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
    width: '100%',
  },
  text:{
    fontFamily: 'spaceBold',
    color: Colors.PRIMARY,
    fontSize: 24
  }
})