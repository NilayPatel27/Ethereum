import {StyleSheet, Text, View, Dimensions, TextInput} from 'react-native';
import React, { useState } from 'react';
import FormContainer from './FormContainer';
import Forminput from './Forminput';
import FormSubmit from './FormSubmit';
import {isValidEmail, isValidObjField, updateError} from '../Utils/Method';

const LoginForm = () => {
  
  const [userInfo, setuserInfo] = useState({
    email:'',
    password:''
  })

  const [Error, setError] = useState('')
  
  const {email, password} = userInfo;

  const handalOnChangeText=(value,fieldName)=>{
    setuserInfo({...userInfo,[fieldName]:value});
  }

  const isValidForm = () => {
    if(!isValidObjField(userInfo) || password == '') return updateError('required all fields!',setError);
    if(!isValidEmail(email)) return updateError('invaild email!',setError);
    if(!password.trim() || password.length < 8) return updateError('password is less then 8 characters!',setError);
    
    return true;
  
  }

  const submitForm =()=>{
    if(isValidForm()){
      console.log(userInfo);
    }
  }
  return (
    <FormContainer>
      {Error ? (
        <Text
          style={{color: 'red', textAlign: 'center', justifyContent: 'center'}}>
          {Error}
        </Text>
      ) : null}
      <Forminput
        value={email}
        lable="Email"
        onChangeText={(value)=> handalOnChangeText(value,'email')}
        placeholder="Enter Your email-Id"
        autoCapitalize="none"
      />
      <Forminput
        
        value={password}
        lable="Password"
        onChangeText={(value)=> handalOnChangeText(value,'password')}
        placeholder="Enter Your Password"
        secureTextEntry
      />
      <FormSubmit onPress={submitForm} title="Login" />
    </FormContainer>
  );
};

export default LoginForm;

const styles = StyleSheet.create({});
