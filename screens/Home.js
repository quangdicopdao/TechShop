import React, { useState,useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity,FlatList,Image } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { CategoriesComp,ProductHozi,Product } from "../components";
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../providers'
import { primaryColor, whiteColor } from "../assets/color";

function Home({route}) {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);


    const [{ userLogin }] = useMyContextController();
    const { name,photo,displayName,photoURL } =  userLogin ;
    
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
    <ScrollView contentContainerStyle={styles.container}>
        {/* header */}
            <View style={{height:130, backgroundColor:primaryColor,flexDirection:'row',justifyContent:'space-between'}}>
                <View>
                    <Text style={{fontSize:18,fontWeight:'bold',color:'#fff',marginLeft:10, paddingTop:20}}>Chào mừng trở lại</Text>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',marginLeft:10}}>{displayName || name || ''}</Text>
                </View>
                {photoURL ? 
                    (<Image source={{uri:photoURL}} style={{height:60,width:60, borderRadius:60,marginTop:20, marginRight:10}}/>):
                photo ?(<Image source={{uri:photo}} style={{height:60,width:60, borderRadius:60,marginTop:20, marginRight:10}}/>):
                (

                    <Image source={require('../assets/test/cat.jpg')} style={{height:60,width:60, borderRadius:60,marginTop:20, marginRight:10}}/>
                )}
            </View>
        <View style={styles.wrapHeader}>
                   <View style={styles.wrapSearch}>
                        <TouchableOpacity  style={styles.txtInputHeader} onPress={()=>{navigation.navigate('Search')}}>
                            <Image source={require('../assets/test/searchicon.png')} style={{height:30,width:30,marginLeft:10}}/>
                            <Text style={{color:'#000',fontSize:18,marginLeft:10}}>Tìm kiếm sản phẩm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={styles.btnIcon} onPress={() => navigation.navigate('Cart')} >
                            <Icon name='cart-outline' size={25} color='#000' />
                        </TouchableOpacity>
                   </View>
        </View>
                        {/* categories */}
                        <View style={styles.wrapCate} >
                            <Text style={styles.titleTxt}>Danh mục sản phẩm</Text>
                            <View style={{flexDirection:'row'}} >
                                <CategoriesComp name='Tai nghe' srcImg={require('../assets/test/tainghe.png')} category='TaiNghe'/>
                                <CategoriesComp name='Chuột' srcImg={require('../assets/test/chuot.png')} category='Chuot'/>
                                <CategoriesComp name='Laptop' srcImg={require('../assets/test/laptop.png')} category='Laptop'/>
                                <CategoriesComp name='Bàn phím' srcImg={require('../assets/test/banphim.png')} category='BanPhim'/>
                                <CategoriesComp name='Máy ảnh' srcImg={require('../assets/test/mayanh.png')} category='MayAnh'/>
                            </View>
                        </View>
                        {/* load vertical */}
                        <Text style={styles.titleTxt}>Sản phẩm mới</Text>
                        <ScrollView contentContainerStyle={{backgroundColor:whiteColor,height:180}} horizontal>
                            {products.map(product => (
                                <Product
                                    key={product.id}
                                    name={product.productName}
                                    price={numberWithCommas(product.price)}
                                    rate={product.rating}
                                    sold={product.sold}
                                    srcImg={product.imageUrl150}
                                    onClick={()=> (navigation.navigate('Details',{product}))}
                                />        
                                        
                            ))}                     
                            
                        </ScrollView>
                        {/* load product */}
                        <Text style={styles.titleTxt}>Đề xuất cho bạn</Text>
                        <View style={styles.wrap}>
                            {products.map(product => (
                                <ProductHozi
                                    key={product.id}
                                    name={product.productName}
                                    price={numberWithCommas(product.price)}
                                    rate={product.rating}
                                    srcImg={product.imageUrl150}
                                    onClick={()=> (navigation.navigate('Details',{product}))}
                                />        
                                        
                            ))}                     
                            
                        </View>
                    
    </ScrollView>
     );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
    },
    //header
    wrapHeader:{
        width:'100%',
        flexDirection:'row',
        position:'relative',
        top:-20,

    },
    wrapSearch:{
        flex:1,
        height:60,
        marginLeft:10,
        marginRight:10,
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        shadowOffset:{width:10,height:10},
        shadowOpacity:0.5,
        shadowRadius:5,
        elevation:5
    },
    txtInputHeader:{
        flex:1,
        height:60,
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems:'center',
        borderRadius:10,
    },
    btnIcon:{
        height:70,
        width:70,
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden',
        borderLeftWidth:1,
        borderColor:'rgba(0,0,0,0.1)'
    },

    //categories
    wrapCate:{
        width:'100%',
    },
    wrap:{
        width:'100%',
        flexDirection:'row',
        flexWrap:'wrap'
    },
    
    titleTxt:{
        fontSize:20,
        fontWeight:'bold',
        color:'#000',
        marginLeft:10,
        marginTop:10
    }
})
export default Home;