import React, { useState } from "react";
import { View,Text,StyleSheet,TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { primaryColor } from "../assets/color";
import { Formik } from "formik";
import * as Yup from 'yup'
import { useMyContextController } from "../providers";
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";
function MySelf() {
  
    const [{userLogin}] = useMyContextController()
    const {name,phone,address, email} =userLogin
    const navigation = useNavigation()

    const handleUpdateInfo = async (values) => {
        try {
            const db = firestore();
            const id = email; // Replace this with the actual user ID
    
            // Concatenate 'number' and 'address' fields
            const concatenatedAddress = `${values.number}, ${values.address}`;
    
            // Construct an object with only the fields to be updated
            const updateData = {
                name: values.name,
                phone: values.phone,
                address: concatenatedAddress, // Update 'address' field with the concatenated value
            };
    
            // Update user information in the 'users' collection
            await db.collection('users').doc(id).update(updateData);
    
            console.log("User information updated successfully!");
        } catch (error) {
            console.error("Error updating user information: ", error);
        }
    };
    const validateSchema = Yup.object().shape({
        name: Yup.string().required('Vui lòng nhập Họ và Tên'),
        phone: Yup.string().required('Vui lòng nhập số điện thoại'),
        address: Yup.string().required('Vui lòng nhập địa chỉ'),
        number: Yup.string().required('Vui lòng nhập số nhà, tên đường'),
        
    })
    return (  
        <Formik 
    initialValues={{
        name: name || '',
        phone: phone ||'',
        address: '',
        number: '',
    }}
    onSubmit={(values, { resetForm }) => {
        handleUpdateInfo(values);
        resetForm(); // Optionally reset the form after successful submission
    }}
    validationSchema={validateSchema}
>
        {({handleBlur,handleChange,handleSubmit,values,touched,errors}) =>(
        <View style={styles.container}>
            <Text style={styles.title}>Liên hệ</Text>
            
            <TextInput style={styles.textInput}
            label={'Họ và tên'}
            placeholder="Họ và tên"
            value={values.name}
            onBlur={handleBlur('name')}
            onChangeText={handleChange('name')}
            />
            {touched.name && errors.name && <Text style={{ color: 'red',marginLeft:15 }}>{errors.name}</Text>}

            <TextInput style={styles.textInput}
            label={'Số điện thoại'}
            placeholder="Số điện thoại"
            value={values.phone}
            keyboardType="numeric"
            onBlur={handleBlur('phone')}
            onChangeText={handleChange('phone')}
            />
            {touched.phone && errors.phone && <Text style={{ color: 'red',marginLeft:15 }}>{errors.phone}</Text>}

            <Text style={styles.title}>Địa chỉ</Text>
            <TextInput style={styles.textInput}
            label={'Tỉnh/Thành phố, Quận/Huyện, Phường/Xã'}
            placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
            value={values.address}
            onBlur={handleBlur('address')}
            onChangeText={handleChange('address')}
            />
            {touched.address && errors.address && <Text style={{ color: 'red',marginLeft:15 }}>{errors.address}</Text>}

            <TextInput style={styles.textInput}
            label={'Tên đường , Tòa nhà, Số nhà'}
            placeholder="Tên đường , Tòa nhà, Số nhà"
            value={values.number}
            onBlur={handleBlur('number')}
            onChangeText={handleChange('number')}
            />
            {touched.number && errors.number && <Text style={{ color: 'red',marginLeft:15 }}>{errors.number}</Text>}

            <TouchableOpacity  style={styles.btn} onPress={handleSubmit}>
                <Text style={{color:'#fff', fontSize:16}}>HOÀN THÀNH</Text>
            </TouchableOpacity>
        </View>
        )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff'
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
        backgroundColor:'rgba(207,207,207,0.5)',
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:5,
        marginBottom:10,
    },
    textInput:{
        backgroundColor:'#fff',
        color:'#ccc'
    },
    btn:{
        borderRadius:0,
        marginLeft:5,
        marginRight:5,
        marginTop:10,
        backgroundColor:primaryColor,
        paddingTop:15,
        paddingBottom:15,
        justifyContent:'center',
        alignItems:'center'
    }
})
export default MySelf