import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const Forminput = (props) => {
  const { placeholder, lable } = props;
  return (
    <View>
      <Text style={{ fontFamily: 'TitilliumWeb-Regular', }}>{lable}</Text>
      <TextInput
        {...props}
        numberOfLines={1}
        placeholder={placeholder}
        style={styles.input}
      />
    </View>
  )
}

export default Forminput

const styles = StyleSheet.create({

  input: {
    borderColor: '#CFD2D8',
    height: 50,
    borderBottomWidth: 1,
    fontSize: 19,
    marginBottom: 20,
    fontFamily: 'TitilliumWeb-Regular',
  }
})