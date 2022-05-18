import axios from 'axios';
import { ethers } from 'ethers';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import { selectAddress } from '../../../counterSlice';
import Clipboard from '@react-native-community/clipboard';
import React,{useState,useEffect,useRef, useCallback} from 'react';
import { Directions, FlingGestureHandler, gestureHandlerRootHOC, State } from 'react-native-gesture-handler';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated,PanResponder, TouchableWithoutFeedback, Share, ToastAndroid, Dimensions, FlatList} from 'react-native';

const width = Dimensions.get('window').width;
const imageWidth = width *0.86;
const imageHeight = imageWidth *1.5;
const visibleItems = 4;
const MainInfo = gestureHandlerRootHOC(({address,navigation,name}) => {
  const [activeIndex, setactiveIndex] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const reactiveAnimated = useRef(new Animated.Value(0)).current;

    const [balances, setbalances] = useState(null);
    // const [data, setData] = useState([]);
    const [res, setres] = useState(false)
    const [count, setcount] = useState(false);
  let allAddress = useSelector(selectAddress);

    const USD =Number('2824.96');
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
      useEffect(() => {
        Animated.timing(animatedValue, {
          toValue : reactiveAnimated,
          duration:300,
          useNativeDriver:true 
         }).start()
        axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=balance&address=${address}&apikey=349IQMJ71CEBWJ65I1U5G5N5NG43C37UZB&tag=latest`).then(res => { 
        // console.log(res.data.result)
          setbalances(res.data.result);

      });
      // for(let i=0;i<allAddress.length;i++){
      //   if(allAddress[i].address===address){
      //     setData(allAddress[i]);
      //   }
      // }
      setres(true)
    }, [])
    const copyToClipboard =(index)=>{
        ToastAndroid.show('Address Copied to clipboard', ToastAndroid.SHORT);
         return Clipboard.setString(address);
      }
      const share = () => {
             Share.share({
                message: address.slice(0,8)+'...'+address.slice(34,address.length),
            });
        }
        const setActiveSlide = useCallback(newIndex => {
          setactiveIndex(newIndex);
          reactiveAnimated.setValue(newIndex);
        }
        )
    if(!res){
        return null;
    }
  return (
    <>
    <View style={{flex:1,backgroundColor:"#2B2B2B"}}>
    <FlingGestureHandler key='UP' direction={Directions.UP} onHandlerStateChange={(ev)=>{
      if (ev.nativeEvent.state === State.END) 
      {
        if(activeIndex === allAddress.length-1)
        return;
        setActiveSlide(activeIndex +1)
      }
    }
    }>
          <FlingGestureHandler key='DOWN'
          direction={Directions.DOWN}
          onHandlerStateChange={ev=>{
            console.log('down')
            if (ev.nativeEvent.state === State.END) 
            {
              if(activeIndex ===0)
              return;
              setActiveSlide(activeIndex -1)
            }
          }}>
            {/* <View style={{flex:1,justifyContent:'center',alignItems:"center"}}> */}
            <FlatList
              data={allAddress}
              inverted
              keyExtractor={(item, index) => index}
              scrollEnabled={false}
              contentContainerStyle={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              CellRendererComponent={({ item ,index,children,style,...props}) => {
                const newStyle= [
                  style,
                  {
                  zIndex: allAddress.length - index,
                  // left : -imageWidth/2,
                  // top : -imageHeight/2,
                  }
                ]
      return (
        <View index={index} {...props} style={newStyle}> 
        {children}
        </View>
          )}}

    renderItem={({ item, index }) => {
      const inputRange = [index-1,index,index+1]
      const translateY = animatedValue.interpolate({
        inputRange,
        outputRange :[-30,0,30]
      });

      const opacity = animatedValue.interpolate({
        inputRange,
        outputRange :[ 1-1/ visibleItems, 1 ,0]
      });
      const scale = animatedValue.interpolate({
        inputRange,
        outputRange :[ 0.92,1,1.2],
      });
      return(
        
        <Animated.View style={{
          position:'absolute',
          opacity,
          transform:[{translateY},{scale}],
          alignSelf:'center',
          justifyContent:"center",
          flexDirection:"row",
          top:-50,
          height:150,
        }} >
        <View style={{flexDirection:"row",justifyContent:"space-between",width:'95%'}}  >
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
                  <Text style={{fontSize:15,fontWeight:'bold',alignItems:"center",color:'#fff'}}>{item.name}</Text>
                  <Text style={{fontSize:15,fontWeight:'bold',color:'#fff'}}>{item.address.slice(0, 5)+'...'+item.address.slice(
                              item.address.length - 4,
                              item.address.length,
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
        </View>
    </Animated.View>
      )}}
    />
    </FlingGestureHandler>
    </FlingGestureHandler>
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
            <View style={style.centered}>
                <QRCode size={200} value={address} /> 
            </View>
            <Text style={style.centered}>Scan address to receive payments</Text>
            <View style={{flexDirection:"row",justifyContent:"space-evenly",alignItems:"center",width:"80%",alignSelf:"center"}}>
                <View style={{flexDirection:"row",justifyContent:"space-between",backgroundColor:"#2b2b2b",width:"70%",alignSelf:"center",padding:10,borderRadius:10}}>
                    <Text style={{color:"#fff",alignSelf:"center"}}>{address.slice(0,8)+'...'+address.slice(34,address.length)}</Text>
                    <TouchableWithoutFeedback onPress={()=>copyToClipboard()}>
                          <Image 
                              source={require('../../assets/PNG/copy_white.png')}
                              style={{height:25,width:25}}
                            />
                    </TouchableWithoutFeedback>
                </View>
                <TouchableWithoutFeedback onPress={()=>share()} >
                  <View style={{padding:10,backgroundColor:"#2b2b2b",borderRadius:10}}>
                        <Image 
                            source={require('../../assets/PNG/send_white.png')}
                            style={{height:25,width:25}}/>
                  </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
  </Modal>
  </View>
  </>
  )
})

export default MainInfo;
const style = StyleSheet.create({
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
        // alignItems: 'stretch',
        justifyContent: 'space-evenly',
        // padding: 10,
        borderRadius:10
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
        justifyContent: 'center',
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