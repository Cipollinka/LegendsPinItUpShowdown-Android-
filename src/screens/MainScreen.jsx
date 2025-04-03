import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import InfoIcon from '../assets/main/InfoSVG';
import SettingsIcon from '../assets/main/SettingsSVG';

export default function MainScreen({ navigation }) {
    return (
        <ImageBackground
            source={require('../assets/main/bg.png')}
            resizeMode='contain'
            style={styles.background}
        >
            <SafeAreaView style={styles.safe}>
                <View style={styles.topIcons}>
                    <TouchableOpacity onPress={() => navigation.navigate('Rules')}>
                        <InfoIcon />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <SettingsIcon />
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomButtons}>
                    <TouchableOpacity
                        style={styles.playButton}
                        onPress={() => navigation.navigate('SetupGame')}
                    >
                        <Text style={styles.playText}>Play</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.customButton}
                        onPress={() => navigation.navigate('CustomLegends')}
                    >
                        <Text style={styles.customText}>Custom Legends</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#959AA4',
    },
    safe: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 24,
        marginHorizontal: 24,
    },
    topIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bottomButtons: {
        marginBottom: 16,
    },
    playButton: {
        width: '100%',
        backgroundColor: '#FFDDC8',
        borderRadius: 100,
        paddingVertical: 18,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 30,
        elevation: 5,
    },
    playText: {
        fontFamily: 'MontserratAlternates-Bold',
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
    },
    customButton: {
        width: '100%',
        backgroundColor: '#42C6CB',
        borderRadius: 100,
        paddingVertical: 18,
    },
    customText: {
        fontFamily: 'MontserratAlternates-Bold',
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
});
