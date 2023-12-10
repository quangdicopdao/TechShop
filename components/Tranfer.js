import React from "react";
import {View, StyleSheet,Text, TouchableOpacity, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'; 

function Tranfer({price,quantity,fee}) {
    const numberWithCommas = (number) => {
        return number.toLocaleString('vi-VN'); // 'vi-VN' là mã ngôn ngữ của Tiếng Việt
    };
    return (
       <View>
             
    
         {/* tranfer */}
         <View 
             style={{
                 height:170,
                 borderBottomWidth:1,
                 marginLeft:10,
                 marginRight:10,
                 borderBottomColor:'#ccc'}}>
             <Text style={styles.title}>Phương thức vận chuyển (Nhấn để chọn)</Text>
             <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                 <View>
                     <Text style={{fontSize:16,padding:20}}>Nhanh</Text>
                     <Text style={{fontSize:16,padding:10}}>Nhận hàng vào 12Th12</Text>
                     <View style={{flexDirection:'row',alignItems:'center'}}>
                         <Icon name='check-circle' size={20} color='green'/>
                         <Text style={{fontSize:14,padding:10, color:'green'}}>Đã áp dụng miễn phí vận chuyển</Text>
                     </View>
                 </View>
                 <TouchableOpacity style={{flexDirection:'row'}}>    
                     <Text>đ {numberWithCommas(fee)}</Text>
                     <Icon name='keyboard-arrow-right' size={20} color='#ccc'/>
                 </TouchableOpacity>
             </View>
             
         </View>
             <View style={{
                 height:40,
                 borderBottomWidth:1,
                 borderColor:'#ccc',
                 flexDirection:'row',justifyContent:'space-between',marginLeft:10,marginRight:10,marginTop:20}}>
                 <Text>Tổng số tiền ̣({quantity} sản phẩm)</Text>
                 <Text style={{fontSize:20,fontWeight:'bold',color:'red'}}>đ{numberWithCommas(price)}</Text>
             </View>
       </View>
      );
}
const styles = StyleSheet.create({
    title:{
        fontSize:16,
        color:'#000',
        fontWeight:'bold'
    },
    txtAD:{
        marginLeft:30,
        fontSize:14,
        color:'#000',
    }
})
export default Tranfer;