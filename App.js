import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigator/RootNavigator';
import { MyContextControllerProvider } from './providers';
import { producData, categoriesData } from './data';
import firestore from '@react-native-firebase/firestore'
import  storage from '@react-native-firebase/storage'
import { MySelf } from './screens';
const db = firestore();
const Users = db.collection('users');
const Products = db.collection('products');
const Categories = db.collection('categories');
const storageRef = storage().ref();  // Chỉnh sửa đây để sử dụng storage()

const initial = async () => {

// Đoạn mã để log giá trị của producData và categoriesData

// Đoạn mã để log đường dẫn của ảnh


  // Khởi tạo một người dùng admin
  const admin = {
    userName: "huutv@tdmu.edu.vn",
    password: "123",
    point: 200,
    address: "Binh Duong",
    role: "user"
  };

  try {
    // Lưu thông tin người dùng admin vào Firestore
    await Users.doc(admin.userName).set(admin);
    console.log("Thêm người dùng mới!");

    // Duyệt qua danh sách sách và tải lên URL ảnh bìa sách từ Storage
    for (const product of producData) {
      const path = 'rz150/' + product.imageUrl150;
      const path2 = 'rz400/' + product.imageUrl400;
      console.log("Path 1:", path);
      console.log("Path 2:", path2);
      try {
        // Lấy URL từ Firebase Storage
        const url = await storageRef.child(path).getDownloadURL();
        const url2 = await storageRef.child(path2).getDownloadURL();
  
        // Cập nhật và lưu thông tin sách vào Firestore
        product.imageUrl150 = url;
        product.imageUrl400 = url2;
        await Products.doc(product.id.toString()).set(product);
        console.log("Thêm sản phẩm mới!");
      } catch (error) {
        console.log(`Lỗi khi tải ảnh từ Storage cho sản phẩm ${product.id}:`, error);
        // Xử lý lỗi nếu cần thiết (ví dụ: dừng lại hoặc thực hiện các bước khác)
      }
    }

    // Duyệt qua danh sách danh mục và lưu vào Firestore
    for (const category of categoriesData) {
      try {
        await Categories.doc(category.id.toString()).set(category);
        console.log("Thêm danh mục mới!");
      } catch (error) {
        console.log("Lỗi khi thêm danh mục vào Firestore: ", error);
      }
    }
  } catch (error) {
    console.log("Lỗi chung khi khởi tạo: ", error);
  }
};



const App = () => {
// initial();
  
const [profileData, setProfileData] = useState(0);
const [productsData, setProductsData] = useState([]);
const [categoriesData, setCategoriesData] = useState([]);
useEffect(() => {
  Users.doc("huutv@tdmu.edu.vn").onSnapshot((u) => setProfileData(u.data()));

  Products.onSnapshot((IstProducts) => {
    const result = [];
    IstProducts.forEach((b) => result.push(b.data()));
    setProductsData(result);
  });

  Categories.get().then((IstCategories) => {
    const result = [];
    IstCategories.forEach((c) => result.push(c.data()));
    setCategoriesData(result);
  });
}, []); // Dependency array is empty, so this useEffect runs only once.

  return (
    <MyContextControllerProvider>
      <SafeAreaProvider>
        <RootNavigator/>
      </SafeAreaProvider>
    </MyContextControllerProvider>
  );
};

export default App;
