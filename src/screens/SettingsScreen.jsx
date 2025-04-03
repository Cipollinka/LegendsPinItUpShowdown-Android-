import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Switch,
    Share,
} from 'react-native';
import ArrowBackSVG from '../assets/game/ArrowBackSVG';
import ShareSVG from '../assets/settings/ShareSVG';
import { useDispatch, useSelector } from 'react-redux';
import { selectMusicEnabled, toggleMusic } from '../store/slices/settingsSlice';

export default function SettingsScreen({ navigation }) {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(false);

    const toggleNotifications = () =>
        setNotificationsEnabled((prev) => !prev);
    const toggleSound = () => setSoundEnabled((prev) => !prev);

    const dispatch = useDispatch();
    const musicEnabled = useSelector(selectMusicEnabled);

    const handleShare = async () => {
        try {
            await Share.share({
                title: 'Legends Pin It Up Showdown',
                message:
                    'Experience the thrill of Legends Pin It Up Showdown! Unleash your inner champion and conquer the ultimate challenge. Download now and join the legend!',
            });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <ImageBackground
            source={require('../assets/settings/bg.png')}
            style={styles.background}
            resizeMode="contain"
        >
            <SafeAreaView style={styles.safe}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <ArrowBackSVG />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>SETTINGS</Text>
                </View>

                <View style={styles.settingsContainer}>

                    <View style={styles.settingRow}>
                        <Text style={styles.settingText}>Music</Text>
                        <Switch
                            value={musicEnabled}
                            onValueChange={() => dispatch(toggleMusic())}
                            trackColor={{ false: '#78788080', true: '#0048D4' }}
                        />
                    </View>

                    <View style={styles.settingRow}>
                        <Text style={styles.settingText}>Sound</Text>
                        <Switch
                            value={soundEnabled}
                            onValueChange={toggleSound}
                            trackColor={{ false: '#78788080', true: '#0048D4' }}
                        />
                    </View>

                    <TouchableOpacity style={styles.settingRow} onPress={handleShare}>
                        <Text style={styles.settingText}>Share the app</Text>
                        <ShareSVG />
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
        marginTop: 84,
        marginHorizontal: 24,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: 0,
    },
    headerTitle: {
        fontFamily: 'Montserrat Alternates',
        fontWeight: '600',
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF59',
        marginBottom: 20,
    },
    settingText: {
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: 20,
        color: '#FFFFFF',
    },
});
