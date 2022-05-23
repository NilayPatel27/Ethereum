import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useState} from 'react';
import FormContainer from './FormContainer';
import Forminput from './Forminput';
import FormSubmit from './FormSubmit';
import {isValidEmail, isValidObjField, updateError} from '../Utils/Method';

const SignupForm = () => {
  const [Error, setError] = useState('');
  const [userInfo, setuserInfo] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const {fullName, email, password, confirmPassword} = userInfo;

  const handalOnChangeText = (value, fieldName) => {
    setuserInfo({...userInfo, [fieldName]: value});
  };

  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError('Required all fields!', setError);
    if (!fullName.trim() || fullName.length < 3)
      return updateError('Invalid Name!', setError);
    if (!isValidEmail(email)) return updateError('Invaild Email!', setError);
    if (!password.trim() || password.length < 8)
      return updateError('Password is less then 8 characters!', setError);
    if (password !== confirmPassword)
      return updateError('Password does not match!', setError);

    return true;
  };

  const submitForm = () => {
    if (isValidForm()) {
      console.log(userInfo);
    }
  };
  return (
    <FormContainer>
      {Error ? (
        <Text
          style={{color: 'red', textAlign: 'center', justifyContent: 'center'}}>
          {Error}
        </Text>
      ) : null}
      <Forminput
        value={fullName}
        onChangeText={value => handalOnChangeText(value, 'fullName')}
        lable="Full Name"
        placeholder="Enter Your Full Name"
      />
      <Forminput
        value={email}
        autoCapitalize="none"
        onChangeText={value => handalOnChangeText(value, 'email')}
        lable="Email"
        placeholder="Enter Your email-Id"
      />
      <Forminput
        value={password}
        autoCapitalize="none"
        onChangeText={value => handalOnChangeText(value, 'password')}
        secureTextEntry
        lable="Password"
        placeholder="Enter Your Password"
      />
      <Forminput
        value={confirmPassword}
        autoCapitalize="none"
        onChangeText={value => handalOnChangeText(value, 'confirmPassword')}
        secureTextEntry
        lable="Confirm Password"
        placeholder="ReEnter Your Password"
      />
      <FormSubmit onPress={submitForm} title="Sign Up" />
    </FormContainer>
  );
};

export default SignupForm;

const styles = StyleSheet.create({});
