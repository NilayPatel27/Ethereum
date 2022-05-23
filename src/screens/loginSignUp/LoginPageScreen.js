import { View, Text, KeyboardAvoidingView, Dimensions, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Image, Button, } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import LoginPageImage from '../../../assets/svg/LoginPageImage.svg'
import FormContainer from '../../common/FormContainer'
import Forminput from '../../common/Forminput'
import FormSubmit from '../../common/FormSubmit'
// import AnimatedInput from 'react-native-animated-input'
import { TextInput } from 'react-native-paper';
import ShowPass from '../../../assets/svg/ShowPass.svg'
import HidePass from '../../../assets/svg/HidePass.svg'
import { ScrollView } from 'react-native-gesture-handler'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth, { firebase } from '@react-native-firebase/auth';
// import { Formik } from 'formik';

const LoginPageScreen = ({ navigation }) => {
    GoogleSignin.configure({
        webClientId: '429499913247-2d223lank875hfeinrjdtptdqdr618kb.apps.googleusercontent.com',
      });
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
        email: '',
        password: '',
    });

    const [pass, setPass] = useState(true);

    const handalOnChangeText = (value, fieldName) => {
        setuserInfo({ ...userInfo, [fieldName]: value });
    };
    const handleLogin = async() => {
        // userInfo.email == 'test' && userInfo.password == '1234'
        //     ? navigation.replace('PinVarificationScreen')
        //     : updateError('invaild email or password!', setError);
            console.log(userInfo)
            auth()
                .signInWithEmailAndPassword(userInfo.email, userInfo.password)
                .then(() => {
                    console.log('User account created & signed in!');
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    }
                    console.error(error);
                });
    };

    const signOut = async() =>{
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          console.log('User signed out');
        } catch (error) {
          console.error(error);
        }
      
    }
    const { email, password } = userInfo;
    const onGoogleButtonPress =async () => {
        const res = await GoogleSignin.signIn();
        const methods = await auth().fetchSignInMethodsForEmail(res.user.email);
      
        if (methods[0] === 'password') {
            console.error('exist');
        } else {
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            return auth().signInWithCredential(googleCredential);
        }
    }
    const forgotPassword = async () =>{
        const methods = await auth().fetchSignInMethodsForEmail(email);
console.log('methods',methods)
        await firebase.auth().sendPasswordResetEmail(email).then((res) => {
            console.log('email sent',res);
        }
        ).catch((error) => {
            console.log(error);
        });
    }
    return (

        <View style={{ flex: 1, backgroundColor: '#EDF1F9', }}>
            <HideKeyboard>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 80,
                }}>
                    {image == true ? <LoginPageImage /> : null}
                    {/* <LoginPageImage /> */}
                </View>
            </HideKeyboard>

            <View style={{ position: 'absolute', justifyContent: 'center', alignSelf: 'center', top: 20 }}>
                <Text style={{ color: '#0D1F3C', fontFamily: 'TitilliumWeb-SemiBold', fontSize: 28, alignSelf: 'center' }}>Welcome Back!</Text>
            </View>

            <View style={{ flex: 1, backgroundColor: '#fff', borderTopRightRadius: 20, borderTopLeftRadius: 20, }}>
                <FormContainer >

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
                                        }
                                    }
                                }
                            }
                        />
                        <View style={{ top: "5%", padding: 10, position: 'relative', }}>
                            <TouchableOpacity onPress={() => setPass(!pass)}>
                                {pass === true ?
                                    <HidePass /> :<ShowPass /> }
                            </TouchableOpacity>

                        </View>

                    </View>
                    <View>
                        <TouchableOpacity onPress={() =>forgotPassword()}>
                            <Text style={{ color: '#347AF0', fontFamily: 'TitilliumWeb-SemiBold', fontSize: 15, alignSelf: 'flex-end', position: 'absolute' }}>Forgot your password?</Text>
                        </TouchableOpacity>

                    </View>


                    <TouchableOpacity onPress={() => handleLogin()} style={{ width: 200, height: 50, alignSelf: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: '#347AF0', position: 'absolute', top: 320 }}>
                        <Text style={{ alignSelf: 'center', fontSize: 19, color: '#fff', fontFamily: 'TitilliumWeb-SemiBold' }}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>onGoogleButtonPress()} style={{position:'absolute',top:360,alignSelf:'center',marginTop:10}}>
                    <Image
                    source={require('../../assets/PNG/google.png')}
                    style={{ width: 35, height: 35, alignSelf: 'center', marginTop: 10, marginBottom: 10, }}
                    />
                    </TouchableOpacity>
                    {/* <Button
        title="Sign out"
        onPress={() => signOut()}
        /> */}
                    <View style={{ position: 'absolute', flexDirection: 'row', alignSelf: 'center', top: 410 }}>

                        <Text style={{ color: '#485068', fontFamily: 'TitilliumWeb-Regular', fontSize: 15, padding: 2, }}>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUpPageScreen')} >
                            <Text style={{ fontFamily: 'TitilliumWeb-SemiBold', fontSize: 16, color: '#347AF0' }}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>

                </FormContainer >
            </View>

        </View >

    )
}

export default LoginPageScreen