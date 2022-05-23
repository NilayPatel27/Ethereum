import { View, Text, KeyboardAvoidingView, Dimensions, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Alert, } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
// import LoginPageImage from '../../assets/svg/LoginPageImage.svg'
import SignUpFirst from '../../../assets/svg/SignUpFirst.svg'
import FormContainer from '../../common/FormContainer'
import Forminput from '../../common/Forminput'
import FormSubmit from '../../common/FormSubmit'
// import AnimatedInput from 'react-native-animated-input'
import { TextInput } from 'react-native-paper';
import ShowPass from '../../../assets/svg/ShowPass.svg'
import HidePass from '../../../assets/svg/HidePass.svg'
import { ScrollView } from 'react-native-gesture-handler'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { Formik } from 'formik';



const SignUpPageScreen = ({ navigation }) => {

    const ref_input2 = useRef();

    const [image, setImage] = useState(true);
    const HideKeyboard = ({ children }) => (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); setImage(true) }}>
            {children}
        </TouchableWithoutFeedback>
    );

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setImage(false)
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setImage(true)
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);


    const [userInfo, setuserInfo] = useState({
        first: '',
        last: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [pass, setPass] = useState(true);
    const [ConPass, setConPass] = useState(true);





    const handalOnChangeText = (value, fieldName) => {
        setuserInfo({ ...userInfo, [fieldName]: value });
    };
    const handleSignUp = async () => {
        if(userInfo.password == userInfo.confirmPassword){
        try {
            const res = await auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password);
            console.log('res',JSON.stringify(res));
            if (res) {
              const { additionalUserInfo } = res;
              if (additionalUserInfo) {
                const { isNewUser } = additionalUserInfo;
                await AsyncStorage.setItem('isNewUser', `${isNewUser}`);
              }
            }
          } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
            //   setLoading(false);
            //   alert('Error', 'The email address is already in use by another account.', [
            //     { text: 'Login instead', onPress: handleNavigationToLogin },
            //   ])
              
              Alert.alert(
                'Error',
                'The email address is already in use by another account.',
                [
                    { text: 'Login instead', onPress: ()=>console.log("Cancel Pressed") },
                ])
            }
          }
        }else{
            Alert.alert(
                'Error',
                'Password and Confirm Password are not same',
                [
                    { text: 'Login instead', onPress: ()=>console.log("Cancel Pressed") },
                ])
        }

    };


    const { firstname, lastname, email, password, confirmpassword } = userInfo;
    return (

        <View style={{ flex: 1, backgroundColor: '#EDF1F9', }}>
            <HideKeyboard>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 80,
                }}>
                    {image == true ? <SignUpFirst /> : null}
                    {/* <LoginPageImage /> */}
                </View>
            </HideKeyboard>

            <View style={{ position: 'absolute', justifyContent: 'center', alignSelf: 'center', top: 20 }}>
                <Text style={{ color: '#0D1F3C', fontFamily: 'TitilliumWeb-SemiBold', fontSize: 28, alignSelf: 'center' }}>Create Account</Text>
            </View>

            <View style={{ flex: 1, backgroundColor: '#fff', borderTopRightRadius: 20, borderTopLeftRadius: 20, }}>
                <FormContainer >

                    <TextInput
                    // error={firstname.length == 0 ? true : false}
                        label="Firstname"
                        value={firstname}
                        keyboardType="name-phone-pad"
                        ref={ref_input2}
                        onChangeText={value => handalOnChangeText(value, 'firstname')}
                        // onBlur={() => setBlur(true)}
                        returnKeyType={'next'}
                        onSubmitEdit={() => ref_input2.current.focus()}
                        importantForAutofill="yes"
                        autoFocus={false}
                        style={{ marginTop: 10, backgroundColor: 'transparent', borderBottomWidth: 1, borderBottomColor: '#CFD2D8', fontFamily: 'TitilliumWeb-SemiBold', fontSize: 18, width: '90%' }}
                        underlineColor="transparent"
                        activeUnderlineColor="#347AF0"
                        theme={
                            {
                                fonts: {
                                    regular: {
                                        fontFamily: 'TitilliumWeb-Regular'
                                    }
                                }
                            }
                        }
                        onFocus={() => setImage(false)}

                    />

                    <TextInput
                        label="Lastname"
                        value={lastname}
                        keyboardType="name-phone-pad"
                        ref={ref_input2}
                        onChangeText={value => handalOnChangeText(value, 'lastname')}
                        // onBlur={() => setBlur(true)}
                        returnKeyType={'next'}
                        onSubmitEdit={() => ref_input2.current.focus()}
                        importantForAutofill="yes"
                        autoFocus={false}
                        style={{ marginTop: 10, backgroundColor: 'transparent', borderBottomWidth: 1, borderBottomColor: '#CFD2D8', fontFamily: 'TitilliumWeb-SemiBold', fontSize: 18, width: '90%' }}
                        underlineColor="transparent"
                        activeUnderlineColor="#347AF0"
                        theme={
                            {
                                fonts: {
                                    regular: {
                                        fontFamily: 'TitilliumWeb-Regular'
                                    }
                                }
                            }
                        }
                        onFocus={() => setImage(false)}

                    />

                    <TextInput
                        label="Email"
                        value={email}
                        keyboardType="email-address"
                        ref={ref_input2}
                        onChangeText={value => handalOnChangeText(value, 'email')}
                        // onBlur={() => setBlur(true)}
                        returnKeyType={'next'}
                        onSubmitEdit={() => ref_input2.current.focus()}
                        importantForAutofill="yes"
                        autoFocus={false}
                        style={{ marginTop: 10, backgroundColor: 'transparent', borderBottomWidth: 1, borderBottomColor: '#CFD2D8', fontFamily: 'TitilliumWeb-SemiBold', fontSize: 18, width: '90%' }}
                        underlineColor="transparent"
                        activeUnderlineColor="#347AF0"
                        theme={
                            {
                                fonts: {
                                    regular: {
                                        fontFamily: 'TitilliumWeb-Regular'
                                    }
                                }
                            }
                        }
                        onFocus={() => setImage(false)}

                    />

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingBottom: 10,
                    }}>
                        <TextInput
                            label="Password"
                            value={password}
                            ref={ref_input2}
                            secureTextEntry={pass}
                            onChangeText={value => handalOnChangeText(value, 'password')}
                            style={{ backgroundColor: 'transparent', borderBottomWidth: 1, borderBottomColor: '#CFD2D8', width: '90%', }}
                            underlineColor="transparent"
                            activeUnderlineColor="#347AF0"
                            theme={
                                {
                                    fonts: {
                                        regular: {
                                            fontFamily: 'TitilliumWeb-Regular',
                                            letterSpacing: 1,
                                        }
                                    }
                                }
                            }
                        />


                        <View style={{ top: "5%", padding: 10, position: 'relative', }}>
                            <TouchableOpacity onPress={() => setPass(!pass)}>
                                {pass === true ?
                                    <ShowPass /> : <HidePass />}
                            </TouchableOpacity>

                        </View>

                    </View>

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingBottom: 10,
                    }}>
                        <TextInput
                            label="Confirm password"
                            value={confirmpassword}
                            ref={ref_input2}
                            secureTextEntry={ConPass}
                            onChangeText={value => handalOnChangeText(value, 'confirmPassword')}
                            // onBlur={() => setBlur(true)}
                            // autoFocus={blur}
                            style={{ backgroundColor: 'transparent', borderBottomWidth: 1, borderBottomColor: '#CFD2D8', width: '90%' }}
                            underlineColor="transparent"
                            activeUnderlineColor="#347AF0"
                            theme={
                                {
                                    fonts: {
                                        regular: {
                                            fontFamily: 'TitilliumWeb-Regular',
                                            letterSpacing: 1,
                                        }
                                    }
                                }
                            }
                        />

                        <View style={{ top: "5%", padding: 10, position: 'relative', }}>
                            <TouchableOpacity onPress={() => setConPass(!ConPass)}>
                                {ConPass === true ?
                                    <ShowPass /> : <HidePass />}
                            </TouchableOpacity>

                        </View>

                    </View>



                    <TouchableOpacity onPress={() => handleSignUp()} style={{ width: 200, height: 50, alignSelf: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: '#347AF0', position: 'absolute', top: 400 }}>
                        <Text style={{ alignSelf: 'center', fontSize: 19, color: '#fff', fontFamily: 'TitilliumWeb-SemiBold' }}>Let’s Get Started</Text>
                    </TouchableOpacity>
                    <View style={{ position: 'absolute', flexDirection: 'row', alignSelf: 'center', top: 460 }}>

                        <Text style={{ color: '#485068', fontFamily: 'TitilliumWeb-Regular', fontSize: 15, padding: 2, }}>
                            Already have an account?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('LoginPageScreen')} >
                            <Text style={{ fontFamily: 'TitilliumWeb-SemiBold', fontSize: 16, color: '#347AF0' }}>
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>

                </FormContainer >
            </View>

        </View >

    )
}

export default SignUpPageScreen