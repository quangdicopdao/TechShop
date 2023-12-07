import React from "react";
import {View, StyleSheet,Image,Text, TouchableOpacity} from 'react-native'
import {Voucher,Tranfer} from '../components'
function ItemCheckOut() {
    const numberWithCommas = (number) => {
        return number.toLocaleString('vi-VN'); // 'vi-VN' là mã ngôn ngữ của Tiếng Việt
    };
    return ( 
        <View style={styles.container}>
            {/* address */}
            <Text style={{color:'#000',fontSize:16,fontWeight:'bold'}}>TechShop</Text>
            <View>
                <View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#ccc'}}>
                    <Image source={require('../assets/test/msi.png')}/>
                    <View style={{flex:1}}>
                        <Text style={styles.txt}>MSI morden 15</Text>
                        <Text style={styles.txt2}>Phân loại: đen</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <Text style={styles.txt3}>đ {numberWithCommas(200000000)}</Text>
                            <Text style={styles.txt2}>x1</Text>
                        </View>
                    </View>
                </View>
                <Voucher/>
                <Tranfer/>
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
    }
})
export default ItemCheckOut;