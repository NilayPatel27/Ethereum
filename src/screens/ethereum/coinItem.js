import React, { useContext, useEffect, useState } from "react";
import { Text, View, Image, Pressable, StyleSheet, ImageBackground, ViewPropTypes } from "react-native";
// import { AntDesign } from "@expo/vector-icons";
// import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectAddress } from "../../../counterSlice";
import axios from "axios";
import { transform } from "lodash";
import { ThemeContext } from "../../Context/themeContext";

const CoinItem = ({ marketCoin, balance, navigation, info }) => {
    const { back, textColor } = useContext(ThemeContext);

    const {
        id,
        name,
        current_price,
        market_cap_rank,
        price_change_percentage_24h,
        symbol,
        market_cap,
        image,
    } = marketCoin;


    if (symbol.toUpperCase() == 'ETH')
        console.log('----------------->', balance, symbol.toUpperCase())


    // console.log("marketCoin---->", marketCoin);

    const percentageColor =
        price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || '#2d333a';

    const normalizeMarketCap = (marketCap) => {
        if (marketCap > 1e12) {
            return `${(marketCap / 1e12).toFixed(3)} T`;
        }
        if (marketCap > 1e9) {
            return `${(marketCap / 1e9).toFixed(3)} B`;
        }
        if (marketCap > 1e6) {
            return `${(marketCap / 1e6).toFixed(3)} M`;
        }
        if (marketCap > 1e3) {
            return `${(marketCap / 1e3).toFixed(3)} K`;
        }
        return marketCap;
    };

    return (
        <>
            <Pressable
                style={[styles.coinContainer, { backgroundColor: back }]}
                onPress={() => symbol.toUpperCase() ==='ETH'? navigation.navigate("WalletPage",{image}):navigation.navigate("CoinDetails",{marketCoin,ID:id})}>
                <View style={{ height: 60, width: 60, alignItems: "center", justifyContent: "center" }}>
                    <Image style={{ height: 60, width: 60, borderRadius: 50 }} source={{ uri: image }} blurRadius={100}>
                    </Image>
                    <Image
                        source={{ uri: image }}
                        style={{
                            height: 40,
                            width: 40,
                            position: 'absolute',
                            // marginRight: 10,
                        }}
                    />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", flex: 1, marginLeft: 10 }}>
                    <View>
                        <Text style={[styles.title,{ color:textColor,}]}>{symbol.toUpperCase()}</Text>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ color: "#969aa0" }}>
                                    MCap {normalizeMarketCap(market_cap)}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ alignItems: "center" }}>
                        <Text style={[styles.title,{ color:textColor,}]}>${current_price}</Text>
                        <Text style={{ color: percentageColor }}>
                            {price_change_percentage_24h?.toFixed(2)}%
                        </Text>

                    </View>

                    {info === true ?
                        <View style={{ alignItems: "center" }}>
                            <Text style={[styles.title,{ color:textColor,}]}>0.00</Text>
                            <Text style={{ color: "#969aa0" }}>
                                $0.00
                            </Text>
                        </View> : <View style={{ alignItems: "center" }}>
                            <Text style={[styles.title,{ color:textColor,}]}>******</Text>
                        </View>}
                </View>
            </Pressable>
        </>
    );
};

export default CoinItem;
const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.2)',
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
       
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 3,
    },
    text: {
        color: "#969aa0",
        marginRight: 5,
    },
    coinContainer: {
        flexDirection: "row",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#2c2e3b",
        padding: 15,
        shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    },
    rank: {
        fontWeight: 'bold',
        color: '#F4F6F9',
    },
    rankContainer: {
        backgroundColor: '#585858',
        paddingHorizontal: 5,
        borderRadius: 5,
        marginRight: 5,
        color: '#F4F6F9',
    }
});