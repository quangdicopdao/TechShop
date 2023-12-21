import React from "react";
import { View,Image,Text,TouchableOpacity } from "react-native";
import { primaryColor, textColor, whiteColor } from "../assets/color";
import { Divider } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 



function ItemOrder({
    nameShop,
    namePro,
    category,
    quantity,
    price,
    status,
    statusBtn,
    textStatus,
    onClick,
    image,
  }) {
    const numberWithCommas = (number) => {
      return number.toLocaleString('vi-VN'); // 'vi-VN' là mã ngôn ngữ của Tiếng Việt
    };
  
    return (
      <View style={{ backgroundColor: whiteColor, marginTop: 10, height: 230 }}>
        <Text style={{ marginLeft: 10, fontSize: 16, color: textColor }}>
          {nameShop}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: textColor, fontSize: 20 }}>{namePro}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
                marginBottom: 10,
                marginRight: 10,
              }}>
              <Text style={{ fontSize: 16, color: textColor }}>{category}</Text>
              <Text style={{ fontSize: 16, color: textColor }}>x{quantity}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginRight: 10,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: 'red',
                  borderWidth: 1,
                  borderRadius: 4,
                  borderColor: 'red',
                  padding: 5,
                }}>
                7 ngày trả hàng
              </Text>
              <Text style={{ fontSize: 18, color: 'red' }}>
                đ{numberWithCommas(price)}
              </Text>
            </View>
          </View>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 50,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="truck-delivery" size={25} color="green" />
            <Text style={{ color: 'green', marginLeft: 10, fontSize: 14 }}>
              {status}
            </Text>
          </View>
          <Icon name="arrow-right" size={25} />
        </View>
        {status !== 'Chờ giao hàng' && (
          <>
            <Divider />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 16, marginLeft: 10 }}>{textStatus}</Text>
              <TouchableOpacity
                onPress={onClick}
                style={{
                  width: 150,
                  height: 40,
                  backgroundColor: primaryColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  marginRight: 2,
                }}>
                <Text style={{ fontSize: 16, color: whiteColor }}>{statusBtn}</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  }
  
  export default ItemOrder;
  