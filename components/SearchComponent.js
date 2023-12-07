import React from 'react';
import {View,StyleSheet,Image,TouchableOpacity} from 'react-native'
import { Text } from 'react-native-paper';

function SearchComponent({name, srcImg}) {
    return ( 
        <TouchableOpacity 
            style={{
                height:100,
                width:'50%',
                flexDirection:'row',
                alignItems:'center',
              
                }}>
            <Image source={srcImg} style={{height:100,width:100}}/>
            <Text style={{fontSize:16,color:'#000',}}>{name}</Text>
        </TouchableOpacity>
     );
}

export default SearchComponent;