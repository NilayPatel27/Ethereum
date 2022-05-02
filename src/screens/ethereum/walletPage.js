import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { ethers } from 'ethers';

const WalletPage = ({navigation,route}) => {
    const {address,name} = route.params;

  const USD =Number('2824.96');

    const [balances, setbalances] = useState(null);
    const [transaction, settransaction] = useState([])
    console.log(address,name)
    useEffect(() => {
        axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=balance&address=${address}&apikey=349IQMJ71CEBWJ65I1U5G5N5NG43C37UZB&tag=latest`).then(res => { 
        console.log(res.data.result)
          setbalances(res.data.result);
      });
      axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=0x10b6ae82684B3829Bf36391B6bE87b6d96dCBBFd&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=349IQMJ71CEBWJ65I1U5G5N5NG43C37UZB`).then(res => {
        console.log(res.data.result)
        settransaction(res.data.result)
      });
    }, [])
    
  return (
    <View style={{flex:1,backgroundColor:"#14213D",padding:15}}>
        <View style={{width:"100%",height:"50%",backgroundColor:"lightblue",flexDirection:'column',justifyContent:'space-evenly',alignItems:"center", shadowColor: 'lightblue',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,borderRadius:10}}>
            <Text style={{fontSize:15,fontWeight:'bold'}}>Address : {address.slice(0, 5) +
                        '...' +
                        address.slice(
                        address.length - 4,
                        address.length,
                        )}</Text>
            <Text style={{fontSize:15,fontWeight:'bold'}}>Balance : {balances?ethers.utils.formatEther(balances):null} ETH</Text>
            <Text style={{fontSize:15,fontWeight:'bold'}}>${balances?(USD*(ethers.utils.formatEther(balances))).toFixed(2):null}
                    </Text>
            <Text style={{fontSize:15,fontWeight:'bold'}}>Account Name : {name}</Text>

                    
                    <View style={{flexDirection:"row",justifyContent:'space-evenly',height:'30%',width:"100%",alignItems:'center'}}>
                    <TouchableOpacity style={{justifyContent:"center",alignItems:'center',flexDirection:"column"}}>
                    <Image
                        style={{width: 35, height: 35}}
                        source={require('../../assets/PNG/Send.png')}/> 
                        <Text>Send</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:"center",alignItems:'center',flexDirection:"column"}}>
                    <Image
                        style={{width: 35, height: 35}}
                        source={require('../../assets/PNG/Receive.png')}/> 
                        <Text>Receive</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:"center",alignItems:'center',flexDirection:"column"}}>
                    <Image
                        style={{width: 35, height: 35}}
                        source={require('../../assets/PNG/Send.png')}/>
                        <Text>Send</Text>
                    </TouchableOpacity>
                    </View>
        </View>
        <View style={{width:"100%",justifyContent:"space-between",flexDirection:'column',backgroundColor:"transparent",marginTop:10}}>
            <FlatList
                data={transaction}
                renderItem={({item,index}) => (
                    <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"center",flex:1}}>
                        <View style={{backgroundColor:"#fca311",height:'100%',justifyContent:"center",padding:10}}>
                            <Text style={{fontSize:15,fontWeight:'bold',color:"#000"}}>{index+1}</Text>
                        </View>
                        <View style={{flex:1,justifyContent:"space-between",flexDirection:"column",padding:10,paddingLeft:20,backgroundColor:"#fca311"}}>
                        <Text style={{color:"#fff",flexWrap:'wrap'}}>From : {item.from.slice(0,8)+'...'}</Text>
                       <Text style={{color:"#fff"}}>Ether : {item.value?ethers.utils.formatEther(item.value):null}</Text>
                       </View>
                    </View>
                )}
                keyExtractor={item => item.hash}
                ItemSeparatorComponent={() => <View style={{height:10,backgroundColor:"transparent"}}/>}
            />
            {/* <Text>From : {transaction[0].from}</Text> */}
        </View>
    </View>
  )
}

export default WalletPage