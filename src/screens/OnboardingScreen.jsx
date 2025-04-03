import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingScreen({ navigation }) {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowButton(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleStart = async () => {
        try {
            await AsyncStorage.setItem('onboardingShown', 'true');
            navigation.replace('Main');
        } catch (e) {
            console.error('Failed to save onboarding flag', e);
        }
    };

    return (
        <ImageBackground
            source={require('../assets/onboarding/bg.png')}
            style={styles.background}
            resizeMode="contain"
        >
            <SafeAreaView style={styles.safe}>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        WELCOME TO THE LEGENDS PIN IT UP SHOWDOWN
                    </Text>
                    <Text style={styles.description}>
                        Choose a sports category and let the game begin.{"\n"}
                        One player gets the name of a legend, and the others ask yes or no questions to figure out who it is.{"\n"}
                        It’s all about sharp thinking, fun guesses, and legendary moments with friends!
                    </Text>
                </View>
                {showButton && (
                    <TouchableOpacity style={styles.startButton} onPress={handleStart}>
                        <Text style={styles.startButtonText}>Let’s Get Started</Text>
                    </TouchableOpacity>
                )}
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#959AA4',
        paddingHorizontal: 24
    },
    safe: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'flex-end',
        paddingBottom: 16,
    },
    content: {
        marginBottom: 60,
        alignItems: 'flex-start',
    },
    title: {
        fontFamily: 'MontserratAlternates-Bold',
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'left',
        marginBottom: 16,
    },
    description: {
        fontFamily: 'Inter-Regular',
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'left',
    },
    startButton: {
        width: '100%',
        backgroundColor: '#42C6CB',
        borderRadius: 100,
        paddingVertical: 18,
        alignItems: 'center',
    },
    startButtonText: {
        fontFamily: 'MontserratAlternates-SemiBold',
        fontSize: 18,
        color: '#FFFFFF',
    },
});
