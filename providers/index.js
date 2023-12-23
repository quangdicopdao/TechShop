import { createContext, useContext, useReducer, useMemo } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

// import PropTypes from "prop-types";
// Create MyContext
const MyContext = createContext();
// Setting custom name for the context 
MyContext.displayName = "MyContextContext";
// React reducer
function reducer(state, action) {
  switch (action.type) {
    case "USER_LOGIN": {
      return { ...state, userLogin: action.value };
    }
    case "GOOGLE_LOGIN": {
      return { ...state, userLogin: action.value };
    }
    case "FACEBOOK_LOGIN": {
      return { ...state, userLogin: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
// React context provider
function MyContextControllerProvider({ children }) {
  const initialState = {
    userLogin: null,
  };
  const [controller, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}
//React custom hook for using context
function useMyContextController() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error(
      "useMyContextController should be used inside the MyContextControllerProvider."
    );
  }
  return context;
}
//fb login
async function onFacebookButtonPress(dispatch) {
  try {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    // Sign-in the user with the credential
    const userCredential = await auth().signInWithCredential(facebookCredential);

    // Lấy thông tin về người dùng từ UserCredential
    const user = userCredential.user;

    // In ra tên người dùng
    console.log('User name from Facebook:', user);
    dispatch({ type: 'FACEBOOK_LOGIN', value: user });

    return userCredential;
  } catch (error) {
    console.error('Facebook login error:', error);
    throw error;
  }
}


//gg login
  GoogleSignin.configure({
    webClientId: '680157239962-n3rf37r1gin887s43p35tv0mdv25gppl.apps.googleusercontent.com',
  });


  const onGoogleButtonPress = async (dispatch) => {
    try {
      // Kiểm tra xem thiết bị của bạn có hỗ trợ Google Play không
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  
      // Lấy ID token của người dùng
      const { idToken, user } = await GoogleSignin.signIn();
      console.log('Đăng nhập Google thành công! ID Token:', user);
  
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
      // Đăng nhập người dùng với credential
      await auth().signInWithCredential(googleCredential);
  
      // Dispatch action để cập nhật thông tin đăng nhập Google vào context
      dispatch({ type: 'GOOGLE_LOGIN', value: user });
  
      // Chuyển sang trang home và cập nhật thông tin vào userLogin
      // Thực hiện điều này dựa vào navigation hoặc cách bạn quản lý chuyển trang
      // Ví dụ: navigation.navigate('Home', { user });
  
      console.log('Đăng nhập Google thành công!');
    } catch (error) {
      console.error('Lỗi Đăng nhập Google:', error);
  
      // Kiểm tra xem đối tượng lỗi có thuộc tính 'user' không trước khi truy cập nó
      if (error.message && error.message.includes('user')) {
        // Giả sử thông báo lỗi chứa thông tin về người dùng
        console.log(`Đã xảy ra lỗi: ${error.message}`);
      }
    }
  }
  
const USERS = firestore().collection("users")
const login = (dispatch,email, password) =>{
  if(!email || !password) {
    alert('Vui lòng điền đủ thông tin đăng nhập')
  }
  else{

    auth().signInWithEmailAndPassword(email,password)
    .then(
      ()=>
        USERS.doc(email)
        .onSnapshot(u => {
          const value = u.data();
          console.log("Đăng Nhập Thành Công Với User : ", value);
          dispatch({type: "USER_LOGIN", value});
        })
    )
    .catch(e => alert("Sai thông tin đăng nhập. Vui lòng nhập lại!") )
  }
}

export {
  MyContextControllerProvider,
  useMyContextController,
  login,
onFacebookButtonPress,
  onGoogleButtonPress,
};