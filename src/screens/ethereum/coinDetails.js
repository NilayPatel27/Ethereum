import axios from 'axios';
import { useSelector } from 'react-redux';
import Back from '../../assets/BackButton.svg'
import React, { useEffect, useState } from 'react';
import { selectAddress } from '../../../counterSlice';
import FilterComponent from "../ethereum/filterComponent";
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { LineChart, CandlestickChart } from "react-native-wagmi-charts";
import { View, Text, ActivityIndicator, Dimensions, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'

const screenWidth = Dimensions.get('window').width;

const CoinDetails = gestureHandlerRootHOC(({navigation ,route}) => {
  const { marketCoin, ID } = route.params;
  let allAddress = useSelector(selectAddress);
  const [res, setres] = useState(false);
  const [coin, setCoin] = useState(null);
  const [load, setload] = useState(false);
  const [usdValue, setUsdValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [coinValue, setCoinValue] = useState("1");
  const [transaction, settransaction] = useState([]);
  const [selectedRange, setSelectedRange] = useState("1");
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [coinCandleChartData, setCoinCandleChartData] = useState(null);
  const [isCandleChartVisible, setIsCandleChartVisible] = useState(false);

  useEffect(() => {
  // axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${allAddress[0].address}&startblock=0&endblock=99999999&page=1&offset=999&sort=desc&apikey=349IQMJ71CEBWJ65I1U5G5N5NG43C37UZB`).then(res => {
  //   settransaction(res.data.result);
    fetchMarketCoinData(1);
    fetchCoinData();
    fetchCandleStickChartData();
    setres(true);
  // });
}, []);

const fetchCoinData = async () => {
    setLoading(true);
    const fetchedCoinData = await getDetailedCoinData(ID);
    setCoin(fetchedCoinData);
    setUsdValue(fetchedCoinData.market_data.current_price.usd.toString());
    setLoading(false);
  };

  const fetchCoinDatas = async () => {
    const fetchedCoinData = await getDetailedCoinData(ID);
    setCoin(fetchedCoinData);
  }
  const getCoinMarketChart = async (coinId, selectedRange) => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${selectedRange}&interval=hourly`)
      return response.data;
    } catch (e) {
      console.log(e)
    }
  }

  const getCandleChartData = async (coinId, days = 1) => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`)
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
  const getDetailedCoinData = async (coinId) => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`)
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
  const fetchMarketCoinData = async (selectedRangeValue) => {
    const fetchedCoinMarketData = await getCoinMarketChart(
        ID,
        selectedRangeValue
    );
    setCoinMarketData(fetchedCoinMarketData);
  };

  const fetchCandleStickChartData = async (selectedRangeValue) => {
    const fetchedSelectedCandleChartData = await getCandleChartData(
      ID,
      selectedRangeValue
    );
    setCoinCandleChartData(fetchedSelectedCandleChartData);
  };
  const onSelectedRangeChange = (selectedRangeValue) => {
    setSelectedRange(selectedRangeValue);
    fetchMarketCoinData(selectedRangeValue);
    fetchCandleStickChartData(selectedRangeValue);
  };
  const memoOnSelectedRangeChange = React.useCallback((range) => {
      setload(true);
      onSelectedRangeChange(range);
        setTimeout(() => {
        setload(false);
        }, 1000);
        },[]
    );
    const filterDaysArray = [
        { filterDay: "1", filterText: "24h" },
        { filterDay: "7", filterText: "7d" },
        { filterDay: "30", filterText: "30d" },
        { filterDay: "365", filterText: "1y" },
        { filterDay: "max", filterText: "All" },
      ];
      const changeCoinValue = (value) => {
        console.log(value);
          setCoinValue(value);
          const floatValue = parseFloat(value.replace(",", ".")) || 0;
          setUsdValue(Number((floatValue * current_price)).toFixed(2));
        };
  
        const changeUsdValue = (value) => {
          setUsdValue(value);
          const floatValue = parseFloat(value.replace(",", ".")) || 0;
          setCoinValue(Number((floatValue / current_price)).toFixed(2));
        };
      
      if (loading || !coin || !coinMarketData || !coinCandleChartData) {
        return <ActivityIndicator size="large" color="#0000ff" style={{flex:1,justifyContent:"center",alignItems:"center",flexDirection:"row"}} />;
    }
    const { prices } = coinMarketData;
    const {
      id,
      name,
      current_price,
      market_cap_rank,
      price_change_percentage_24h,
      symbol,
      market_cap,
      image,
  } = marketCoin;
  console.log(current_price)

    
  return (
    <>
      <View style={{flexDirection:'row',height:60,justifyContent:"space-between",width:"100%",alignSelf:"center",backgroundColor:'#2c2e3b',alignItems:"center",padding:10}}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
              <Back height={30} width={30} fill={'#fff'} style={{marginRight:10}}/>
          </TouchableOpacity>

            <View style={{backgroundColor:"transparent",flexDirection:"row",flex:1,alignItems:'center'}}>
              <Image
                    source={{ uri: image }}
                    style={{
                        height: 40,
                        width: 40,
                        // marginRight: 10,
                        alignSelf: "center",
                    }}
                />
                <View style={{flexDirection:"column",justifyContent:"space-evenly",alignItems:"flex-start",marginLeft:10}}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{color:"#fff",fontSize:20,fontWeight:'bold'}}>{symbol.toUpperCase()}</Text>
                        <Text style={{color:price_change_percentage_24h<0?'#ea3943':'#16c784',fontSize:20,fontWeight:'bold',marginLeft:10}}>{price_change_percentage_24h?.toFixed(2)}%</Text>
                    </View>
                    <Text style={{color:"#fff",fontSize:20,fontWeight:'bold'}}>${current_price}</Text>
                </View>
            </View>
        </View>
    <View style={{ paddingHorizontal: 10 ,backgroundColor:"#2B2B2B",flex:1,justifyContent:"flex-start",alignItems:"center",paddingTop:20}}>
        <View style={style.filtersContainer}>
            {filterDaysArray.map((day) => (
                <FilterComponent
                filterDay={day.filterDay}
                filterText={day.filterText}
                selectedRange={selectedRange}
                setSelectedRange={memoOnSelectedRangeChange}
                key={day.filterText}
                />
            ))}
            {isCandleChartVisible ? (
                <TouchableOpacity onPress={()=>setIsCandleChartVisible(false)} style={{justifyContent:"center"}}>
            <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/PNG/candlechart.png')}/>
            </TouchableOpacity>
          ) : (
              <TouchableOpacity onPress={()=>setIsCandleChartVisible(true)} style={{justifyContent:"center"}}>
            <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/PNG/linechart.png')}/>
            </TouchableOpacity>
          )}
        </View>
        <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "row", flex: 1 }}>
                <Text style={{ color: "#fff", alignSelf: "center" }}>
                  {symbol.toUpperCase()}
                </Text>
                <TextInput
                  style={style.input}
                  value={coinValue}
                  keyboardType="numeric"
                  onChangeText={number =>changeCoinValue(number)}
                />
            </View>
            <View style={{ flexDirection: "row", flex: 1 }}>
                <Text style={{ color: "#fff", alignSelf: "center" }}>USD</Text>
                <TextInput
                  style={style.input}
                  value={usdValue}
                  keyboardType="numeric"
                  onChangeText={number =>changeUsdValue(number)}
                />
            </View>
        </View>
        
              {load ==false?isCandleChartVisible ? 
                <CandlestickChart.Provider data={coinCandleChartData.map(([timestamp, open, high, low, close]) => ({timestamp,open,high,low,close}))}>
                    <CandlestickChart height={screenWidth / 2} width={screenWidth}>
                        <CandlestickChart.Candles  />
                        <CandlestickChart.Crosshair>
                            <CandlestickChart.Tooltip style={{color:"red"}} />
                        </CandlestickChart.Crosshair>
                    </CandlestickChart>
                    <View style={style.candleStickDataContainer}>
                        <View style={style.commonCandleView}>
                            <Text style={style.candleStickTextLabel}>Open</Text>
                            <CandlestickChart.PriceText
                            style={style.candleStickText}
                            type="open"/>
                        </View>
                        <View style={style.commonCandleView}>
                            <Text style={style.candleStickTextLabel}>High</Text>
                            <CandlestickChart.PriceText
                            style={style.candleStickText}
                            type="high"/>
                        </View>
                        <View style={style.commonCandleView}>
                            <Text style={style.candleStickTextLabel}>Low</Text>
                            <CandlestickChart.PriceText
                            style={style.candleStickText}
                            type="low"/>
                        </View>
                        <View style={style.commonCandleView}>
                            <Text style={style.candleStickTextLabel}>Close</Text>
                            <CandlestickChart.PriceText
                            style={style.candleStickText}
                            type="close"/>
                        </View>
                    </View>
                    <CandlestickChart.DatetimeText style={{ color: "white", fontWeight: "700", margin: 10 }}/>
                </CandlestickChart.Provider>
            :<LineChart.Provider data={prices.map(([timestamp, value]) => ({ timestamp, value }))}>
                <LineChart height={screenWidth / 2} width={screenWidth}>
                    <LineChart.Path color='#16c784'>
                        <LineChart.Gradient color="#16c784" />
                    </LineChart.Path>
                    <LineChart.CursorCrosshair >
                        <LineChart.Tooltip  textStyle={{color:"#fff",backgroundColor:"#16c784",borderRadius:10,textAlign:'center'}}/>
                    </LineChart.CursorCrosshair>
                </LineChart>
                <LineChart.PriceText style={{color:"#fff"}} />
                <LineChart.DatetimeText style={{color:"#fff"}} />
            </LineChart.Provider>
            :<ActivityIndicator  size="small" color="#0000ff" style={{flex:1,justifyContent:"center",alignItems:"center",flexDirection:"row"}}/>}
    </View>
    </>
  )
});

export default CoinDetails;
const style = StyleSheet.create({
    commonCandleView:{
        flexDirection:"column",
        justifyContent:"space-evenly",
        alignItems:"center",
        width:"25%"
    },
    input: {
        flex: 1,
        height: 40,
        margin: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#fff",
        padding: 10,
        fontSize: 16,
        color: "#fff",
      },
      filtersContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#16c784",
        paddingVertical: 5,
        borderRadius: 5,
        // marginVertical: 10,
        // marginBottom: 20,
        width:"95%",
        // position:"absolute",
        // top:20
      },
      candleStickText: {
        color: "white",
        fontWeight: "700",
      },
      candleStickDataContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width:"100%",
      },
      candleStickTextLabel: {
        color: 'grey',
        fontSize: 13,
      }
  });