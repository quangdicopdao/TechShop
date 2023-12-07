import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 

function Voucher() {
    const numberWithCommas = (number) => {
        return number.toLocaleString('vi-VN'); // 'vi-VN' là mã ngôn ngữ của Tiếng Việt
    };
    return ( 
        <TouchableOpacity style={{height:40}}>
            {/* voucher */}
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            <View style={{flexDirection:'row', alignItems:'center',}}>
                <Icon name="ticket-confirmation" size={30} color="black" />
    
                <Text style={{marginLeft:10}}>Voucher của shop</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center',}}>
                <Text>Chọn hoặc nhập mã 
                    <Icon name='arrow-right' size={20} color='#ccc'/>
                </Text>
            </View>
        </View>
        </TouchableOpacity>
     );
}

export default Voucher;