import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity,FlatList,Image } from "react-native";
import {Button} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { CategoriesComp,ProductComp } from "../components";
import { useNavigation } from '@react-navigation/native';

function Home() {
    const navigation = useNavigation();

  const numberWithCommas = (number) => {
        return number.toLocaleString('vi-VN'); // 'vi-VN' là mã ngôn ngữ của Tiếng Việt
    };

    const products = [
        {id:1, name: 'Laptop MSI morden 15', price:numberWithCommas(10000111000), sold: '1,2k', srcImg: require('../assets/test/msi.png') },
        {id:2, name: 'Laptop MSI morden 13', price:numberWithCommas(100003000), sold: '1,2k', srcImg: require('../assets/test/msi.png') },
        {id:3, name: 'Laptop MSI morden 12', price:numberWithCommas(102000000), sold: '1,2k', srcImg: require('../assets/test/msi.png') },
        {id:4, name: 'Laptop MSI morden 12', price:numberWithCommas(100200000), sold: '1,2k', srcImg: require('../assets/test/msi.png') },
        {id:5, name: 'Laptop MSI morden 12', price:numberWithCommas(100200000), sold: '1,2k', srcImg: require('../assets/test/msi.png') },
        {id:66, name: 'Laptop MSI morden 12', price:numberWithCommas(100200000), sold: '1,2k', srcImg: require('../assets/test/msi.png') },
        {id:7, name: 'Laptop MSI morden 12', price:numberWithCommas(100200000), sold: '1,2k', srcImg: require('../assets/test/msi.png') },
        // Add more products as needed
      ];
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
                                <CategoriesComp name='Tai nghe' srcImg={require('../assets/test/tainghe.png')}/>
                                <CategoriesComp name='Chuột' srcImg={require('../assets/test/chuot.png')}/>
                                <CategoriesComp name='Laptop' srcImg={require('../assets/test/laptop.png')}/>
                                <CategoriesComp name='Bàn phím' srcImg={require('../assets/test/banphim.png')}/>
                                <CategoriesComp name='Máy ảnh' srcImg={require('../assets/test/mayanh.png')}/>
                            </ScrollView>
                        </View>
                        {/* load product */}
                        <Text style={styles.titleTxt}>Đề xuất cho bạn</Text>
                        <View style={styles.wrap}>
                            {products.map(product => (
                                <ProductComp
                                    key={product.id}
                                    name={product.name}
                                    price={product.price}
                                    sold={product.sold}
                                    srcImg={product.srcImg}
                                    onClick={()=> (navigation.navigate('Details'))}
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