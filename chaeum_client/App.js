import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { loadFonts } from './utils/loadFonts';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TimerProvider } from './contexts/TimerContext';
import './firebase';

import LoginScreen from './screens/LoginScreen';
import NameScreen from './screens/NameScreen';
import ProfileImageScreen from './screens/ProfileImageScreen';
import HomeScreen from './screens/HomeScreen';
import TimerScreen from './screens/TimerScreen';
import GroupScreen from './screens/GroupScreen';

const Stack = createStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  // 폰트 설정 스플래시 화면
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) return null;

  return (
    <TimerProvider>
      <NavigationContainer>
        {/* initialRouteName에 자신이 테스트할 페이지 넣기 */}
        <Stack.Navigator initialRouteName="Group" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Name" component={NameScreen} />
          <Stack.Screen name="ProfileImage" component={ProfileImageScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Timer" component={TimerScreen} />
          <Stack.Screen name="Group" component={GroupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TimerProvider>
  );
}
