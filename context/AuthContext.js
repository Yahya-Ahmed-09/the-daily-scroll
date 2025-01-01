import AsyncStorage from "@react-native-async-storage/async-storage";
import {doc, updateDoc, Firestore, getDoc, getFirestore} from "firebase/firestore"
import { app } from '@/db/firestore'

const { createContext, useState } = require("react");

const AuthContext = createContext(null) 

const AuthProvider = ({children})=>{
    const [isLoggedUid, setIsLoggedUid] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [genderData, setGenderData] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false) 

    const modalVisibility = (value)=>{
      setIsModalVisible(value)
    }
    const userLoggerUidHandler = (userUid)=>{
        setIsLoggedUid(userUid)
        AsyncStorage.setItem("UserLoggedUid", userUid)
    }

    const checkIsLogged = async () => {
        try {
          const value = await AsyncStorage.getItem('UserLoggedUid');
          if (value !== null) {
            setIsLoggedUid(value);
          } else {
            console.log("User Logged Uid Not Found in AsyncStorage");
          }
        } catch (error) {
          console.error("Error fetching UserLoggedUid:", error);
        }
    }

    const userLoggedOut = ()=>{
        setIsLoggedUid(null)
        AsyncStorage.removeItem('UserLoggedUid')
    }

    const getUserData = async()=>{
          
          try {
            if(isLoggedUid){
              const db = getFirestore(app);
              const userDoc = await getDoc(doc(db, 'users', isLoggedUid))
              if(userDoc.exists()){
                setUserData(userDoc.data())
              }else{
                console.log("No such Document");
              }
            }
          } catch (error) {
            console.log(error)
          }finally{
            setLoading(false)
          }
    }

    const genData = (data)=>{
      setGenderData(data)
    }
    return <AuthContext.Provider value={{isModalVisible,modalVisibility,loading,isLoggedUid,getUserData,userData, userLoggerUidHandler, checkIsLogged,userLoggedOut, genData, genderData}}>
        {children}
    </AuthContext.Provider>
}

export {AuthProvider,AuthContext}