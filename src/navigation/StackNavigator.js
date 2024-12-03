import { createStackNavigator } from "@react-navigation/stack"
import { useSelector } from "react-redux";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const user = useSelector((state) => state.user.userInfo);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
        />
      ) : (
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