import React from 'react';
import {Image,TouchableOpacity} from 'react-native'
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

function SearchComponent({name, srcImg,category}) {
    const navigation = useNavigation()
    return ( 
        <TouchableOpacity 
            style={{
                height:100,
                width:'50%',
                flexDirection:'row',
                alignItems:'center',
              
                }}
                onPress={()=> { navigation.navigate('Categories',{category:category})}}
                >
            <Image source={srcImg} style={{height:100,width:100}}/>
            <Text style={{fontSize:16,color:'#000',}}>{name}</Text>
        </TouchableOpacity>
     );
}

export default SearchComponent;