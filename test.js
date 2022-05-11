import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LineChart, CandlestickChart } from "react-native-wagmi-charts";
import FilterComponent from "./src/screens/ethereum/filterComponent";
import axios from 'axios';


const Test = ({navigation}) => {
    const [coin, setCoin] = useState(null);
    const [coinMarketData, setCoinMarketData] = useState(null);
  const [selectedRange, setSelectedRange] = useState("1");
  const [usdValue, setUsdValue] = useState("");
  const [coinCandleChartData, setCoinCandleChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coinValue, setCoinValue] = useState("1");
  const [isCandleChartVisible, setIsCandleChartVisible] = useState(false);
  const [res, setres] = useState(false);

  
  const onSelectedRangeChange = (selectedRangeValue) => {
    setSelectedRange(selectedRangeValue);
    fetchMarketCoinData(selectedRangeValue);
    fetchCandleStickChartData(selectedRangeValue);
  };

  const memoOnSelectedRangeChange = React.useCallback(
    (range) => onSelectedRangeChange(range),
    []
  );
    const filterDaysArray = [
        { filterDay: "1", filterText: "24h" },
        { filterDay: "7", filterText: "7d" },
        { filterDay: "30", filterText: "30d" },
        { filterDay: "365", filterText: "1y" },
        { filterDay: "max", filterText: "All" },
      ];
    const fetchMarketCoinData = async (selectedRangeValue) => {
        const fetchedCoinMarketData = await getCoinMarketChart(
            'ethereum',
            selectedRangeValue
        );
        setCoinMarketData(fetchedCoinMarketData);
      };

      const fetchCandleStickChartData = async (selectedRangeValue) => {
        const fetchedSelectedCandleChartData = await getCandleChartData(
          'ethereum',
          selectedRangeValue
        );
        setCoinCandleChartData(fetchedSelectedCandleChartData);
      };

      const getCoinMarketChart = async (coinId, selectedRange) => {
        try {
          const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${selectedRange}&interval=hourly`)
          return response.data;
        } catch (e) {
          console.log(e)
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
      const getCandleChartData = async (coinId, days = 1) => {
        try {
          const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`)
          return response.data;
        } catch (e) {
          console.log(e);
        }
      }
      const fetchCoinData = async () => {
        setLoading(true);
        const fetchedCoinData = await getDetailedCoinData('ethereum');
        setCoin(fetchedCoinData);
        setUsdValue(fetchedCoinData.market_data.current_price.usd.toString());
        setLoading(false);
      };
      const screenWidth = Dimensions.get('window').width;

      useEffect(() => {
    fetchMarketCoinData(1);
fetchCoinData();
fetchCandleStickChartData();
    setres(true);

    }, [])
    if (loading || !coin || !coinMarketData || !coinCandleChartData) {
        return <ActivityIndicator size="large" />;
      }
    const { prices } = coinMarketData;

    
  return (
    <View style={{ paddingHorizontal: 10 }}>
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
                    </View>
                     <LineChart.Provider data={prices.map(([timestamp, value]) => ({ timestamp, value }))}>
                        <LineChart height={screenWidth / 2} width={screenWidth}>
                            <LineChart.Path color='red'/>
                            <LineChart.CursorCrosshair color='red'>
                    <LineChart.Tooltip />
                    </LineChart.CursorCrosshair>
                        </LineChart>
                        <LineChart.PriceText 
                        style={{ fontSize: 10, color: '#2d333a' }}
                        />
                        <LineChart.DatetimeText />
                    </LineChart.Provider> 
                    {/* <CandlestickChart.Provider
            data={coinCandleChartData.map(
              ([timestamp, open, high, low, close]) => ({
                timestamp,
                open,
                high,
                low,
                close,
              })
            )}
          >
            <CandlestickChart height={screenWidth / 2} width={screenWidth}>
              <CandlestickChart.Candles />
              <CandlestickChart.Crosshair>
                <CandlestickChart.Tooltip />
              </CandlestickChart.Crosshair>
            </CandlestickChart>
            <View style={style.candleStickDataContainer}>
              <View>
                <Text style={style.candleStickTextLabel}>Open</Text>
                <CandlestickChart.PriceText
                  style={style.candleStickText}
                  type="open"
                />
              </View>
              <View>
                <Text style={style.candleStickTextLabel}>High</Text>
                <CandlestickChart.PriceText
                  style={style.candleStickText}
                  type="high"
                />
              </View>
              <View>
                <Text style={style.candleStickTextLabel}>Low</Text>
                <CandlestickChart.PriceText
                  style={style.candleStickText}
                  type="low"
                />
              </View>
              <View>
                <Text style={style.candleStickTextLabel}>Close</Text>
                <CandlestickChart.PriceText
                  style={style.candleStickText}
                  type="close"
                />
              </View>
            </View>
            <CandlestickChart.DatetimeText
              style={{ color: "white", fontWeight: "700", margin: 10 }}
            />
          </CandlestickChart.Provider> */}
                    <Text style={{color:'red'}}>fello</Text>
                </View>
  )
}

export default Test;
const style = StyleSheet.create({
    firstView:{
        flexDirection:"row",justifyContent:"center",alignItems:"center",width:'100%',backgroundColor:"transparent",height:100
    },
    secondView:{
        width:'100%',height:"100%",justifyContent:"space-evenly",flexDirection:"column",padding:6,paddingLeft:5,backgroundColor:"#202020",
        borderRadius:6,shadowColor: '#002147',shadowOffset: { width: 0, height: 5 },shadowOpacity: 0.34,shadowRadius: 6.27,elevation: 10
    },
    thirdView:{
        alignItems:"flex-start",flexDirection:"row",justifyContent:"space-between",height:"50%",backgroundColor:"transparent"
    },
    fourthView:{
        flexDirection:"column",justifyContent:"space-evenly",height:"100%",width:"60%"
    },
    fifthView:{
        flex:1,height:"100%",backgroundColor:"transparent",flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"
    },
    seventhView:{
        flexDirection:"column",justifyContent:'space-between',alignItems:"center",backgroundColor:"transparent",width:"50%"
    },
    eightView:{
        flexDirection:"row",justifyContent:"space-evenly",backgroundColor:'transparent',alignItems:"center",flex:1
    },
    tabBar:{
        height: 48,backgroundColor:"#fff",width:"35%",flexDirection:"row",justifyContent:"flex-end",alignSelf:"flex-end",marginRight:10,shadowColor:"#fff"
    },
    text:{
        color:"#fff",
        flexWrap:'wrap',
        fontSize:12
    },
    textLeft:{
        color:"#fff",
        flexWrap:'wrap',
        fontSize:12,
        textAlign:"left"
    },
    orange:{
        fontSize:15,fontWeight:'bold',color:'orange'
    },
    mainView:{
      flexDirection: 'column',
      backgroundColor: 'white',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      borderRadius: 20,
      width: '100%',
      height:"30%",
      backgroundColor: 'white'
    },
    button:{
      height: 50,
          width: '60%',
          marginVertical: 10,
          flexDirection: 'row',
          alignItems: "center",
          backgroundColor: "green",
          justifyContent: 'center',
          borderRadius: 25
    },
    container: {
        backgroundColor: '#FFF',
        flex: 0.5,
        alignItems: 'stretch',
        justifyContent: 'space-around',
        padding: 8
    },
    actions: {
        height: 56
    },
    actionsBar: {
        flexDirection: 'row',
        flex: 3
    },
    actionColumn: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    centered: {
        alignSelf: 'center',
        color:"#2d333a"
    },
    containers: {
        marginTop: 0,
        backgroundColor:"#fff"
      },
      scene: {
        flex: 1,
      },
      filtersContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#2B2B2B",
        paddingVertical: 5,
        borderRadius: 5,
        marginVertical: 10,
        marginBottom: 20
      },
      candleStickText: {
        color: "white",
        fontWeight: "700",
      },
      candleStickDataContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginTop: 20,
        backgroundColor:"red"
      },
      candleStickTextLabel: {
        color: 'grey',
        fontSize: 13
      }
  });