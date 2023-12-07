import React, {useState} from "react";
import { View,StyleSheet,Text, Image, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { useNavigation } from "@react-navigation/native";

function Details() {
    const numberWithCommas = (number) => {
        return number.toLocaleString('vi-VN'); // 'vi-VN' là mã ngôn ngữ của Tiếng Việt
    };
    const navigation = useNavigation()
    const [isCart, setIsCart] = useState(false)
    return ( 
        <View style={styles.contaier}>
            {/* navigator */}
            <View style={{
                flexDirection:'row',
                height:80,backgroundColor:'rgba(255,255,240,0.1)',
                alignItems:'center',
                justifyContent:'space-between',
                }}>
                {/* back to home */}
                <TouchableOpacity style={{
                    position:'relative',
                    top:0,
                    left:20,
                    right:0,
                    bottom:0,
                    backgroundColor:'rgba(211,211,211,0.3)',
                    borderRadius:30,
                    padding:5,
                }}
                onPress={() => {navigation.goBack()}}
                >
                    <Icon name='arrow-left' size={30} color='#000'/>
                </TouchableOpacity>

                <View style={{flexDirection:'row'}}>
                    {/* cart */}
                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {
                            isCart &&
                        <Text
                        style={{
                            position: 'relative',
                            top: -15,
                            left: 50,
                            backgroundColor: 'red',
                            fontSize: 14,
                            color: '#fff',
                            borderRadius: 14,
                            marginRight: 5, // Khoảng cách giữa số và biểu tượng cart
                            paddingHorizontal: 7,
                            zIndex:1 // Kích thước padding để làm cho nền đỏ đẹp hơn
                        }}
                        >1</Text>}
                        <TouchableOpacity style={{
                            position:'relative',
                            top:0,
                            left:0,
                            right:0,
                            bottom:0,
                            backgroundColor:'rgba(211,211,211,0.5)',
                            borderRadius:30,
                            padding:5,
                            marginRight:10
                            }}>
                            <Icon name='cart-outline' size={30} color='#000'/>
                        </TouchableOpacity>
                   </View>
                    <TouchableOpacity style={{
                        position:'relative',
                        top:0,
                        left:0,
                        right:0,
                        bottom:0,
                        backgroundColor:'rgba(211,211,211,0.5)',
                        borderRadius:30,
                        padding:5,
                        marginRight:10

                        }}>
                        <Icon name='unfold-more-vertical' size={30} color='#000'/>
                    </TouchableOpacity>
                </View>

            </View>
               <ScrollView contentContainerStyle={styles.wrapAll}>
                    <Image style={styles.backgroundImage} source={require('../assets/test/laptop.png')}/>
               
                    <Text style={{color:'red',fontSize:25}}>đ{numberWithCommas(23000000)}</Text>
                    <Text style={styles.name}>Tên sản phẩm</Text>
                    <View style={styles.wrap}>

                        {/* rating */}
                            <StarRatingDisplay 
                            style={styles.starRating}
                             rating={4.5}
                             starSize={25}
                             />
                         <Text>Đã bán : 2,3k</Text>
                         <TouchableOpacity>
                            <Icon name='facebook-messenger' size={25} color='#000'/>
                         </TouchableOpacity>
                         <TouchableOpacity>
                            <Icon name='share' size={25} color='#000'/>
                         </TouchableOpacity>
                    </View>
               </ScrollView>
                <View style={styles.wrapBtn}>
                    <TouchableOpacity style={styles.btnAddCart}>
                        <Icon name='cart-outline' size={25} color='#fff'/>
                        <Text style={{fontSize:18,color:'#fff',marginRight:20}}>
                            Add to cart
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnBuy}>
                        <Icon name='hand-coin' size={25} color='#fff'/>
                        <Text style={{fontSize:18,color:'#fff',marginRight:20}}>
                            Buy now
                        </Text>
                    </TouchableOpacity>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contaier:{
        flex:1,
        backgroundColor:'#fff'
    },
    backgroundImage: {
        height:300,
        width:400,
        
    },
    starRating:{
    },
    wrapAll:{
        marginLeft:10,
        marginRight:10
    },
    wrap:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
       
    },
    name:{
        fontSize:16,
        color:'#000000',
        paddingTop:10,
        paddingBottom:10
    },
    wrapBtn:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    btnAddCart:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'green',
        padding:20,
        justifyContent:'space-between'
    },
    btnBuy:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'red',
        padding:20,
        justifyContent:'space-between'
    }
})
export default Details;