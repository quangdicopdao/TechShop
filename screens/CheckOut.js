    import React, {useEffect, useState} from "react";
    import {View, StyleSheet,Text, TouchableOpacity, ScrollView,FlatList} from 'react-native'
    import Icon from 'react-native-vector-icons/MaterialIcons'; 
    import { ItemCheckOut } from "../components";
    import { useMyContextController } from "../providers";
    import firestore from "@react-native-firebase/firestore";

import { useNavigation } from "@react-navigation/native";

    function CheckOut({route}) {
        const { cartData, checkedItems, totalAmount } = route.params;
        const [feeShip, setFeeShip] = useState(30000); // Phí vận chuyển mặc định
        const [feePro, setFeePro] = useState(9000); // Phí sản phẩm mặc định
        const [totalProductAmount, setTotalProductAmount] = useState(0);
        const [totalShippingFee, setTotalShippingFee] = useState(feeShip);
        const [total, setTotal] = useState(totalProductAmount + totalShippingFee);

        const [{userLogin}] = useMyContextController()
        const {userId,phone,address,name,id,uid} = userLogin

        const navigation = useNavigation()
        useEffect(() => {
            // Tính tổng giá trị của tất cả sản phẩm
            const productAmount = cartData.reduce((acc, item) => acc + item.price , 0);
            setTotalProductAmount(productAmount);
    
            // Cập nhật tổng thanh toán
            const total = productAmount + totalShippingFee;
            setTotal(total);
    
            console.log("Nhận dữ liệu trong CheckOut:", cartData, checkedItems, totalAmount);
        }, [cartData, checkedItems, totalAmount, totalShippingFee]);

    
        const numberWithCommas = (number) => {
            return number.toLocaleString('vi-VN'); // 'vi-VN' là mã ngôn ngữ của Tiếng Việt
        };
       //thanh toan
        // const createBill = async () => {
        //     if (userLogin) {
        //         if (userId) {
        //             // Nếu userId tồn tại, đó là đăng nhập bằng email
        //             userIdentifier = userId;
        //         } else if (id) {
        //             // Nếu id (Google ID) tồn tại, đó là đăng nhập bằng Google
        //             userIdentifier = id;
        //         }
        //         try {
        //             // Thêm sản phẩm vào collection bills
        //             const billRef = firestore().collection("bills").doc(); // Remove uid from here
        //             await billRef.set({
        //                 uid: userIdentifier, // Add the uid field with the user's ID
        //                 userName: name,
        //                 userPhone: phone,
        //                 userAddress: address,
        //                 products: cartData,
        //                 totalAmount,
        //                 orderStatus: 'Chờ xác nhận',
        //                 createdAt: firestore.FieldValue.serverTimestamp(),
        //             });
        
        //             // Xóa các sản phẩm đã thanh toán khỏi collection carts
        //             const cartRef = firestore().collection("carts").doc(uid);
        //             const updatedCart = cartData.reduce((cart, item) => {
        //                 cart[item.id] = firestore.FieldValue.delete();
        //                 return cart;
        //             }, {});
        //             await cartRef.update(updatedCart);
        
        //             // Chuyển hướng về màn hình thành công hoặc màn hình khác cần thiết
        //             navigation.navigate("Home");
        //         } catch (error) {
        //             console.error("Lỗi khi tạo hóa đơn:", error);
        //         }
        //     }
        // };
        // Thay đổi đoạn code này trong hàm createBill
const createBill = async () => {
    try {
        let userIdentifier;

        // Kiểm tra xem đang đăng nhập bằng Google hay email
        if (userLogin) {
            if (userId) {
                // Nếu userId tồn tại, đó là đăng nhập bằng email
                userIdentifier = userId;
            } else if (id) {
                // Nếu id (Google ID) tồn tại, đó là đăng nhập bằng Google
                userIdentifier = id;
            }   
            else if(uid){
                userIdentifier = uid;
            }
            console.log(userIdentifier)

            // Kiểm tra xem userIdentifier có tồn tại không trước khi sử dụng
            if (userIdentifier) {
                const billRef = firestore().collection("bills").doc();
                await billRef.set({
                    uid: userIdentifier,
                    userName: name ,
                    userPhone: phone,
                    userAddress: address,
                    products: cartData,
                    totalAmount,
                    orderStatus: 'Chờ xác nhận',
                    createdAt: firestore.FieldValue.serverTimestamp(),
                });

                const cartRef = firestore().collection("carts").doc(userIdentifier);
                const updatedCart = cartData.reduce((cart, item) => {
                    cart[item.id] = firestore.FieldValue.delete();
                    return cart;
                }, {});
                await cartRef.update(updatedCart);

                navigation.navigate("Home");
            } else {
                console.error("userId và id đều không tồn tại.");
            }
        }
    } catch (error) {
        console.error("Lỗi khi tạo hóa đơn:", error);
    }
};

        
        return (
          <View style={{flex:1,backgroundColor:'#fff'}}>
                {/* address */}
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Icon name='location-on' size={30} color='#000'/>
                                    <Text style={styles.title}>Địa chỉ giao hàng</Text>
                                </View>
                            <TouchableOpacity onPress={()=>{navigation.navigate('MySelf')}}>
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderColor:'#ccc',paddingBottom:30,paddingTop:10}}>
                                    <View>
                                        <Text style={styles.txtAD}>Họ và tên: {name}</Text>
                                        <Text style={styles.txtAD}>Số điện thoại: {phone} </Text>
                                        <Text style={styles.txtAD}>Địa chỉ: {address}</Text>
                                    </View>
                                    <Icon style={{padding:10}}><Icon name='keyboard-arrow-right' size={30} color='#ccc'/></Icon>
                                </View>
                            </TouchableOpacity>
                            {/* product */}
                            <FlatList
                            data={cartData}
                            keyExtractor={(item, index) => (item && item.id ? item.id.toString() : index.toString())}
                            renderItem={({ item }) => (
                                <ItemCheckOut
                                    name={item.name}
                                    price={item.price}
                                    srcImg={item.img}
                                    cate={item.category}
                                    quantity={item.quantity}
                                    shop={item.shop}
                                    fee={feeShip}
                                />
                            )}
                            />
                           
                   {/* bill*/}
                   <View style={{justifyContent:'space-around',paddingTop:20,paddingBottom:20}}>
                        <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                            <Icon name='note-alt' size={30} color='#000'/>
                            <Text style={{marginLeft:5,fontSize:16,fontWeight:'bold',color:'#000'}}>Chi tiết thanh toán</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginLeft:10,marginRight:10}}>
                            <Text>Tổng tiền hàng</Text>
                            <Text>đ{numberWithCommas(totalProductAmount)}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginLeft:10,marginRight:10}}>
                            <Text>Tổng phí vận chuyển</Text>
                            <Text>đ{numberWithCommas(totalShippingFee)}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginLeft:10,marginRight:10}}>
                            <Text style={{fontSize:20,fontWeight:'bold',color:'#000'}}>Tổng thanh toán</Text>
                            <Text style={{fontSize:20,fontWeight:'bold',color:'red'}}>đ{numberWithCommas(total)}</Text>
                        </View>
                   </View>
                    
               {/* button */}
               <View style={{height:70,borderTopWidth:1,borderColor:'#ccc',flexDirection:'row'}}>
                    <View style={{flex:1,justifyContent:'space-around',alignItems:'flex-end'}}>
                        <Text style={{fontSize:16,marginRight:10}}>Tổng thanh toán:</Text>
                        <Text style={{fontSize:20,marginRight:10,color:'red'}}>đ{numberWithCommas(total)}</Text>
                    </View>
                    <TouchableOpacity style={{backgroundColor:'red',paddingLeft:20,paddingRight:20,justifyContent:'center'}}
                        onPress={createBill}
                    >
                        <Text style={{fontSize:20,color:'#fff'}}>Đặt hàng</Text>
                    </TouchableOpacity>
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
    export default CheckOut;