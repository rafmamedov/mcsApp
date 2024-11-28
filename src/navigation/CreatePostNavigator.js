import { createStackNavigator } from "@react-navigation/stack"

import BackButton from "../components/BackButton";
import CreatePostScreen from "../screens/CreatePostScreen";
import CameraScreen from "../screens/CameraScreen";

const Stack = createStackNavigator();

const CreatePostNavigator = () => {

  return (
    <Stack.Navigator
      initialRouteName="CreatePost"
      screenOptions={({ navigation }) => ({
        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerLeft: () => (
          <BackButton
            onPress={() => navigation.goBack()}
          />
        ),
      })}
    >
      <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Navigator>
  );
};

export default CreatePostNavigator;