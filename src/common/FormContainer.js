import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const FormContainer = ({ children }) => {
  return (

    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}>
      {children}
    </KeyboardAvoidingView>

  );
};

export default FormContainer;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 20,
    position: 'absolute',

  },
});
