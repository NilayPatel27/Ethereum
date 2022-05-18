import axios from 'axios';
import moment from 'moment';
import '@ethersproject/shims';
import { ethers } from 'ethers';
import MainInfo from './mainInfo';
import randomBytes from 'randombytes';
import Modal from 'react-native-modal';
import converter from 'number-to-words';
import MainInfoLeft from './mainInfoLeft';
import FilterComponent from "./filterComponent";
import RBSheet from "react-native-raw-bottom-sheet";
import React,{useState,useEffect,useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { MotiView } from '@motify/components';
import { TabView, SceneMap,TabBar} from 'react-native-tab-view';
import { LineChart, CandlestickChart } from "react-native-wagmi-charts";
import {addressArray, selectAddress, selectView} from '../../../counterSlice';
import Back from '../../assets/BackButton.svg'
import { View, Text, Image, TouchableOpacity, StyleSheet, ToastAndroid, Share ,Button,TouchableWithoutFeedback,ActivityIndicator,Animated,PanResponder,Dimensions,StatusBar, TextInput, Pressable} from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import FirstTab from './tabPages/firstTab';
import SecondTab from './tabPages/secondTab';
import ThirdTab from './tabPages/thirdTab';

const WalletPage = ({navigation,route}) => {
  const {image} = route.params;
  let allAddress = useSelector(selectAddress);
  const refRBSheet = useRef();
  const textValue = useRef();
  const [privateKey, setprivateKey] = useState('');
  const [count, setcount] = useState(false);
  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [selectedRange, setSelectedRange] = useState("1");
  const [usdValue, setUsdValue] = useState("");
  const [coinCandleChartData, setCoinCandleChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coinValue, setCoinValue] = useState("1");
  const [load, setload] = useState(false)
  const dispatch = useDispatch();
  const [isCandleChartVisible, setIsCandleChartVisible] = useState(false);
  const [tab, settab] = useState(1)

const PROVIDER = ethers.providers.getDefaultProvider('ropsten');
  
  const onSelectedRangeChange = (selectedRangeValue) => {
    setSelectedRange(selectedRangeValue);
    fetchMarketCoinData(selectedRangeValue);
    fetchCandleStickChartData(selectedRangeValue);
  };

  const memoOnSelectedRangeChange = React.useCallback((range) => {setload(true);onSelectedRangeChange(range);
  setTimeout(() => {
    setload(false);
  }, 1000);
  },
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
      const fetchCoinDatas = async () => {
        const fetchedCoinData = await getDetailedCoinData('ethereum');
        setCoin(fetchedCoinData);
        setUsdValue(fetchedCoinData.market_data.current_price.usd.toString());
      }
      const createWallet = () =>{
        let id = randomBytes(32).toString('hex');
        let privateKey = '0x' + id;
        // console.log(privateKey);
        let wallet = new ethers.Wallet(privateKey);
        wallet= wallet.connect(PROVIDER);
        console.log(wallet.address);
        console.log(wallet);
        let obj = {
          name: converter.toWordsOrdinal(allAddress.length),
          address:wallet.address,
          wallet:wallet
        }
        console.log(obj);
        for(let i = 0; i < allAddress.length; i++){
          if(allAddress[i].address === wallet.address){
            return;
          }
        }
        dispatch(addressArray(obj));
      }
      const importWallet = () =>{
        console.log(privateKey);
        const PROVIDER = new ethers.providers.getDefaultProvider('ropsten');
        try{
          let wallet = new ethers.Wallet(privateKey,PROVIDER);
          wallet= wallet.connect(PROVIDER);
          console.log(wallet);
          let obj = {
            name: converter.toWordsOrdinal(allAddress.length),
            address:wallet.address,
            wallet:wallet,
            privateKey:wallet.privateKey,
          }
          for(let i = 0; i < allAddress.length; i++){
            if(allAddress[i].address === wallet.address){
              return;
            }
          }
        dispatch(addressArray(obj));
        refRBSheet.current.close()
        }
        catch(e){
          console.log(e);
        } 
      }
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
    const USD =Number('2824.96');
    // let isListGliding = useRef(false);
    const [balances, setbalances] = useState(null);
    const [transaction, settransaction] = useState([]);
    const [res, setres] = useState(false);
    // console.log(address,name)
    useEffect(() => {
        console.log('sideview',sideview)
        // axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=balance&address=${address}&apikey=349IQMJ71CEBWJ65I1U5G5N5NG43C37UZB&tag=latest`).then(res => { 
        // // console.log(res.data.result)
        //   setbalances(res.data.result);

      // });

      axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${allAddress[1].address}&startblock=0&endblock=99999999&page=1&offset=999&sort=desc&apikey=349IQMJ71CEBWJ65I1U5G5N5NG43C37UZB`).then(res => {
        // console.log(res.data.result)
        settransaction(res.data.result);
        fetchMarketCoinData(1);
        fetchCoinData();
        fetchCandleStickChartData();
        setres(true);
      });
     
    }, []);
    
    if (loading || !coin || !coinMarketData || !coinCandleChartData) {
        return <ActivityIndicator size="large" color="#0000ff" style={{flex:1,justifyContent:"center",alignItems:"center",flexDirection:"row"}} />;
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
    const { prices } = coinMarketData;

          const relodeData = () => {
            setres(false);
            fetchMarketCoinData(1);
            fetchCoinDatas();
            fetchCandleStickChartData();
            setTimeout(() => {
              setres(true)
            }, 1000);
          }
          const FirstRoute = () => <FirstTab res={res} transaction={transaction} allAddress={allAddress}/>
           
          const SecondRoute = () =><SecondTab res={res} />
           
          const ThirdRoute = gestureHandlerRootHOC(() => <ThirdTab res={res} prices={prices}/>)
          
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
                source={require('../../assets/PNG/linechart.png')}/>
            );
        };
          const renderTabBar = (props) => {
            return (
                <>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",backgroundColor:"#fff"}}>
                <Text style={{paddingLeft:10,fontWeight:"bold",fontSize:20,color:"#2d333a"}}>{routes[index].title}</Text>
                <TouchableOpacity style={{marginRight:"auto",marginLeft:10}} onPress={()=>relodeData()}>
                  <Image
                  style={{width: 20, height: 20}}
                  source={require('../../assets/PNG/refresh.png')}/>
                </TouchableOpacity>
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
      {/* Header start*/}
      <View style={{flexDirection:'row',height:'8%',justifyContent:"space-between",width:"100%",alignSelf:"center",backgroundColor:'#fff',alignItems:"center",padding:10}}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
              <Back height={30} width={30} fill={'#000'} style={{marginRight:10}}/>
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
                <View>
                  <View style={{flexDirection:"row"}}>
                    <Text style={{color:"#2d333a",fontSize:20,fontWeight:'bold'}}>{symbol.toUpperCase()}</Text>
                    <Text style={{color:price_change_percentage_24h<0?'#ea3943':'#16c784',fontSize:20,fontWeight:'bold',marginLeft:10}}>{price_change_percentage_24h?.toFixed(2)}%</Text>
                    </View>
                    <Text style={{color:"#2d333a",fontSize:20,fontWeight:'bold'}}>${current_price.usd}</Text>
                </View>
            </View>

          <TouchableOpacity onPress={()=>setcount(true)}>
            <Image style={{width: 35, height: 35, }} source={require('../../assets/PNG/Plus1.png')} />
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>refRBSheet.current.open()}>
          <Image source={require('../../assets/PNG/down.png')} style={{width: 35, height: 35,marginLeft:10}} />
          </TouchableOpacity>

        </View>
        {/* Header end*/}
        {/* account card start*/}
    <View style={{height:"30%",width:"100%",backgroundColor:"#2B2B2B",padding:15,flexDirection:'row',justifyContent:"flex-start"}}>
        {/* {sideview==true */}
        {/* ? */}
        <MainInfo address={allAddress[1].address} navigation={navigation} name={allAddress[1].name}/>
        {/* :<MainInfoLeft address={allAddress[1].address} navigation={navigation} name={allAddress[1].name}/> */}
       {/* } */}
    </View>
    {/* account card end*/}
        {/* <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={index =>{setIndex(index);console.log(index)}}
      initialLayout={initialLayout}
      style={style.containers}
      tabBarPosition="top"
      renderTabBar={renderTabBar}
    /> */}
    <View style={{flexDirection:"row",justifyContent:"space-evenly",alignItems:"center",backgroundColor:"#fff",height:45,padding:10}}>
          <Text style={{fontWeight:"bold",fontSize:20,color:"#000"}}>{routes[tab-1].title}</Text>
          <TouchableOpacity style={{marginRight:"auto",marginLeft:10,alignItems:"center"}} onPress={()=>relodeData()}>
            <Image
            style={{width: 20, height: 20}}
            source={require('../../assets/PNG/refresh.png')}/>
          </TouchableOpacity>
          <View style={{flexDirection:"row",justifyContent:'space-evenly',alignItems:"center",flex:0.5}}>
            <TouchableOpacity onPress={()=>settab(1)}>
                  <Image
                  style={{width: 20, height: 20}}
                  source={require('../../assets/PNG/up_down.png')}/> 
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>settab(2)}>
                <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/PNG/Ethereum.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>settab(3)}>
                <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/PNG/linechart.png')}/>
            </TouchableOpacity>
          </View>
    </View>
    {tab == 1?<FirstRoute /> :tab==2?<SecondRoute/>:<ThirdRoute/>}
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
        {allAddress.length>=10?<View style={style.mainView}>
          <Text style={{ color: '#2d333a',fontWeight:'bold',fontSize:20,textAlign:"center"}}>You have reached to the maxiumm number of an account, you can not create another account</Text>
          <View style={{backgroundColor:"transparent",flexDirection:"row",justifyContent:"space-evenly",width:"100%"}}>
          <TouchableOpacity  style={{ justifyContent: "center", flexDirection: "row" }} onPress={()=>setcount(false)}>
            <View style={style.button}>
              <Text style={{ color: "#fff", fontSize: 20 }}>Ok</Text>
            </View>
          </TouchableOpacity>
          </View>
        </View>:
        <View style={style.mainView}>
          <Text style={{ color: '#2d333a',fontWeight:'bold',fontSize:20,textAlign:"center"}}>Are you sure you want to create an account</Text>
          <View style={{backgroundColor:"transparent",flexDirection:"row",justifyContent:"space-evenly",width:"100%"}}>
          <TouchableOpacity  style={{ justifyContent: "center", flexDirection: "row" }} onPress={()=>setcount(false)}>
            <View style={style.button}>
              <Text style={{ color: "#fff", fontSize: 20 }}>No</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity  style={{ justifyContent: "center", flexDirection: "row" }} onPress={() => { setcount(false); createWallet() }}>
            <View style={style.button}>
              <Text style={{ color: "#fff", fontSize: 20 }}>Yes</Text>
            </View>
          </TouchableOpacity>
          </View>
        </View>}
      </Modal>
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
          <View style={{flex:1,padding:10,justifyContent:"space-evenly"}}>
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
                importWallet();
                // console.log(privateKey);
              }}
              />
         </View>
        </RBSheet>
    </>
  )
}

export default WalletPage;
const style = StyleSheet.create({
    tabBar:{
        height: 48,
        backgroundColor:"#fff",
        width:"35%",
        flexDirection:"row",
        justifyContent:"flex-end",
        alignSelf:"flex-end",
        marginRight:10,
        shadowColor:"#fff"
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
        fontSize:15,
        fontWeight:'bold',
        color:'orange'
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
        backgroundColor: "#fff",
        paddingVertical: 5,
        borderRadius: 5,
        marginVertical: 10,
        marginBottom: 20,
        width:"95%",
        position:"absolute",
        top:20
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
        backgroundColor:"red",
        width:"100%",
        alignSelf:"center"
      },
      candleStickTextLabel: {
        color: 'grey',
        fontSize: 13,
      }
  });