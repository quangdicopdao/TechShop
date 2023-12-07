import React from "react";
import {View, StyleSheet,Image,Text, TouchableOpacity,ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { primaryColor } from "../assets/color";
import { Divider } from "react-native-paper";

function Setting() {
    return ( 
        <ScrollView style={{flex:1,backgroundColor:'#fff'}}>
            {/* image */}
            <View style={{flexDirection:'row', alignItems:'center',height:200,backgroundColor:primaryColor}}>
                <Image source={require('../assets/user.png')} style={{height:100,width:100,tintColor:'#fff'}}/>
                <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',paddingLeft:20}}>Đặng Việt Quang</Text>
            </View>
            {/* dif */}
            <View>
                {/* history */}
                <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between', height:60,borderBottomWidth:1,borderColor:'#ccc'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Icon name='note-alt' size={30} color='#000'/>
                        <Text style={{marginLeft:5, fontSize:20,fontWeight:'bold',color:'#000'}}>Đơn mua</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text>Xem lịch sử mua hàng</Text>
                        <Icon name='keyboard-arrow-right' size={30}/>
                    </View>
                </TouchableOpacity>
                {/* btn */}
                <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:10,marginRight:10,paddingTop:10,paddingBottom:10}}>
                    <TouchableOpacity >
                        <Icon name='wallet' size={40} color='#000' style={{alignSelf:'center'}}/>
                        <Text style={{fontSize:14,alignSelf:'center',color:'#000'}}>Chờ xác nhận</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Icon name='all-inbox' size={40} color='#000' style={{alignSelf:'center'}}/>
                        <Text style={{fontSize:14,alignSelf:'center',color:'#000'}}>Chờ lấy hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Icon name='fire-truck' size={40} color='#000' style={{alignSelf:'center'}}/>
                        <Text style={{fontSize:14,alignSelf:'center',color:'#000'}}>Chờ giao hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Icon name='stars' size={40} color='#000' style={{alignSelf:'center'}}/>
                        <Text style={{fontSize:14,alignSelf:'center',color:'#000'}}>Đánh giá</Text>
                    </TouchableOpacity>
                </View>
                <Divider/>
                {/* page */}
                <View>
                    <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10,paddingBottom:10}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Icon name='shopping-bag' size={30} color={primaryColor}/>
                            <Text style={{marginLeft:10,fontSize:16}}>Bắt đầu bán</Text>
                        </View>
                            <Icon name='keyboard-arrow-right' size={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10,paddingBottom:10}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Icon name='shopping-bag' size={30} color={primaryColor}/>
                            <Text style={{marginLeft:10,fontSize:16}}>Bắt đầu bán</Text>
                        </View>
                            <Icon name='keyboard-arrow-right' size={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10,paddingBottom:10}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Icon name='shopping-bag' size={30} color={primaryColor}/>
                            <Text style={{marginLeft:10,fontSize:16}}>Bắt đầu bán</Text>
                        </View>
                            <Icon name='keyboard-arrow-right' size={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10,paddingBottom:10}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Icon name='shopping-bag' size={30} color={primaryColor}/>
                            <Text style={{marginLeft:10,fontSize:16}}>Bắt đầu bán</Text>
                        </View>
                            <Icon name='keyboard-arrow-right' size={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10,paddingBottom:10}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Icon name='shopping-bag' size={30} color={primaryColor}/>
                            <Text style={{marginLeft:10,fontSize:16}}>Bắt đầu bán</Text>
                        </View>
                            <Icon name='keyboard-arrow-right' size={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10,paddingBottom:10}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Icon name='shopping-bag' size={30} color={primaryColor}/>
                            <Text style={{marginLeft:10,fontSize:16}}>Bắt đầu bán</Text>
                        </View>
                            <Icon name='keyboard-arrow-right' size={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10,paddingBottom:10}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Icon name='shopping-bag' size={30} color={primaryColor}/>
                            <Text style={{marginLeft:10,fontSize:16}}>Bắt đầu bán</Text>
                        </View>
                            <Icon name='keyboard-arrow-right' size={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10,paddingBottom:10}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Icon name='shopping-bag' size={30} color={primaryColor}/>
                            <Text style={{marginLeft:10,fontSize:16}}>Bắt đầu bán</Text>
                        </View>
                            <Icon name='keyboard-arrow-right' size={30}/>
                    </TouchableOpacity>

                    {/* LOG OUT */}
                    <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10,paddingBottom:10}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Icon name='shopping-bag' size={30} color={primaryColor}/>
                            <Text style={{marginLeft:10,fontSize:16}}>Đăng xuất</Text>
                        </View>
                            <Icon name='keyboard-arrow-right' size={30}/>
                    </TouchableOpacity>
                    <Divider/>
                    
                </View>
            </View>
        </ScrollView>
     );
}

export default Setting;