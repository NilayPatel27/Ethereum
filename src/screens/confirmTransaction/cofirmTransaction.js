import axios from 'axios';
import { ethers } from 'ethers';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { selectAddress } from '../../../counterSlice';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

const height = (Dimensions.get('window').height)*0.1;

const CofirmTransaction = ({navigation,route}) => {
    const { addressTo,address,amount,name}=route.params;
    var addres = useSelector(selectAddress);
    console.log(addres)
    const [balance, setbalance] = useState(null);
    const [wallet, setWallet] = useState(null);
    const Dollar=Number('2741.37');

    useEffect(() => {
        axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=balance&address=${address}&apikey=349IQMJ71CEBWJ65I1U5G5N5NG43C37UZB&tag=latest`).then(res => { 
            console.log(res.data.result);
            setbalance(res.data.result);
         });
         for(let i=0;i<addres.length;i++){
            if(address==addres[i].address){
                setWallet(addres[i].wallet);
            }
        }
    }, [])
    
const DEFAULT_GASLIMIT = 21000;
// const DEFAULT_GASLIMIT = 200000;
const DEFAULT_GASPRICE = 4000000000;

    const transObj =(to,value,gasLimit = DEFAULT_GASLIMIT,options = {})=>{
        gasLimit = DEFAULT_GASLIMIT;
        const gasPrice = DEFAULT_GASPRICE;
        value = ethers.utils.parseEther(value);
        return {
            gasPrice,
            gasLimit,
            to,
            value,
            ...options
    }}
const finaltransaction = async (hash) => {
    console.log('hash',hash);
    try{
        let res = await wallet.provider.waitForTransaction(hash,1);
        console.log('res',res);
        console.log('Transaction mined!');
    }
    catch(e){
        console.log('Transaction failed!');
        console.log(e);
        return false;
    }
}
    const confirmTransaction = async () => {
        console.log(addressTo,address,amount);
        const tx = {
            to: addressTo,
            value: ethers.utils.parseEther(amount),
          }
            console.log(tx);
        const objOfTransaction = transObj(addressTo,amount);
        // console.log(objOfTransaction);
        // console.log(wallet);
        // console.log(wallet.privateKey);
        let txn = await wallet.sendTransaction(objOfTransaction);
        // const createReceipt = await wallet.sendTransaction(txn);
        // console.log(createReceipt.hash);
        // console.log(createReceipt);
      const final = await finaltransaction(txn.hash);
      console.log(final);
    }
  return (
      <>
    <View style={{backgroundColor:"#14213D",flex:1,flexDirection:"column",justifyContent:"flex-start"}}>

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
                <View style={{flexDirection:"row",justifyContent:"space-evenly",alignItems:'center',width:"80%",backgroundColor:"#fff",borderRadius:10,height:"100%"}}>
                    <Text style={{color:"#000"}}>{addressTo}</Text>
                </View>
            </View>
        </View> 
        </View>
                <View style={{backgroundColor:"transparent",flexDirection:"row",justifyContent:"space-evenly",backgroundColor:"transparent",flex:0.5}}>
                    <View style={{flexDirection:"column",justifyContent:"space-evenly",alignItems:"center",flex:1,backgroundColor:"transparent"}}>
                        <Text style={{color:"#fff",fontSize:20,fontWeight:"bold",textAlign:"center"}}>Amount</Text>
                        <View style={{flexDirection:"row",justifyContent:"space-evenly",alignItems:'center',width:"50%",backgroundColor:"#fff",borderRadius:10,padding:10}}>
                            <Text style={{color:"#000"}}>{amount}</Text>
                        </View>
                        <Text style={{color:'#fff'}}>≈ ${amount*Dollar}</Text>
                    </View>
                </View>
        </View>
                <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={()=>confirmTransaction()}>
                <Text style={styles.title} >Continue</Text>
            </TouchableOpacity>
        </View>
        </>
  )
}

export default CofirmTransaction;
const styles = StyleSheet.create({
    buttonsContainer: {
        // justifyContent: 'center',
        backgroundColor:"#14213D",
        padding:10,
        width:"100%"
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