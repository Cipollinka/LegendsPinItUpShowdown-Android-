import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    ScrollView,
} from 'react-native';
import ArrowBackSVG from '../assets/game/ArrowBackSVG';

const RULES = [
    'One player is randomly assigned a legendary athlete from the chosen sports category.',
    'That player keeps their legend a secret — the others must guess who it is.',
    'Players take turns asking yes-or-no questions to uncover clues.',
    'The assigned player can only respond with “Yes”, “No”, or “I don’t know.”',
    'Based on the answers, players try to figure out the identity of the legend.',
    'A player can make a final guess when they feel confident.',
    'If the guess is correct, that player wins the round!',
    'If the guess is wrong, the game continues with more questions.',
    'You can play in free-for-all or team mode, with or without a timer.',
    'Use your sports knowledge, intuition, and teamwork to win!',
];

export default function RulesScreen({ navigation }) {
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
                    <Text style={styles.headerTitle}>RULES</Text>
                </View>

                <ScrollView style={styles.rulesContainer}>
                    {RULES.map((rule, index) => (
                        <Text key={index} style={styles.ruleText}>
                            {'\u2022'} {rule}
                        </Text>
                    ))}
                </ScrollView>
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
    rulesContainer: {
        marginTop: 32,
    },
    ruleText: {
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 16,
    },
});
