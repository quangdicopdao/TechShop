// Import các thư viện và component cần thiết
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomNavigation, Text } from 'react-native-paper';
import {
  Home,
  Login,
  Signup,
  Details,
  Setting,
  Cart,
  CheckOut,
  Search,
  Love
} from '../screens'

// Tạo Stack Navigator
const Stack = createStackNavigator();

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home'},
    { key: 'love', title: 'Love', focusedIcon: 'heart'},
    { key: 'setting', title: 'Setting', focusedIcon: 'account-settings' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    love:Love,
    setting: Setting,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};


// Khai báo ứng dụng chính
const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
       initialRouteName='Login'
       screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={MyComponent} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Login" component={Login} sc/>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="Cart" component={Cart} options={{headerShown:true,title:'Giỏ hàng'}}/>
        <Stack.Screen name="CheckOut" component={CheckOut} options={{headerShown:true,title:'Thanh toán'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
