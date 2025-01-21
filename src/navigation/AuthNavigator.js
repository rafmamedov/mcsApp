import { createStackNavigator } from "@react-navigation/stack"

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import LogoutButton from "../components/LogoutButton";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "First Screen",
          headerRightContainerStyle: { paddingRight: 8 },
          headerRight: () => (
            <LogoutButton />
          ),
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          title: "Second Screen"
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;