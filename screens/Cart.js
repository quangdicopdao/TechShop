import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text, TouchableOpacity,FlatList,Image } from "react-native";
import { Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { ItemCart } from "../components";

function Cart() {
  const navigation = useNavigation();
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Format số
  const numberWithCommas = (number) => {
    return number.toLocaleString("vi-VN"); // 'vi-VN' là mã ngôn ngữ của Tiếng Việt
  };
  const user = auth().currentUser;
  const userID = user.uid

 
  const loadCartData = async () => {
    const user = auth().currentUser;
    if (user) {
      const userId = user.uid;
      const cartRef = firestore().collection("carts").doc(userId);
  
      try {
        const cartSnapshot = await cartRef.get();
        if (cartSnapshot.exists) {
          const cartData = cartSnapshot.data();
          const cartItems = Object.entries(cartData).map(([productId, productData]) => {
            return {
              id: productId,
              ...productData,
            };
          });
          setCartData(cartItems);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    }
  };
  
  useEffect(() => {
    loadCartData();
  }, []);
  // useEffect(() => {
  //   if (cartData.length === 0) {
  //     loadCartData();
  //   }
  // }, []);
  
  
  // Hàm check hết
  const toggleCheckItem = (index) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
    setCheckedAll(updatedCheckedItems.every((item) => item));
  };

 

  // Hàm check tất cả
const toggleCheckAll = () => {
  const updatedCheckedItems = cartData.map((_, index) => !checkedAll);
  setCheckedItems(updatedCheckedItems);
  setCheckedAll(!checkedAll);
};

  const totalAmount = checkedItems.reduce((total, isChecked, index) => {
    return total + (isChecked ? cartData[index]?.price || 0 : 0);
  }, 0);
  
  // xoa sp khoi gio hang
  const removeItem = async (productId) => {
    const user = auth().currentUser;
    if (user) {
      const userId = user.uid;
      const cartRef = firestore().collection("carts").doc(userId);

      try {
        // Lấy dữ liệu giỏ hàng hiện tại
        const cartSnapshot = await cartRef.get();
        if (cartSnapshot.exists) {
          const currentCartData = cartSnapshot.data();

          // Xóa sản phẩm được chọn khỏi giỏ hàng
          delete currentCartData[productId];

          // Cập nhật giỏ hàng trên Firestore
          await cartRef.set(currentCartData);

          // Tải lại dữ liệu giỏ hàng
          loadCartData();
        }
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
      }
    }
  };
  // cap nhat gio han
  const updateCartItem = async (productId, newQuantity, newPrice) => {
    const user = auth().currentUser;
  
    if (user) {
      const userId = user.uid;
      const cartRef = firestore().collection("carts").doc(userId);
  
      try {
        // Lấy dữ liệu giỏ hàng hiện tại
        const cartSnapshot = await cartRef.get();
  
        if (cartSnapshot.exists) {
          const currentCartData = cartSnapshot.data();
  
          // Cập nhật số lượng và giá mới cho sản phẩm trong giỏ hàng
          if (currentCartData[productId]) {
            currentCartData[productId].quantity = newQuantity;
            currentCartData[productId].price = newPrice;
          }
  
          // Cập nhật giỏ hàng trên Firestore
          await cartRef.set(currentCartData);
  
          // Tải lại dữ liệu giỏ hàng
          loadCartData();
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm trong giỏ hàng:", error);
      }
    }
  };
  


return (
  <View style={{ flex: 1, backgroundColor: '#fff' }}>

    {isLoading ?(<></>
    ):
    cartData.length > 0  ? (
      <>
      <FlatList
        data={cartData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ItemCart
            key={index}
            productId={item.id}
            namePro={item.name}
            nameShop={item.shop}
            category={item.category}
            price={item.price}
            proquantity={item.quantity}
            srcImg={item.img}
            isChecked={checkedItems[index]}
            onRemove={() => removeItem(item.id)}
            updateCartItem={updateCartItem}
            onToggleCheck={() => toggleCheckItem(index)}
          />
        )}
      />
      {/* ... Các thành phần khác của giỏ hàng ... */}
      <View style={styles.wrapCheckOut}>
        <View style={styles.wraptxt}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              status={checkedAll ? "checked" : "unchecked"}
              onPress={() => {
                toggleCheckAll();
              }}
            />
            <Text style={{ fontSize: 16 }}>Chọn tất cả</Text>
          </View>
          <Text style={{ fontSize: 16 }}>
            Tổng tiền:
            <Text style={{ color: "red", fontSize: 16 }}>
              đ{numberWithCommas(totalAmount)}
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          style={styles.wrapBtn}
          onPress={() => {
            const checkedItemIds = cartData
              .filter((_, index) => checkedItems[index])
              .map((item) => item.id);

            navigation.navigate("CheckOut", {
              cartData: checkedItemIds.length > 0 ? cartData.filter((_, index) => checkedItems[index]) : cartData,
              checkedItems: checkedItemIds,
              totalAmount,
            });
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>Mua hàng</Text>
        </TouchableOpacity>
      </View>
    </>
    ) : (
      <View style={{justifyContent:'center',alignItems:'center',marginTop:20}}>
        <Image source={require('../assets/test/cart_empty.png')} style={{height:300, width:300}}/>
        <Text style={{ fontSize: 18, textAlign: "center",marginTop:10 }}>Giỏ hàng trống</Text>
      </View>
    )}
  </View>
);

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  wraptxt: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  wrapBtn: {
    backgroundColor: "red",
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
  },
  wrapCheckOut: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
});

export default Cart;
