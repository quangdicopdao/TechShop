import React, {useState} from 'react';
import {View,Text, Alert} from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth'
import { Formik } from 'formik';
import { primaryColor } from '../assets/color';

function SendPass() {

    const [email, setEmail] = useState('')

    const handleSendPassword = (values) => {
        const {email} = values
        auth().sendPasswordResetEmail(email)
        .then(() =>{
            console.log('Success: Password Reset Email sent.')
            Alert.alert('Thông báo','Đường link đổi mật khẩu đã được chuyển tới email !')
        })
        .catch(err => console.log(err))
    }

    return (  
        <Formik 
                 initialValues={{
                     email: "",
                     }}
                     onSubmit={values => handleSendPassword(values)}
                >
            {({handleBlur,handleChange,handleSubmit,values}) =>(
        <View style={{flex:1, backgroundColor:'#fff'}}>
            <TextInput
            label='Email'
            placeholder='Nhập email của bạn'
            mode='outlined'
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            style={{
                marginTop:10,
                marginLeft:10,
                marginRight:10,
                marginBottom:20
            }}
            />
            <Button mode='contained' style={{
                borderRadius:0,
                marginLeft:10,
                marginRight:10,
                paddingTop:5,
                borderRadius:10,
                paddingBottom:5,
                backgroundColor:primaryColor
            }}
            onPress={handleSubmit}>
                <Text style={{
                    fontSize:18
                }}>Gửi yêu cầu</Text>
            </Button>
        </View>
         )}
         </Formik>
    );
}

export default SendPass;