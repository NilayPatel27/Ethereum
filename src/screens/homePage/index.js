import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import {selectAddress} from '../../../counterSlice';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  RefreshControl
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import CoinItem from '../ethereum/coinItem';
import axios from 'axios';

const HomePage = ({navigation}) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  
   const getMarketData = async (pageNumber = 1) => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h`)
      return response.data;
    } catch (e) {
      console.log(e)
    }
  }
  const fetchCoins = async (pageNumber) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData(pageNumber);
    setCoins((existingCoins) => [...existingCoins, ...coinsData]);
    setLoading(false);
  };

  const refetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData();
    setCoins(coinsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  // const route = useRoute();
  var address = useSelector(selectAddress);
  const array = [{name: 'ETH'}];
  // BackHandler.addEventListener('hardwareBackPress', () => {
  //   if(route.name === 'HomePage'){
  //   console.log('back');
  //   }
  //   // BackHandler.exitApp()
  //   // return true;
  // });

  const renderItem = ({item, index}) => {
    return (
      <>
        <TouchableOpacity onPress={() => navigation.navigate('Accounts')}>
          <View style={styles.container} key={index}>
            <Text style={{fontSize: 20, color: '#fff'}}>{item.name}</Text>
            <Text style={{fontSize: 20, color: '#fff'}}>{address.length}</Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <>
      <View style={{flex: 1, backgroundColor: '#fff',flexDirection:'column'}}>

        <FlatList
          data={array}
          renderItem={({item, index}) => renderItem({navigation, item, index})}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{padding:10}}
        />
        <FlatList
        data={coins}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
        onEndReached={() => fetchCoins(coins.length / 50 + 1)}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor="white"
            onRefresh={refetchCoins}
          />
        }
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
    </>
  );
};

export default HomePage;
const styles = StyleSheet.create({
  container: {
    width: '95%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#14213D',
    alignSelf: 'center',
    // marginTop: 20,
    // marginBottom:10,
    padding: 10,
    borderRadius: 5,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
  },
  text: {
    color: "white",
    marginRight: 5,
  },
  coinContainer: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#282828",
    padding: 15,
  },
  rank: {
    fontWeight: 'bold',
    color: 'white',
  },
  rankContainer: {
    backgroundColor: '#585858',
    paddingHorizontal: 5,
    borderRadius: 5,
    marginRight: 5,
  }
});
