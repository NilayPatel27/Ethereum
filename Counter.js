import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, Button} from 'react-native';
import {decrement, increment, selectCount} from './counterSlice';

const Counter = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Increment value" onPress={() => dispatch(increment())} />
      <Text style={{color: 'red', fontSize: 25}}>{count}</Text>
      <Button title="Decrement value" onPress={() => dispatch(decrement())} />
    </View>
  );
};
export default Counter;
