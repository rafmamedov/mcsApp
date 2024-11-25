import { useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  Keyboard,
  Platform,
  Pressable,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { colors } from "../../styles/global";


const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const SignupScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isConfirmVisible, setIsConfirmVisible] = useState(true);
  const [selectedInput, setSelelectedInput] = useState('password');

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Hello world!" })
  }, []);

  const handlePasswordChange = (value, isPassword) => {
    if (isPassword) {
      setPassword(value);
    } else {
      setPasswordConfirm(value)
    }
  };

  const showPassword = (isPassword) => {
    if (isPassword) {
      setIsPasswordVisible(prev => !prev);
    } else {
      setIsConfirmVisible(prev => !prev)
    }
  };

  const onSignUp = () => {
    console.log('Sign up!');
    // registerDB({ email, password })
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

              <Pressable onPress={() => setSelelectedInput('password')}>
                <Input
                  value={password}
                  placeholder="Пароль"
                  rightButton={showButton}
                  outerStyles={styles.passwordButton}
                  onTextChange={(value) => handlePasswordChange(value, true)}
                  secureTextEntry={isPasswordVisible}
                />
              </Pressable>

              <Pressable onPress={() => setSelelectedInput('confirm')}>
                <Input
                  value={passwordConfirm}
                  placeholder="Пароль ще раз"
                  rightButton={showButton}
                  outerStyles={styles.passwordButton}
                  onTextChange={(value) => handlePasswordChange(value, false)}
                  secureTextEntry={isConfirmVisible}
                />
              </Pressable>
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
