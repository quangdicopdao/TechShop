import React from "react";
import {View , StyleSheet, Image, Text,TouchableOpacity} from 'react-native'

function ProductHozi({srcImg, name, rate, price, onClick}) {
  
    return ( 
                <TouchableOpacity style={styles.container} onPress={onClick}>
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Image source={{uri:srcImg}} style={styles.img}/>
                            <Text style={styles.txtName}>{name}</Text>
                          <View style={styles.wrap}>
                                <Text style={styles.txtPrice}>đ{price}</Text>
                                <View style={{flexDirection:'row', marginLeft:30}}>
                                    <Image source={require('../assets/test/star.png')} style={{width:20,height:20}}/>
                                    <Text>{rate}</Text>
                                </View>
                          </View>
                        </View>
                        
                </TouchableOpacity>
               
     );
}
const styles = StyleSheet.create({
    container: {
        width:'47%',
        height:230,
        margin: 5,
        borderRadius: 5,
        overflow:'hidden',
        
    },
    img: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        alignSelf:'center'
    },
    contentContainer: {
        flex: 1,
        padding: 10,
    },
    txtName: {
        fontSize: 16,
        color: '#000',
    },
    wrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    txtPrice: {
        fontSize: 14,
        color: 'red',
    },
    txtSold: {
        fontSize: 12,
        color: '#000',
        marginLeft:20
    },
    // btnIcon:{
    //     position:'relative',
    //     top: 0
    // }
})
export default ProductHozi;