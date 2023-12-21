import React, {useState,useEffect} from 'react';
import {View,TouchableOpacity,TextInput,Image,Text,FlatList} from 'react-native'
import { SearchComponent,SearchHeader } from '../components';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

function Search() {
  const navigation = useNavigation()
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  
  const fetchSearchResults = async () => {
    try {
      if (searchKeyword) {
        const querySnapshot = await firestore()
          .collection('products')
          .where('productName', '>=', searchKeyword.toUpperCase())
          .orderBy('productName')
          .get();
  
        const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  useEffect(() => {
    fetchSearchResults();
  }, [searchKeyword]);
  
  

  const SearchResultItem = ({ item }) => (
    <TouchableOpacity
      style={{ height: 50, justifyContent: 'center', paddingLeft: 20 }}
      onPress={() => {
        console.log('Selected:', item.category);
        navigation.navigate('Categories', { category: item.category });
      }}
    >
      <View>
        <Text style={{ fontSize: 16, color: '#000' }}>{item.productName}</Text>
        {/* Thêm các trường khác vào đây nếu cần */}
      </View>
    </TouchableOpacity>
  );

 
    return ( 
        <View style={{backgroundColor:'#fff',flex:1}}>
            <SearchHeader searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword}/>
            {/* result search */}
            <View style={{flex:1,marginTop:5}}>
            {searchKeyword && (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <SearchResultItem item={item} />}
          />

        )}
          
          
            </View>
        {!searchKeyword &&      <View style={{height:'60%',width:'100%'}}>
                  <Text style={{fontSize:20,fontWeight:'bold',color:'#000',marginLeft:10,marginBottom:20}}>Đề xuất tìm kiếm</Text>
                  <View style={{flexDirection:'row',height:'100%',width:'100%',flexWrap:'wrap'}}>
                      <SearchComponent name='Tai nghe' srcImg={require('../assets/test/tainghe.png')} category='TaiNghe'/>
                      <SearchComponent name='Chuột' srcImg={require('../assets/test/chuot.png')} category='Chuot'/>
                      <SearchComponent name='Laptop' srcImg={require('../assets/test/laptop.png')} category='Laptop'/>
                      <SearchComponent name='Bàn phím' srcImg={require('../assets/test/banphim.png')} category='BanPhim'/>
                      <SearchComponent name='Máy ảnh' srcImg={require('../assets/test/mayanh.png')} category='MayAnh'/>
                  </View>
              </View>}
            <View>

            </View>
        </View>
     );
}

export default Search;