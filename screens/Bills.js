import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView,Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { primaryColor, textColor } from "../assets/color";
import { ItemOrder } from "../components";
import { useMyContextController } from "../providers";

function Bills() {
    const navigation = useNavigation();
    const [selectedTab, setSelectedTab] = useState('Chờ xác nhận');
    const [bills, setBills] = useState([]);
    const [{ userLogin }] = useMyContextController();
    const { userId } = userLogin;

    //load theo tab
    useEffect(() => {
        const unsubscribe = firestore()
            .collection('bills')
            .where('uid', '==', userId)
            .onSnapshot(querySnapshot => {
                try {
                    // Kiểm tra xem có tài liệu nào không
                    if (!querySnapshot.empty) {
                        // Nếu có tài liệu, lấy dữ liệu từ tất cả các tài liệu đó
                        const billsData = querySnapshot.docs.map(doc => ({
                            id: doc.id,
                            orderStatus: doc.data().orderStatus,
                            products: doc.data().products || [],
                        }));
    
                        // Cập nhật state với mảng dữ liệu billsData
                        setBills(billsData);
                    } else {
                        // Xử lý trường hợp không có tài liệu
                        console.warn('Không có tài liệu');
                        setBills([]);
                    }
                } catch (error) {
                    // Xử lý lỗi trong quá trình truy vấn dữ liệu
                    console.error('Lỗi khi truy vấn dữ liệu:', error);
                    setBills([]);
                }
            });
    
        // Clean up the listener when the component unmounts or when userId changes
        return () => unsubscribe();
    }, [userId]);
    

    const handleTabPress = (tab) => {
        setSelectedTab(tab);
    };

    // Filter bills based on selectedTab
    const filteredBills = bills.filter(bill => bill.orderStatus === selectedTab);

    const handleCancelOrder = async (billId) => {
        try {
          // Update the orderStatus to 'Đã hủy' in Firestore
          await firestore().collection('bills').doc(billId).update({
            orderStatus: 'Đã hủy',
          });
        } catch (error) {
          console.error('Lỗi khi hủy đơn:', error);
        }
      };


      //handle click
      const handleClick = (billId) => {
        if (selectedTab === 'Chờ xác nhận') {
          Alert.alert(
            'Hủy đơn hàng',
            'Bạn có chắc muốn hủy đơn hàng?',
            [
              {
                text: 'Hủy',
                style: 'cancel',
              },
              {
                text: 'Xác nhận',
                onPress: () => handleCancelOrder(billId),
              },
            ]
          );
        } else if (selectedTab === 'Đã giao') {
          // Navigate to the comment screen
          navigation.navigate('Comment', { billId});
        }
      };
    const getStatusBtn = (orderStatus) => {
        switch (orderStatus) {
            case 'Chờ xác nhận':
                return 'Hủy đơn';
            case 'Chờ giao hàng':
                return 'Mua lại';
            case 'Đã giao':
                return 'Đánh giá';
            case 'Đã hủy':
                return 'Mua lại';
            case 'Trả hàng':
                return 'Mua lại';
            default:
                return 'Hủy đơn';
        }
    };
    
    const getTextStatus = (selectedTab) => {
        switch (selectedTab) {
            case 'Chờ xác nhận':
                return 'Đơn hàng đang được xác nhận';
            case 'Chờ giao hàng':
                return 'Đơn hàng đang giao';
            case 'Đã giao':
                return 'Hãy đánh giá sản phẩm';
            case 'Đã hủy':
                return '';
            case 'Trả hàng':
                return 'Hãy đánh giá';
            default:
                return 'Hãy đánh giá';
        }
    };
    
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.header}>
                    <Text style={{ fontSize: 25, color: textColor, marginLeft: 10 }}>Đơn mua</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('Search') }}>
                        <Image source={require('../assets/test/searchicon.png')} style={{ width: 35, height: 35, marginRight: 10, tintColor: primaryColor }} />
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={styles.scrolTab} horizontal>
                    {['Chờ xác nhận', 'Chờ giao hàng', 'Đã giao', 'Đã hủy', 'Trả hàng'].map(tab => (
                        <TouchableOpacity
                            key={tab}
                            style={[
                                styles.tab,
                                { borderBottomWidth: tab === selectedTab ? 2 : 0, borderBottomColor: primaryColor }
                            ]}
                            onPress={() => handleTabPress(tab)}
                        >
                            <Text style={styles.btnText}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            {filteredBills && filteredBills.length > 0 ? (

                <ScrollView contentContainerStyle={styles.content}>
                    {filteredBills.map(bill => (
                        <View key={bill.id}>
                            {bill.products.map((product, index) => (
                                <ItemOrder
                                    key={index}
                                    nameShop={product.shop}
                                    namePro={product.name}
                                    price={product.price}
                                    image={product.img}
                                    category={product.category}
                                    status={bill.orderStatus}
                                    quantity={product.quantity}
                                    statusBtn={getStatusBtn(bill.orderStatus)}
                                    textStatus={getTextStatus(selectedTab)}
                                    onClick={()=> handleClick(bill.id)}
                                />
                            ))}
                        </View>
                    ))}
                </ScrollView>
            ):
            (
            <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.1)',flex:1}}>
                <Image source={require('../assets/test/hoadon.png')} style={{height:150,width:150}}/>
                <Text style={{fontSize:16,color:textColor,marginTop:10}}>Chưa có đơn hàng</Text>
            </View>
            )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1
        // Add other styles if needed
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        // Add other styles if needed
    },
    content: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        // Add other styles if needed
    },
    scrolTab: {
        marginBottom: 10,
        // Add other styles if needed
    },
    tab: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
        paddingLeft: 10,
        // Add other styles if needed
    },
    btnText: {
        fontSize: 16,
        color: textColor,
        // Add other styles if needed
    },
});

export default Bills;
