import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAddress } from '../../../counterSlice';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl
} from 'react-native';
import CoinItem from '../ethereum/coinItem';
import axios from 'axios';
import ShowInfo from '../../assets/showInfo.svg';
import HideInfo from '../../assets/hideInfo.svg';
import { ThemeContext } from '../../Context/themeContext';
import CoinDetails from '../ethereum/coinDetails';

const HomePage = ({ navigation }) => {
  const { back, textColor } = useContext(ThemeContext);

  const [totalBalance, settotalBalance] = useState(0);
  const [res, setres] = useState(false)
  const [data, setdata] = useState([])
  const [info, setInfo] = useState(true)
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  let allAddress = useSelector(selectAddress);

  useEffect(() => {
    console.log('useeffct called')
    for (let i = 0; i < allAddress.length; i++) {
      setdata(data => [...data, allAddress[i].address]);
    }
    fetchCoins();
    setres(true);
  }, [])

  if (res) {
    let addressList = data.join(",");
    axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=balancemulti&address=${addressList}&tag=latest&apikey=349IQMJ71CEBWJ65I1U5G5N5NG43C37UZB`).then(res => {
      res?.data?.result?.map(item => {
        settotalBalance(data => data + item?.balance);
      })
    });
    setres(false);
  }

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

  const Header = () => {
    return (
      <>
        <View style={{ height: 140, backgroundColor: back}} >
          <View style={{ margin: 15, backgroundColor: '#DCDCDC', height: 110, borderRadius: 10, }}>
            <View style={{ backgroundColor: 'rgba(52, 52, 52, 0.9)',borderTopLeftRadius:10,borderTopRightRadius:10, justifyContent: 'space-between', flexDirection: 'row', height: 50, alignItems: 'center' }}>
              <View>
                <Text style={{ fontSize: 20, color: textColor, marginLeft: 15 }}>Total Amount</Text>
              </View>
              <View style={{ marginRight: 15 }}>
                <TouchableOpacity onPress={() => setInfo(!info)}>
                  {info === true ?
                    <HideInfo height={25} width={25} /> : <ShowInfo height={25} width={25} />}
                </TouchableOpacity>
              </View>

            </View >
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'baseline' }}>
              {info === true ?
                <Text style={{ fontSize: 40, color: '#2c2e3b', marginLeft: 15 }}>$0.00</Text> : <Text style={{ fontSize: 40, color: '#2c2e3b', marginLeft: 15 }}>*****</Text>}
              <View style={{ marginRight: 15 }}><Text style={{ fontSize: 15, color: '#2c2e3b', marginLeft: 15 }}>0 Account / 0 Cryptos</Text></View>
            </View>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, color: '#fff', marginLeft: 15 }}>Market</Text>
            </View>
          </View>
        </View>
      </>

    )
  }
  return (
    <>
      <View style={{ flex: 1, backgroundColor: back, flexDirection: 'column' }}>
        
        <FlatList
          data={coins}
          ListHeaderComponent={Header}
          renderItem={({ item }) => <CoinItem marketCoin={item} balance={totalBalance} navigation={navigation} info={info}  />}
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