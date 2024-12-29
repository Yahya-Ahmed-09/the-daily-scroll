import { View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Login from './Login';
// import Home from './(tabs)';
import { AuthContext } from '@/context/AuthContext';
import Loader from '@/components/Loader';
import { useRouter } from 'expo-router';

const Main = () => {
  const { isLoggedUid, checkIsLogged } = useContext<any>(AuthContext); // Ensure AuthContext has proper typings
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initialize = async () => {
      try {
        await checkIsLogged();
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setIsLoading(false);
      }
    };
    initialize();
  }, [checkIsLogged]);
  useEffect(() => {
    if (!isLoading) {
      if (isLoggedUid) {
        router.push('/(tabs)/');
      } else {
        router.push('/Login');
      }
    }
  }, [isLoggedUid, isLoading, router]);

  if (isLoading) {
    return <Loader loader={true} />;
  }

  return <View style={{ flex: 1 }} />;
};

export default React.memo(Main)
