import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Colors } from '@/constants/Colors';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { app } from '@/db/firestore';
import { useRouter } from 'expo-router';
import AlertModal from '@/components/AlertModal';

const ForgotPass = () => {
    const [email, setEmail] = useState<string>('');
    const [isDisable, setIsDisable] = useState<boolean>(true)
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState(false);
    const router = useRouter()


    const validateEmail = (email:any)=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
    }

    const onChangeText =(text: string)=>{
        setEmail(text)
        if(validateEmail(text)){
            setIsDisable(false)
        }else{
            setIsDisable(true)
        }
    }
    const onSendLink = async()=>{
        try {
            setIsVisible(true)
            if(validateEmail(email)){
                const auth = getAuth(app);
                await sendPasswordResetEmail(auth, email)
                console.log("Reset Link Sent")
                setShowAlert(true)
            }else{
                setIsDisable(true)
            }
           
        } catch (error) {
            console.log(error)
        }finally{
            setIsVisible(true)
        }
    }

    const onBackBtn = ()=>{
        router.back()
    }

    const onCloseAlert = () => {
        setShowAlert(false);
        setEmail('')
        setIsDisable(true)
        router.push('/Login')
    };
    return (
        <View style={styles.main}>
            <View style={styles.textContainer}>
                <Text style={styles.heading}>Forgot Password?</Text>
                <Text style={styles.subline}>Enter your email address and we will send you an  email to create a new Password</Text>
            </View>

            <View style={styles.textInputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                value={email}
                style={styles.textInput}
                placeholder='Enter email address'
                onChangeText={newEmail => onChangeText(newEmail)}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity disabled={isDisable} onPress={onSendLink} activeOpacity={0.6} style={[styles.sendBtn, {opacity: isDisable ? 0.5 : 1 } ]}>
                    <Text style={styles.sendBtnText}>Send Reset Link</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onBackBtn} activeOpacity={0.6} style={styles.backBtn}>
                <FontAwesome6 name="arrow-left" size={24} color={Colors.LIGHT_GREY} />
                    <Text style={styles.backBtnText}>Back to login</Text>
                </TouchableOpacity>
            </View>
            {isVisible && (<AlertModal onClose={onCloseAlert} visibility={showAlert} email={email}/>)}
            
        </View>
    )
}

export default React.memo(ForgotPass)

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        gap: 20
        // alignItems: 'center'
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        textAlign: 'center',
        fontFamily: 'poppinsBold',
        fontSize: 30
    },
    subline: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'poppinsRegular',
        color: Colors.LIGHT_GREY
    },
    textInputContainer: {
        gap: 10
    },
    label: {
        fontSize: 14,
        fontFamily: 'poppinsBold',
        color: Colors.BLACK
    },
    textInput:{
        height: 70,
        borderWidth: 2,
        fontFamily: 'interMedium',
        paddingLeft: 10,
        borderRadius: 15,
        borderColor: '#E1E1E1',
      },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    sendBtn: {
        backgroundColor: Colors.PRIMARY,
        width: '100%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: 15,
    },
    sendBtnText:{
        textAlign: 'center',
        color: Colors.WHITE,
        fontFamily: 'poppinsRegular',
        paddingTop: 5
    },
    backBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    backBtnText:{
        textAlign: 'center',
        color: Colors.LIGHT_GREY,
        fontFamily: 'poppinsRegular',
        paddingTop: 5
    }
})