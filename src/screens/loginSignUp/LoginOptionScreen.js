import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Logo from '../../../assets/svg/Logo.svg'
import { AnimatedSVGPaths } from "react-native-svg-animations";
import d from '../../../assets/svg/d';



const LoginOptionScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#347AF0', alignItems: 'center' }}>
            <View style={{ alignSelf: 'center', top: "10%" }}>
                <View>
                    <AnimatedSVGPaths
                        strokeColor={"white"}
                        strokeWidth={2}
                        duration={5000}
                        height={120}
                        width={120}
                        scale={1}
                        delay={1000}
                        ds={d}
                        loop={false}
                    />
                </View>
            </View>
            <View style={{ top: "12%" }}>
                <Text style={{ color: '#fff', fontSize: 28, textAlign: 'center', fontFamily: 'TitilliumWeb-Regular', }}>Welcome to</Text>
                <Text style={{ color: '#fff', fontSize: 48, textAlign: 'center', fontFamily: 'TitilliumWeb-Light' }}>MetaByte</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('LoginPageScreen')} style={{ width: 200, height: 50, alignSelf: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: '#fff', position: 'absolute', top: "82%" }}>
                <Text style={{ alignSelf: 'center', fontSize: 19, color: '#347AF0', fontFamily: 'TitilliumWeb-SemiBold' }}>Login</Text>
            </TouchableOpacity>
            <View style={{ position: 'absolute', top: '90%', flexDirection: 'row' }}>

                <Text style={{ color: '#fff', fontFamily: 'TitilliumWeb-Regular', fontSize: 15, padding: 2 }}>
                    Don't have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUpPageScreen')} >
                    <Text style={{ fontFamily: 'TitilliumWeb-SemiBold', fontSize: 16, color: '#fff' }}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default LoginOptionScreen

// const styles = StyleSheet.create({})