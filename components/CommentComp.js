import React from "react";
import {View,Text,Image} from 'react-native'
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { whiteColor,textColor } from "../assets/color";
function CommentComp({name,starRating,imgUser,text,imgUrl}) {
    return ( 
        
        <View>
          <View style={{flexDirection:'row',alignItems:'center',marginTop:20}}>
            { imgUrl ?
              (<Image source={{uri:imgUrl}} style={{height:30,width:30,borderRadius:30,marginRight:10}}/>)
            :(<Image source={require('../assets/test/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA2L3Y5MzctYWV3LTE2NS5qcGc.png')} style={{height:30,width:30,borderRadius:30,marginRight:10}}/>)
            }
            <Text style={{color:textColor,fontSize:16,fontWeight:'bold'}}>{name}</Text>
          </View>
            <View style={{marginTop:10,marginLeft:25}}>
              <StarRatingDisplay
              rating={starRating}
              starSize={20}
              />
              <Text style={{fontSize:15,color:textColor,marginLeft:5,marginTop:10,marginBottom:20}}>
                {text}
                </Text>
              {imgUrl ? (<Image source={{uri:imgUrl}} style={{width:100,height:100}}/>):<></>}
            </View>
        </View>
     );
}
import { Form } from "formik";

export default CommentComp;