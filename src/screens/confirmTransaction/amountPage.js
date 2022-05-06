import axios from 'axios';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

const AmountPage = ({navigation,route}) => {
    const {addressTo ,address,name} = route.params;
    const [balances, setbalances] = useState(null);
    const [amount, setamount] = useState(0);
    const Dollar=Number('2741.37');
    console.log(addressTo,address);
    useEffect(() => {
      axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=balance&address=${address}&apikey=349IQMJ71CEBWJ65I1U5G5N5NG43C37UZB&tag=latest`).then(res => { 
        console.log(res.data.result)
        console.log(typeof res.data.result)
          setbalances(res.data.result);
      });
    }, [])
    
  return (
    <>
    <View style={{flex:1,backgroundColor:"#14213D",justifyContent:'space-between',alignItems:"center",flexDirection:"column"}}>
      <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"transparent"}}>
      <Text style={{color:'#fff'}}>Awailable balance : {balances?Number(ethers.utils.formatEther(balances)).toFixed(3):null} ETH</Text>
      <View style={{flexDirection:"column",justifyContent:"center",alignItems:'center',flex:0.5,backgroundColor:"transparent"}}>
        <Text style={{color:'#fff'}}>Amount to send</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1,width:100,borderRadius:10,margin:10,color:"#fff"}}
          onChangeText={(amount) => {
            setamount(amount);
          }}
          keyboardType="numeric"
          maxLength={10}
          autoFocus={true}
        />
        <Text style={{color:'#fff'}}>≈ ${amount*Dollar}</Text>
      </View>
      </View>
      {amount? <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('CofirmTransaction',{addressTo,address,amount,name})}>
                <Text style={styles.title} >Continue</Text>
            </TouchableOpacity>
        </View>:null}
    </View>
    </>
  )
}

export default AmountPage;
const styles = StyleSheet.create({
  buttonsContainer: {
      // justifyContent: 'center',
      backgroundColor:"transparent",
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