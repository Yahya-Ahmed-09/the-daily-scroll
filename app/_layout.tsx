import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import "../global.css";
import { Poppins_400Regular as poppinsRegular, Poppins_700Bold as poppinsBold, Poppins_600SemiBold_Italic as poppinsSemiBoldItalic } from '@expo-google-fonts/poppins'
import { Inter_500Medium as interMedium } from '@expo-google-fonts/inter'
import {SpaceGrotesk_700Bold as spaceBold, SpaceGrotesk_500Medium as spaceMedium} from '@expo-google-fonts/space-grotesk'
import * as SplashScreen from 'expo-splash-screen';
import { useContext, useEffect } from "react";
import { AuthProvider } from '@/context/AuthContext'
import { ApiProvider } from "@/context/ApiContext"

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    poppinsRegular,
    poppinsBold,
    interMedium,
    poppinsSemiBoldItalic,
    spaceBold,
    spaceMedium
  })
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
    
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <AuthProvider>
      <ApiProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="index" />
          <Stack.Screen name="Login" />
          <Stack.Screen name="SignUp" />
        </Stack>
      </ApiProvider>
    </AuthProvider>
  )
}
