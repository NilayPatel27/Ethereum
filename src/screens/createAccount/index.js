import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'

const CreateAccount = ({navigation}) => {
  return (
    <View style={styles.container}>
    <View style={styles.contentContainer}>
        <View>
            <Text style={styles.message}>When creating a new wallet you will receive a sequence of mnemonics which represent your "personal password". Anyone with this sequence may be able to reconfigure your wallet in any new device. Keep it stored as secure as possible. Only you should have access to this information.</Text>
            <Text style={styles.message}>Write it somewhere safe so you can make sure you won't lose it, or you may lose permanently all your coins. There is no way to recover it later.</Text>
        </View>
    </View>
    <View style={styles.buttonsContainer}>
    <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('CreateMnemonics')}>
        <Text style={styles.title} >Create account</Text>
    </TouchableOpacity>
    </View>
</View>
  )
}

export default CreateAccount;
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#14213D',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        flex: 1,
        padding: 8,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-around'
    },
    message: {
        color: '#FFF',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 8,
        marginHorizontal: 32
    },
    buttonsContainer: {
        justifyContent: 'space-between',
        backgroundColor:"#251D3A"
    },
    title: {
        color: '#fff',
        fontSize: 16
    },
    button:{
        height: 48,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 2,
        backgroundColor: '#fca311',
        // borderColor: '#fff',
        padding: 8,
        borderRadius: 4
    }
});