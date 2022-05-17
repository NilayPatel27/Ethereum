import React, { useEffect, useState } from "react";
import { Text, View, Image, Pressable, StyleSheet } from "react-native";
// import { AntDesign } from "@expo/vector-icons";
// import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectAddress } from "../../../counterSlice";
import axios from "axios";

const CoinItem = ({ marketCoin, balance, navigation, info }) => {

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
                style={styles.coinContainer}
                onPress={() =>{symbol.toUpperCase() ==='ETH'? navigation.navigate("WalletPage",{image}):null}}
            >
                <Image
                    source={{ uri: image }}
                    style={{
                        height: 40,
                        width: 40,
                        marginRight: 10,
                        alignSelf: "center",
                    }}
                />
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", flex: 1 }}>
                    <View>
                        <Text style={styles.title}>{symbol.toUpperCase()}</Text>
                        <View style={{ flexDirection: "row" }}>
                            {/* <View style={styles.rankContainer}>
                        <Text style={styles.rank}>{market_cap_rank}</Text>
                    </View> */}
                            {/* <Text style={styles.text}>{symbol.toUpperCase()}</Text> */}
                            {/* <AntDesign
            name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
            size={12}
            color={percentageColor}
            style={{ alignSelf: "center", marginRight: 5 }}
          /> */}

                            <Text style={{ color: percentageColor }}>
                                {price_change_percentage_24h?.toFixed(2)}%
                            </Text>
                        </View>
                    </View>

                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.title}>${current_price}</Text>
                        <Text style={{ color: "#969aa0" }}>
                            MCap {normalizeMarketCap(market_cap)}
                        </Text>
                    </View>
                    {info === true ?
                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.title}>0.00</Text>
                            <Text style={{ color: "#969aa0" }}>
                                $0.00
                            </Text>
                        </View> : <View style={{ alignItems: "center" }}>
                            <Text style={styles.title}>******</Text>
                        </View>}
                </View>
            </Pressable>
        </>
    );
};

export default CoinItem;
const styles = StyleSheet.create({
    title: {
        color: "#fff",
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
        backgroundColor: "#2c2e3b",
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