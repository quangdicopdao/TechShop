import React, {useState} from  "react";
import {View, StyleSheet, ScrollView,Text, TouchableOpacity} from 'react-native'
import { ItemCart } from "../components";
import { Button, Checkbox } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";

function Cart() {
    const navigation = useNavigation()
    const [checkedAll, setCheckedAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState([false, false, false, false, false]); // Số phần tử trong mảng phụ thuộc vào số lượng sản phẩm
    //format số
    const numberWithCommas = (number) => {
        return number.toLocaleString('vi-VN'); // 'vi-VN' là mã ngôn ngữ của Tiếng Việt
    };
    const toggleCheckAll = () => {
        setCheckedAll(!checkedAll);
        setCheckedItems(Array(5).fill(!checkedAll)); // Chỉnh sửa số 5 nếu có số lượng sản phẩm khác
      };
    //hàm check hết
      const toggleCheckItem = (index) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = !updatedCheckedItems[index];
        setCheckedItems(updatedCheckedItems);
        setCheckedAll(updatedCheckedItems.every(item => item));
      };
      const totalAmount = checkedItems.reduce((total, isChecked, index) => {
        return total + (isChecked ? 15000000 : 0); // Thay đổi số tiền tương ứng với sản phẩm
      }, 0);
    return (
        <View style={{flex:1,backgroundColor:'rgba(211,211,211,0.2)',
    }}>
            <ScrollView contentContainerStyle={styles.container}>
            {checkedItems.map((isChecked, index) => (
                <ItemCart
                    key={index}
                    namePro={`Msi morden 151 #${index + 1}`}
                    nameShop='TechShop'
                    category='màu đen'
                    price={15000000}
                    srcImg={require('../assets/test/msi.png')}
                    isChecked={isChecked}
                    onToggleCheck={() => toggleCheckItem(index)}
                />
            ))}

            </ScrollView>

            <View style={styles.wrapCheckOut}>
                <View style={styles.wraptxt}>
                   <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Checkbox
                        status={checkedAll ? 'checked' : 'unchecked'}
                         onPress={() => {
                          toggleCheckAll()
                            
                        }}
                        />
                        <Text style={{fontSize:16}}>Chọn tất cả</Text>
                   </View>
                    <Text style={{fontSize:16}} >Tổng tiền:
                        <Text style={{color:'red',fontSize:16}}>đ{numberWithCommas(totalAmount)}</Text> 
                    </Text>
                </View>
                <TouchableOpacity style={styles.wrapBtn} onPress={()=>{navigation.navigate('CheckOut')}}>
                    <Text style={{color:'#fff',fontSize:16}}>Mua hàng</Text>
                </TouchableOpacity>
            </View>
        </View>
      );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(0, 0, 0, 0.1)'
    },
    wraptxt:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:80,
        borderWidth:1,
        borderColor:'#ccc',
    },
    wrapBtn:{
        backgroundColor:'red',
        paddingLeft:20,
        paddingRight:20,
        justifyContent:'center',
    },
    wrapCheckOut:{
        flexDirection:'row',
        backgroundColor:'#fff'
    }
})
export default Cart;