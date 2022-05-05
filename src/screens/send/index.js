import { View, Text, TextInput ,KeyboardAvoidingView,Dimensions, Image, ActivityIndicator, TouchableOpacity, Alert,StyleSheet} from 'react-native'
import React,{useEffect,useState,useRef} from 'react'
import axios from 'axios';
import { ethers } from 'ethers';
// import { Camera, useCameraDevices } from 'react-native-vision-camera';
import Modal from 'react-native-modal';
import {Camera , CameraType} from 'react-native-camera-kit';

const height = (Dimensions.get('window').height)*0.1;

const SendEther = ({navigation,route}) => {
    // const devices = useCameraDevices();
    // const device = devices.back;
    // console.log(device)
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
        //  permission();
    }, [])
    const permission = async () => {
        const newCameraPermission = await Camera.requestCameraPermission();
        const cameraPermission =  await Camera.getCameraPermissionStatus()
        console.log('cameraPermission',cameraPermission);
        console.log('newCameraPermission',newCameraPermission);
    }
    const onScan = (data) => {
        setCamera(false);
        console.log('data',data);
        console.log(data.length)
       const valid= ethers.utils.isAddress(data);
         console.log('valid',valid);
         setvalid(valid);
        addres.current.setNativeProps({text:data});
    }
    // if (device == null) return <ActivityIndicator/>
  return (
      <>
    <View style={{backgroundColor:"#14213D",height:"100%",width:"100%",flexDirection:"column",justifyContent:"space-between"}}>
        <View>
        <View style={{height,backgroundColor:"transparent",flexDirection:"row",justifyContent:"center",marginTop:10,padding:10}}>
            <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",flex:1}}>
                <Text style={{color:"#fff",fontSize:20,fontWeight:"bold",textAlign:"center"}}>From</Text>
                <View style={{backgroundColor:"#fff",justifyContent:"space-evenly",flexDirection:"column",width:'80%',borderWidth:1,borderColor:'#fff',borderRadius:10,height:"100%"}}>
                    <Text style={{color:"#2d333a",fontSize:20,fontWeight:"bold",textAlign:"center"}}>{name}</Text>
                    <Text style={{color:"#2d333a",fontSize:20,fontWeight:"bold",textAlign:"center"}}>Balance : {balance?Number(ethers.utils.formatEther(balance)).toFixed(4):null} ETH</Text>
                </View>
            </View>
        </View>     
        <View style={{height,backgroundColor:"transparent",flexDirection:"row",justifyContent:"center",padding:10}}>
            <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",flex:1,backgroundColor:"transparent"}}>
                <Text style={{color:"#fff",fontSize:20,fontWeight:"bold",textAlign:"center"}}>To</Text>
                <View style={{flexDirection:"row",justifyContent:"space-evenly",alignItems:'center',width:"80%",backgroundColor:"#fff",borderRadius:10}}>
                    <TextInput
                        style={{backgroundColor:"#fff",justifyContent:"space-evenly",flexDirection:"column",width:"80%",borderWidth:1,borderColor:'#fff',borderRadius:10,padding:10,height:50}} 
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
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('CreateMnemonics')}>
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
          {/* <Camera
      style={{ flex: 1 }}
      device={device}
      isActive={true}
    /> */}
    <Camera
        // ref={(ref) => (this.camera = ref)}
        cameraType={CameraType.Back} // front/back(default)
        ratioOverlayColor="transparent"
        ratioOverlay={['16:9', '1:1', '3:4']}
        showFrame={false}
        scanBarcode={true}
        onReadCode={event =>onScan(event.nativeEvent.codeStringValue)}
        laserColor="blue"
        focusMode={'on'}
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
    }
})
