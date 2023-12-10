import React from "react";
import {View, StyleSheet,Image,Text, TouchableOpacity} from 'react-native'
import {Voucher,Tranfer} from '../components'
function ItemCheckOut({name,price,cate,quantity,shop,srcImg,fee}) {
    const numberWithCommas = (number) => {
        return number.toLocaleString('vi-VN'); // 'vi-VN' là mã ngôn ngữ của Tiếng Việt
    };
    return ( 
        <View style={styles.container}>
            {/* address */}
            <Text style={{color:'#000',fontSize:16,fontWeight:'bold'}}>{shop}</Text>
            <View>
                <View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#ccc'}}>
                    <Image source={{uri:srcImg}} style={styles.img}/>
                    <View style={{flex:1}}>
                        <Text style={styles.txt}>{name}</Text>
                        <Text style={styles.txt2}>Phân loại: {cate}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <Text style={styles.txt3}>đ {numberWithCommas(price)}</Text>
                            <Text style={styles.txt2}>x{quantity}</Text>
                        </View>
                    </View>
                </View>
                <Voucher/>
                <Tranfer price={price} quantity={quantity} fee={fee}/>
            </View>
        </View>
     );
}

const styles = StyleSheet.create({
    container:{
        marginLeft:10,
        marginRight:10
    },
    txt:{
        fontSize:16,
        color:'#000',
        marginBottom:10
    },
    txt2:{
        fontSize:14,
        marginBottom:10
    },
    txt3:{
        fontSize:18
    },
    img: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        alignSelf:'center'
    },
})
export default ItemCheckOut;