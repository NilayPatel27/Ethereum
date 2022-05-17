import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const SecondTab = ({res}) => {
  return (
    res==false
    ?<ActivityIndicator  size="small" color="#0000ff" style={{flex:1,justifyContent:"center",alignItems:"center",flexDirection:"row"}}/>
    :
    <View style={{backgroundColor:"transparent",flex:1,justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontSize:20,fontWeight:'bold',color:"#2d333a"}}>No Tokens</Text>
    </View>
  )
}

export default SecondTab