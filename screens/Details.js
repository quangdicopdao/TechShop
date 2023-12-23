import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { textColor, whiteColor } from "../assets/color";
import { CommentComp } from "../components";
import { useMyContextController } from "../providers";

function Details({ route }) {
  const { product } = route.params;
  const navigation = useNavigation();
  const [isCart, setIsCart] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const userId = auth().currentUser && auth().currentUser.uid;
  const [{userLogin}] = useMyContextController()
  const {id} = userLogin
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        console.log('Fetching comments for productId:', typeof (product.id));
        const commentsRef = firestore().collection('comments');
        const snapshot = await commentsRef
          .where('productId', '==', product.id)
          .get();
    
        if (!snapshot.empty) {
          const commentsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log('Comments Data:', commentsData);
          setComments(commentsData);
        } else {
          console.log('Không có dữ liệu từ comments collection cho sản phẩm này.');
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ comments collection:', error);
      }
    };
    

    fetchComments();
  }, [product.id]);

  // Format số
  const numberWithCommas = (number) => {
    return number.toLocaleString("vi-VN"); // 'vi-VN' là mã ngôn ngữ của Tiếng Việt
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartRef = firestore().collection('carts').doc(userId);
        const cartDoc = await cartRef.get();

        if (cartDoc.exists) {
          const cartData = cartDoc.data();
          let totalCount = 0;

          // Lặp qua từng sản phẩm trong giỏ hàng và tính tổng số lượng
          Object.values(cartData).forEach((item) => {
            totalCount += item.quantity || 0;
          });

          console.log('Tổng Số Lượng:', totalCount);

          setCartCount(totalCount);
        } else {
          setCartCount(0);
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu giỏ hàng:', error);
      }
    };

    // Gọi hàm fetchCartData khi component được mount và khi userId thay đổi
    if (userId) {
      fetchCartData();
    }
  }, [userId]);

  // const addToCart = async () => {
  //   console.log("User: " + userId);
  //   console.log('Product ID:', product.id);
  //   try {
  //     const cartRef = firestore().collection('carts').doc(userId);
  //     const cartDoc = await cartRef.get();

  //     if (!cartDoc.exists) {
  //       // Nếu giỏ hàng chưa tồn tại, tạo giỏ hàng mới
  //       cartRef.set({
  //         [product.id]: {
  //           name: product.productName,
  //           price: product.price,
  //           shop: product.nameShop,
  //           img: product.imageUrl150,
  //           category: 'đen',
  //           quantity: 1,
  //           // Thêm các thông tin khác của sản phẩm nếu cần
  //         },
  //       });
  //     } else {
  //       // Nếu giỏ hàng đã tồn tại, kiểm tra sản phẩm đã có hay chưa
  //       const cartData = cartDoc.data();

  //       if (cartData[product.id]) {
  //         const newQuantity = cartData[product.id].quantity + 1;
  //         const newPrice = product.price * newQuantity;
  //         // Nếu sản phẩm đã có trong giỏ, tăng số lượng lên 1
  //         cartRef.update({
  //           [`${product.id}.quantity`]: newQuantity,
  //           [`${product.id}.price`]: newPrice,
  //         });
  //       } else {
  //         // Nếu sản phẩm chưa có trong giỏ, thêm mới với số lượng là 1
  //         cartRef.update({
  //           [product.id]: {
  //             name: product.productName,
  //             price: product.price,
  //             shop: product.nameShop,
  //             img: product.imageUrl150,
  //             category: 'đen',
  //             quantity: 1,
  //             // Thêm các thông tin khác của sản phẩm nếu cần
  //           },
  //         });
  //       }
  //     }
  //     setCartCount(cartCount + 1);
  //     // Hiển thị thông báo hoặc thực hiện các hành động khác nếu cần
  //     Alert.alert('Thông báo', 'Sản phẩm đã được thêm vào giỏ hàng.');
  //   } catch (error) {
  //     console.error('Lỗi khi thêm vào giỏ hàng:', error);
  //     // Xử lý lỗi hoặc hiển thị thông báo lỗi cho người dùng
  //     Alert.alert('Lỗi', 'Đã có lỗi xảy ra khi thêm vào giỏ hàng. Vui lòng thử lại.');
  //   }
  // };
  const addToCart = async () => {
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
        console.log(userIdentifier);
  
        // Kiểm tra xem userIdentifier có tồn tại không trước khi sử dụng
        if (userIdentifier) {
          const cartRef = firestore().collection("carts").doc(userIdentifier);
          const cartDoc = await cartRef.get();
  
          if (!cartDoc.exists) {
            // Nếu giỏ hàng chưa tồn tại, tạo giỏ hàng mới
            cartRef.set({
              [product.id]: {
                name: product.productName,
                price: product.price,
                shop: product.nameShop,
                img: product.imageUrl150,
                category: 'đen',
                quantity: 1,
                // Thêm các thông tin khác của sản phẩm nếu cần
              },
            });
          } else {
            // Nếu giỏ hàng đã tồn tại, kiểm tra sản phẩm đã có hay chưa
            const cartData = cartDoc.data();
  
            if (cartData[product.id]) {
              const newQuantity = cartData[product.id].quantity + 1;
              const newPrice = product.price * newQuantity;
              // Nếu sản phẩm đã có trong giỏ, tăng số lượng lên 1
              cartRef.update({
                [`${product.id}.quantity`]: newQuantity,
                [`${product.id}.price`]: newPrice,
              });
            } else {
              // Nếu sản phẩm chưa có trong giỏ, thêm mới với số lượng là 1
              cartRef.update({
                [product.id]: {
                  name: product.productName,
                  price: product.price,
                  shop: product.nameShop,
                  img: product.imageUrl150,
                  category: 'đen',
                  quantity: 1,
                  // Thêm các thông tin khác của sản phẩm nếu cần
                },
              });
            }
          }
          setCartCount(cartCount + 1);
          // Hiển thị thông báo hoặc thực hiện các hành động khác nếu cần
          Alert.alert('Thông báo', 'Sản phẩm đã được thêm vào giỏ hàng.');
        } else {
          console.error("userId và id đều không tồn tại.");
        }
      }
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
      // Xử lý lỗi hoặc hiển thị thông báo lỗi cho người dùng
      Alert.alert('Lỗi', 'Đã có lỗi xảy ra khi thêm vào giỏ hàng. Vui lòng thử lại.');
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.navigator}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={30} color="#000" />
        </TouchableOpacity>

        <View style={styles.cartAndMore}>
          <View style={styles.cartIconContainer}>
            {cartCount > 0 && (
              <Text style={styles.cartBadge}>{cartCount}</Text>
            )}
            <TouchableOpacity
              style={styles.cartIcon}
              onPress={() => navigation.navigate("Cart")}
            >
              <Icon name="cart-outline" size={30} color="#000" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.moreIcon}
            onPress={() => {
              // Thêm chức năng xử lý khi nhấn vào biểu tượng more
            }}
          >
            <Image source={require('../assets/test/more.jpg')} style={{ height: 30, width: 30 }} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.wrapAll}>
        <View style={{ backgroundColor: whiteColor, paddingBottom: 20, paddingLeft: 10, paddingRight: 10 }}>
          <Image style={styles.backgroundImage} source={{ uri: product.imageUrl400 }} />

          <Text style={{ color: 'red', fontSize: 25 }}>đ{numberWithCommas(product.price)}</Text>
          <Text style={styles.name}>{product.productName}</Text>
          <View style={styles.wrap}>

            {/* rating */}
            <StarRatingDisplay
              style={styles.starRating}
              rating={product.rating}
              starSize={25}
            />
            <Text>Đã bán : {product.sold}</Text>
            <TouchableOpacity>
              <Icon name='facebook-messenger' size={25} color='#000' />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name='share' size={25} color='#000' />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 20, backgroundColor: whiteColor, padding: 10 }}>
          <Text style={{ fontSize: 18, color: textColor, fontWeight: 'bold' }}>Mô tả sản phẩm</Text>
          <Text style={{ fontSize: 16, marginTop: 5 }}>{product.description}</Text>
        </View>
        {/* comment */}
        <View style={{ marginTop: 20, backgroundColor: whiteColor, padding: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: textColor }}>Đánh giá sản phẩm</Text>
          {comments.map((comment) => (
            <CommentComp
              key={comment.id}
              name={comment.user}
              starRating={comment.rating}
              text={comment.reviewText}
              imgUrl={comment.imageUrl}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.wrapBtn}>
        <TouchableOpacity style={styles.btnAddCart} onPress={addToCart}>
          <Icon name='cart-outline' size={25} color='#fff' />
          <Text style={{ fontSize: 18, color: '#fff', marginRight: 20 }}>
            Thêm vào giỏ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnBuy}
          onPress={() => {
            navigation.navigate("CheckOut", {
              cartData: [
                {
                  id: product.id,
                  name: product.productName,
                  price: product.price,
                  shop: product.nameShop,
                  img: product.imageUrl150,
                  category: 'đen',
                  quantity: 1,
                },
                // Các thông tin khác nếu cần
              ],
              checkedItems: [product.id],
              totalAmount: product.price,
            });
          }}
        >
          <Icon name='hand-coin' size={25} color='#fff' />
          <Text style={{ fontSize: 18, color: '#fff', marginRight: 20 }}>
            Mua ngay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,240,0.1)',
  },
  navigator: {
    flexDirection: 'row',
    height: 60,
    zIndex: 1,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: whiteColor,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    position: 'relative',
    left: 20,
    borderRadius: 30,
    padding: 5,
  },
  cartAndMore: {
    flexDirection: 'row',
  },
  cartIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartIcon: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 30,
    padding: 5,
    marginRight: 10,
  },
  cartBadge: {
    position: 'relative',
    top: -15,
    left: 50,
    backgroundColor: 'red',
    fontSize: 14,
    color: '#fff',
    borderRadius: 14,
    marginRight: 5,
    paddingHorizontal: 7,
    zIndex: 1,
  },
  moreIcon: {
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 30,
    padding: 5,
    marginRight: 10,
  },
  wrapAll: {

  },
  backgroundImage: {
    height: 400,
    width: 400,
    position: 'relative',
    top: -50,
  },
  starRating: {},
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 20,
    color: '#000000',
    paddingTop: 10,
    paddingBottom: 10,
  },
  wrapBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btnAddCart: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'green',
    padding: 20,
    justifyContent: 'space-between',
  },
  btnBuy: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
    padding: 20,
    justifyContent: 'space-between',
  },
});

export default Details;
