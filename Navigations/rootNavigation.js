import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Button, Switch, ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Counter from '../Counter';
import CreateAccount from '../src/screens/createAccount';
import CreateMnemonics from '../src/screens/createMnemonics';
import ConfirmMnemonics from '../src/screens/confirmMnemonics';
import ConfirmBox from '../src/screens/confirmMnemonics/ConfirmBox';
import HomePage from '../src/screens/homePage';
import Ethereum from '../src/screens/ethereum';
import ImportAccount from '../src/screens/importAccount';
import RBSheet from "react-native-raw-bottom-sheet";
import WalletPage from '../src/screens/ethereum/walletPage';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddress, view } from '../counterSlice';
import BuyEther from '../src/screens/buyEther';
import SendEther from '../src/screens/send/index';
import AmountPage from '../src/screens/confirmTransaction/amountPage';
import CofirmTransaction from '../src/screens/confirmTransaction/cofirmTransaction';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Test from '../test';
import NewSplash from '../src/screens/NewSplash';
import CoinItem from '../src/screens/ethereum/coinItem';
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: true,
  headerTintColor: "#fff",
  headerStyle: {
    backgroundColor: '#2c2e3b',
  },
  headerTitleStyle: {
    color: 'white',
    fontSize: 30,
  }
};
const rootNavigation = ({ loginValue }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const dispatch = useDispatch();
  var address = useSelector(selectAddress);

  // console.log('address',address);

  // setTimeout(() => {
  //   console.log('address',address);
  // }, 1000);
  // useEffect(() => {
  //   AsyncStorage.getItem('login').then(value => {
  //     console.log('value', value);
  //   }).catch(err => {
  //     console.log('err', err);
  //   });
  // }, [])

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    {
      isEnabled ?
        ToastAndroid.show('Left handed view enabled', ToastAndroid.SHORT) :
        ToastAndroid.show('Right handed view enabled', ToastAndroid.SHORT)
    }
    dispatch(view(!isEnabled));
  }

  console.log('loginValue', loginValue);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={loginValue === "true" ? 'HomePage' : 'CreateAccount'}
        screenOptions={screenOptions}>
        {/* <Stack.Screen name="NewSplash" component={NewSplash} loginValue={loginValue} /> */}
        {/* <Stack.Screen name='NewSplash' options={{ title: 'NewSplash' }}>
          {(props) => <NewSplash {...props} />}
        </Stack.Screen> */}
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="BuyEther" component={BuyEther} />
        <Stack.Screen name="SendEther" component={SendEther} />
        <Stack.Screen name="CreateMnemonics" component={CreateMnemonics} />
        <Stack.Screen name="ConfirmMnemonics" component={ConfirmMnemonics} />
        <Stack.Screen name="ConfirmBox" component={ConfirmBox} />
        <Stack.Screen name="AmountPage" component={AmountPage} />
        <Stack.Screen name="CofirmTransaction" component={CofirmTransaction} />
        <Stack.Screen name="HomePage" options={({ navigation }) => ({
          headerTitle: 'Dashboard',
          headerRight: () => (
            <>
              {/* <Switch
                style={{}}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              /> */}
            </>
          )
        }
        )} component={HomePage} />
        <Stack.Screen name="Accounts" component={Ethereum} />
        <Stack.Screen name="ImportAccount" component={ImportAccount} />
        <Stack.Screen name="WalletPage" component={WalletPage} />
        <Stack.Screen name="CoinItem" component={CoinItem} />
      </Stack.Navigator>
    </NavigationContainer >
  );
};

export default rootNavigation;
