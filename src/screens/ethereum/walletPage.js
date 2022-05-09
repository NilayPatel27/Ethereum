import axios from 'axios';
import moment from 'moment';
import { ethers } from 'ethers';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import {selectView} from '../../../counterSlice';
import React,{useState,useEffect,useRef} from 'react'
import Clipboard from '@react-native-community/clipboard';
import { TabView, SceneMap,TabBar} from 'react-native-tab-view';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ToastAndroid, Share ,TouchableWithoutFeedback,ActivityIndicator,Animated,PanResponder,Dimensions,StatusBar} from 'react-native'

const WalletPage = ({navigation,route}) => {
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
    { key: 'third', title: 'Contracts' },
    { key: 'fourth', title: 'Chart' },

  ]);
    const {address,name} = route.params;
    const [count, setcount] = useState(false);
    const USD =Number('2824.96');
    // let isListGliding = useRef(false);
    const [balances, setbalances] = useState(null);
    const [transaction, settransaction] = useState([]);
    const [res, setres] = useState(false);
    console.log(address,name)
    useEffect(() => {
        console.log('sideview',sideview)
        axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=balance&address=${address}&apikey=349IQMJ71CEBWJ65I1U5G5N5NG43C37UZB&tag=latest`).then(res => { 
        // console.log(res.data.result)
          setbalances(res.data.result);
      });

      axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=999&sort=desc&apikey=349IQMJ71CEBWJ65I1U5G5N5NG43C37UZB`).then(res => {
        // console.log(res.data.result)
        settransaction(res.data.result);
        setres(true);
      });

    }, [])
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
                    <Text >{label}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
        const onLayout=(event)=> {
            const {x, y, height, width} = event.nativeEvent.layout;
            console.log(x, y, height, width);
          }
          const FirstRoute = () => (
            <>
            <View style={{flex:1,justifyContent:"flex-start",flexDirection:'column',backgroundColor:"#fff",padding:10,}}>
            {/* <View style={{height:50,flexDirection:"row",justifyContent:"space-between",backgroundColor:"red"}}>
                <View style={{height:'100%',width:"50%",backgroundColor:"orange",justifyContent:"center",alignItems:"center"}}>
                    <Text style={{fontSize:20,fontWeight:'bold',color:"#fff"}}>Transactions</Text>
                </View>
            <View style={{height:'100%',width:"50%",backgroundColor:"orange",justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize:20,fontWeight:'bold',color:"#fff"}}>Transactions</Text>
            </View>
            </View> */}
        {res==false?<ActivityIndicator  size="small" color="#0000ff" style={{flex:1,justifyContent:"center",alignItems:"center",flexDirection:"row"}}/>:
        <>
            {transaction.length==0?<View style={{backgroundColor:"transparent",flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize:20,fontWeight:'bold',color:"#fff"}}>No Transaction</Text>
            </View>:
            <FlatList
                data={transaction}
                renderItem={({item,index}) => (
                    <>
                    {console.log(item.to,address)}
                    {item.to== address.toLowerCase()
                    ?<View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",width:'100%',backgroundColor:"transparent",height:100,}} onLayout={(event)=>onLayout(event)}>
                        <View style={{width:'100%',height:"100%",justifyContent:"space-evenly",flexDirection:"column",padding:6,paddingLeft:5,backgroundColor:"#202020",borderRadius:6, shadowColor: '#002147',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,}}>
                            <View style={{alignItems:"flex-start",flexDirection:"row",justifyContent:"space-between",height:"50%",backgroundColor:"transparent"}}>
                                <View style={{flexDirection:"column",justifyContent:"space-evenly",height:"100%",width:"60%"}}>
                                    {/* <Text style={style.text}>Hash : {item.hash.slice(0,8)+'...'}</Text> */}
                                    <Text style={style.text}>Date : {moment.unix(item.timeStamp).format('DD/MM/YYYY')}</Text>
                                    <Text style={style.text}>Time : {moment.unix(item.timeStamp).format('hh:mm:ss')}</Text>
                                </View>
                                <View style={{flex:1,height:"100%",backgroundColor:"transparent",flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>
                                    <View style={{flexDirection:"column",justifyContent:'space-between',alignItems:"center",backgroundColor:"transparent",width:"50%"}}>
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
                                <View style={{flexDirection:"column",justifyContent:"space-evenly",height:"100%",width:"60%"}}>
                                    <Text style={style.text}>From : {item.from.slice(0,8)+'...'}</Text>
                                    <Text style={[style.text,{textAlign:"left"}]}>To : {item.to.slice(0,8)+'...'}</Text>
                                </View>
                                <View style={{flexDirection:"row",justifyContent:"space-evenly",backgroundColor:'transparent',alignItems:"center",flex:1}}>
                                    <Text style={style.text}>Sender Address</Text>
                                    <Image
                                        style={{width:30,height:30}}
                                        source={require('../../assets/PNG/copy_white.png')}
                                    />
                                </View>
                            </View>
                       </View>
                    </View>
                    :<View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",width:'100%',backgroundColor:"transparent",height:100}} onLayout={(event)=>onLayout(event)}>
                    <View style={{width:'100%',height:"100%",justifyContent:"space-evenly",flexDirection:"column",padding:6,paddingLeft:5,backgroundColor:"#202020",borderRadius:6, shadowColor: '#002147',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,borderRadius:6}}>
                        <View style={{alignItems:"flex-start",flexDirection:"row",justifyContent:"space-between",height:"50%",backgroundColor:"transparent"}}>
                            <View style={{flexDirection:"column",justifyContent:"space-evenly",height:"100%",width:"60%"}}>
                                {/* <Text style={style.text}>Hash : {item.hash.slice(0,8)+'...'}</Text> */}
                                <Text style={style.text}>Date : {moment.unix(item.timeStamp).format('DD/MM/YYYY')}</Text>
                                <Text style={style.text}>Time : {moment.unix(item.timeStamp).format('hh:mm:ss')}</Text>
                            </View>
                            <View style={{flex:1,height:"100%",backgroundColor:"transparent",flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>
                                <View style={{flexDirection:"column",justifyContent:'space-between',alignItems:"center",backgroundColor:"transparent",width:"50%"}}>
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
                            <View style={{flexDirection:"column",justifyContent:"space-evenly",height:"100%",width:"60%"}}>
                                 <Text style={style.text}>From : {item.from.slice(0,8)+'...'}</Text>
                                    <Text style={[style.text,{textAlign:"left"}]}>To : {item.to.slice(0,8)+'...'}</Text>
                            </View>
                            <View style={{flexDirection:"row",justifyContent:"space-evenly",backgroundColor:'transparent',alignItems:"center",flex:1}}>
                            <Text style={style.text}>Receiver Address</Text>
                                    <Image
                                        style={{width:30,height:30}}
                                        source={require('../../assets/PNG/copy_white.png')}
                                    />
                            </View>
                        </View>
                   </View>
                </View>
                    }
                    </>
                )}
                ListHeaderComponent={()=>(
                    <View style={{height:10,backgroundColor:"transparent"}}/>
                )}
                keyExtractor={item => item.hash}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{height:10,backgroundColor:"transparent"}}/>}
            />
            }
            </>}
        </View>
            </>
          );
          const SecondRoute = () => (
            <View style={[style.scene, { backgroundColor: '#673ab7' }]} />
            );
          const ThirdRoute = () => (
            <View style={[style.scene, { backgroundColor: 'red' }]} />
            );
          const FourthRoute = () => (
            <View style={[style.scene, { backgroundColor: 'blue' }]} />
            );
          const renderScene = SceneMap({
            first: FirstRoute,
            second: SecondRoute,
            third: ThirdRoute,
            fourth: FourthRoute,
          });
          const renderLabel = ({ route, focused }) => {
            return (
                route.title === 'Transaction'
                ?<Text style={{opacity:focused?1:0.5,color:"#002147",fontSize:15}}>Transaction</Text>
                :route.title === 'Tokens'
                ?<Text style={{opacity:focused?1:0.5,color:"#002147",fontSize:15}}>Tokens</Text>
                :route.title === 'Contracts'
                ?<Text style={{opacity:focused?1:0.5,color:"#002147",fontSize:15}}>Contracts</Text>
                :<Text style={{opacity:focused?1:0.5,color:"#002147",fontSize:15}}>Chart</Text>
            );
        };
          const renderTabBar = (props) => {
            return (
                <>
                    <TabBar
                        {...props}
                        // onTabPress={({ route, preventDefault }) => {
                        //     if (isListGliding.current) {
                        //         preventDefault();
                        //     }
                        // }}
                        style={{elevation: 0,
                            shadowOpacity: 0,
                            height: 48,backgroundColor:"orange",width:"100%"}}
                        renderLabel={renderLabel}
                        indicatorStyle={{ backgroundColor: '#002147' }}
                        scrollEnabled={true}
                    />
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
                    <Text style={{fontSize:15,fontWeight:'bold',color:'orange'}}>Name</Text>
                    <Text style={{fontSize:15,fontWeight:'bold',color:'orange'}}>Address</Text>
                    <Text style={{fontSize:15,fontWeight:'bold',color:'orange'}}>Balance</Text>
                    <Text style={{fontSize:15,fontWeight:'bold',color:'orange'}}>Dollar</Text>
                </View>
                <View style={{width:"5%",height:"100%",backgroundColor:'transparent',flexDirection:"column",justifyContent:"space-evenly",alignItems:"center"}}>
                    <Text style={{fontSize:15,fontWeight:'bold',color:'orange'}}>:</Text>
                    <Text style={{fontSize:15,fontWeight:'bold',color:'orange'}}>:</Text>
                    <Text style={{fontSize:15,fontWeight:'bold',color:'orange'}}>:</Text>
                    <Text style={{fontSize:15,fontWeight:'bold',color:'orange'}}>:</Text>
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
                        <Text>Buy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:"center",alignItems:'center',flexDirection:"column"}} onPress={()=>setcount(true)}>
                    <Image
                        style={{width: 25, height: 25}}
                        source={require('../../assets/PNG/Receive.png')}/> 
                        <Text>Receive</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:"center",alignItems:'center',flexDirection:"column"}} onPress={()=>navigation.navigate('SendEther',{address:address,name:name})}>
                    <Image
                        style={{width: 25, height: 25}}
                        source={require('../../assets/PNG/Send.png')}/>
                        <Text>Send</Text>
                    </TouchableOpacity>
            </View>
        </Animated.View>
        :
        <View style={{flexDirection:"row",justifyContent:"space-between",width:"100%",height:"30%",marginTop:5}}>
        <View style={{flexDirection:"column",justifyContent:'space-evenly',flex:1,alignItems:'center',backgroundColor:"lightblue",borderTopLeftRadius:10,borderBottomLeftRadius:10}}>
                    <TouchableOpacity style={{justifyContent:"center",alignItems:'center',flexDirection:"column"}}>
                    <Image
                        style={{width: 25, height: 25}}
                        source={require('../../assets/PNG/Ethereum.png')}/> 
                        <Text>Buy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:"center",alignItems:'center',flexDirection:"column"}}>
                    <Image
                        style={{width: 25, height: 25}}
                        source={require('../../assets/PNG/Receive.png')}/> 
                        <Text>Receive</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:"center",alignItems:'center',flexDirection:"column"}}>
                    <Image
                        style={{width: 25, height: 25}}
                        source={require('../../assets/PNG/Send.png')}/>
                        <Text>Send</Text>
                    </TouchableOpacity>
            </View>
            <View style={{width:"70%",height:"100%",backgroundColor:"lightblue",flexDirection:'row',justifyContent:'flex-start',alignItems:"center",borderTopRightRadius:10,borderBottomRightRadius:10}}>
                <View style={{height:"100%",flex:1,backgroundColor:'transparent',flexDirection:"column",justifyContent:"space-evenly",alignItems:"flex-end"}}>
                    <Text style={{fontSize:15,fontWeight:'bold',}}>{name}</Text>
                    <Text style={{fontSize:15,fontWeight:'bold'}}>{address.slice(0, 5)+'...'+address.slice(
                                address.length - 4,
                                address.length,
                                )}</Text>
                    <Text style={{fontSize:15,fontWeight:'bold'}}>{balances?ethers.utils.formatEther(balances):null} ETH</Text>
                    <Text style={{fontSize:15,fontWeight:'bold'}}>${balances?(USD*(ethers.utils.formatEther(balances))).toFixed(2):null}</Text>
                </View>
                <View style={{width:"5%",height:"100%",backgroundColor:'transparent',flexDirection:"column",justifyContent:"space-evenly",alignItems:"center"}}>
                    <Text style={{fontSize:15,fontWeight:'bold'}}>:</Text>
                    <Text style={{fontSize:15,fontWeight:'bold'}}>:</Text>
                    <Text style={{fontSize:15,fontWeight:'bold'}}>:</Text>
                    <Text style={{fontSize:15,fontWeight:'bold'}}>:</Text>
                </View>
                <View style={{width:'30%',height:"100%",backgroundColor:'transparent',flexDirection:"column",justifyContent:"space-evenly",alignItems:"flex-start"}}>
                    <Text style={{fontSize:15,fontWeight:'bold'}}>Name</Text>
                    <Text style={{fontSize:15,fontWeight:'bold'}}>Address</Text>
                    <Text style={{fontSize:15,fontWeight:'bold'}}>Balance</Text>
                    <Text style={{fontSize:15,fontWeight:'bold'}}>Dollar</Text>
                </View>
            </View>
            
        </View>}
    </View>
        <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
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
    text:{
        color:"#fff",
        flexWrap:'wrap',
        fontSize:12
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
        alignSelf: 'center'
    },
    containers: {
        marginTop: 0,
      },
      scene: {
        flex: 1,
      },
  });