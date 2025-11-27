import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../src/Firebase';

import { TabRoutes } from './tab.routes';
import Login from '../screens/Login';
import Recipe from '../screens/Recipe';



const Stack = createNativeStackNavigator();

export function Routes() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            console.log('User', user);
            setUser(user);
        });
    }, []);

    return (
        <Stack.Navigator initialRouteName='Login'>
            {user ? (
                <>
                    <Stack.Screen name='Home' component={TabRoutes} options={{ headerShown: false }} />
                    <Stack.Screen name='Recipe' component={Recipe} options={{ headerShown: false }} />
                </>
            ) : (
                <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            )}
        </Stack.Navigator>
    );
};