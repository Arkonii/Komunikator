import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { app, handleRegistration } from "../config/firebase.js";

export default function SignIn({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleRegistrationButtonPress = async () => {
        const user = await handleRegistration(email, password, name);
        if (user) {
            console.log('User registration successful:', user);
            navigation.navigate("Login");
        } else {
            console.error('User registration failed');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Email:</Text>
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
            />
            <Text>Password:</Text>
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
            />
            <Text>Name:</Text>
            <TextInput
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    marginBottom: 10
                }}
                onChangeText={setName}
                value={name}
                autoCapitalize="words"
                textContentType="name"
            />
            <Button title="Register" onPress={handleRegistrationButtonPress} />
        </View>
    );
}