import React from "react";
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native'
import { Button, Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 

function ItemCart({namePro,nameShop, price, category,srcImg, onClick,isChecked, onToggleCheck}) {
    const [checked, setChecked] = React.useState(false);
    const [quantity, setQuantity] = React.useState(1)
    const [totalPrice, setTotalPrice] = React.useState(price);

    const numberWithCommas = (number) => {
        return number.toLocaleString('vi-VN'); // 'vi-VN' là mã ngôn ngữ của Tiếng Việt
    };
    const updateTotalPrice = (newQuantity) => {
        setQuantity(newQuantity);
        setTotalPrice(price * newQuantity);
    };
    return (
        <View style={styles.container}>
            <View style={styles.wrapHeader}>
                <Checkbox
                status={isChecked ? 'checked' : 'unchecked'}
                 onPress={() => {
                    onToggleCheck()
                }}
                />
                <Text style={styles.txtName}>{nameShop}</Text>
            </View>
            <View style={styles.wrapProduct}>
                <Checkbox
                status={isChecked ? 'checked' : 'unchecked'}
                 onPress={() => {
                   onToggleCheck()
                }}
                />
                <Image source={srcImg}/>
                <View>
                    <Text style={styles.name}>{namePro}</Text>
                    <Text style={styles.cate}>{category}</Text>
                    <Text style={styles.price}>{numberWithCommas(totalPrice)}</Text>

                    <View style={styles.wrapBtn}>
                        <TouchableOpacity  style={styles.btnMP} onPress={()=> {
                            if(quantity>1){

                                setQuantity(quantity-1)
                                updateTotalPrice(quantity-1)
                            }
                        }}>
                            <Icon name='minus'size={20} color="#000" style={styles.icon}/>
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{quantity}</Text>
                        <TouchableOpacity  style={styles.btnMP} onPress={()=> {
                            setQuantity(quantity+1)
                            updateTotalPrice(quantity+1)
                            }}>
                            <Icon name='plus'size={20} color="#000" style={styles.icon}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
      );
}
const styles = StyleSheet.create({
    container:{
        marginTop:10,
        backgroundColor:'#fff'
    },
    wrapHeader:{
        flexDirection:'row'
    },
    txtName:{
        fontSize:20,
        fontWeight:'bold',
        color:'#000',
        alignSelf:'center'
    },
    name:{
        fontSize:20,
        marginBottom:5,
        color:"#000",
    },
    price:{
        fontSize:20,
        marginBottom:5,
        color:'red',
    },
    cate:{
        marginBottom:5

    },
    quantity:{
        fontSize:20,
        color:"#000",
        marginLeft:5,
        marginRight:5
    },
    wrapProduct:{
        flexDirection:'row',
        height:160,
        alignItems:'center',
    },
    wrapBtn:{
        flexDirection:'row'
    },
    btnMP:{
        height:30,
        width:30,
        borderWidth:1,
        borderColor:'#ccc',
        borderRadius:30,
        alignSelf:'center'
    },
    icon:{
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center'
    }
})

export default ItemCart;