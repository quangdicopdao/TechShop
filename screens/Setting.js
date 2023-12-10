import React from "react";
import {View, StyleSheet,Image,Text, TouchableOpacity,ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { primaryColor } from "../assets/color";
import { Divider } from "react-native-paper";
import { firebase } from '@react-native-firebase/auth'
import { useNavigation } from "@react-navigation/native";
import { useMyContextController } from '../providers'
import auth from "@react-native-firebase/auth";

function Setting() {
    const [{ userLogin }] = useMyContextController();
    const navigation = useNavigation()


    if (!userLogin) {
        return <Text>Người dùng chưa đăng nhập</Text>;
      }
      const handleLogout = async () => {
        try {
          // Kiểm tra xem có người dùng đang đăng nhập không
          const currentUser = auth().currentUser;
          if (currentUser) {
            await auth().signOut();
            // Thực hiện các hành động cần thiết sau khi đăng xuất
            navigation.navigate('Login'); // Điều hướng đến trang đăng nhập sau khi đăng xuất
          } else {
            console.warn('Không có người dùng đang đăng nhập.');
          }
        } catch (error) {
          console.error('Đăng xuất thất bại:', error.message);
        }
      };
      const { email } = userLogin;
    return ( 
        <ScrollView style={{flex:1,backgroundColor:'#fff'}}>
            {/* image */}
            <View style={{flexDirection:'row', alignItems:'center',height:200,backgroundColor:primaryColor}}>
                <Image source={require('../assets/user.png')} style={{height:100,width:100,tintColor:'#fff'}}/>
                <View style={{width:300}}>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>{email}</Text>
                    <TouchableOpacity style={{marginTop:10,backgroundColor:'rgba(4, 0, 0, 0.2)',padding:10,borderRadius:20,width:160}}>
                        <Text style={{fontSize:16,color:'#fff'}}>Chỉnh sửa thông tin</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* dif */}
            <View>
                {/* history */}
                <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between', height:60,borderBottomWidth:1,borderColor:'#ccc'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Icon name='note-alt' size={25} color='#000'/>
                        <Text style={{marginLeft:5, fontSize:20,fontWeight:'bold',color:'#000'}}>Đơn mua</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text>Xem lịch sử mua hàng</Text>
                        <Icon name='keyboard-arrow-right' size={25}/>
                    </View>
                </TouchableOpacity>
                {/* btn */}
                <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:10,marginRight:10,paddingTop:10,paddingBottom:10}}>
                    <TouchableOpacity >
                        <Icon name='wallet' size={35} color='#000' style={{alignSelf:'center'}}/>
                        <Text style={{fontSize:14,alignSelf:'center',color:'#000'}}>Chờ xác nhận</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Icon name='all-inbox' size={35} color='#000' style={{alignSelf:'center'}}/>
                        <Text style={{fontSize:14,alignSelf:'center',color:'#000'}}>Chờ lấy hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Icon name='fire-truck' size={35} color='#000' style={{alignSelf:'center'}}/>
                        <Text style={{fontSize:14,alignSelf:'center',color:'#000'}}>Chờ giao hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Icon name='stars' size={35} color='#000' style={{alignSelf:'center'}}/>
                        <Text style={{fontSize:14,alignSelf:'center',color:'#000'}}>Đánh giá</Text>
                    </TouchableOpacity>
                </View>
                <Divider/>
                {/* page */}
                <View>
                    <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10,paddingBottom:10}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Icon name='shopping-bag' size={25} color={primaryColor}/>
                            <Text style={{marginLeft:10,fontSize:16}}>Bắt đầu bán</Text>
                        </View>
                            <Icon name='keyboard-arrow-right' size={25}/>
                    </TouchableOpacity>
                    <Divider/>
                    {/* LOG OUT */}
                    <TouchableOpacity 
                    style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10,paddingBottom:10}}
                    onPress={handleLogout}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Icon name='arrow-circle-left' size={25} color={primaryColor}/>
                            <Text style={{marginLeft:10,fontSize:16}}>Đăng xuất</Text>
                        </View>
                            <Icon name='keyboard-arrow-right' size={25}/>
                    </TouchableOpacity>
                    <Divider/>
                    
                </View>
            </View>
        </ScrollView>
     );
}

export default Setting;