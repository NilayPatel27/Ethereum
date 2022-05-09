import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectAddress } from '../../../counterSlice';

const InitialPage = ({navigation}) => {
    var address = useSelector(selectAddress);
    setTimeout(() => {
        // navigation.navigate('HomePage');
        console.log('address',address);
    }, 1000);

  return (
    <View>
      <Text>fd</Text>
    </View>
  )
}

export default InitialPage