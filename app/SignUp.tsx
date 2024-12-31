import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import {app} from '@/db/firestore'
import {getAuth, createUserWithEmailAndPassword, sendEmailVerification,} from "firebase/auth";
import {getFirestore, doc, setDoc, getDoc} from 'firebase/firestore'
import Loader from '@/components/Loader';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const SignUp = () => {
    const router = useRouter();
    const [isPassVisible, setIsPassVisible] = useState<boolean>(true)
    const [isRetypePassVisible, setIsRetypePassVisible] = useState<boolean>(true);
    const [fullName, setFullName] = useState<String>('');
    const [email, setEmail] = useState<any>('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [errorMessage, setErrorMessage]= useState('');
    const [loader, setLoader] = useState(false);

    const validateEmail = (email:any)=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
    }

   

    const onSignUp = async() => {
        
        
        if(!fullName || !email || !password || !retypePassword){
            setErrorMessage('Please Fill Out All Fields')
        }else if(!validateEmail(email)){
            setErrorMessage("Please Enter Correct Email Address")
        }else if(password !== retypePassword){
            setErrorMessage('Password Do Not Match!')
        }else{
            const auth = getAuth(app);
            const db = getFirestore(app);
            setLoader(true)
            
            try {
                const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredentials.user;
                const userUid = user.uid
        
                await setDoc(doc(db, "users",user.uid),{
                    fullName: fullName,
                    email: email,
                    image:'',
                    gender: '',
                    phone: '',
                    createdAt: new Date(),
                });
                
                // userLoggerUidHandler(userUid)
                router.navigate('/Login')
                
                console.log("User signed up and data saved to Firestore", user);
            } catch (error:any) {
                setLoader(false)
                let message = error.message
                if(message.includes('Firebase: Error (auth/email-already-in-use)')){
                    message = 'Email already in use';
                }else{
                    message = message.charAt(0).toUpperCase() + message.slice(1);
                }
                setErrorMessage(message)
                console.log("Error during sign-up", error);
            }
        }
       
        
     
    }
    return (
        <View style={styles.signUpContainer}>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <ImageBackground
                source={require('@/assets/images/signup-bg.png')}
                style={styles.signUpTopContainer}
            >
                <Image style={{width: wp(30), height: hp(20)}} source={require('@/assets/images/login-signup-image.png')} />
                <Text style={styles.signUpTopContainerTitle}>Create Your Account!</Text>
            </ImageBackground>
            <View style={styles.signUpBottomContainer}>
              

                <View style={styles.signUpBottomContainerInputsContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            onChangeText={setFullName}
                            textContentType="givenName"
                            style={styles.signUpBottomContainerInputs}
                            placeholder="Full Name"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            onChangeText={setEmail}
                            textContentType="emailAddress"
                            style={styles.signUpBottomContainerInputs}
                            placeholder="Example@gmail.com"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            onChangeText={setPassword}
                            secureTextEntry={isPassVisible}
                            textContentType="password"
                            style={styles.signUpBottomContainerInputs}
                            placeholder="Password"
                        />
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => setIsPassVisible(!isPassVisible)}
                            style={styles.showHideButton}
                        >
                            <Ionicons name={isPassVisible? "eye-outline": 'eye-off-outline'} size={hp(3.5)} color={Colors.DARK} />
                            
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            onChangeText={setRetypePassword}
                            secureTextEntry={isRetypePassVisible}
                            textContentType="password"
                            style={styles.signUpBottomContainerInputs}
                            placeholder="Re-Type Password"
                        />
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => setIsRetypePassVisible(!isRetypePassVisible)}
                            style={styles.showHideButton}
                        >
                            <Ionicons name={isRetypePassVisible? "eye-outline": 'eye-off-outline'} size={hp(3.5)} color={Colors.DARK} />
                            
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.signUpBottomContainerButtonContainer}>
                    <TouchableOpacity onPress={onSignUp} style={styles.signUpBottomContainerButton}>
                        <Text
                            style={{
                                fontFamily: 'poppinsRegular',
                                paddingTop: 5,
                                color: Colors.WHITE,
                                fontSize: hp(1.8),
                            }}
                        >
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                    {errorMessage ? (
                        <Text style={{ color: 'red', textAlign: 'center', fontFamily: 'poppinsRegular', fontSize: hp(1.2) }}>
                            {errorMessage}
                        </Text>
                    ) : null}
                    <Text style={styles.signUpBottomContainerTerms}>
                        Creating an account means you're okay with our terms of service and our Privacy Policy.
                    </Text>
                    <Text style={styles.signUpBottomContainerText}>
                        Have an Account?{' '}
                        <Link style={styles.signUpBottomContainerLink} href={'/Login'}>
                            Sign In
                        </Link>
                    </Text>
                </View>
            </View>
        </ScrollView>
        <Loader loader={loader} />
    </KeyboardAvoidingView>
</View>

    )
}
const styles = StyleSheet.create({
    signUpContainer: {
        flex: 1,
        width: wp(100),
        justifyContent: 'center',
        backgroundColor: Colors.WHITE
    },
    inputContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    showHideButton: {
        position: 'absolute',
        right: 15,
        top: 18,
    },
    signUpTopContainer: {
        width: wp(100),
        height: hp(40),
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpTopContainerImage: {
        width: wp(15),
        height: hp(15)
    },
    signUpTopContainerTitle: {
        fontFamily: 'poppinsBold',
        color: Colors.WHITE,
        fontSize: hp(2.4)
    },
    signUpBottomContainer: {
        padding: 20,
        width: wp(100),
        backgroundColor: Colors.WHITE,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingTop: 50,
        marginTop: -30,
    },
    
    signUpBottomContainerInputsContainer: {
        gap: 10,
        marginBottom: 20
    },
    signUpBottomContainerInputs: {
        padding: 20,
        borderRadius: 15,
        borderColor: '#E1E1E1',
        borderWidth: 2,
        fontFamily: 'interMedium',
        fontSize: hp(1.4),
        justifyContent: 'center'
    },
    signUpBottomContainerButtonContainer: {
        alignItems: 'center',
        gap: 10,

    },
    signUpBottomContainerButton: {
        backgroundColor: Colors.PRIMARY,
        width: wp(90),
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: 15
    },
    signUpBottomContainerTerms: {
        color: Colors.LIGHT_GREY,
        textAlign: 'center',
        fontFamily: 'poppinsRegular',
        fontSize: hp(1.2),
    },
    signUpBottomContainerText: {
        fontFamily: 'poppinsRegular',
        fontSize: hp(1.2)
    },
    signUpBottomContainerLink: {
        color: Colors.PRIMARY
    }
})
export default React.memo(SignUp)