import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import AuthNavigator from './src/navigation/AuthNavigator';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

export default function App() {
  
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  });

  const isLoggedIn = true;

  if (!fontsLoaded) {
    return (
      <View style={style.section}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <BottomTabNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

const style = StyleSheet.create({
  section: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
})
