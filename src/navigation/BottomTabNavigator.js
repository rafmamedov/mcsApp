import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from '@expo/vector-icons/Ionicons'

import { colors } from "../../styles/global";

import MapScreen from "../screens/MapScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LogoutButton from "../components/LogoutButton";
import BackButton from "../components/BackButton";
import CreatePostNavigator from "./CreatePostNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={({ navigation }) => ({
        tabBarLabel: "",
        tabBarStyle: {
          display: "flex",
        },
        tabBarItemStyle: {
          paddingTop: 12,
        }
      })}
    >
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={({ navigation }) => ({
          title: "Map",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="map"
              size={32}
              color={focused ? colors.orange : "black"}
            />
          ),
        })}
      />

      <Tab.Screen
        name="CreatePostStack"
        component={CreatePostNavigator}
        options={({ navigation }) => ({
          title: "Create Post",
          headerShown: false,
          tabBarStyle: { display: "none" },
          headerLeft: () => (
            <BackButton
              onPress={() => navigation.goBack()}
            />
          ),
          tabBarIcon: ({ focused }) => (
            <View style={styles.addButton}>
              <Ionicons
                size={32}
                name="add"
                color={colors.white}
              />
            </View>
          ),
        })}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: "Profile",
          headerRight: () => (
            <LogoutButton
              onPress={() => console.log('log out')}
            />
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              size={32}
              color={focused ? colors.orange : "black"}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  addButton: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.orange,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BottomTabNavigator;
