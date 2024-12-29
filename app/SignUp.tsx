import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import {app} from '@/db/firestore'
import {getAuth, createUserWithEmailAndPassword, sendEmailVerification,} from "firebase/auth";
import {getFirestore, doc, setDoc, getDoc} from 'firebase/firestore'
import Loader from '@/components/Loader';
import { AuthContext } from '@/context/AuthContext';


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
                <Image source={require('@/assets/images/login-signup-image.png')} />
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
                            <Text>{isPassVisible ? 'Show' : 'Hide'}</Text>
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
                            <Text>{isRetypePassVisible ? 'Show' : 'Hide'}</Text>
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
                                fontSize: 18,
                            }}
                        >
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                    {errorMessage ? (
                        <Text style={{ color: 'red', textAlign: 'center', fontFamily: 'poppinsRegular', fontSize: 12 }}>
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
        width: '100%',
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
        top: 20,
    },
    signUpTopContainer: {
        width: '100%',
        height: 330,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpTopContainerImage: {
        width: 150,
        height: 150
    },
    signUpTopContainerTitle: {
        fontFamily: 'poppinsBold',
        color: Colors.WHITE,
        fontSize: 24
    },
    signUpBottomContainer: {
        padding: 20,
        width: '100%',
        backgroundColor: Colors.WHITE,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingTop: 50,
        marginTop: -30,
    },
    
    signUpBottomContainerInputsContainer: {
        gap: 20,
        marginBottom: 20
    },
    signUpBottomContainerInputs: {
        padding: 20,
        borderRadius: 15,
        borderColor: '#E1E1E1',
        borderWidth: 2,
        fontFamily: 'interMedium',
        fontSize: 12,
        justifyContent: 'center'
    },
    signUpBottomContainerButtonContainer: {
        alignItems: 'center',
        gap: 10,

    },
    signUpBottomContainerButton: {
        backgroundColor: Colors.PRIMARY,
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: 15
    },
    signUpBottomContainerTerms: {
        color: Colors.LIGHT_GREY,
        textAlign: 'center',
        fontFamily: 'poppinsRegular',
        fontSize: 12,
    },
    signUpBottomContainerText: {
        fontFamily: 'poppinsRegular'
    },
    signUpBottomContainerLink: {
        color: Colors.PRIMARY
    }
})
export default React.memo(SignUp)