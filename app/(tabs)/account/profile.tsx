import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '@/context/AuthContext'
import { Colors } from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import DropDown from '@/components/DropDown';
import { useRouter } from 'expo-router';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { app } from '@/db/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CancelModal from '@/components/CancelModal';
import NavigationHeader from '@/components/NavigationHeader';

const Profile = () => {
  const { isModalVisible,modalVisibility,userData, genderData, isLoggedUid } = useContext<null | any>(AuthContext)
  const bgImage = require('@/assets/images/dummy-user.webp')
  const [name, setName] = useState<any>(userData.fullName)
  const [emailAddress, setEmailAddress] = useState<any>(userData.email)
  const [phone, setPhone] = useState<String>(userData.phone)
  const [errorMessage, setErrorMessage] = useState("")
  const [image, setImage] = useState<String | null>(userData.image)
  const [isCancel, setIsCancel] = useState<boolean>(false)
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
      setImage(result.assets[0].uri);
    }
  };
  const data = ['Male', 'Female']

  return (
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
              <CancelModal />
            <TouchableOpacity activeOpacity={0.6} style={styles.saveBtn} onPress={onSave}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </View>
  )
}

export default React.memo(Profile)

const styles = StyleSheet.create({
  mainContaier: {
    flex: 1,
    paddingVertical: 20,
  },
  header:{
    paddingHorizontal: 20
  },
  topContainer: {
    height: 250,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20
  },
  topContainerBGImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  topContainerForegroundContainer: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000053'
  },
  topContainerTitle: {
    fontFamily: 'poppinsRegular',
    fontSize: 18,
    
  },
  bottomContainer: {
    padding: 20,
    gap: 10
  },
  bottomContainerTitle: {
    fontFamily: 'spaceMedium',
    fontSize: 16,
    color: Colors.LIGHT_GREY,
    textAlign: 'center',
    marginBottom: 20
  },
  inputContainer:{
    gap: 10
  },
  label:{
    fontFamily: 'poppinsRegular',
    fontSize: 15
  },
  textInput:{
    height: 70,
    borderWidth: 2,
    fontFamily: 'interMedium',
    paddingLeft: 10,
    borderRadius: 15,
    borderColor: '#E1E1E1',
  },
  buttonContainer:{
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cancelBtn:{
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: Colors.LIGHT_GREY,
    borderRadius: 10
  },
  cancelText:{
    fontFamily: 'poppinsRegular',
    paddingTop: 5,
    color: Colors.LIGHT_GREY
  },
  saveBtn:{
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10
  },
  saveText:{
    fontFamily: 'poppinsRegular',
    paddingTop: 5,
    color: Colors.WHITE
  }
})