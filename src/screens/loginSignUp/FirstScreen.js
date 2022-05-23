import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import FirstScreens from '../../../assets/svg/FirstScreen.svg'
import FirstScreens2 from '../../../assets/svg/FirstScreen2.svg'
import FirstScreens3 from '../../../assets/svg/FirstScreen3.svg'
import Carousel, { Pagination } from 'react-native-snap-carousel'

const FirstScreen = ({ navigation }) => {
    const [index, setIndex] = useState(0);
    const [index2, setIndex2] = useState(0);
    const [entries, setEntries] = useState(false);
    const isCarousel = useRef(null);
    const isCarousel2 = useRef(null);
    const SLIDER_WIDTH = Dimensions.get('window').width;
    const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.slide} key={index}>
                <View style={{ position: 'absolute', top: 0 }}>{item.imgUrl}</View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.body}>{item.body}</Text>
            </View>
        )
    }

    const renderItems = ({ item, index }) => {
        return (
            <View style={styles.firstScreen} key={index}>
                <View>{item.imgUrl}</View>
            </View>
        )
    }

    const imageData = [
        {
            imgUrl: <FirstScreens height={250} width={300} />,
        },
        {
            imgUrl: <FirstScreens2 height={250} width={300} />,
        },
        {
            imgUrl: <FirstScreens3 height={250} width={300} />,
        },
    ];

    const data = [
        {
            title: "Welcome to the app!",
            body: "Manage all your crypto assets! It’s simple and easy!",
        },
        {
            title: "Nice and Tidy Crypto Portfolio!",
            body: "Keep BTC, ETH, XRP, and many other based tokens. ",
        },
        {
            title: "Receive and Send Money to Friends!",
            body: "Send crypto to your friends with a personal message attached. ",
        },
    ];

    const handleTouchEvent = () => {
        entries === true ? navigation.replace('LoginOptionScreen') : isCarousel.current.snapToNext(); isCarousel2.current.snapToNext();
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#EDF1F9' }}>

            <View>
                <Carousel
                    layout="default"
                    loop={false}
                    layoutCardOffset={18}
                    ref={isCarousel2}
                    data={imageData}
                    renderItem={renderItems}
                    sliderWidth={SLIDER_WIDTH}
                    itemWidth={ITEM_WIDTH}
                    onSnapToItem={(index) => setIndex2(index)}
                    useScrollView={false}
                    scrollPostion={index}
                    scrollEnabled={false}
                />

                <TouchableOpacity
                    // onPress={() => { isCarousel.current.snapToItem(data.length - 1); isCarousel2.current.snapToItem(imageData.length - 1) }}
                    onPress={() => { navigation.replace('LoginOptionScreen') }}
                    style={{ position: "absolute", right: 20, top: 10, padding: 5, justifyContent: "center", alignItems: "center", alignContent: "center" }} >
                    {entries === true ? null :
                        <Text style={styles.text}>Skip</Text>
                    }
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, backgroundColor: '#fff', borderTopRightRadius: 20, borderTopLeftRadius: 20, }}>
                <View >
                    <Pagination
                        dotsLength={data.length}
                        activeDotIndex={index}
                        carouselRef={isCarousel}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            marginHorizontal: 0,
                            backgroundColor: '#347AF0'
                        }}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                        tappableDots={true}
                    />
                    <Carousel
                        layout="default"
                        loop={false}
                        layoutCardOffset={18}
                        ref={isCarousel}
                        data={data}
                        renderItem={renderItem}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH - 50}
                        onSnapToItem={(index) => setIndex(index)}
                        useScrollView={false}
                        scrollPostion={index}
                        scrollEnabled={false}
                        onEndReached={() => {
                            setEntries(true)
                        }}
                    />
                    <TouchableOpacity onPress={() => handleTouchEvent()}>
                        {entries === true ? <View style={{ width: 200, height: 50, alignSelf: 'center', justifyContent: 'center', borderRadius: 50, top: 100, backgroundColor: '#347AF0', position: 'absolute' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 20, color: '#fff' }}>Let's Get Started</Text>
                        </View> : <View style={{ width: 200, height: 50, alignSelf: 'center', justifyContent: 'center', borderRadius: 50, top: 100, borderWidth: 1, borderColor: '#347AF0', position: 'absolute' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 20, color: '#347AF0' }}>Next Step</Text>
                        </View>}
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}

export default FirstScreen

const styles = StyleSheet.create({
    firstScreen: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 10,
    },
    text: {
        fontSize: 20,
        color: '#347AF0',
        fontWeight: 'normal',
        alignSelf: 'flex-end',
        paddingRight: 20,
    },
    title: {
        fontSize: 40,
        color: '#0D1F3C',
        textAlign: 'center',
        fontFamily: 'TitilliumWeb-Bold',
    },
    body: {
        fontSize: 16,
        color: '#485068',
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'TitilliumWeb-regular',
    },
})