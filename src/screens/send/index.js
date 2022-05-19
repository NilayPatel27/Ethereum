import axios from 'axios';
import { ethers } from 'ethers';
import Modal from 'react-native-modal';
import React,{useEffect,useState,useRef} from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import * as Animatable from "react-native-animatable";
import { View, Text, TextInput ,Dimensions, Image, TouchableOpacity, StyleSheet} from 'react-native'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SendEther = ({navigation,route}) => {
  const scanner = useRef();
    const{address,name} = route.params;
    const [balance, setbalance] = useState(null)
    const [addressTo, setaddress] = useState('')
    const [camera, setCamera] = useState(false);
    const [valid, setvalid] = useState(false)
    const addres = useRef();
    
    console.log('address',address);
    console.log('name',name);
    useEffect(() => {
        axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=balance&address=${address}&apikey=349IQMJ71CEBWJ65I1U5G5N5NG43C37UZB&tag=latest`).then(res => { 
            console.log(res.data.result);
            setbalance(res.data.result);
         });
    }, [])
    const onSuccess = (e) => {
        scanner.current.reactivate()
        setCamera(false);
        console.log('e.data',e.data);
        console.log(e.data.length)
        setaddress(e.data);
       const valid= ethers.utils.isAddress(e.data);
         console.log('valid',valid);
         setvalid(valid);
        addres.current.setNativeProps({text:e.data});
    }
    const makeSlideOutTranslation = (translationType, fromValue) =>{
        return {
          from: {
            [translationType]: width *0.25
          },
          to: {
            [translationType]: fromValue
          }
        };
      }
      const scanBarWidth = width * 0.46; // this is equivalent to 180 from a 393 device width
    const scanBarColor = "#22ff00";
    // if (device == null) return <ActivityIndicator/>
  return (
      <>
    <View style={{backgroundColor:"#2B2B2B",height:"100%",width:"100%",flexDirection:"column",justifyContent:"space-between"}}>
        <View>
            <View style={{height:height*0.1,backgroundColor:"transparent",flexDirection:"row",justifyContent:"center",marginTop:10,padding:10}}>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",flex:1}}>
                    <Text style={{color:"#fff",fontSize:20,fontWeight:"bold",textAlign:"center"}}>From</Text>
                    <View style={{backgroundColor:"#fff",justifyContent:"space-evenly",flexDirection:"column",width:'80%',borderWidth:1,borderColor:'#fff',borderRadius:10,height:"100%"}}>
                        <Text style={{color:"#2d333a",fontSize:20,fontWeight:"bold",textAlign:"center"}}>{name}</Text>
                        <Text style={{color:"#2d333a",fontSize:20,fontWeight:"bold",textAlign:"center"}}>Balance : {balance?Number(ethers.utils.formatEther(balance)).toFixed(4):null} ETH</Text>
                    </View>
                </View>
            </View>     
            <View style={{height:height*0.1,backgroundColor:"transparent",flexDirection:"row",justifyContent:"center",padding:10}}>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",flex:1,backgroundColor:"transparent"}}>
                    <Text style={{color:"#fff",fontSize:20,fontWeight:"bold",textAlign:"center"}}>To</Text>
                    <View style={{flexDirection:"row",justifyContent:"space-evenly",alignItems:'center',width:"80%",backgroundColor:"#fff",borderRadius:10}}>
                        <TextInput
                            style={{backgroundColor:"#fff",justifyContent:"space-evenly",flexDirection:"column",width:"80%",borderWidth:1,borderColor:'#fff',borderRadius:10,padding:10,height:50,color:"#2d333a"}} 
                            placeholder="Enter Address"
                            placeholderTextColor="#2d333a"
                            ref={addres}
                            onChangeText={(text) => {
                                setaddress(text);
                                setvalid(ethers.utils.isAddress(text));
                            }}
                        />
                        <TouchableOpacity onPress={()=>setCamera(true)}>
                        <Image
                            style={{width:30,height:30,borderColor:"#fff"}}
                            source={require('../../assets/PNG/Scan.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View> 
                        {valid==false && addressTo.length>0?<Text style={{textAlign:'center',color:"red"}}>Enter Valid Address</Text>:null}
        </View>
        {valid ==true? <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('AmountPage',{addressTo,address,name})}>
                <Text style={styles.title} >Continue</Text>
            </TouchableOpacity>
        </View>:null}
       
        </View>     
        <Modal
        isVisible={camera}
        animationType={'fade'}
        transparent={true}
        onRequestClose={() => {
            setCamera(false);
        }}
        onBackdropPress={() => {
            setCamera(false);
        }}
      >
        <QRCodeScanner
        onRead={(e)=>onSuccess(e)}
        ref={scanner}
        cameraProps={{captureAudio: false}}
        cameraStyle={styles.camera}
        cameraContainerStyle={styles.container}
        reactivated={true}
        reactivateTimeout={2000}
        // fadeIn={true}
        showMarker={true}
        customMarker={
          <View style={styles.modelView}>
          <Animatable.View
                  style={{ width: scanBarWidth,
                    height: 2,
                    backgroundColor: scanBarColor,backgroundColor:"yellow"}}
                  direction="alternate-reverse"
                  iterationCount="infinite"
                  duration={1700}
                  easing="linear"
                  animation={makeSlideOutTranslation(
                    "translateY",
                    width * -0.25
                  )}
                />
          </View>
        }
        markerStyle={{borderColor:"#fff",borderWidth:2,borderRadius:10}}
      />
      </Modal> 
    </>
  )
}

export default SendEther;
const styles = StyleSheet.create({
    buttonsContainer: {
        // justifyContent: 'center',
        backgroundColor:"transparent",
        padding:10,
    },
    title: {
        color: '#fff',
        fontSize: 16
    },
    button:{
        height: 48,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 2,
        backgroundColor: '#fca311',
        // borderColor: '#fff',
        padding: 8,
        borderRadius: 4
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
      },
      textBold: {
        fontWeight: '500',
        color: '#000'
      },
      buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
      },
      buttonTouchable: {
        padding: 16
      },
      camera: {
        height: height,width: width,
        alignSelf:'center',
        // backgroundColor:"red"
      },
      topView: {
        height: 0,
        width: 0
      },
      bottomView: {
        height: 0,
        width: 0
      },
      container: {
       height: height,width: width,
        // justifyContent: 'center',
        // alignItems:'center',
        alignSelf:'center'

        // backgroundColor:"red"
        // alignItems: 'center',
      },
      modelView:{
        height:height/2.5,
        width:width/1.5,
        justifyContent:"center",
        alignItems:"center",
        borderColor:"#fff",
        borderWidth:2,
        borderRadius:15,
        backgroundColor:"transparent",
        alignSelf:"center"
      }
})
