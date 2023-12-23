import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { useMyContextController, login,onGoogleButtonPress,onFacebookButtonPress } from "../providers";
import { TouchableOpacity } from "react-native-gesture-handler";
import { primaryColor } from "../assets/color";
import auth from '@react-native-firebase/auth';

function Login() {
  const navigation = useNavigation();
  const [show, setShow] = useState(true);
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;
  
  // async function onFacebookButtonPress() {
  //   try {
  //     // Đăng nhập với Facebook và lấy kết quả
  //     const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
  //     // Kiểm tra nếu người dùng hủy đăng nhập
  //     if (result.isCancelled) {
  //       throw new Error('User cancelled the login process');
  //     }
  
  //     // Lấy thông tin Access Token
  //     const data = await AccessToken.getCurrentAccessToken();
  
  //     // Kiểm tra nếu không có Access Token
  //     if (!data) {
  //       throw new Error('Something went wrong obtaining access token');
  //     }
  
  //     // Lấy Facebook Credential từ Access Token
  //     const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  
  //     // Kiểm tra xem có người dùng hiện tại hay không
  //     const currentUser = auth().currentUser;
  
  //     if (currentUser) {
  //       // Nếu có người dùng hiện tại, kiểm tra xem họ đã liên kết với Facebook chưa
  //       const linkedProviders = await currentUser.providerData.map((provider) => provider.providerId);
  
  //       if (linkedProviders.includes('facebook.com')) {
  //         console.log('User is already linked with Facebook');
  //       } else {
  //         // Nếu chưa liên kết, thực hiện liên kết với Facebook
  //         await currentUser.linkWithCredential(facebookCredential);
  //       }
  
      
  //       navigation.navigate('Home');
  //     } else {
  //       // Nếu không có người dùng hiện tại, đăng nhập với Facebook Credential
  //       await auth().signInWithCredential(facebookCredential);
  //     }
  //   } catch (error) {
  //     console.error('Facebook login error:', error);
  //     // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
  //     // Ví dụ: alert('Đã xảy ra lỗi khi đăng nhập bằng Facebook');
  //   }
  // }
  
  
  
  

  useEffect(() => {
    if (userLogin !== null) {
      navigation.navigate("Home");
    }
  }, [userLogin]);

  const handleGGLogin = () => {
    onGoogleButtonPress(dispatch)
  }
  const handleFBLogin = () => {
    onFacebookButtonPress(dispatch)
  }
  const handleLogin = (values) => {
    const { email, password } = values;
    login(dispatch, email, password);
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/Tech.png")} style={styles.img} />
      <Text style={styles.title}>Welcome back</Text>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => handleLogin(values)}
      >
        {({ handleBlur, handleChange, handleSubmit, values, touched, errors }) => (
          <View>
            <TextInput
              mode="outlined"
              label="Email"
              placeholder="Enter your email address"
              value={values.email}
              onBlur={handleBlur("email")}
              onChangeText={handleChange("email")}
              style={styles.txtInput}
            />
            {touched.email && errors.email && <Text style={{ color: "red" }}>{errors.email}</Text>}

            <TextInput
              mode="outlined"
              label="Password"
              placeholder="Enter your password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              style={styles.txtInput}
              secureTextEntry={show}
              right={<TextInput.Icon icon="eye" onPress={() => setShow(!show)} />}
            />
            {touched.password && errors.password && <Text style={{ color: "red" }}>{errors.password}</Text>}

            <TouchableOpacity onPress={() => navigation.navigate("SendPass")}>
              <Text style={styles.txtLink}>Quên mật khẩu?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
              <Text style={styles.txtBtn}>Đăng nhập</Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 20, color: "#000", alignSelf: "center", marginBottom: 20 }}>Hoặc</Text>

            <View style={styles.wrapBtn}>
              <TouchableOpacity 
              onPress={handleGGLogin}
              style={styles.btnSocial}>
                <Image source={require("../assets/test/gg-removebg-preview.png")} style={styles.imgBtn} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSocial}  onPress={handleFBLogin}
>
                <Image source={require("../assets/test/fb-removebg-preview.png")} style={styles.imgBtn} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSocial}>
                <Image source={require("../assets/test/twitte-removebg-preview.png")} style={styles.imgBtn} />
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
              <Text style={styles.txt}>Chưa có tài khoản? </Text>
              <Button>
                <Text style={styles.txtLink} onPress={() => navigation.navigate("Signup")}>
                  Đăng ký ngay
                </Text>
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  img: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
    marginBottom: 20,
  },
  txt: {
    fontSize: 20,
    color: "#000",
  },
  txtInput: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: "#fff",
  },
  txtLink: {
    fontSize: 20,
    color: "#27A2F0",
    alignSelf: "flex-end",
    marginRight: 10,
    marginTop: 10,
    marginBottom: 30,
  },
  btn: {
    height: 50,
    borderRadius: 10,
    backgroundColor: primaryColor,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  txtBtn: {
    fontSize: 20,
    color: "#fff",
  },
  wrapBtn: {
    flexDirection: "row",
    justifyContent: "center",
  },
  btnSocial: {
    height: 80,
    width: 80,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 1,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  imgBtn: {
    height: 50,
    width: 50,
  },

  txtBtn: {
    fontSize: 20,
    color: "#fff",
  },
});

export default Login;
