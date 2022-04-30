import {View, Text, TouchableOpacity, StyleSheet, Dimensions,Alert} from 'react-native';
import React, {useRef} from 'react';
import _ from 'lodash';
import ConfirmBox from './confirmBox';
import { ethers } from 'ethers';
const windowWidth = Dimensions.get('window').width;

const ConfirmMnemonics = ({navigation, route}) => {
  const {mnemonic} = route.params;
  const Confirm = useRef();
  const onPressConfirm = () => {
    // if (!Confirm.current.isValidSequence()) {
    //   Alert.alert('Invalid sequence', 'Please select the correct sequence');
    //   return null;
    // }
    const wallet = loadWalletFromMnemonics(mnemonic);
    console.log(wallet.privateKey);
    navigation.navigate('HomePage',{wallet});
    console.log('Confirm');
  };
const PROVIDER = ethers.providers.getDefaultProvider('ropsten');

  const loadWalletFromMnemonics =(mnemonics) => {
    console.log(mnemonics);
    console.log(!(mnemonics instanceof Array));
    console.log(typeof mnemonics !== 'string');
    if (!(mnemonics instanceof Array) && typeof mnemonics !== 'string')
      throw new Error('invalid mnemonics');
    else if (mnemonics instanceof Array) {
      mnemonics = mnemonics.join(' ');
      console.log('else if');
    }
    console.log(typeof mnemonics == 'string');
    console.log(mnemonics);
    // console.log(ethers.utils.isValidMnemonic(mnemonics));
    let wallet1 =  ethers.Wallet.fromMnemonic(mnemonics);
    wallet1 = wallet1.connect(PROVIDER);
    // console.log(wallet1)
    return wallet1;
  }
  
  return (
    <>
        <ConfirmBox ref={Confirm} mnemonic={mnemonic} />
        <View style={{backgroundColor: '#14213D', paddingBottom: 10}}>
            <TouchableOpacity
              style={styles.button}
              onPress={onPressConfirm}>
              <Text style={styles.title}>Confirm</Text>
            </TouchableOpacity>
          </View>
    </>
  );
};

export default ConfirmMnemonics;
const styles = StyleSheet.create({
  mnemonicsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '100%',
    marginTop:'70%',
    // backgroundColor:"blue"
  },
  renderMnemonic:{
    backgroundColor: 'lightblue',
    padding: 8,
    borderWidth: 1,
    borderColor: '#1E1E1E',
    borderRadius: 4,
    width:windowWidth/4,
    justifyContent:'center',
    alignItems:"center"
  },
  button: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 2,
    backgroundColor: '#fca311',
    // borderColor: '#fff',
    padding: 8,
    borderRadius: 4,
    width: '95%',
    alignSelf: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
});
