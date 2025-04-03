import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import OnboardingScreen from './src/screens/OnboardingScreen';
import MainScreen from './src/screens/MainScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import RulesScreen from './src/screens/RulesScreen';
import CustomLegendsScreen from './src/screens/CustomLegendsScreen';
import AddNewLegendScreen from './src/screens/AddNewLegendScreen';
import SetupGameScreen from './src/screens/SetupGameScreen';
import GameCategoryScreen from './src/screens/GameCategoryScreen';
import PlayScreen from './src/screens/PlayScreen';
import StatsScreen from './src/screens/StatsScreen';

import { store, persistor } from './src/store/store';

const Stack = createNativeStackNavigator();

export default function App() {
    const [firstLaunch, setFirstLaunch] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem('onboardingShown')
            .then(value => setFirstLaunch(value === null))
            .finally(() => SplashScreen.hide());
    }, []);

    if (firstLaunch === null) {
        return null;
    }

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        {firstLaunch && (
                            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                        )}
                        <Stack.Screen name="Main" component={MainScreen} />
                        <Stack.Screen name="Settings" component={SettingsScreen} />
                        <Stack.Screen name="Rules" component={RulesScreen} />
                        <Stack.Screen name="CustomLegends" component={CustomLegendsScreen} />
                        <Stack.Screen name="AddNewLegend" component={AddNewLegendScreen} />
                        <Stack.Screen name="SetupGame" component={SetupGameScreen} />
                        <Stack.Screen name="GameCategory" component={GameCategoryScreen} />
                        <Stack.Screen name="Play" component={PlayScreen} />
                        <Stack.Screen name="Stats" component={StatsScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}
