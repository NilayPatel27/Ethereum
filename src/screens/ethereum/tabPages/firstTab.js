import { View, Text, ActivityIndicator, Animated, FlatList, StyleSheet, Image } from 'react-native'
import React from 'react';
import moment from 'moment';
import { ethers } from 'ethers';


const FirstTab = ({res,transaction,allAddress}) => {
    const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={{flex:1,justifyContent:"flex-start",flexDirection:'column',backgroundColor:"#fff",padding:10}}>
    {res==false
    ?<ActivityIndicator  size="small" color="#0000ff" style={{flex:1,justifyContent:"center",alignItems:"center",flexDirection:"row"}}/>
    :
        transaction.length==0
        ?<View style={{backgroundColor:"transparent",flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text style={{fontSize:20,fontWeight:'bold',color:"#2d333a"}}>No Transaction</Text>
        </View>
        :
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
                {item.to== allAddress[1].address.toLowerCase()
                ?<Animated.View style={[style.firstView,
                    // { opacity,
                    // transform:[{scale}]
                    // }
                    ]} >
                      <View  style={{width:'100%',height:4,backgroundColor:"lightgreen"}}/>
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
                                    source={require('../../../assets/PNG/copy_white.png')}
                                />
                            </View>
                        </View>
                   </View>
                </Animated.View>
                :<Animated.View style={[style.firstView,{ opacity,
                    transform:[{scale}]}]} >
                      <View  style={{width:'100%',height:4,backgroundColor:"red"}}/>
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
                                {/* <Image
                                    style={{width:30,height:30}}
                                    source={require('../../assets/PNG/up.png')}
                                /> */}
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
                                        source={require('../../../assets/PNG/copy_white.png')}
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
            ListHeaderComponent={() => <View style={{height:10,backgroundColor:"transparent"}}/>}
        />
        
       }
         </View>
  )
}

export default FirstTab;
const style = StyleSheet.create({
    firstView:{
        flexDirection:"column",justifyContent:"center",alignItems:"center",width:'100%',backgroundColor:"transparent",height:100
    },
    secondView:{
        width:'100%',height:"100%",justifyContent:"space-evenly",flexDirection:"column",padding:5,paddingLeft:10,backgroundColor:"#2c2e3b",
       borderBottomRightRadius:6,borderBottomLeftRadius:6
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