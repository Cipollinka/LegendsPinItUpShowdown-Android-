/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { selectLegends } from '../store/slices/customLegendsSlice';
import {
    selectTeams,
    selectCurrentTeamIndex,
    selectCurrentRound,
    selectNumRounds,
} from '../store/slices/gameSlice';
import PauseSVG from '../assets/game/PauseSVG';
import LeftSVG from '../assets/game/LeftSVG';
import RightSVG from '../assets/game/RightSVG';
import PinImage from '../assets/game/pin.png';

export default function GameCategoryScreen({ navigation }) {
    const teams = useSelector(selectTeams);
    const currentTeamIndex = useSelector(selectCurrentTeamIndex);
    const currentRound = useSelector(selectCurrentRound);
    const numRounds = useSelector(selectNumRounds);
    const legends = useSelector(selectLegends);

    const uniqueCategories = [...new Set(legends.map(legend => legend.category))];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevCenterColor, setPrevCenterColor] = useState(null);
    const [colorPattern, setColorPattern] = useState('pattern1');
    const evenColor = '#0048D4';
    const oddColor = '#42C6CB';

    if (uniqueCategories.length === 0) return null;

    const chooseColorPattern = () => {
        if (prevCenterColor === oddColor) return 'pattern2';
        if (prevCenterColor === evenColor) return 'pattern1';
        return Math.random() < 0.5 ? 'pattern1' : 'pattern2';
    };

    const updateIndexAndPattern = newIndex => {
        const newPattern = chooseColorPattern();
        setCurrentIndex(newIndex);
        setColorPattern(newPattern);
        const newCenterColor = newPattern === 'pattern1' ? oddColor : evenColor;
        setPrevCenterColor(newCenterColor);
    };

    const handleLeft = () => {
        const newIndex =
            (currentIndex - 1 + uniqueCategories.length) % uniqueCategories.length;
        updateIndexAndPattern(newIndex);
    };

    const handleRight = () => {
        const newIndex = (currentIndex + 1) % uniqueCategories.length;
        updateIndexAndPattern(newIndex);
    };

    const handleGenerateRandom = () => {
        let randomIndex = Math.floor(Math.random() * uniqueCategories.length);
        if (randomIndex % 2 === currentIndex % 2) {
            randomIndex = (randomIndex + 1) % uniqueCategories.length;
        }
        updateIndexAndPattern(randomIndex);
    };

    const handleNext = () => {
        navigation.navigate('Play', {
            chosenCategory: uniqueCategories[currentIndex],
        });
    };

    const leftIndex =
        (currentIndex - 1 + uniqueCategories.length) % uniqueCategories.length;
    const centerIndex = currentIndex;
    const rightIndex = (currentIndex + 1) % uniqueCategories.length;

    const leftCardColor =
        colorPattern === 'pattern1' ? evenColor : oddColor;
    const centerCardColor =
        colorPattern === 'pattern1' ? oddColor : evenColor;
    const rightCardColor =
        colorPattern === 'pattern1' ? evenColor : oddColor;

    const currentTeamName = teams[currentTeamIndex] || '';

    return (
        <View style={styles.background}>
            <SafeAreaView style={styles.safe}>
                <View style={styles.header}>
                    <Text style={styles.teamTitle}>{currentTeamName}</Text>
                    <Text style={styles.scoreText}>
                        {currentRound + 1}/{numRounds}
                    </Text>
                    <PauseSVG />
                </View>

                <View style={styles.cardsContainer}>
                    <View
                        key={`left-${uniqueCategories[leftIndex]}`}
                        style={[
                            styles.cardBase,
                            {
                                backgroundColor: leftCardColor,
                                transform: [
                                    { rotate: '-5.47deg' },
                                    { translateX: -100 },
                                    { translateY: -20 },
                                ],
                                zIndex: 1,
                            },
                        ]}
                    >
                        <Text style={[styles.cardText, { transform: [{ rotate: '5.47deg' }] }]}>
                            {uniqueCategories[leftIndex].toUpperCase()}
                        </Text>
                    </View>

                    <View
                        key={`center-${uniqueCategories[centerIndex]}`}
                        style={[
                            styles.cardBase,
                            {
                                backgroundColor: centerCardColor,
                                transform: [{ rotate: '-5.47deg' }],
                                zIndex: 2,
                            },
                        ]}
                    >
                        <Text style={[styles.cardText, { transform: [{ rotate: '5.47deg' }] }]}>
                            {uniqueCategories[centerIndex].toUpperCase()}
                        </Text>
                        <Image source={PinImage} style={styles.pinImage} />
                    </View>

                    <View
                        key={`right-${uniqueCategories[rightIndex]}`}
                        style={[
                            styles.cardBase,
                            {
                                backgroundColor: rightCardColor,
                                transform: [
                                    { rotate: '-5.47deg' },
                                    { translateX: 100 },
                                    { translateY: 20 },
                                ],
                                zIndex: 1,
                            },
                        ]}
                    >
                        <Text style={[styles.cardText, { transform: [{ rotate: '5.47deg' }] }]}>
                            {uniqueCategories[rightIndex].toUpperCase()}
                        </Text>
                    </View>
                </View>

                <View style={styles.generateRow}>
                    <TouchableOpacity onPress={handleLeft}>
                        <LeftSVG />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleGenerateRandom}>
                        <Text style={styles.generateText}>
                            Generate{'\n'}Category
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleRight}>
                        <RightSVG />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.nextButtonText}>Play</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#959AA4',
    },
    safe: {
        flex: 1,
        marginTop: 24,
        marginHorizontal: 24,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 56,
        justifyContent: 'space-between',
    },
    teamTitle: {
        maxWidth: 146,
        flexWrap: 'wrap',
        fontFamily: 'Montserrat Alternates',
        fontWeight: '600',
        fontSize: 20,
        color: '#FFFFFF',
    },
    scoreText: {
        fontFamily: 'Montserrat Alternates',
        fontWeight: '600',
        fontSize: 20,
        color: '#FFFFFF',
    },
    cardsContainer: {
        width: '100%',
        aspectRatio: 0.75,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 36,
    },
    cardBase: {
        position: 'absolute',
        width: 274,
        height: 354,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        fontFamily: 'Montserrat Alternates',
        fontWeight: '600',
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
        textTransform: 'uppercase',
        paddingHorizontal: 16,
    },
    pinImage: {
        position: 'absolute',
        top: -28,
        right: -18,
        width: 50,
        height: 74,
        resizeMode: 'contain',
    },
    generateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 36,
    },
    generateText: {
        fontFamily: 'Montserrat Alternates',
        fontWeight: '600',
        fontSize: 20,
        color: '#0048D4',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    nextButton: {
        height: 58,
        borderRadius: 100,
        backgroundColor: '#FFDDC8',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 30,
        elevation: 5,
    },
    nextButtonText: {
        fontFamily: 'Montserrat Alternates',
        fontWeight: '600',
        fontSize: 18,
        color: '#000000',
        textTransform: 'uppercase',
    },
});
