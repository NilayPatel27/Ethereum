import { View, Text, ImageBackground, StyleSheet, StatusBar, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Animatable from 'react-native-animatable';



const NewSplash = ({ navigation, route }) => {

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      <ImageBackground source={require('../assets/PNG/Wallpaper.jpg')} style={{ flex: 1 }} resizeMode="cover" >
        <Animatable.View animation="zoomIn" style={styles.openPosition}>
          <Image 
          source={require('../assets/PNG/Ethereum.png')}
          style={{height:200,width:200}}
          />
          <Text style={styles.companyName1}>Ethereum</Text>
        </Animatable.View>
      </ImageBackground>
    </View>
  )
}

export default NewSplash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  openPosition: {
    flex:1,
    justifyContent:'center',
    alignItems:"center",
    color:"#2d333a"
  },

  companyName1: {
    color: 'white',
    fontSize: 55,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-light',
  },

  companyName2: {
    color: 'white',
    fontSize: 38,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-light',
  },
});
