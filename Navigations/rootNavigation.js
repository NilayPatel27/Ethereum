import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Counter from '../Counter';
import CreateAccount from '../src/screens/createAccount';
import CreateMnemonics from '../src/screens/createMnemonics';
import ConfirmMnemonics from '../src/screens/confirmMnemonics';

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
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="CreateMnemonics" component={CreateMnemonics} />
        <Stack.Screen name="ConfirmMnemonics" component={ConfirmMnemonics} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default rootNavigation;
