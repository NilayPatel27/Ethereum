import {View, Text, Dimensions, Image, TouchableOpacity,ToastAndroid,Button, FlatList} from 'react-native';
import React ,{useRef,useEffect,useState}from 'react';
import Carousel from 'react-native-snap-carousel';
import Clipboard from '@react-native-community/clipboard';
import RBSheet from "react-native-raw-bottom-sheet";
import {useSelector, useDispatch} from 'react-redux';
import {addressArray,selectAddress,selectCount,decrement, increment,} from '../../../counterSlice';
import { ethers } from 'ethers';
import { sortedIndex } from 'lodash';
import converter from 'number-to-words'
import axios from 'axios';


let width = Dimensions.get('window').width.toFixed() * 0.8;
width = width.toFixed();
console.log(width);

const Ethereum = ({navigation, route}) => {
  const {wallet,balances} = route.params;
  const [balance, setbalances] = useState(null);
  const [resBal, setresBal] = useState([]);
  const [resobj, setresobj] = useState([])
const [res, setres] = useState(false)
  let resObj=[]
    var address = useSelector(selectAddress);
    // console.log(address.length);
    let count = useSelector(selectCount)
  const dispatch = useDispatch();

    useEffect(() => {
      bal();
      // for(let i=0;i<address.length;i++){

        let obj = {
          name: converter.toWordsOrdinal(address.length),
          address:route.params.wallet.address,
          // balance:balance,
        }
        for(let i = 0; i < address.length; i++){
          if(address[i].address === route.params.wallet.address){
            return;
          }
        }

        dispatch(addressArray(obj));
        console.log(address.length)
        setres(true)
        console.log('add',address);
        // balOfWallets()
    //   axios.get('https://api-ropsten.etherscan.io/api?module=account&action=balance&address=0x765eCE0854dc4A0dE76aF0e947b8d6E84585076A&apikey=349IQMJ71CEBWJ65I1U5G5N5NG43C37UZB&tag=latest').then(res => { 
    //    setbalances(res.data.result);
    // });
      dispatch(() => dispatch(increment()));
      // console.log('address', address);
      // console.log('count', count);
    }, [])
    // {res == true?()=>balOfWallets():null}
  //   async function updateBalance(wallet) {
  //     console.log(wallet);
  //     const provider = ethers.getDefaultProvider('ropsten');
  //     let balance = await provider.getBalance(wallet);
  //     // console.log('balances',balance);
  //     balance = ethers.utils.formatEther(balance);
  //     console.log('balances',balance);
  //     // console.log('updateBalance method called')
  //     // WalletsStore.setBalance(wallet.address, balance);
  //     if(!balance) return;
  //     return balance;
  // }
    const bal = async () => {
      const provider = ethers.getDefaultProvider('ropsten');
      // var balance = await provider.getBalance(route.params.wallet.address);
      // setbalances(Number(balance));
      return balance;
    };

  const refRBSheet = useRef();
  const addressRef = useRef();

  // console.log(wallet);
  const USD =Number('2824.96');

  const array = address;
  // console.log(array);


  const copyToClipboard =(index)=>{
    // console.log('index',array[index]);
    let c =converter.toWordsOrdinal(index);
    console.log(c);
    ToastAndroid.show('Address Copied to clipboard', ToastAndroid.SHORT);
     return Clipboard.setString(array[index].address);
  }

  const balOfWallets = ()=>{
    console.log(address)
    let a=[];
    for(let i = 0; i < address.length; i++){
     a.push(address[i].address);
    }
    let j = a.join()
    console.log(typeof j);
    axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=balancemulti&address=${j}&apikey=349IQMJ71CEBWJ65I1U5G5N5NG43C37UZB&tag=latest`).then(res => { 
      console.log(res.data.result);
      resObj = res.data.result;
      console.log('resObj',resObj[0].balance);
    });
    setresobj(resObj);
  }
  return (
      <>
      <View style={{height:'100%',width:"100%",flexDirection:"column",backgroundColor: '#14213D'}}>
        <Text style={{color:"#fff",alignSelf:'center',marginTop:20}}>Ethereum</Text>
        <Text style={{color:"#fff",alignSelf:'center'}}>Accounts</Text><View style={{flex:1, backgroundColor: '#14213D',justifyContent:"center",alignItems:'center',paddingTop:15}}>
        <FlatList
        data={array}
        renderItem={({item, index}) => (
<>
          <TouchableOpacity onPress={()=>navigation.navigate('WalletPage',{address:item.address,name:item.name})}>
          <View style={{flex:1,alignSelf:'center',flexDirection:'row'}} ref={addressRef} key={index}>
            <View style={{width:"95%",flexDirection:"row",justifyContent:"space-between",alignItems:'center',padding:10,backgroundColor: 'lightblue',}}>
            <View style={{justifyContent: 'flex-start',flexDirection:'column'}}>
                <Text style={{color:"#2d333a",fontWeight:'bold'}}>Name : {item.name}</Text>
                {/* <Text style={{color:"#2d333a",fontWeight:'bold'}}>{updateBalance(item.address)}</Text> */}
                <Text style={{color:"#2d333a"}}>
                  Address : {item.address.slice(0, 5) +
                        '...' +
                        item.address.slice(
                        item.address.length - 4,
                        item.address.length,
                        )}
                    </Text>
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
          </>
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={{height:20,backgroundColor:'#14213D'}}></View>}
        />
        </View>

    </View>
    </>
  );
};

export default Ethereum;
