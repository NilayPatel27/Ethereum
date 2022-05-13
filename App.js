import React, { useEffect, useState } from 'react';
import { store } from './store';
import { Provider } from 'react-redux';
import Navigation from './Navigations/rootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import NewSplash from './src/screens/NewSplash';

// import firestore from '@react-native-firebase/firestore';
// import { ethers } from 'ethers';


const App = () => {
  // useEffect(() => {
  //   getuser()
  // }, [])

  // const getuser = async () => {
  //   const user = await firestore().collection('users').doc('tzzCDRCiQSwrPPbqJlHK').get()
  //   console.log(JSON.parse(user.data().Array));
  //   // console.log(JSON.parse(user.data().Array) instanceof ethers.Wallet);
  //   firestore().collection('users').onSnapshot(snapshot => {
  //     let users = [];
  //     snapshot.forEach(doc => {
  //       users.push({...doc.data(), id: doc.id});
  //     }
  //     );
  //     console.log('users',users);
  //     for(let i = 0; i < users.length; i++){
  //       console.log(JSON.parse(users[i].Array) instanceof ethers.Wallet);
  //       console.log(users[i].Array);
  //     }

  //   })
  // }

  // useEffect(() => {
  //   AsyncStorage.getItem('login').then(value => {
  //     if (value === null) {
  //       store.dispatch({type: 'LOGIN', payload: false});
  //     } else {
  //       store.dispatch({type: 'LOGIN', payload: true});
  //     }
  //   }
  //   );
  // }, []);


  const [loginValue, setLoginValue] = useState(false);
  const [trueFlage, setTrueFlage] = useState(false);

  const _retrieveData = async () => {
    try {
      await AsyncStorage.getItem('login').then(value => {

        // We have data!!
        setLoginValue(value);

      });
    } catch (error) {
      // Error retrieving data
    }
  }
  useEffect(() => {
    _retrieveData();
    setTimeout(() => {
      setTrueFlage(true);
    }
      , 1000);
  }, []);
  if (!trueFlage) {
    return <NewSplash />;
  }

  return (
    <Provider store={store}>
      <Navigation loginValue={loginValue} />
    </Provider>
  );
};

export default App;
