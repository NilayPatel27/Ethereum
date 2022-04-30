import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React,{useEffect,useState} from 'react';
import {ethers} from 'ethers';

const HomePage = ({navigation, route}) => {
  // const {wallet} = route.params;
  // console.log(route.params.wallet);
  // for (const [key, value] of Object.entries(route.params.wallet.provider._network)) {
  //     console.log(`${key}: ${value}`);
  //   }


//   const accoutBalance = bal();

//   console.log('ab', accoutBalance);
  

const [balances, setbalances] = useState(null);

useEffect(() => {
    bal();
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
