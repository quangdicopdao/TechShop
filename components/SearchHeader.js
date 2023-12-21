import React from 'react';
import {View,TouchableOpacity,TextInput,Image,Text} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { useNavigation } from '@react-navigation/native';
import { primaryColor } from '../assets/color';

function SearchHeader({searchKeyword,setSearchKeyword}) {
    const navigation = useNavigation();

    return (
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    height: 70,
                    backgroundColor: 'rgba(255,255,240,0.1)',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#fff'
                }}
            >
                <TouchableOpacity
                    style={{
                        position: 'relative',
                        top: 0,
                        left: 10,
                        right: 0,
                        bottom: 0,
                        borderRadius: 30,
                        padding: 5,
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Icon
                        name='arrow-left' size={30} color={primaryColor}
                    />
                </TouchableOpacity>
                <View style={{
                    flex: 1,
                    height:40,
                    marginLeft: 20,
                    marginRight: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius:10,
                    borderWidth: 1,
                    borderColor: primaryColor,
                }}>
                    <TextInput
                        placeholder='Tìm thứ bạn muốn'
                        style={{
                            flex: 1,
                            height: '100%',
                            backgroundColor: '#fff',
                            paddingLeft: 20,
                            borderRadius:10
                        }}
                        value={searchKeyword}
                        onChangeText={(text) => {setSearchKeyword(text)
                        console.log(text)}}
                    />
                    <TouchableOpacity 
                    style={{height:40,
                    width:40,
                    backgroundColor:primaryColor,
                     borderTopRightRadius:10,
                     borderBottomRightRadius:10,
                     alignItems:'center',
                     justifyContent:'center',
                     paddingLeft:10,
                    }}>
                        <Image source={require('../assets/test/searchicon.png')} 
                        style={{ height: 35, width: 35, marginRight: 10,tintColor:'#fff' }} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default SearchHeader;
