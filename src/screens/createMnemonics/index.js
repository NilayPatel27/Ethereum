import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import React, {useState, useEffect} from 'react';
import {entropyToMnemonic} from '@ethersproject/hdnode';
import randomBytes from 'randombytes';
import {Divider} from 'react-native-elements/dist/divider/Divider';
const windowWidth = Dimensions.get('window').width;

const CreateMnemonics = ({navigation}) => {
  const [mnemonic, setmnemonics] = useState(null);
  const [res, setres] = useState(false);

  useEffect(() => {
    const mnemonics = entropyToMnemonic(randomBytes(16));
    let myArray = mnemonics.split(' ');
    console.log(myArray);
    setmnemonics(myArray);
    setres(true);
  }, []);

  const renderMnemonic = (mnemonic, index) => (
    <View style={{margin: 4}} key={index}>
      <View style={styles.renderMnemonic}>
        <Text style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
          {mnemonic}
        </Text>
      </View>
    </View>
  );
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'column',
          padding: 8,
          backgroundColor: '#14213D',
        }}>
        <View
          style={styles.textView}>
          <Text style={styles.text}>
            Please write down your 12 words Back-up Seed on a paper, in the
            exact same order as shown below, and store the paper with the Seed
            and Private Key give direct access to your account and funds. DO NOT
            give this information to ANYONE.
          </Text>
        </View>
        {res && (
          <>
            <View style={styles.mnemonicsContainer}>
              {mnemonic.map((mnemonic, index) =>
                renderMnemonic(mnemonic, index),
              )}
            </View>
          </>
        )}
      </View>
      {res && (
        <View style={{backgroundColor: '#14213D', paddingBottom: 10}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ConfirmMnemonics', {mnemonic})}>
            <Text style={styles.title}>Proceed</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default CreateMnemonics;
const styles = StyleSheet.create({
  mnemonicsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '100%',
    // backgroundColor:"blue"
  },
  renderMnemonic: {
    backgroundColor: 'lightblue',
    padding: 8,
    borderWidth: 1,
    borderColor: '#1E1E1E',
    borderRadius: 4,
    width: windowWidth / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              color: '#000',
              fontSize: 18,
              textAlign: 'center',
  },
  textView:{
        backgroundColor: '#adefd1ff',
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%',
        height: '30%',
        borderRadius: 5,
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
