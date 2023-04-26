import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { handleLogin } from "../config/firebase.js";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginButtonPress = async () => {
        const user = await handleLogin(email, password);
        if(user){
            console.log('User login successful:', user);
            navigation.navigate("Home");
        } else {
            console.error('User Login Failed');
        }
    };
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    marginBottom: 10
                }}
                onChangeText={setEmail}
                value={email}
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholder="email"
            />
            <TextInput
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    marginBottom: 10
                }}
                onChangeText={setPassword}
                value={password}
                secureTextEntry
                textContentType="password"
                placeholder="password"
            />
            <Button title="Log in" onPress={handleLoginButtonPress} />

            <Button style={{fontFamily:'Sevillana-Regular.ttf'}} title="SignIn" onPress={() => navigation.navigate('SignIn')} />
        </View>
    );
}