import React, { useState,useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity,FlatList,Image } from "react-native";
import {Button} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { CategoriesComp,ProductComp } from "../components";
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

function Home() {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
  const numberWithCommas = (number) => {
        return number.toLocaleString('vi-VN'); // 'vi-VN' là mã ngôn ngữ của Tiếng Việt
    };

    useEffect(() => {
        // Lắng nghe sự thay đổi của collection "products"
        const unsubscribe = firestore().collection("products").onSnapshot((snapshot) => {
            const productsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productsData);
        });

        // Hủy đăng ký lắng nghe khi component unmount
        return () => unsubscribe();
    }, []); // Dependency array là rỗng, vì chúng ta chỉ muốn đăng ký một lần khi component mount
      
      // Sử dụng state "products" trong các phần khác của component
      
    return ( 
    <View style={styles.container}>
        {/* header */}
        <View style={styles.wrapHeader}>
                    <TouchableOpacity  style={styles.txtInputHeader} onPress={()=>{navigation.navigate('Search')}}>
                        <Image source={require('../assets/test/searchicon.png')} style={{height:30,width:30,marginLeft:10}}/>
                        <Text style={{color:'#000',fontSize:16,marginLeft:10}}>Tìm kiếm sản phẩm</Text>
                    </TouchableOpacity>
                    <Button mode="contained" style={styles.btnIcon} onPress={() => navigation.navigate('Cart')} >
                        <Icon name='cart-outline' size={20} color='#000' />
                    </Button>
        </View>
                 <ScrollView>
                        {/* categories */}
                        <View style={styles.wrapCate} >
                            <Text style={styles.titleTxt}>Danh mục</Text>
                            <ScrollView contentContainerStyle={styles.wrapCompCate} horizontal>
                                <CategoriesComp name='Tai nghe' srcImg={require('../assets/test/tainghe.png')} category='TaiNghe'/>
                                <CategoriesComp name='Chuột' srcImg={require('../assets/test/chuot.png')} category='Chuot'/>
                                <CategoriesComp name='Laptop' srcImg={require('../assets/test/laptop.png')} category='Laptop'/>
                                <CategoriesComp name='Bàn phím' srcImg={require('../assets/test/banphim.png')} category='BanPhim'/>
                                <CategoriesComp name='Máy ảnh' srcImg={require('../assets/test/mayanh.png')} category='MayAnh'/>
                            </ScrollView>
                        </View>
                        {/* load product */}
                        <Text style={styles.titleTxt}>Đề xuất cho bạn</Text>
                        <View style={styles.wrap}>
                            {products.map(product => (
                                <ProductComp
                                    key={product.id}
                                    name={product.productName}
                                    price={numberWithCommas(product.price)}
                                    sold={product.sold}
                                    srcImg={product.imageUrl150}
                                    onClick={()=> (navigation.navigate('Details',{product}))}
                                />        
                                        
                            ))}                     
                            
                        </View>
                 </ScrollView>
                    
    </View>
     );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flex:1
    },
    //header
    wrapHeader:{
        width:'100%',
        height:'7%',
        flexDirection:'row',
        marginTop:10
    },
    txtInputHeader:{
        flex:1,
        height:50,
        marginLeft:10,
        borderWidth:1,
        borderColor:'#ccc',
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems:'center',
        borderRadius:2
    },
    btnIcon:{
        height:50,
        alignSelf:'center',
        backgroundColor:'transparent',
    },
    //categories
    wrapCate:{
        width:'100%',
    },
    wrap:{
        width:'100%',
        marginTop:10,
        flexDirection:'row',
        flexWrap:'wrap'
    },
    
    titleTxt:{
        fontSize:20,
        fontWeight:'bold',
        color:'#000',
        marginLeft:10,
        marginBottom:10,
        marginTop:10
    }
})
export default Home;