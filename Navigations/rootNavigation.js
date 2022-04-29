import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Counter from '../Counter';
import createAccount from '../src/screens/createAccount/index';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: true,
};
const rootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CreateAccount"
        screenOptions={screenOptions}>
        <Stack.Screen name="CreateAccount" component={createAccount} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default rootNavigation;
