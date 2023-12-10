    import React, {useEffect, useState} from "react";
    import {View, StyleSheet,Text, TouchableOpacity, ScrollView,FlatList} from 'react-native'
    import Icon from 'react-native-vector-icons/MaterialIcons'; 
    import { ItemCheckOut } from "../components";

    function CheckOut({route}) {
        const { cartData, checkedItems, totalAmount } = route.params;
        const [feeShip, setFeeShip] = useState(30000); // Phí vận chuyển mặc định
        const [feePro, setFeePro] = useState(9000); // Phí sản phẩm mặc định
        const [totalProductAmount, setTotalProductAmount] = useState(0);
        const [totalShippingFee, setTotalShippingFee] = useState(feeShip);
        const [total, setTotal] = useState(totalProductAmount + totalShippingFee);

        useEffect(() => {
            // Tính tổng giá trị của tất cả sản phẩm
            const productAmount = cartData.reduce((acc, item) => acc + item.price , 0);
            setTotalProductAmount(productAmount);
    
            // Cập nhật tổng thanh toán
            const total = productAmount + totalShippingFee;
            setTotal(total);
    
            console.log("Nhận dữ liệu trong CheckOut:", cartData, checkedItems, totalAmount);
        }, [cartData, checkedItems, totalAmount, totalShippingFee]);

        // useEffect(() => {
        //     // Xử lý dữ liệu ở đây
        //     console.log("Received data in CheckOut:", cartData, checkedItems, totalAmount);
        //   }, [cartData, checkedItems, totalAmount]);
        const numberWithCommas = (number) => {
            return number.toLocaleString('vi-VN'); // 'vi-VN' là mã ngôn ngữ của Tiếng Việt
        };
        return (
          <View style={{flex:1,backgroundColor:'#fff'}}>
               <ScrollView >
                {/* address */}
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Icon name='location-on' size={30} color='#000'/>
                                    <Text style={styles.title}>Địa chỉ giao hàng</Text>
                                </View>
                            <TouchableOpacity>
                                <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderColor:'#ccc',paddingBottom:30,paddingTop:10}}>
                                    <View>
                                        <Text style={styles.txtAD}>Việt Quang | 0359088784</Text>
                                        <Text style={styles.txtAD}>nhà trọ Trí Nguyễn, 375 Bùi Quốc Khánh, Chánh Nghĩa, Thủ Dầu Một, Bình Dương</Text>
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
                    
               </ScrollView>
               {/* button */}
               <View style={{height:70,borderTopWidth:1,borderColor:'#ccc',flexDirection:'row'}}>
                    <View style={{flex:1,justifyContent:'space-around',alignItems:'flex-end'}}>
                        <Text style={{fontSize:16,marginRight:10}}>Tổng thanh toán:</Text>
                        <Text style={{fontSize:20,marginRight:10,color:'red'}}>đ{numberWithCommas(2000000)}</Text>
                    </View>
                    <TouchableOpacity style={{backgroundColor:'red',paddingLeft:20,paddingRight:20,justifyContent:'center'}}>
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