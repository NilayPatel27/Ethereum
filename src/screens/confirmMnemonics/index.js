import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import _ from 'lodash';
const windowWidth = Dimensions.get('window').width;

const ConfirmMnemonics = ({navigation, route}) => {
  const {mnemonic} = route.params;
  const [shuffle, setshuffle] = useState(false);

  const [state, setState] = useState({
    selectable: mnemonic,
    selected: [],
  });
  useEffect(() => {
    setState({
      ...state,
      selectable: _.shuffle([...state.selectable]),
    });
    setshuffle(true);
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
  // console.log(mnemonic,res)
  return (
    <>
            {shuffle && <>
    <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'column',
          padding: 8,
          backgroundColor: '#14213D',
        }}>
          <View style={styles.mnemonicsContainer}>
              {state.selectable.map((mnemonic, index) =>
                renderMnemonic(mnemonic, index),
              )}
            </View>
      
      </View></>}
      {shuffle &&<View style={{backgroundColor: '#14213D', paddingBottom: 10}}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ConfirmMnemonics')}>
              <Text style={styles.title}>Proceed</Text>
            </TouchableOpacity>
          </View>}
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
