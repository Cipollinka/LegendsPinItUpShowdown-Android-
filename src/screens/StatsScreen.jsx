import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import { selectTeams, selectScores } from '../store/slices/gameSlice';

const bgImage = require('../assets/settings/bg.png');

export default function StatsScreen({ navigation }) {
    const teams = useSelector(selectTeams);
    const scores = useSelector(selectScores);

    return (
        <ImageBackground source={bgImage} style={styles.background} resizeMode="contain">
            <SafeAreaView style={styles.safe}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {scores.map((roundScores, roundIndex) => (
                        <View key={roundIndex} style={styles.roundContainer}>
                            <Text style={styles.roundTitle}>Round {roundIndex + 1}</Text>
                            {roundScores.map((score, teamIndex) => (
                                <View key={teamIndex} style={styles.teamScoreRow}>
                                    <Text style={styles.teamName}>{teams[teamIndex]}</Text>
                                    <Text style={styles.teamScore}>{score}</Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </ScrollView>
                <TouchableOpacity style={styles.finishButton} onPress={() => navigation.replace('Main')}>
                    <Text style={styles.finishButtonText}>Menu</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1, backgroundColor: '#959AA4' },
    safe: { flex: 1, marginHorizontal: 24 },
    scrollContent: { paddingTop: 148, paddingBottom: 24 },
    roundContainer: { marginBottom: 36 },
    roundTitle: {
        fontFamily: 'Montserrat Alternates',
        fontWeight: '600',
        fontSize: 20,
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#FFFFFF',
        marginBottom: 24,
    },
    teamScoreRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 26,
        paddingHorizontal: 12,
    },
    teamName: {
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: 20,
        color: '#FFFFFF',
    },
    teamScore: {
        fontFamily: 'Inter',
        fontWeight: '600',
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'right',
    },
    finishButton: {
        height: 58,
        borderRadius: 100,
        backgroundColor: '#FFDDC8',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 36,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 30,
        elevation: 5,
    },
    finishButtonText: {
        fontFamily: 'Montserrat Alternates',
        fontWeight: '600',
        fontSize: 18,
        color: '#000000',
        textTransform: 'uppercase',
    },
});
