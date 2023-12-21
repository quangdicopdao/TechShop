import React, { useState, useEffect } from "react";
import { View,StyleSheet } from "react-native";
import { SearchClick } from "../components";
import { Divider } from "react-native-paper";
import ProductComp from "../components/ProductHozi"; 
import { useNavigation } from "@react-navigation/native";

import firestore from '@react-native-firebase/firestore';

function Categories({ route }) {
  const navigation = useNavigation()
  const { category } = route.params;
  const [products, setProducts] = useState([]);
  const numberWithCommas = (number) => {
    return number.toLocaleString('vi-VN'); // 'vi-VN' là mã ngôn ngữ của Tiếng Việt
};

  useEffect(() => {
    // Lấy danh sách sản phẩm theo category từ Firestore
    const fetchProductsByCategory = async () => {
      try {
        const snapshot = await firestore()
          .collection("products")
          .where('category', '==', category)
          .get();

        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <SearchClick />
      <Divider />
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
    </View>
  );
}
const styles = StyleSheet.create({
    wrap:{
        width:'100%',
        marginTop:10,
        flexDirection:'row',
        flexWrap:'wrap'
    },
})
export default Categories;
