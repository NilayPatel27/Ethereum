import axios from 'axios';
import moment from 'moment';
import { ethers } from 'ethers';
import Modal from 'react-native-modal';
import Coin from '../../data/crypto.json';
import { useSelector } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import FilterComponent from "./filterComponent";
import {selectView} from '../../../counterSlice';
// import { MotiView } from '@motify/components';
import React,{useState,useEffect,useRef} from 'react'
import Clipboard from '@react-native-community/clipboard';
import { TabView, SceneMap,TabBar} from 'react-native-tab-view';
import { LineChart, CandlestickChart } from "react-native-wagmi-charts";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ToastAndroid, Share ,TouchableWithoutFeedback,ActivityIndicator,Animated,PanResponder,Dimensions,StatusBar, TextInput} from 'react-native'


const WalletPage = ({navigation,route}) => {
  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [selectedRange, setSelectedRange] = useState("1");
  const [usdValue, setUsdValue] = useState("");
  const [coinCandleChartData, setCoinCandleChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coinValue, setCoinValue] = useState("1");
  const [isCandleChartVisible, setIsCandleChartVisible] = useState(false);

  
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
    
      
      
    // const {prices} = Coin
    
     const screenWidth = Dimensions.get('window').width;
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: () => true,
        //   onPanResponderGrant: () => {
        //     pan.setOffset({
        //       x: pan.x._value,
        //       y: pan.y._value
        //     });
        //   },
        onPanResponderGrant: () => {},
          onPanResponderMove: Animated.event(
            [
              null,
              { dx: pan.x, dy: pan.y }
            ],
            { useNativeDriver: false }
          ),
          onPanResponderRelease: () => {
            Animated.spring(pan, {
                toValue: { x: 0, y: 0 },
                useNativeDriver: true
            }).start();
            if(pan.x._value>100){
                // navigation.navigate('SendEther',{wallet:route.params.wallet});
                console.log('horizontal');
            }
            else if(pan.y._value>100){
                // navigation.navigate('ReceiveEther',{wallet:route.params.wallet});
                console.log('vertical');
            }
          }
        })
      ).current;
  var sideview = useSelector(selectView);
  
  const initialLayout = { width: Dimensions.get('window').width };
  
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Transaction' },
    { key: 'second', title: 'Tokens' },
    // { key: 'third', title: 'Contracts' },
    { key: 'third', title: 'Chart' },

  ]);
    const {address,name} = route.params;
    const [count, setcount] = useState(false);
    const USD =Number('2824.96');
    // let isListGliding = useRef(false);
    const [balances, setbalances] = useState(null);
    const [transaction, settransaction] = useState([]);
    const [res, setres] = useState(false);
    // console.log(address,name)
    useEffect(() => {
        console.log('sideview',sideview)
        axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=balance&address=${address}&apikey=349IQMJ71CEBWJ65I1U5G5N5NG43C37UZB&tag=latest`).then(res => { 
        // console.log(res.data.result)
          setbalances(res.data.result);
      });

      axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=999&sort=desc&apikey=349IQMJ71CEBWJ65I1U5G5N5NG43C37UZB`).then(res => {
        // console.log(res.data.result)
        settransaction(res.data.result);
        fetchMarketCoinData(1);
    fetchCoinData();
    fetchCandleStickChartData();
        setres(true);
      });

    }, [])
    if (loading || !coin || !coinMarketData || !coinCandleChartData) {
        return <ActivityIndicator size="large" />;
    }
    const {
        id,
        image: { small },
        // name,
        symbol,
        market_data: {
            market_cap_rank,
            current_price,
            price_change_percentage_24h,
        },
    } = coin;
    const changeCoinValue = (value) => {
        setCoinValue(value);
        const floatValue = parseFloat(value.replace(",", ".")) || 0;
        setUsdValue((floatValue * current_price.usd).toString());
      };
      const changeUsdValue = (value) => {
        setUsdValue(value);
        const floatValue = parseFloat(value.replace(",", ".")) || 0;
        setCoinValue((floatValue / current_price.usd).toString());
      };
    
    const { prices } = coinMarketData;

    const copyToClipboard =(index)=>{
        ToastAndroid.show('Address Copied to clipboard', ToastAndroid.SHORT);
         return Clipboard.setString(address);
      }
      const share = () => {
             Share.share({
                message: address,
            });
        }
            const renderColumn = (icon, label, action) => (
            <TouchableWithoutFeedback onPress={action}>
                <View style={style.actionColumn}>
                    {/* <Icon name={icon} style={styles.actionIcon} /> */}
                    {icon=='copy'?
                    <Image 
                        source={require('../../assets/PNG/copy.png')}
                        style={{height:25,width:25}}
                    />:<Image 
                    source={require('../../assets/PNG/Send.png')}
                    style={{height:25,width:25}}
                />}
                    <Text style={{color:"#2d333a"}}>{label}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
        const onLayout=(event)=> {
            const {x, y, height, width} = event.nativeEvent.layout;
            // console.log(x, y, height, width);
          }
        //   const LoadingIndicator = ({size}) => {
        //       return(
        //          <MotiView
        //          from ={{
        //             width:size,
        //             height:size,
        //             borderRadius:size/2,
        //             borderWidth:0,
        //             shadowOpacity:0.5
        //          }}
        //          animate={{
        //             width:size+20,
        //             height:size+20,
        //             borderRadius:(size +20)/2,
        //             borderWidth:size/10,
        //             shadowOpacity:1
        //          }}
        //          transition={{
        //              type:'timing',
        //              duration:1000,
        //              loop:true
        //          }}
        //          style={{
        //              width:size,
        //                 height:size,
        //                 borderRadius:size/2,
        //                 borderWidth:size/2,
        //                 borderColor:'#fff',
        //                 shadowOffset:{width:0,height:0},
        //                 shadowOpacity:1,
        //                 shadowRadius:10,
        //          }}
        //          />
        //       )
        //   }
          const FirstRoute = () => {
              const scrollY = React.useRef(new Animated.Value(0)).current;
              return(
            <>
            <View style={{flex:1,justifyContent:"flex-start",flexDirection:'column',backgroundColor:"#fff",padding:10}}>
        {res==false
        ?
        // <LoadingIndicator size={100}/>
        <ActivityIndicator  size="small" color="#0000ff" style={{flex:1,justifyContent:"center",alignItems:"center",flexDirection:"row"}}/>
        :
        <>
            {transaction.length==0?<View style={{backgroundColor:"transparent",flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize:20,fontWeight:'bold',color:"#2d333a"}}>No Transaction</Text>
            </View>:
            <>
            <Image
            source={require('../../assets/PNG/Ethereum.png')}
            style={{height:"100%",width:"100%",position:"absolute",justifyContent:'center',alignItems:"center"}}
            blurRadius={5}
            resizeMode="stretch"
        />
            <Animated.FlatList
                data={transaction}
                // onScroll={Animated.event(
                //     [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                //     { useNativeDriver: true }
                // )}
                // onScrollEndDrag={() => {
                //     console.log('onScrollEndDrag');
                // }}
                renderItem={ ({item,index}) => {
                    const itemSize =100 +10;
                    const inputRange = [
                        -1,
                        0,
                        itemSize *index,
                        itemSize *(index+2),
                    ];
                    const opacityInputRange = [
                        -1,
                        0,
                        itemSize *index,
                        itemSize *(index+0.5),
                    ];
                    const scale = scrollY.interpolate({
                        inputRange:opacityInputRange,
                        outputRange: [1, 1, 1, 0],
                    });
                    const opacity = scrollY.interpolate({
                        inputRange,
                        outputRange: [1, 1, 1, 0],
                    });
                   return (
                    <>
                    {/* {console.log(item.to,address)} */}
                    {item.to== address.toLowerCase()
                    ?<Animated.View style={[style.firstView
                        ,
                        // { opacity,
                        // transform:[{scale}]
                        // }
                        ]} onLayout={(event)=>onLayout(event)}>
                        <View style={style.secondView}>
                            <View style={style.thirdView}>
                                <View style={style.fourthView}>
                                    <Text style={style.text}>Date : {moment.unix(item.timeStamp).format('DD/MM/YYYY')}</Text>
                                    <Text style={style.text}>Time : {moment.unix(item.timeStamp).format('hh:mm:ss')}</Text>
                                </View>
                                <View style={style.fifthView}>
                                    <View style={style.seventhView}>
                                        <Text style={[style.text,{textAlign:"center"}]}>{item.value?Number(ethers.utils.formatEther(item.value)).toFixed(4):null}</Text>
                                        <Text style={[style.text,{textAlign:"center"}]}>ETH</Text>
                                    </View>
                                    <Image
                                        style={{width:30,height:30}}
                                        source={require('../../assets/PNG/down.png')}
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection:"row",justifyContent:'space-between',backgroundColor:"transparent",flex:1}}>
                                <View style={style.fourthView}>
                                    <Text style={style.text}>From : {item.from.slice(0,8)+'...'}</Text>
                                    <Text style={style.textLeft}>To : {item.to.slice(0,8)+'...'}</Text>
                                </View>
                                <View style={style.eightView}>
                                    <Text style={style.text}>Sender Address</Text>
                                    <Image
                                        style={{width:30,height:30}}
                                        source={require('../../assets/PNG/copy_white.png')}
                                    />
                                </View>
                            </View>
                       </View>
                    </Animated.View>
                    :<Animated.View style={[style.firstView,{ opacity,
                        transform:[{scale}]}]} onLayout={(event)=>onLayout(event)}>
                        <View style={style.secondView}>
                            <View style={style.thirdView}>
                                <View style={style.fourthView}>
                                    {/* <Text style={style.text}>Hash : {item.hash.slice(0,8)+'...'}</Text> */}
                                    <Text style={style.text}>Date : {moment.unix(item.timeStamp).format('DD/MM/YYYY')}</Text>
                                    <Text style={style.text}>Time : {moment.unix(item.timeStamp).format('hh:mm:ss')}</Text>
                                </View>
                                <View style={style.fifthView}>
                                    <View style={style.seventhView}>
                                        <Text style={[style.text,{textAlign:"center"}]}>{item.value?Number(ethers.utils.formatEther(item.value)).toFixed(4):null}</Text>
                                        <Text style={[style.text,{textAlign:"center"}]}>ETH</Text>
                                    </View>
                                    <Image
                                        style={{width:30,height:30}}
                                        source={require('../../assets/PNG/up.png')}
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection:"row",justifyContent:'space-between',backgroundColor:"transparent",flex:1}}>
                                <View style={style.fourthView}>
                                    <Text style={style.text}>From : {item.from.slice(0,8)+'...'}</Text>
                                        <Text style={style.textLeft}>To : {item.to.slice(0,8)+'...'}</Text>
                                </View>
                                <View style={style.eightView}>
                                <Text style={style.text}>Receiver Address</Text>
                                        <Image
                                            style={{width:30,height:30}}
                                            source={require('../../assets/PNG/copy_white.png')}
                                        />
                                </View>
                            </View>
                        </View>
                </Animated.View>
                    }
                    </>
                )}}
                // ListHeaderComponent={()=>(
                //     <View style={{height:10,backgroundColor:"transparent"}}/>
                // )}
                keyExtractor={item => item.hash}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{height:10,backgroundColor:"transparent"}}/>}
            />
            </>
            }
            </>}
             </View>
            </>)
            }
          
          const SecondRoute = () => (
            <View style={{backgroundColor:"transparent",flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text style={{fontSize:20,fontWeight:'bold',color:"#2d333a"}}>No Tokens</Text>
        </View>
            );
           
          const ThirdRoute = () => {
              return(
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
                    <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "#000", alignSelf: "center" }}>
              {symbol.toUpperCase()}
            </Text>
            <TextInput
              style={style.input}
              value={coinValue}
              keyboardType="numeric"
              onChangeText={changeCoinValue}
            />
          </View>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "#000", alignSelf: "center" }}>USD</Text>
            <TextInput
              style={style.input}
              value={usdValue}
              keyboardType="numeric"
              onChangeText={changeUsdValue}
            />
          </View>
        </View>
                    <LineChart.Provider data={prices.map(([timestamp, value]) => ({ timestamp, value }))}>
                        <LineChart height={screenWidth / 2} width={screenWidth}>
                            <LineChart.Path color='red'/>
                            <LineChart.CursorCrosshair color='red'>
                    <LineChart.Tooltip />
                    </LineChart.CursorCrosshair>
                        </LineChart>
                        <LineChart.PriceText />
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

       
                </View>
            )};
          
          const renderScene = SceneMap({
            first: FirstRoute,
            second: SecondRoute,
            third: ThirdRoute,
          });
          const renderLabel = ({ route, focused }) => {
            return (
                route.title === 'Transaction'
                ?<Image
                style={{width: 20, height: 20,opacity:focused?1:0.5}}
                source={require('../../assets/PNG/up_down.png')}/> 
                :route.title === 'Tokens'
                ?<Image
                style={{width: 20, height: 20,opacity:focused?1:0.5}}
                source={require('../../assets/PNG/Ethereum.png')}/>
                :<Image
                style={{width: 20, height: 20,opacity:focused?1:0.5}}
                source={require('../../assets/PNG/chart.png')}/>
            );
        };
          const renderTabBar = (props) => {
            return (
                <>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <Text style={{paddingLeft:10,fontWeight:"bold",fontSize:20,color:"#2d333a"}}>{routes[index].title}</Text>
                    <TabBar
                        {...props}
                        // onTabPress={({ route, preventDefault }) => {
                        //     // if (isListGliding.current) {
                        //         preventDefault();
                        //     // }
                        // }}
                        pressColor="#fff"
                        style={style.tabBar}
                        renderLabel={renderLabel}
                        tabStyle={{
                            backgroundColor:"#fff",
                            // flex:0.5,
                            width:40
                        }}
                        // bounces={true}
                        // layout={'iconOnly'}
                        indicatorStyle={{ backgroundColor: 'transparent' }}
                        scrollEnabled={true}
                        // renderIndicator={() => null}
                        />
                        </View>
                    </>
            );
        };
  return (
      <>
    <View style={{height:"30%",width:"100%",backgroundColor:"#fff",padding:15,flexDirection:'column',justifyContent:"flex-start"}}>
        {sideview==true?
        <Animated.View style={{transform: [{ translateX: pan.x }, { translateY: pan.y }],flexDirection:"row",justifyContent:"space-between",flex:1}} {...panResponder.panHandlers} >
            <View style={{width:"70%",height:"100%",backgroundColor:"#002147",flexDirection:'row',justifyContent:'flex-start',alignItems:"center",borderTopLeftRadius:10,borderBottomLeftRadius:10}}>
                <View style={{width:'30%',height:"100%",backgroundColor:'transparent',flexDirection:"column",justifyContent:"space-evenly",alignItems:"flex-end"}}>
                    <Text style={style.orange}>Name</Text>
                    <Text style={style.orange}>Address</Text>
                    <Text style={style.orange}>Balance</Text>
                    <Text style={style.orange}>Dollar</Text>
                </View>
                <View style={{width:"5%",height:"100%",backgroundColor:'transparent',flexDirection:"column",justifyContent:"space-evenly",alignItems:"center"}}>
                    <Text style={style.orange}>:</Text>
                    <Text style={style.orange}>:</Text>
                    <Text style={style.orange}>:</Text>
                    <Text style={style.orange}>:</Text>
                </View>
                <View style={{height:"100%",flex:1,backgroundColor:'transparent',flexDirection:"column",justifyContent:"space-evenly",alignItems:"flex-start"}}>
                    <Text style={{fontSize:15,fontWeight:'bold',alignItems:"center",color:'#fff'}}>{name}</Text>
                    <Text style={{fontSize:15,fontWeight:'bold',color:'#fff'}}>{address.slice(0, 5)+'...'+address.slice(
                                address.length - 4,
                                address.length,
                                )}</Text>
                    <Text style={{fontSize:15,fontWeight:'bold',color:'#fff'}}>{balances?Number(ethers.utils.formatEther(balances)).toFixed(4):null} ETH</Text>
                    <Text style={{fontSize:15,fontWeight:'bold',color:'#fff'}}>${balances?(USD*(ethers.utils.formatEther(balances))).toFixed(2):null}</Text>
                </View>
            </View>
            <View style={{flexDirection:"column",justifyContent:'space-evenly',flex:1,alignItems:'center',backgroundColor:"lightblue",borderTopRightRadius:10,borderBottomRightRadius:10}}>
                    <TouchableOpacity style={{justifyContent:"center",alignItems:'center',flexDirection:"column"}} onPress={()=>navigation.navigate('BuyEther')}>
                    <Image
                        style={{width: 25, height: 25}}
                        source={require('../../assets/PNG/Ethereum.png')}/> 
                        <Text style={{color:"#2d333a"}}>Buy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:"center",alignItems:'center',flexDirection:"column"}} onPress={()=>setcount(true)}>
                    <Image
                        style={{width: 25, height: 25}}
                        source={require('../../assets/PNG/Receive.png')}/> 
                        <Text style={{color:"#2d333a"}}>Receive</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:"center",alignItems:'center',flexDirection:"column"}} onPress={()=>navigation.navigate('SendEther',{address:address,name:name})}>
                    <Image
                        style={{width: 25, height: 25}}
                        source={require('../../assets/PNG/Send.png')}/>
                        <Text style={{color:"#2d333a"}}>Send</Text>
                    </TouchableOpacity>
            </View>
        </Animated.View>
        :
        <Animated.View style={{transform: [{ translateX: pan.x }, { translateY: pan.y }],flexDirection:"row",justifyContent:"space-between",flex:1}} {...panResponder.panHandlers}>
            <View style={{flexDirection:"column",justifyContent:'space-evenly',flex:1,alignItems:'center',backgroundColor:"lightblue",borderTopLeftRadius:10,borderBottomLeftRadius:10}}>
                    <TouchableOpacity style={{justifyContent:"center",alignItems:'center',flexDirection:"column"}} onPress={()=>navigation.navigate('BuyEther')}>
                        <Image style={{width: 25, height: 25}} source={require('../../assets/PNG/Ethereum.png')}/> 
                        <Text style={{color:"#2d333a"}}>Buy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:"center",alignItems:'center',flexDirection:"column"}} onPress={()=>setcount(true)}>
                        <Image style={{width: 25, height: 25}} source={require('../../assets/PNG/Receive.png')}/> 
                        <Text style={{color:"#2d333a"}}>Receive</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:"center",alignItems:'center',flexDirection:"column"}} onPress={()=>navigation.navigate('SendEther',{address:address,name:name})}>
                        <Image style={{width: 25, height: 25}} source={require('../../assets/PNG/Send.png')}/>
                        <Text style={{color:"#2d333a"}}>Send</Text>
                    </TouchableOpacity>
            </View>
            <View style={{width:"70%",height:"100%",backgroundColor:"#002147",flexDirection:'row',justifyContent:'flex-start',alignItems:"center",borderTopRightRadius:10,borderBottomRightRadius:10}}>
                <View style={{height:"100%",flex:1,backgroundColor:'transparent',flexDirection:"column",justifyContent:"space-evenly",alignItems:"flex-end"}}>
                    <Text style={{fontSize:15,fontWeight:'bold',color:"#fff"}}>{name}</Text>
                    <Text style={{fontSize:15,fontWeight:'bold',color:"#fff"}}>{address.slice(0, 5)+'...'+address.slice(
                                address.length - 4,
                                address.length,
                                )}</Text>
                    <Text style={{fontSize:15,fontWeight:'bold',color:"#fff"}}>{balances?Number(ethers.utils.formatEther(balances)).toFixed(4):null} ETH</Text>
                    <Text style={{fontSize:15,fontWeight:'bold',color:"#fff"}}>${balances?(USD*(ethers.utils.formatEther(balances))).toFixed(2):null}</Text>
                </View>
                <View style={{width:"5%",height:"100%",backgroundColor:'transparent',flexDirection:"column",justifyContent:"space-evenly",alignItems:"center"}}>
                    <Text style={style.orange}>:</Text>
                    <Text style={style.orange}>:</Text>
                    <Text style={style.orange}>:</Text>
                    <Text style={style.orange}>:</Text>
                </View>
                <View style={{width:'30%',height:"100%",backgroundColor:'transparent',flexDirection:"column",justifyContent:"space-evenly",alignItems:"flex-start"}}>
                    <Text style={style.orange}>Name</Text>
                    <Text style={style.orange}>Address</Text>
                    <Text style={style.orange}>Balance</Text>
                    <Text style={style.orange}>Dollar</Text>
                </View>
            </View>
            
        </Animated.View>}
    </View>
        <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={index =>{setIndex(index);console.log(index)}}
      initialLayout={initialLayout}
      style={style.containers}
      tabBarPosition="top"
      renderTabBar={renderTabBar}

    />
   
    <Modal
        isVisible={count}
        animationType={'fade'}
        transparent={true}
        onRequestClose={() => {
          setcount(false);
        }}
        onBackdropPress={() => {
          setcount(false);
        }}
        // backdropTransitionOutTiming={100}
        // animationIn={'zoomIn'}
        // animationOut={'zoomOut'}
        // animationOutTiming={1}
      >
        <View style={style.container}>
                <Text style={style.centered}>Show the code below to receive coins</Text>
                <View style={style.centered}>
                    <QRCode size={200} value={address} /> 
                </View>
                <Text style={style.centered}>{address}</Text>
                <View style={style.actions}>
                    <View style={style.actionsBar}>
                        {renderColumn('copy', 'Copy', () => copyToClipboard())}
                        {renderColumn('share', 'Share', () => share())}
                    </View>
                </View>
            </View>
      </Modal>
    </>
  )
}

export default WalletPage;
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
    input: {
        flex: 1,
        height: 40,
        margin: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        padding: 10,
        fontSize: 16,
        color: "#000",
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