import React, { useState } from "react";
import {View, StyleSheet,Image,Text, TouchableOpacity,ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { primaryColor } from "../assets/color";
import { Divider } from "react-native-paper";
import { firebase } from '@react-native-firebase/auth'
import { useNavigation } from "@react-navigation/native";
import { useMyContextController } from '../providers'
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import {launchImageLibrary,launchCamera} from 'react-native-image-picker'
import { PermissionsAndroid } from 'react-native';
import { FieldPath } from '@firebase/firestore';
function Setting() {
    const [{ userLogin }] = useMyContextController();
    const { name,imageUrl,email,photo } = userLogin;
    
    const navigation = useNavigation()
    const [img, setImg] = useState('')
    // cap quyen camera
    const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Camera permission given");
            const result = await launchImageLibrary({mediaType:'photo',cameraType:'back'})
            setImg(result.assets[0].uri);
            updateImageUrl(result.assets[0].uri)
          } else {
            console.log("Camera permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      };
      const updateImageUrl = async ( newImageUrl) => {
        try {
          // Reference đến collection 'users' và document có id là userId
          const userRef = firestore().collection('users').doc(email);
      
          // Sử dụng hàm update để cập nhật trường 'imageUrl'
          await userRef.update({
            imageUrl: newImageUrl,
          });
      
          console.log('Cập nhật thành công!');
        } catch (error) {
          console.error('Lỗi khi cập nhật imageUrl:', error);
        }
      };
      
      

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



    return ( 
        <ScrollView style={{flex:1,backgroundColor:'#fff'}}>
            <View style={{backgroundColor:primaryColor}}>
                
                {/* image */}
    
                <View style={{ alignItems:'center',height:300,paddingTop:20}}>
                    {photo ?
                     (
                      <Image
    source={{ uri: photo }}
    style={{
      height: 150,
      width: 150,
      borderRadius: 100,
      borderWidth: 5,
      borderColor: '#ccc'
    }}
  />
                     ):
                    imageUrl ? (
  <Image
    source={{ uri: imageUrl }}
    style={{
      height: 150,
      width: 150,
      borderRadius: 100,
      borderWidth: 5,
      borderColor: '#ccc'
    }}
  />
) : img ? (
  <Image
    source={{ uri: img }}
    style={{
      height: 150,
      width: 150,
      borderRadius: 100,
      borderWidth: 5,
      borderColor: '#ccc'
    }}
  />
) : (
  <Image
    source={require('../assets/test/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA2L3Y5MzctYWV3LTE2NS5qcGc.png')}
    style={{
      height: 150,
      width: 150,
      borderRadius: 100,
      borderWidth: 5,
      borderColor: '#ccc'
    }}
  />
)}
                    
                    {photo ? (<></>):
                    (
                    <TouchableOpacity 
                    onPress={requestCameraPermission}
                    style={{
                        position:'relative',
                        top:-15
                    }}>
                        <Icon name='camera' size={30} color='#fff'/>
                    </TouchableOpacity>
                    )}
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>{name}</Text>
                           <View style={{flexDirection:'row'}}>
                                <TouchableOpacity onPress={()=>{navigation.navigate('MySelf')}}
                                style={{marginTop:10,backgroundColor:'rgba(4, 0, 0, 0.2)',padding:10,borderRadius:10,marginRight:5}}>
                                    <Text style={{fontSize:16,color:'#fff'}}>Chỉnh sửa thông tin</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>navigation.navigate('Cart')}
                                style={{marginTop:10,backgroundColor:'rgba(4, 0, 0, 0.2)',padding:10,borderRadius:10}}>
                                    <Text style={{fontSize:16,color:'#fff'}}>Giỏ hàng</Text>
                                </TouchableOpacity>
                           </View>
                            
                    </View>
                </View>
            </View>
            {/* dif */}
            <View>
                {/* history */}
                <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between', height:60,borderBottomWidth:1,borderColor:'#ccc'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Icon name='border-color' size={25} color='#000'/>
                        <Text style={{marginLeft:5, fontSize:20,fontWeight:'bold',color:'#000'}}>Đơn mua</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text>Xem lịch sử mua hàng</Text>
                        <Icon name='arrow-right' size={25}/>
                    </View>
                </TouchableOpacity>
                {/* btn */}
                <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:10,marginRight:10,paddingTop:10,paddingBottom:10}}>
                    <TouchableOpacity >
                        <Icon name='wallet' size={35} color='#000' style={{alignSelf:'center'}}/>
                        <Text style={{fontSize:14,alignSelf:'center',color:'#000'}}>Chờ xác nhận</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Icon name='inbox-multiple' size={35} color='#000' style={{alignSelf:'center'}}/>
                        <Text style={{fontSize:14,alignSelf:'center',color:'#000'}}>Chờ lấy hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Icon name='truck' size={35} color='#000' style={{alignSelf:'center'}}/>
                        <Text style={{fontSize:14,alignSelf:'center',color:'#000'}}>Chờ giao hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Icon name='star-circle' size={35} color='#000' style={{alignSelf:'center'}}/>
                        <Text style={{fontSize:14,alignSelf:'center',color:'#000'}}>Đánh giá</Text>
                    </TouchableOpacity>
                </View>
                <Divider/>
                {/* page */}
                <View>
                    
                    {/* LOG OUT */}
                        <TouchableOpacity 
                        style={{backgroundColor:primaryColor,marginLeft:10,marginRight:10,borderRadius:10, marginTop:10,
                        paddingTop:10,
                        paddingBottom:10,
                        justifyContent:'center',
                        alignItems:'center'}}
                        onPress={handleLogout}>
                            <Text style={{fontSize:18, color:'#fff'}}>Đăng xuất</Text>
                        </TouchableOpacity>
                    
                </View>
            </View>
        </ScrollView>
     );
}

export default Setting;