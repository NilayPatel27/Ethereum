import React,{useState} from 'react';
import {Switch, ToastAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateAccount from '../src/screens/createAccount';
import CreateMnemonics from '../src/screens/createMnemonics';
import ConfirmMnemonics from '../src/screens/confirmMnemonics';
import ConfirmBox from '../src/screens/confirmMnemonics/ConfirmBox';
import HomePage from '../src/screens/homePage';
import Ethereum from '../src/screens/ethereum';
import ImportAccount from '../src/screens/importAccount';
import WalletPage from '../src/screens/ethereum/accounts';
import { useDispatch } from 'react-redux';
import { view } from '../counterSlice';
import BuyEther from '../src/screens/buyEther';
import SendEther from '../src/screens/send/index';
import AmountPage from '../src/screens/confirmTransaction/amountPage';
import CofirmTransaction from '../src/screens/confirmTransaction/cofirmTransaction';
import Test from '../test';
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
        <Stack.Screen name="Test" component={Test} />
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
        <Stack.Screen name="WalletPage" component={WalletPage} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer >
  );
};

export default rootNavigation;
