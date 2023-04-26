import React, { useState, useEffect } from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser } from '../config/firebase';
import { StyleSheet } from 'react-native';
import moment from 'moment';
import { checkUserToken } from '../config/firebase';
import {postData , getData} from '../config/server';



export default function Home({ navigation }) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [message, setMessage] = useState('');
    const [refreshCount, setRefreshCount] = useState(0);

    useEffect(() => {
        getData('posts')
            .then(async (data) => {
                try {
                    await AsyncStorage.setItem('myData', JSON.stringify(data));
                    if (!(await checkUserToken())) {
                        navigation.navigate('Login');
                    }
                    setData(data);
                    setIsLoading(false);
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const reloadData = async () => {
        setIsLoading(true);
        getData('posts')
            .then(async (data) => {
                try {
                    await AsyncStorage.setItem('myData', JSON.stringify(data));
                    setData(data);
                    setIsLoading(false);
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        setMessage('');
    };

    const handleSendMessage = async () => {
        const newMessage = {
            author: getCurrentUser(),
            content: message,
            timestamp: moment().toISOString(),
        };

        const result = await postData('posts', newMessage);
        if (result.success) {
            setData([...data, newMessage]);
            setMessage('');
            setRefreshCount(refreshCount + 1);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
                <Text style={styles.author}>{item.author}</Text>
                <Text style={styles.content}>{item.content}</Text>
                <Text style={styles.timestamp}>
                    {moment(item.timestamp).format('HH:mm DD-MM-YYYY')}
                </Text>
            </View>
        );
    };

    if (isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                key={refreshCount}
            />
            <View style={{ padding: 10 }}>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => setMessage(text)}
                    value={message}
                />
                <Button title="Send and Reload" onPress={async () => {
                    await handleSendMessage();
                    await reloadData();
                }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    author: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    content: {
        flex: 1,
        fontSize: 16,
    },
    timestamp: {
        marginLeft: 10,
        color: '#888',
    },
});
