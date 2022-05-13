import { View, Text, ImageBackground, StyleSheet, StatusBar } from 'react-native'
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
      <ImageBackground source={require('../assets/PNG/Splash.png')} style={{ flex: 1 }}>
        <Animatable.View animation="zoomIn" style={styles.openPosition}>
          <Text style={styles.companyName1}>Market</Text>

          <Text style={styles.companyName2}>Trade</Text>
        </Animatable.View>
      </ImageBackground>
    </View>
  )
}

export default NewSplash

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  openPosition: {
    flexDirection: 'column',
    margin: 50,
    top: '35%',

    justifyContent: 'space-evenly',
    alignItems: 'center',
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
