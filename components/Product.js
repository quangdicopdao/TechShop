import React from "react";
import {View , StyleSheet, Image, Text,TouchableOpacity} from 'react-native'
import { textColor, whiteColor } from "../assets/color";

function Product({srcImg, name, rate, price, onClick,sold}) {
  
    return ( 
                <TouchableOpacity style={styles.container} onPress={onClick}>
                       <Image source={{uri:srcImg}} style={styles.img}/>
                       <View style={{}}>
                           <Text style={{fontSize:18,color:textColor,fontWeight:'600',paddingBottom:10}}>{name}</Text>
                           <Text style={{fontSize:16, color:'red',paddingBottom:10}}>đ{price}</Text>
                            <Text style={{fontSize:14,color:textColor}}>Đã bán:{sold}</Text>
                       </View>
                </TouchableOpacity>
               
     );
}
const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems : 'center',
        height:170,
        width:400,
        backgroundColor:whiteColor,
        marginRight:20,
        borderRadius:10,
        shadowOffset:{width:10,height:10},
        shadowOpacity:0.5,
        shadowRadius:5,
        elevation:2
    },
   img:{
    width:150,
    height:150,
    marginLeft:10,
    marginRight:10
   }
})
export default Product;