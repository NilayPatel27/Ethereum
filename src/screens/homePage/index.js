import React from 'react';
import {useSelector} from 'react-redux';
import {selectAddress} from '../../../counterSlice';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {useRoute} from '@react-navigation/native';

const HomePage = ({navigation}) => {
  const route = useRoute();
  var address = useSelector(selectAddress);
  const array = [{name: 'ETH'}];
  BackHandler.addEventListener('hardwareBackPress', () => {
    if(route.name === 'HomePage'){
    console.log('back');
    }
    // BackHandler.exitApp()
    // return true;
  });

  const renderItem = ({item, index}) => {
    return (
      <>
        <TouchableOpacity onPress={() => navigation.navigate('Accounts')}>
          <View style={styles.container} key={index}>
            <Text style={{fontSize: 20, color: '#fff'}}>{item.name}</Text>
            <Text style={{fontSize: 20, color: '#fff'}}>{address.length}</Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <FlatList
          data={array}
          renderItem={({item, index}) => renderItem({navigation, item, index})}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </>
  );
};

export default HomePage;
const styles = StyleSheet.create({
  container: {
    width: '90%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#14213D',
    alignSelf: 'center',
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
});
