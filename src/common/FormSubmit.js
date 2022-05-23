import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const FormSubmit = ({title,onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={{fontSize: 18, color: '#fff'}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default FormSubmit;

const styles = StyleSheet.create({
  container: {
    height: 45,
    backgroundColor: 'rgba(27,27,51,1)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
