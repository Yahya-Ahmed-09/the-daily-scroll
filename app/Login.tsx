import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage  from '@react-native-async-storage/async-storage'
import { Link, useNavigation, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { AuthContext } from '@/context/AuthContext'
import Loader from '@/components/Loader'



const Login = () => {
    const router = useRouter();
    const [isPassVisible, setIsPassVisible] = useState<boolean>(true);
    const [email, setEmail] = useState<any>('');
    const [pass, setPass] = useState<any>('');
    const [errorMessage, setErrorMessage] = useState<any>('');
    const [loader, setLoader] = useState(false);
    const {userLoggerUidHandler} = useContext<any>(AuthContext)
    

    
    const validateEmail= (email:any)=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
    }
    const onLogin = async()=>{
        if(!email || !pass){
            setErrorMessage("Please Fill All Fields!")
        }else if(!validateEmail(email)){
            setErrorMessage("Please Enter Correct Email Address!")
        }

        const auth = getAuth();
        setLoader(true)
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, pass);
            const user = userCredential.user;
            const userUid:any = user.uid;
            
            await AsyncStorage.setItem('UserLoggedUid', user.uid);
            userLoggerUidHandler(userUid)
            // router.navigate('HomeWindow', {userUid});
            router.navigate('/(tabs)/index')
            
        } catch (error) {
            setErrorMessage("Invalid Credentials")
            console.log("Error message", error)
        }
    }
   
    
    return (
        <View style={styles.loginContainer}>
        <View style={styles.loginTopContainer}>
            <Image 
                style={styles.loginTopContainerImage} 
                source={require('@/assets/images/login-signup-image.png')} 
            />
            <Text style={styles.loginTopContainerTitle}>Join us to start searching</Text>
            <Text style={styles.loginTopContainerSubtitle}>Discover Your World!</Text>
        </View>
        <View style={styles.loginBottomContainer}>
            <View style={styles.inputContainer}>
                <TextInput 
                    onChangeText={newEmail => setEmail(newEmail)} 
                    style={styles.loginBottomContainerInputs} 
                    textContentType="emailAddress" 
                    placeholder="Example@gmail.com" 
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    onChangeText={newPass => setPass(newPass)} 
                    secureTextEntry={isPassVisible} 
                    style={styles.loginBottomContainerInputs} 
                    textContentType="password" 
                    placeholder="Password" 
                />
                <TouchableOpacity 
                    activeOpacity={0.6} 
                    onPress={() => setIsPassVisible(!isPassVisible)} 
                    style={styles.showHideButton}>
                    <Text>{isPassVisible ? 'Show' : 'Hide'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.loginBottomContainerbtnContainer}>
                <TouchableOpacity 
                    onPress={onLogin} 
                    activeOpacity={0.6} 
                    style={styles.loginBottomContainerButton}>
                    <Text style={{ fontFamily: 'poppinsRegular', paddingTop: 5, color: Colors.WHITE, fontSize: 18 }}>Login</Text>
                </TouchableOpacity>
                {errorMessage ? (
                    <Text style={{ color: 'red', textAlign: 'center', fontFamily: 'poppinsRegular', fontSize: 12 }}>
                        {errorMessage}
                    </Text>
                ) : null}
                <Text onPress={()=> router.navigate('/ForgotPass')} style={styles.forgetPass}>Forgot Your Password?</Text>
                <Text  style={styles.loginBottomContainerText}>
                    Don't have an account?{' '}
                    <Link style={styles.loginBottomContainerLink} href="/SignUp">Create Account</Link>
                </Text>
            </View>
            <Loader loader={loader} />
        </View>
    </View>
    
    )
}
const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    loginTopContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 30
    },
    loginTopContainerImage: {
        width: 200,
        height: 200
    },
    loginTopContainerTitle: {
        fontFamily: 'poppinsBold',
        fontSize: 20,
        color: Colors.DARK
    },
    loginTopContainerSubtitle: {
        fontFamily: 'interMedium',
        fontSize: 16
    },
    loginBottomContainer: {
        gap: 20,
        padding: 20,
        width: "100%"
    },
    loginBottomContainerInputs: {
        padding: 20,
        borderRadius: 15,
        borderColor: '#E1E1E1',
        borderWidth: 2,
        fontFamily: 'interMedium',
        fontSize: 12,
        justifyContent: 'center'
    },
    loginBottomContainerbtnContainer: {
        alignItems: 'center',

    },
    loginBottomContainerButton: {
        backgroundColor: Colors.PRIMARY,
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: 15
    },
    loginBottomContainerText: {
        fontFamily: 'poppinsRegular',
        fontSize: 14
    },
    loginBottomContainerLink: {
        color: Colors.PRIMARY
    },
    forgetPass:{
        fontFamily: 'poppinsRegular',
        color: Colors.PRIMARY,
        fontSize: 14,
        paddingBottom: 10
    }
})
export default React.memo(Login)