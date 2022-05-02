import { View, Text,ToastAndroid,TouchableOpacity,Image } from 'react-native'
import React,{useEffect} from 'react';
import converter from 'number-to-words'
import axios from 'axios';
import { ethers } from 'ethers';


const FlatlistItem = ({item,index,address}) => {
    
    let resObj = [];
    useEffect(() => {
        // console.log(address);
        console.log(address[index].address);
        // let a=[];
        //   for(let i = 0; i < address.length; i++){
        //    a.push(address[i].address);
        //   }
        //   let j = a.join()
        //   console.log(typeof j);
        let array= [];
        let k ;
        let l =3;
        const int= setInterval(interval,1000);
    const interval = () =>{
        for(let k = 0; k < l; k++){
            axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=balance&address=${address[k].address}&apikey=349IQMJ71CEBWJ65I1U5G5N5NG43C37UZB&tag=latest`).then(res => { 
                   console.log(res.data.result);
                });
           }
           k=l+1;
              l=l+3;
              if(l>address.length)
              clearInterval(int);
        }
    }, [])
    
  const copyToClipboard =(index)=>{
    // console.log('index',array[index]);
    let c =converter.toWordsOrdinal(index);
    console.log(c);
    ToastAndroid.show('Address Copied to clipboard', ToastAndroid.SHORT);
     return Clipboard.setString(array[index].address);
  }

  return (
    <TouchableOpacity >
          <View style={{flex:1,alignSelf:'center',flexDirection:'row'}}key={index}>
            <View style={{width:"95%",flexDirection:"row",justifyContent:"space-between",alignItems:'center',padding:10,backgroundColor: 'lightblue',}}>
            <View style={{justifyContent: 'flex-start',flexDirection:'column'}}>
                <Text style={{color:"#2d333a",fontWeight:'bold'}}>Name : {item.name}</Text>
                {/* <Text style={{color:"#2d333a"}}>
                  Address : {item.address.slice(0, 5) +
                        '...' +
                        item.address.slice(
                        item.address.length - 4,
                        item.address.length,
                        )}
                    </Text> */}
                    {/* <Text style={{color:"#2d333a"}}>Balance : {ethers.utils.formatEther(Number(resObj[].balance))} ETH
                    </Text> */}
                    {/* <Text style={{color:"#2d333a"}}>
                        ={(USD*item.balance).toFixed(2)}$ USD
                    </Text> */}
            </View>
                <TouchableOpacity onPress={()=>{
                  // setIndex(index);
                  copyToClipboard(index);}}>
                <Image
                    style={{width: 25, height: 25}}
                    source={require('../../assets/PNG/copy.png')}/>
                    </TouchableOpacity>
                    </View>
          </View>
          </TouchableOpacity>
     
  )
}

export default FlatlistItem