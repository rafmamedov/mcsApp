import { useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  Keyboard,
  Platform,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { colors } from "../../styles/global";
import { registerDB } from "../utils/auth";


const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const SignupScreen = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleNameChange = (value) => {
    setName(value);
  };

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Hello world!" })
  }, []);

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const showPassword = (isPassword) => {
    setIsPasswordVisible(prev => !prev);
  };

  const validate = () => {
    if (email.length < 1 && password.length < 1 && name.length < 1) return false

    return true;
  }

  const onSignUp = () => {
    console.log('Sign up!');
    const isValid = validate();

    if (isValid) {
      registerDB(email, password, name);
    } else {
      Alert.alert('Помилка!', 'Заповніть всі поля!', [
        { text: 'Зрозуміло!', onPress: () => {}},
      ])
    }
  };
  
  const showButton = (
    <TouchableOpacity
      onPress={() => showPassword(selectedInput)}
    >
      <Text style={[styles.baseText, styles.passwordButtonText]}>
        Показати
      </Text>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <>
        <Image
          source={require("../../assets/background.png")}
          resizeMode="cover"
          style={styles.image}
        />

        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == "ios" ? 'padding' : 'height'}
        >
          <View
            style={styles.formContainer}
          >
            <Text style={styles.title}>Увійти</Text>

            <View style={[styles.innerContainer, styles.inputContainer]}>
              <Input
                value={email}
                autofocus={true}
                placeholder="Адреса електронної пошти"
                onTextChange={handleEmailChange}
              />

              <Input
                value={name}
                placeholder="Ім'я"
                onTextChange={handleNameChange}
              />

              <Input
                value={password}
                placeholder="Пароль"
                rightButton={showButton}
                outerStyles={styles.passwordButton}
                onTextChange={handlePasswordChange}
                secureTextEntry={isPasswordVisible}
              />
            </View>

            <View style={[styles.innerContainer, styles.buttonContainer]}>
              <Button onPress={onSignUp}>
                <Text style={[styles.baseText, styles.loginButtonText]}>
                  Реєстрація
                </Text>
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </>
    </TouchableWithoutFeedback>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  innerContainer: {
    gap: 16,
  },
  inputContainer: {
    marginTop: 32,
  },
  buttonContainer: {
    marginTop: 42,
  },
  image: {
    position: "absolute",
    top: 0,
    bottom: 0,
    height: "100%",
    width: "100%"
  },
  formContainer: {
    width: SCREEN_WIDTH,
    height: "70%",
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 36,
    textAlign: "center",
  },
  baseText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
  },
  loginButtonText: {
    color: colors.white,
    textAlign: "center",
  },
  passwordButtonText: {
    color: colors.blue,
  },
  passwordButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpText: {
    textDecorationLine: "underline",
  }
});
