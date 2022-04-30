import React,{useRef,useState} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Counter from '../Counter';
import CreateAccount from '../src/screens/createAccount';
import CreateMnemonics from '../src/screens/createMnemonics';
import ConfirmMnemonics from '../src/screens/confirmMnemonics';
import ConfirmBox from '../src/screens/confirmMnemonics/confirmBox';
import HomePage from '../src/screens/homePage';
import Ethereum from '../src/screens/ethereum';
import ImportAccount from '../src/screens/importAccount';
import RBSheet from "react-native-raw-bottom-sheet";


const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: true,
};
const rootNavigation = () => {
  const refRBSheet = useRef();
  const textValue = useRef();
const [privateKey, setprivateKey] = useState('');
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CreateAccount"
        screenOptions={screenOptions}>
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="CreateMnemonics" component={CreateMnemonics} />
        <Stack.Screen name="ConfirmMnemonics" component={ConfirmMnemonics} />
        <Stack.Screen name="ConfirmBox" component={ConfirmBox} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Ethereum"  options={({navigation}) => ({
          headerTitle: 'Ethereum',
          headerRight: () => (
            <>
            <TouchableOpacity onPress={()=>refRBSheet.current.open()}>
            <Image
              source={require('../src/assets/PNG/Ethereum.png')}
              style={{width: 30, height: 30}}
            />
            </TouchableOpacity>
            <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
              animationType: "fade",
            },
            draggableIcon: {
              backgroundColor: "#1e90ff"
            },
          }}
          closeOnPressMask={true}
          height={200}
        >
          <View style={{flex:1,padding:10}}>
         <Text style={{textAlign:"center"}}>Enter Private key to import account</Text>
         <TextInput
          ref={textValue}
          style={{height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:5,marginTop:10}}
          onChangeText={(text) => {
            setprivateKey(text);
          }}/>
          <Button
          title="Import"
          onPress={()=>{
            console.log(privateKey);
          }}
          />
         </View>
        </RBSheet>
            </>
          )} 
          )} component={Ethereum} />
          <Stack.Screen name="ImportAccount" component={ImportAccount} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default rootNavigation;
