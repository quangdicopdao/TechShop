import React from 'react';
import {View,TouchableOpacity,TextInput,Image,Text} from 'react-native'
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { SearchComponent,SearchHeader } from '../components';
import { useNavigation } from '@react-navigation/native';

function Search() {

    const navigation = useNavigation()
    return ( 
        <View style={{backgroundColor:'#fff',flex:1}}>
            <SearchHeader/>
            {/* result search */}
            <View style={{flex:1,marginTop:20}}>
                <TouchableOpacity style={{ height: 50, justifyContent: 'center'}}>
                    <Text style={{marginLeft:20,fontSize:16,color:'#000'}}>
                        Tai nghe Blutooth
                    </Text>
                </TouchableOpacity>
                <Divider/>
                
                <TouchableOpacity style={{ height: 50, justifyContent: 'center'}}>
                    <Text style={{marginLeft:20,fontSize:16,color:'#000'}}>
                        Tai nghe Blutooth
                    </Text>
                </TouchableOpacity>
                <Divider/>

                <TouchableOpacity style={{ height: 50, justifyContent: 'center'}}>
                    <Text style={{marginLeft:20,fontSize:16,color:'#000'}}>
                        Tai nghe Blutooth
                    </Text>
                </TouchableOpacity>
                <Divider/>

                <TouchableOpacity style={{ height: 50, justifyContent: 'center'}}>
                    <Text style={{marginLeft:20,fontSize:16,color:'#000'}}>
                        Tai nghe Blutooth
                    </Text>
                </TouchableOpacity>
                <Divider/>
                
                <TouchableOpacity style={{ height: 50, justifyContent: 'center'}}>
                    <Text style={{marginLeft:20,fontSize:16,textAlign:'center'}}>
                        Hiển thị nhiều hơn
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{height:'60%',width:'100%'}}>
                <Text style={{fontSize:16,fontWeight:'bold',color:'#000',marginLeft:10,marginBottom:20}}>Đề xuất cho bạn</Text>
                <View style={{flexDirection:'row',height:'100%',width:'100%',flexWrap:'wrap'}}>
                    <SearchComponent name='Máy ảnh' srcImg={require('../assets/test/mayanh.png')}/>
                    <SearchComponent name='Laptop' srcImg={require('../assets/test/laptop.png')}/>
                    <SearchComponent name='Tai nghe' srcImg={require('../assets/test/tainghe.png')}/>
                    <SearchComponent name='Chuột' srcImg={require('../assets/test/chuot.png')}/>
                    <SearchComponent name='Bàn phím' srcImg={require('../assets/test/banphim.png')}/>
                </View>
            </View>
            <View>

            </View>
        </View>
     );
}

export default Search;