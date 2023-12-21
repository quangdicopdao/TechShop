import React from "react";
import { TouchableOpacity,Text,Image,View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import { primaryColor } from "../assets/color";
import { useNavigation } from "@react-navigation/native";

function SearchClick() {
    const navigation = useNavigation()
    return ( 
        <View
        style={{
            flexDirection: 'row',
            height: 70,
            backgroundColor: 'rgba(255,255,240,0.1)',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fff'
        }}
        >
           <TouchableOpacity onPress={()=>{navigation.goBack()}}
                style={{height:50,width:50,alignItems:'center',justifyContent: 'center',paddingLeft:10,paddingRight:10}}
           > 
                <Icon name='arrow-back' size={30} color={primaryColor}/>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    borderWidth:1,
                    borderColor:primaryColor,
                    height:40,
                    flexDirection:'row',
                    alignItems:'center',
                    borderRadius:10,
                    flex:1,
                    marginRight:10
                }}
                onPress={()=>{navigation.goBack()}}
            >
                <Text style={{flex:1,paddingLeft:10,color:'#ccc'}}>Tìm thứ bạn muốn</Text>
                <TouchableOpacity style={{backgroundColor:primaryColor, height:'100%' ,borderTopRightRadius:10,
            borderBottomRightRadius:10,
            alignItems:'center',
                     justifyContent:'center',paddingLeft:5
                    }}>
                    <Image source={require('../assets/test/searchicon.png')} 
                    style={{height: 35, width: 35,tintColor:'#fff',marginRight:5}}/>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
     );
}

export default SearchClick;