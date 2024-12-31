import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '@/context/AuthContext'
import { Colors } from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import DropDown from '@/components/DropDown';
import { useRouter } from 'expo-router';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { app } from '@/db/firestore';
import CancelModal from '@/components/CancelModal';
import NavigationHeader from '@/components/NavigationHeader';
import * as FileSystem from 'expo-file-system';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Profile = () => {
  const { modalVisibility,userData, genderData, isLoggedUid } = useContext<null | any>(AuthContext)
  const bgImage = require('@/assets/images/dummy-user.webp')
  const [name, setName] = useState<any>(userData.fullName)
  const [emailAddress, setEmailAddress] = useState<any>(userData.email)
  const [phone, setPhone] = useState<String>(userData.phone)
  const [errorMessage, setErrorMessage] = useState("")
  const [image, setImage] = useState<string | null>(userData.image)
  const router = useRouter()

  const onBack =()=>{
    if(name !== userData.fullName || emailAddress !== userData.email || phone !== userData.phone || genderData !== userData.gender || image !== userData.image){
      modalVisibility(true)
    }else{
      router.back()
    }
  }

  const validateEmail = (email:any)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}

const updateDocument = async()=>{
  const db = getFirestore(app)
  try {
    const docRef = doc(db, 'users', isLoggedUid)
    await updateDoc(docRef, {
      email: emailAddress,
      fullName: name,
      gender: genderData,
      image: image,
      phone: phone
    })
    
  } catch (error) {
    console.log(error)
  }
}

const onSave = ()=>{
  try {
    if(name !== '' && validateEmail(emailAddress)){
      updateDocument()
      router.navigate('/(tabs)/account')
    }else{
      setErrorMessage("Please Enter Correct Email Address")
    }
  } catch (error) {
    console.log(error)
  }
  
}

const onCancel =()=>{
  if(name !== userData.fullName || emailAddress !== userData.email || phone !== userData.phone || genderData !== userData.gender || image !== userData.image){
    modalVisibility(true)
  }else{
    router.back()
  }
  
}
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const base64Image  = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64
      });

      setImage(`data:image/jpeg;base64,${base64Image}`);

    }

  };
  const data = ['Male', 'Female']

  

  return (
    <>
    <View style={styles.mainContaier}>
      <View style={styles.header}>
      <NavigationHeader  title={'Profile'} iconFunc={onBack}/>
      </View>
      <View style={styles.topContainer}>
        <TouchableOpacity activeOpacity={0.6} onPress={pickImage}>
          <ImageBackground borderRadius={50} source={!image ? bgImage : {uri: image}} style={styles.topContainerBGImage}>
            <View style={styles.topContainerForegroundContainer}>
              <Ionicons name="camera-outline" size={26} color={Colors.WHITE} />
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <Text style={styles.topContainerTitle}>Change Photo</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginRight: 20, justifyContent: 'space-between' }}>
        <View style={{ flex: 1, height: 1, backgroundColor: Colors.LIGHT_GREY }}>

        </View>
      </View>

      <ScrollView>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomContainerTitle}>About You</Text>
        <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput 
              placeholder={userData.fullName}
              placeholderTextColor='#b5b5b5'
              onChangeText={newName => setName(newName)}
              textContentType='name'
              style={styles.textInput}
              />
        </View>

        <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput 
              placeholder={userData.email}
              placeholderTextColor='#b5b5b5'
              onChangeText={newEmail => setEmailAddress(newEmail)}
              textContentType='emailAddress'
              style={styles.textInput}
              />
              {
                errorMessage ? (<Text style={{color: 'red', fontSize: 10}}>{errorMessage}</Text>): null
              }
            
        </View>

        <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender</Text>
            <DropDown genders={data} />
        </View>

        <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput 
              placeholder={userData.phone}
              placeholderTextColor='#b5b5b5'
              onChangeText={newPhone => setPhone(newPhone)}
              textContentType='telephoneNumber'
              style={styles.textInput}
              />
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity activeOpacity={0.6} style={styles.cancelBtn} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
              
            <TouchableOpacity activeOpacity={0.6} style={styles.saveBtn} onPress={onSave}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
      
    </View>

<CancelModal />
</>
  )
}

export default React.memo(Profile)

const { width } = Dimensions.get('window');
const imageSize = width < 400 ? 80 : 100;
const styles = StyleSheet.create({
  mainContaier: {
    flex: 1,
    paddingVertical: 20,
    height: hp(100),
    width: wp(100)
  },
  header:{
    paddingHorizontal: wp(3)
  },
  topContainer: {
    height: hp(20),
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20
  },
  topContainerBGImage: {
    height: imageSize,
    width: imageSize,
    borderRadius: 50,
  },
  topContainerForegroundContainer: {
    height: imageSize,
    width: imageSize,
    borderRadius: hp(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000053'
  },
  topContainerTitle: {
    fontFamily: 'poppinsRegular',
    fontSize: hp(1.8),
    
  },
  bottomContainer: {
    padding: hp(2),
    gap: 10
  },
  bottomContainerTitle: {
    fontFamily: 'spaceMedium',
    fontSize: hp(1.6),
    color: Colors.LIGHT_GREY,
    textAlign: 'center',
    marginBottom: hp(2)
  },
  inputContainer:{
    gap: 10
  },
  label:{
    fontFamily: 'poppinsRegular',
    fontSize: hp(1.5)
  },
  textInput:{
    height: hp(7),
    borderWidth: 2,
    fontFamily: 'interMedium',
    paddingLeft: 10,
    borderRadius: 15,
    borderColor: '#E1E1E1',
    fontSize: hp(1.4)
  },
  buttonContainer:{
    marginTop: hp(2),
    width: wp(90),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cancelBtn:{
    paddingHorizontal: wp(6),
    paddingVertical: hp(1),
    borderWidth: 2,
    borderColor: Colors.LIGHT_GREY,
    borderRadius: 10
  },
  cancelText:{
    fontFamily: 'poppinsRegular',
    paddingTop: hp(1),
    color: Colors.LIGHT_GREY,
    fontSize: hp(1.4)
  },
  saveBtn:{
    paddingHorizontal: wp(6),
    paddingVertical: hp(1),
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10
  },
  saveText:{
    fontFamily: 'poppinsRegular',
    paddingTop: hp(1),
    color: Colors.WHITE,
    fontSize: hp(1.4)
  }
})