import axios from 'axios';
import '@ethersproject/shims';
import { ethers } from 'ethers';
import randomBytes from 'randombytes';
import Modal from 'react-native-modal';
import 'react-native-get-random-values';
import converter from 'number-to-words';
import RBSheet from "react-native-raw-bottom-sheet";
import {useSelector, useDispatch} from 'react-redux';
import React ,{useRef,useEffect,useState}from 'react';
import Clipboard from '@react-native-community/clipboard';
import {addressArray,selectAddress} from '../../../counterSlice';
import {View, Text, Dimensions, Image, TouchableOpacity,ToastAndroid, FlatList, StyleSheet,TextInput, Button} from 'react-native';


let width = Dimensions.get('window').width.toFixed() * 0.8;
width = width.toFixed();
console.log(width);

const Ethereum = ({navigation}) => {
  const [count, setcount] = useState(false);
  const [privateKey, setprivateKey] = useState('');
  const textValue = useRef();

    var address = useSelector(selectAddress);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(address.length)
    }, [])

  const refRBSheet = useRef();
  const addressRef = useRef();
  const USD =Number('2824.96');
  const array = address;

  const copyToClipboard =(index)=>{
    let c =converter.toWordsOrdinal(index);
    console.log(c);
    ToastAndroid.show('Address Copied to clipboard', ToastAndroid.SHORT);
     return Clipboard.setString(array[index].address);
  }

const PROVIDER = ethers.providers.getDefaultProvider('ropsten');

  const createWallet = () =>{
    let id = randomBytes(32).toString('hex');
    let privateKey = '0x' + id;
    // console.log(privateKey);
    let wallet = new ethers.Wallet(privateKey);
    wallet= wallet.connect(PROVIDER);
    console.log(wallet.address);
    console.log(wallet);
    let obj = {
      name: converter.toWordsOrdinal(address.length),
      address:wallet.address,
      wallet:wallet
    }
    console.log(obj);
    for(let i = 0; i < address.length; i++){
      if(address[i].address === wallet.address){
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
      console.log(wallet.address);
      let obj = {
        name: converter.toWordsOrdinal(address.length),
        address:wallet.address,
        wallet:wallet,
        privateKey:wallet.privateKey,
      }
      for(let i = 0; i < address.length; i++){
        if(address[i].address === wallet.address){
          return;
        }
      }
    dispatch(addressArray(obj));
    refRBSheet.current.close()
    }
    catch(e){
      console.log('invalid private key');
    } 
  }
  return (
      <>
      <View style={{height:'100%',width:"100%",flexDirection:"column",backgroundColor: '#fff'}}>
        <View style={{flexDirection:'row',height:'10%',justifyContent:"space-between",width:"95%",alignSelf:"center",backgroundColor:'transparent',alignItems:"center"}}>
            <View style={{backgroundColor:"transparent",flexDirection:"row",flex:1,alignItems:'center'}}>
              <Text style={{color:"#2d333a",fontSize:20,fontWeight:'bold'}}>Ethereum Accounts</Text>
              <Image
              style={{width: 30, height: 30, }}
              source={require('../../assets/PNG/Ethereum.png')}
            />
            </View>
          <TouchableOpacity onPress={()=>setcount(true)}>
            <Image
              style={{width: 40, height: 40, }}
              source={require('../../assets/PNG/Plus1.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>refRBSheet.current.open()}>
          <Image
                source={require('../../assets/PNG/down.png')}
                style={{width: 40, height: 40,marginLeft:10}}
              />
          </TouchableOpacity>
        </View>
        <FlatList
        data={array}
        renderItem={({item, index}) => (
          <>
          <TouchableOpacity onPress={()=>navigation.navigate('WalletPage',{address:item.address,name:item.name})}>
          <View style={{flex:1,alignSelf:'center',flexDirection:'row'}} ref={addressRef} key={index}>
            <View style={{width:"95%",flexDirection:"row",justifyContent:"space-between",alignItems:'center',padding:10,backgroundColor: '#002147'}}>
            <View style={{justifyContent: 'flex-start',flexDirection:'column'}}>
                <Text style={{color:"#fff",fontWeight:'bold'}}>Name : {item.name}</Text>
                <Text style={{color:"#fff"}}>
                  Address : {item.address.slice(0, 5) +
                        '...' +
                        item.address.slice(
                        item.address.length - 4,
                        item.address.length,
                        )}
                    </Text>
            </View>
                <TouchableOpacity onPress={()=>{
                  // setIndex(index);
                  copyToClipboard(index);}}>
                <Image
                    style={{width: 25, height: 25}}
                    source={require('../../assets/PNG/copy_white.png')}/>
                    </TouchableOpacity>
                    </View>
          </View>
          </TouchableOpacity>
          </>
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={{height:20,backgroundColor:'#fff'}}></View>}
        />
        </View>
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
        {address.length>=10?<View style={style.mainView}>
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
  );
};

export default Ethereum;
const style = StyleSheet.create({
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
});