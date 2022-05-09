import React ,{useEffect}from 'react';
import {store} from './store';
import {Provider} from 'react-redux';
import Navigation from './Navigations/rootNavigation';
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
  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );
};

export default App;
