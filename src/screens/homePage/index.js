import {ethers} from 'ethers';
import converter from 'number-to-words';
import React,{useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {addressArray,selectAddress,selectView} from '../../../counterSlice';
// var SharedPreferences = require('react-native-shared-preferences');
import SharedPreferences from 'react-native-shared-preferences';
import firestore from '@react-native-firebase/firestore';
import SensitiveInfoStorage from "react-native-sensitive-info";

const HomePage = ({navigation, route}) => {
  const dispatch = useDispatch();
  var sideview = useSelector(selectView);
  var address = useSelector(selectAddress);
  const [balances, setbalances] = useState(null);
  const [object, setobject] = useState({});
  const [res, setres] = useState(false);

useEffect(() => {
    bal();
    console.log('sideview',sideview);
    console.log('wallet',route.params.wallet);
    SharedPreferences.setName("name");
    let wallet = route.params.wallet;
    // SharedPreferences.setItem("wallet1",wallet);
for (const [key, value] of Object.entries(route.params.wallet)) {
  console.log(`${key}: ${value}`);
  setobject(data => ({...data, [key]: value}));
}

    // console.log('wallet',JSON.stringify(route.params.wallet));
    // const jsn = JSON.stringify(route.params.wallet);
    console.log(wallet instanceof ethers.Wallet);
    // console.log('jsn',jsn);
    // let json = JSON.parse(jsn);
    // console.log(json instanceof ethers.Wallet);
    // // json =json.connect(PROVIDER);
    // console.log('json',json);
    // console.log('json',json);
    let obj = {
      name: converter.toWordsOrdinal(address.length),
      address:route.params.wallet.address,
      wallet:route.params.wallet,
      privateKey:route.params.wallet.privateKey,
    }
  //   SensitiveInfoStorage.setItem('@Storage/Wallet',JSON.stringify(route.params.wallet),{
  //     sharedPreferencesName: '@BitWalletPrefs-712638173',
  //     keychainService: '@BitWalletKeychain-513961259'
  // });
    // firestore().collection('users').onSnapshot(snapshot => {
    //   let users = [];
    //   snapshot.forEach(doc => {
    //     users.push({...doc.data(), id: doc.id});
    //   }
    //   );
    //   console.log('users',users);

    // })
    // let a=[route.params.wallet]
    // firestore().collection('users').add({Array:JSON.stringify(a)}).then(()=>{
    //   console.log('added');
    // }
    // ).catch(()=>{
    //   console.log('error');
    // }
    // );
    for(let i = 0; i < address.length; i++){
      if(address[i].address === route.params.wallet.address){
        return;
      }
    }
    console.log('pk',route.params.wallet.privateKey);

    dispatch(addressArray(obj));
    // dispatch(addressArray(JSON.stringify(route.params.wallet)));
    setres(true);
}, [])

const js =() => {
  let pk = route.params.wallet.privateKey;
  try {
    if (pk.indexOf('0x') !== 0) pk = `0x${pk}`;
    const PROVIDER = new ethers.getDefaultProvider('ropsten');
    const wallet = new ethers.Wallet(pk, PROVIDER);
    console.log('walletFromPrivateKey',wallet);
    // return new ethers.Wallet(pk,PROVIDER);
  } catch (e) {
    console.log(e)
    throw new Error('invalid private key');
  }

  // console.log('js');
  // console.log(route.params.wallet);
  // console.log(object);

//   SensitiveInfoStorage.getItem('@Storage/Wallet', {
//     sharedPreferencesName: '@BitWalletPrefs-712638173',
//     keychainService: '@BitWalletKeychain-513961259'
// }).then(item => console.log(JSON.parse(item) || ''));
  let json = JSON.stringify(route.params.wallet);
  console.log('json',json);

  let onj = JSON.parse(json);
  // console.log(object instanceof ethers.Wallet)
  console.log('onj',onj);
  console.log(address)
}

res===true?js():null;
// console.log(object)

const array = [
  {
    name: 'ETH',
    balance: balances,
  },
];
  const bal = async () => {
    const provider = ethers.getDefaultProvider('ropsten');
    var balance = await provider.getBalance(route.params.wallet.address);
    setbalances(Number(balance));
    return balance;
  };
  const renderItem = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Ethereum', {wallet: route.params.wallet,balances})
          }>
          <View
            style={{
              width: '90%',
              justifyContent: 'space-between',
              flexDirection: 'row',
              backgroundColor: 'lightblue',
              alignSelf: 'center',
              marginTop: 20,
              padding: 10,
              borderRadius: 5,
            }}>
            <Text style={{fontSize: 20, color: '#000'}}>{item.name}</Text>
        <Text style={{fontSize:20,color:"#000"}}>{item.balance}</Text>
          </View>
        </TouchableOpacity>
        
      </>
    );
  };
  return (
    <>
      <View style={{flex: 1, backgroundColor: '#14213D'}}>
        <FlatList
          data={array}
          renderItem={({item, index}) => renderItem({navigation, item, index})}
        />
      </View>
    </>
  );
};

export default HomePage;
