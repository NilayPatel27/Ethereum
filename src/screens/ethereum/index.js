import {View, Text, Dimensions, Image, TouchableOpacity,ToastAndroid} from 'react-native';
import React ,{useRef,useEffect}from 'react';
import Carousel from 'react-native-snap-carousel';
import Clipboard from '@react-native-community/clipboard';
import RBSheet from "react-native-raw-bottom-sheet";
import {useSelector, useDispatch} from 'react-redux';
import {addressArray,selectAddress,selectCount} from '../../../counterSlice';


let width = Dimensions.get('window').width.toFixed() * 0.8;
width = width.toFixed();
console.log(width);

const Ethereum = ({navigaiton, route}) => {
    let address = useSelector(selectAddress);
    let count =useSelector(selectCount)
    console.log('address', address);
  const dispatch = useDispatch();
    useEffect(() => {
()=>dispatch(addressArray(route.params.wallet.address));
()=>dispatch(() => dispatch(increment()))
console.log('address', address);
console.log('count', count);

    }, [])
    
  const {wallet,balances} = route.params;
  const refRBSheet = useRef();

  console.log(wallet);
  const USD =Number('2824.96');
  const array = [
    {
      name: 'ETH Main Account',
    },
    {
      name: 'Second',
    },
  ];
  const copyToClipboard =()=>{
    //   const {wallet} = route.params;
     return Clipboard.setString(wallet.address);
  }
  return (
      <>
      <View style={{flex:1,flexDirection:"column",backgroundColor: '#14213D'}}>
        <View style={{width:'100%',height:"30%", backgroundColor: '#14213D',justifyContent:"center",alignItems:'center',paddingTop:15}}>
        <Carousel
            data={array}
            renderItem={({item, index}) => (
            <>
                <View
                style={{
                    height: 200,
                    backgroundColor: 'lightblue',
                    padding: 10,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                }}>
                <View style={{justifyContent: 'flex-start',flexDirection:'column'}}>
                    <Text style={{color:'#2d333a',fontWeight:'bold'}}>{item.name}</Text>
                    <Text style={{color:"#2d333a"}}>
                    {wallet.address.slice(0, 5) +
                        '...' +
                        wallet.address.slice(
                        wallet.address.length - 4,
                        wallet.address.length,
                        )}
                    </Text>
                    <Text style={{marginTop:10,color:"#2d333a"}}>
                        {'Balance: ' + balances.toFixed(2)}
                    </Text>
                    <Text style={{color:"#2d333a"}}>
                        ={(USD*balances).toFixed(2)} USD
                    </Text>
                </View>
                <TouchableOpacity onPress={()=>copyToClipboard()}>
                <Image
                    style={{width: 25, height: 25}}
                    source={require('../../assets/PNG/copy.png')}
                />
                    </TouchableOpacity>
                </View>
            </>
            )}
            sliderWidth={400}
            itemWidth={300}
            layout={'default'}
            loop={false}
        />
        </View>
    {/* <Text style={{color:'#fff'}}>hello</Text> */}
    </View>
    </>
  );
};

export default Ethereum;
