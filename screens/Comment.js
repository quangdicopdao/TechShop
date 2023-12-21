import React, { useState, useEffect } from "react";
import { View, Text, Image,TouchableOpacity,StyleSheet,KeyboardAvoidingView,Platform  } from "react-native";
import { TextInput } from "react-native-paper";
import { primaryColor, textColor, whiteColor } from "../assets/color";
import firestore from "@react-native-firebase/firestore";
import { Divider } from "react-native-paper";
import StarRating from 'react-native-star-rating-widget';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import {launchImageLibrary,launchCamera} from 'react-native-image-picker'
import { PermissionsAndroid } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { useMyContextController } from "../providers";

function Comment({ route }) {
  const [{userLogin}] = useMyContextController()
  const {name,imgUser} = userLogin
  const { billId } = route.params;
  const [rating, setRating] = useState(0);
  const [billData, setBillData] = useState(null);
  const [text, setText] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [img,setImg] = useState('');

  useEffect(() => {
    const fetchBillData = async () => {
      try {
        const billDocument = await firestore().collection('bills').doc(billId).get();
        
        if (billDocument.exists) {
          const data = billDocument.data();
          setBillData(data);
        } else {
          console.warn('Không tìm thấy đơn hàng');
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu đơn hàng:', error);
      }
    };

    fetchBillData();
  }, [billId]);

  const mapRatingToText = (rating) => {
    if (rating < 1.5) {
      return 'Rất tệ';
    } else if (rating < 2.5) {
      return 'Tệ';
    } else if (rating < 4) {
      return 'Bình thường';
    } else if (rating < 5) {
      return 'Tốt';
    } else {
      return 'Rất tốt';
    }
  };
  useEffect(() => {
    // Update the feedbackText state when the rating changes
    setFeedbackText(mapRatingToText(rating));
  }, [rating]);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        const result = await launchImageLibrary({mediaType:'photo',cameraType:'back'})
        setImg(result.assets[0].uri);
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const submitReview = async () => {
    try {
      // Assuming you have a 'comments' collection in Firestore
      await firestore().collection('comments').add({
        productId: parseFloat(billData.products[0].id), // Replace with your actual product ID
        productName: billData.products[0].name, // Replace with your actual product name
        category: billData.products[0].category, // Replace with your actual product category
        rating,
        user:name,
        feedbackText,
        imageUrl: img,
        reviewText: text,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });

      // You may want to add additional logic here (e.g., navigation to another screen)
      console.log('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1, backgroundColor: whiteColor }}
  >
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: whiteColor }}>
        {billData ? (
          <View>
           
            {billData.products.map((product, index) => (
              <View key={index} style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={{ uri: product.img }} style={{ width: 100, height: 100,marginLeft:50 }}/> 
                <View style={{marginLeft:20}}>
                  <Text style={{fontSize:16,color:textColor}}>{product.name}</Text> 
                  <Text>{product.category}</Text> 
                </View>
              </View>
              
            ))}
              <Divider/>
            <View>
              <Text style={{fontSize:18, fontWeight:'bold', color:textColor,marginBottom:10, marginTop:10,marginLeft:10}}>Chất lượng sản phẩm</Text>
              <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                <StarRating
                  rating={rating}
                  onChange={setRating}
                />
                <Text style={{color:'#FFBC49',fontSize:16}}>{feedbackText}</Text>
              </View>
            </View>
            <View style={{justifyContent:'center',alignItems:'center',marginTop:20}}>
              <TouchableOpacity style={{width:300,height:100,borderWidth:1,borderColor:primaryColor,justifyContent:'center',alignItems:'center'}} onPress={()=>{requestCameraPermission()}}>
                  <Icon name='camera' size={30} color={primaryColor}/>
              </TouchableOpacity>
              {img ? (
                <View style={{marginTop:20,justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:18, fontWeight:'bold', color:textColor,marginBottom:10, marginTop:10,marginLeft:10}}>Ảnh đã chọn</Text>
                  <Image source={{uri:img}} style={{width:100,height:100}}/>
                </View>
              ):(<></>)}
            </View>
              <Text style={{fontSize:18, fontWeight:'bold', color:textColor,marginBottom:10, marginTop:10,marginLeft:10}}>Đánh giá sản phẩm</Text>
            <TextInput
          style={styles.input}
          multiline
          mode="outlined"
          numberOfLines={4} // Số dòng hiển thị ban đầu (có thể tùy chỉnh)
          placeholder="Thêm đánh giá của bạn..."
          value={text}
          onChangeText={(newText) => setText(newText)}
        />
        <TouchableOpacity onPress={() => submitReview()}
        style={{height:50,backgroundColor:primaryColor,marginLeft:10,marginRight:10,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontSize:16,color:whiteColor}}>Gửi đánh giá</Text>
        </TouchableOpacity>
        {/* Ô nhập đánh giá */}
        
          </View>
        ) : (
          <></>
        )}
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    marginRight:10,
    marginLeft:10,
    marginBottom:20,
    padding: 10,  
    fontSize: 16,
  },
})
export default Comment;
