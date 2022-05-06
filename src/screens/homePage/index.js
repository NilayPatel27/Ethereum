import {ethers} from 'ethers';
import converter from 'number-to-words';
import React,{useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {addressArray,selectAddress,selectView} from '../../../counterSlice';

const HomePage = ({navigation, route}) => {
  const dispatch = useDispatch();
  var sideview = useSelector(selectView);
  var address = useSelector(selectAddress);
  const [balances, setbalances] = useState(null);

useEffect(() => {
    bal();
    console.log('sideview',sideview);
    console.log('wallet',route.params.wallet);
    let obj = {
      name: converter.toWordsOrdinal(address.length),
      address:route.params.wallet.address,
      wallet:route.params.wallet
    }
    for(let i = 0; i < address.length; i++){
      if(address[i].address === route.params.wallet.address){
        return;
      }
    }
    dispatch(addressArray(obj));
}, [])

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
