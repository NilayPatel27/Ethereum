import axios from 'axios';
import { ethers } from 'ethers';
import React,{useState,useEffect,useRef} from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Animated,PanResponder,Dimensions,StatusBar, TextInput} from 'react-native';

const MainInfo = ({data,address}) => {
    const [balances, setbalances] = useState(null);
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
        axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=balance&address=${address}&apikey=349IQMJ71CEBWJ65I1U5G5N5NG43C37UZB&tag=latest`).then(res => { 
        // console.log(res.data.result)
          setbalances(res.data.result);

      });
     
    }, [])
  return (
    <FlatList
    data={data}
    renderItem={({ item,index }) => (
        <Animated.View style={{transform: [{ translateY: pan.y }],flexDirection:"row",justifyContent:"space-between",flex:1,paddingBottom:10*index,zIndex:index*10}} {...panResponder.panHandlers} >
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
    </Animated.View>
    )}
    keyExtractor={index => index.toString()}
  />
  )
}

export default MainInfo;
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