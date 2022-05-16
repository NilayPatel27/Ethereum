import axios from 'axios';
import { ethers } from 'ethers';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import React, { useState, useEffect, useRef } from 'react';
import { selectAddress } from '../../../counterSlice';
import Clipboard from '@react-native-community/clipboard';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, PanResponder, TouchableWithoutFeedback, Share, ToastAndroid } from 'react-native';

const MainInfo = ({ address, navigation, name }) => {
    const [balances, setbalances] = useState(null);
    const [data, setData] = useState([]);
    const [res, setres] = useState(false)
    const [count, setcount] = useState(false);
    let allAddress = useSelector(selectAddress);

    const USD = Number('2824.96');
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            //   onPanResponderGrant: () => {
            //     pan.setOffset({
            //       x: pan.x._value,
            //       y: pan.y._value
            //     });
            //   },
            onPanResponderGrant: () => { },
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dx: pan.x, dy: pan.y }
                ],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: true
                }).start();
                if (pan.x._value > 100) {
                    // navigation.navigate('SendEther',{wallet:route.params.wallet});
                    console.log('horizontal');
                }
                else if (pan.y._value > 100) {
                    // navigation.navigate('ReceiveEther',{wallet:route.params.wallet});
                    console.log('vertical');
                }
            }
        })
    ).current;
    useEffect(() => {
        axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=balance&address=${address}&apikey=349IQMJ71CEBWJ65I1U5G5N5NG43C37UZB&tag=latest`).then(res => {
            // console.log(res.data.result)
            setbalances(res.data.result);

        });
        for (let i = 0; i < allAddress.length; i++) {
            if (allAddress[i].address === address) {
                setData(allAddress[i]);
            }
        }
        setres(true)
    }, [])
    const copyToClipboard = (index) => {
        ToastAndroid.show('Address Copied to clipboard', ToastAndroid.SHORT);
        return Clipboard.setString(address);
    }
    const share = () => {
        Share.share({
            message: address,
        });
    }
    const renderColumn = (icon, label, action) => (
        <TouchableWithoutFeedback onPress={action}>
            <View style={style.actionColumn}>
                {/* <Icon name={icon} style={styles.actionIcon} /> */}
                {icon == 'copy' ?
                    <Image
                        source={require('../../assets/PNG/copy.png')}
                        style={{ height: 25, width: 25 }}
                    /> : <Image
                        source={require('../../assets/PNG/Send.png')}
                        style={{ height: 25, width: 25 }}
                    />}
                <Text style={{ color: "#2d333a" }}>{label}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
    if (!res) {
        return null;
    }
    return (
        <>
            <Animated.View style={{ transform: [{ translateY: pan.y }], flexDirection: "row", justifyContent: "space-between", flex: 1 }} {...panResponder.panHandlers} >
                <View style={{ width: "70%", height: "100%", backgroundColor: "#002147", flexDirection: 'row', justifyContent: 'flex-start', alignItems: "center", borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                    <View style={{ width: '30%', height: "100%", backgroundColor: 'transparent', flexDirection: "column", justifyContent: "space-evenly", alignItems: "flex-end" }}>
                        <Text style={style.orange}>Name</Text>
                        <Text style={style.orange}>Address</Text>
                        <Text style={style.orange}>Balance</Text>
                        <Text style={style.orange}>Dollar</Text>
                    </View>
                    <View style={{ width: "5%", height: "100%", backgroundColor: 'transparent', flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
                        <Text style={style.orange}>:</Text>
                        <Text style={style.orange}>:</Text>
                        <Text style={style.orange}>:</Text>
                        <Text style={style.orange}>:</Text>
                    </View>
                    <View style={{ height: "100%", flex: 1, backgroundColor: 'transparent', flexDirection: "column", justifyContent: "space-evenly", alignItems: "flex-start" }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', alignItems: "center", color: '#fff' }}>{data.name}</Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff' }}>{data.address.slice(0, 5) + '...' + data.address.slice(
                            data.address.length - 4,
                            data.address.length,
                        )}</Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff' }}>{balances ? Number(ethers.utils.formatEther(balances)).toFixed(4) : null} ETH</Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff' }}>${balances ? (USD * (ethers.utils.formatEther(balances))).toFixed(2) : null}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "column", justifyContent: 'space-evenly', flex: 1, alignItems: 'center', backgroundColor: "lightblue", borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                    <TouchableOpacity style={{ justifyContent: "center", alignItems: 'center', flexDirection: "column" }} onPress={() => navigation.navigate('BuyEther')}>
                        <Image
                            style={{ width: 25, height: 25 }}
                            source={require('../../assets/PNG/Ethereum.png')} />
                        <Text style={{ color: "#2d333a" }}>Buy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ justifyContent: "center", alignItems: 'center', flexDirection: "column" }} onPress={() => setcount(true)}>
                        <Image
                            style={{ width: 25, height: 25 }}
                            source={require('../../assets/PNG/Receive.png')} />
                        <Text style={{ color: "#2d333a" }}>Receive</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ justifyContent: "center", alignItems: 'center', flexDirection: "column" }} onPress={() => navigation.navigate('SendEther', { address: address, name: name })}>
                        <Image
                            style={{ width: 25, height: 25 }}
                            source={require('../../assets/PNG/Send.png')} />
                        <Text style={{ color: "#2d333a" }}>Send</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
            <Modal
                isVisible={count}
                animationType={'fade'}
                transparent={true}
                onRequestClose={() => {
                    setcount(false);
                }}
                onBackdropPress={() => {
                    setcount(false);
                }}
            // backdropTransitionOutTiming={100}
            // animationIn={'zoomIn'}
            // animationOut={'zoomOut'}
            // animationOutTiming={1}
            >
                <View style={style.container}>
                    <Text style={style.centered}>Show the code below to receive coins</Text>
                    <View style={style.centered}>
                        <QRCode size={200} value={address} />
                    </View>
                    <Text style={style.centered}>{address}</Text>
                    <View style={style.actions}>
                        <View style={style.actionsBar}>
                            {renderColumn('copy', 'Copy', () => copyToClipboard())}
                            {renderColumn('share', 'Share', () => share())}
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default MainInfo;
const style = StyleSheet.create({
    firstView: {
        flexDirection: "row", justifyContent: "center", alignItems: "center", width: '100%', backgroundColor: "transparent", height: 100
    },
    secondView: {
        width: '100%', height: "100%", justifyContent: "space-evenly", flexDirection: "column", padding: 6, paddingLeft: 5, backgroundColor: "#202020",
        borderRadius: 6, shadowColor: '#002147', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.34, shadowRadius: 6.27, elevation: 10
    },
    thirdView: {
        alignItems: "flex-start", flexDirection: "row", justifyContent: "space-between", height: "50%", backgroundColor: "transparent"
    },
    fourthView: {
        flexDirection: "column", justifyContent: "space-evenly", height: "100%", width: "60%"
    },
    fifthView: {
        flex: 1, height: "100%", backgroundColor: "transparent", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly"
    },
    seventhView: {
        flexDirection: "column", justifyContent: 'space-between', alignItems: "center", backgroundColor: "transparent", width: "50%"
    },
    eightView: {
        flexDirection: "row", justifyContent: "space-evenly", backgroundColor: 'transparent', alignItems: "center", flex: 1
    },
    tabBar: {
        height: 48, backgroundColor: "#fff", width: "35%", flexDirection: "row", justifyContent: "flex-end", alignSelf: "flex-end", marginRight: 10, shadowColor: "#fff"
    },
    text: {
        color: "#fff",
        flexWrap: 'wrap',
        fontSize: 12
    },
    textLeft: {
        color: "#fff",
        flexWrap: 'wrap',
        fontSize: 12,
        textAlign: "left"
    },
    orange: {
        fontSize: 15, fontWeight: 'bold', color: 'orange'
    },
    mainView: {
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 20,
        width: '100%',
        height: "30%",
        backgroundColor: 'white'
    },
    button: {
        height: 50,
        width: '60%',
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: "green",
        justifyContent: 'center',
        borderRadius: 25
    },
    container: {
        backgroundColor: '#FFF',
        flex: 0.5,
        alignItems: 'stretch',
        justifyContent: 'space-around',
        padding: 8
    },
    actions: {
        height: 56
    },
    input: {
        flex: 1,
        height: 40,
        margin: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        padding: 10,
        fontSize: 16,
        color: "#000",
    },
    actionsBar: {
        flexDirection: 'row',
        flex: 3
    },
    actionColumn: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    centered: {
        alignSelf: 'center',
        color: "#2d333a"
    },
    containers: {
        marginTop: 0,
        backgroundColor: "#fff"
    },
    scene: {
        flex: 1,
    },
    filtersContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#2B2B2B",
        paddingVertical: 5,
        borderRadius: 5,
        marginVertical: 10,
        marginBottom: 20
    },
    candleStickText: {
        color: "white",
        fontWeight: "700",
    },
    candleStickDataContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginTop: 20,
        backgroundColor: "red"
    },
    candleStickTextLabel: {
        color: 'grey',
        fontSize: 13
    }
});