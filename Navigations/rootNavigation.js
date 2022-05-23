import Test from '../test';
import React,{useContext, useState} from 'react';
import { view } from '../counterSlice';
import { useDispatch } from 'react-redux';
import HomePage from 'screens/homePage';
import Ethereum from 'screens/ethereum';
import BuyEther from 'screens/buyEther';
import {Switch, ToastAndroid} from 'react-native';
import SendEther from 'screens/send/index';
import CreateAccount from 'screens/createAccount';
import ImportAccount from 'screens/importAccount';
import WalletPage from 'screens/ethereum/accounts';
import {NavigationContainer} from '@react-navigation/native';
import CreateMnemonics from 'screens/createMnemonics';
import CoinDetails from 'screens/ethereum/coinDetails';
import ConfirmMnemonics from 'screens/confirmMnemonics';
import ConfirmBox from 'screens/confirmMnemonics/ConfirmBox';
import AmountPage from 'screens/confirmTransaction/amountPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CofirmTransaction from 'screens/confirmTransaction/cofirmTransaction';
import { ThemeContext } from 'src/Context/themeContext';
import FirstScreen from 'screens/loginSignUp/FirstScreen';
import LoginOptionScreen from 'screens/loginSignUp/LoginOptionScreen';
import LoginPageScreen from 'screens/loginSignUp/LoginPageScreen';
import PinVarificationScreen from 'screens/loginSignUp/PinVarificationScreen';
import SignUpPageScreen from 'screens/loginSignUp/SignUpPageScreen';

const Stack = createNativeStackNavigator();

const rootNavigation = ({ loginValue }) => {
  const { back, textColor } = useContext(ThemeContext);

  const screenOptions = {
    headerShown: false,
    headerTintColor: "#fff",
    headerStyle: {
      backgroundColor: back,
    },
    headerTitleStyle: {
      color: textColor,
      fontSize: 30,
    }
  };
  const [isEnabled, setIsEnabled] = useState(false);
  const dispatch = useDispatch();
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
        initialRouteName={loginValue === "true" ? 'Test' : 'FirstScreen'}
        screenOptions={screenOptions}>
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="LoginOptionScreen" component={LoginOptionScreen} />
        <Stack.Screen name="LoginPageScreen" component={LoginPageScreen} />
        <Stack.Screen name="SignUpPageScreen" component={SignUpPageScreen} />
        <Stack.Screen name="PinVarificationScreen" component={PinVarificationScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="BuyEther" component={BuyEther} />
        <Stack.Screen name="SendEther" component={SendEther} />
        <Stack.Screen name="CreateMnemonics" component={CreateMnemonics} />
        <Stack.Screen name="ConfirmMnemonics" component={ConfirmMnemonics} />
        <Stack.Screen name="ConfirmBox" component={ConfirmBox} />
        <Stack.Screen name="AmountPage" component={AmountPage} />
        <Stack.Screen name="CofirmTransaction" component={CofirmTransaction} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Accounts" component={Ethereum} />
        <Stack.Screen name="ImportAccount" component={ImportAccount} />
        <Stack.Screen name="CoinDetails" component={CoinDetails} options={{headerShown:false}} />
        <Stack.Screen name="WalletPage" component={WalletPage} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer >
  );
};

export default rootNavigation;
