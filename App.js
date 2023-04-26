import React from 'react';
import Login from './components/Login';
import Home from './components/Home';
import HomeReload from './components/HomeReload';
import SignIn from './components/SignIn';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function App() {
    fetch('http://localhost:3000/posts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }

    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="HomeReload" component={HomeReload} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
