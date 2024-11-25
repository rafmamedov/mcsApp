import { createStackNavigator } from "@react-navigation/stack"

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const isLoggedIn = true;

  return (
    <Stack.Navigator
      // initialRouteName=""
      screenOptions={{
        headerShown: false,
      }}
    >
      {isLoggedIn ? (
        // Якщо користувач залогінений, показуємо головний екран
        <Stack.Screen name="Home" component={BottomTabNavigator} />
      ) : (
        // Якщо користувач не залогінений, показуємо екрани Login та Signup
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;