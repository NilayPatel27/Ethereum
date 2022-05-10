import { View, Text, Image } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectLogin } from '../../../counterSlice'

const InitialPage = ({navigation}) => {
  const [first, setfirst] = useState(null)

  const login =useSelector(selectLogin);
  // useLayoutEffect(() => {
  //   // console.log('login',login);
  //   setfirst(login);
  // }, [login])
  
  // setTimeout(() => {
  //   console.log('logintime',first);
  //   login===true?navigation.push('HomePage'):navigation.push('CreateAccount');
  // }, 4000);
  return (
    <View style={{ width: '100%', height: '100%',flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
      <Image

        source={require('../../assets/PNG/Ethereum.png')}
        style={{ width: '80%', height: '80%' }}
        // resizeMethod="resize"
      />
    </View>
  )
}

export default InitialPage