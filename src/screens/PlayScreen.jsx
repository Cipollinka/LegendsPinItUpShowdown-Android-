/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    Animated,
} from 'react-native';
import Sound from 'react-native-sound';
import { useSelector, useDispatch } from 'react-redux';
import { selectLegends } from '../store/slices/customLegendsSlice';
import {
    selectTeams,
    selectCurrentTeamIndex,
    selectCurrentRound,
    selectNumRounds,
    selectTimePerTurn,
    finishTurn,
} from '../store/slices/gameSlice';
import { selectMusicEnabled } from '../store/slices/settingsSlice';
import PauseSVG from '../assets/game/PauseSVG';
import PinImage from '../assets/game/pin.png';
import funkyBreak from '../assets/music/funky-break.wav';
import cyberAlarm from '../assets/music/cyber-alarm.wav';

Sound.setCategory('Playback', true);

export default function PlayScreen({ navigation, route }) {
    const { chosenCategory } = route.params;
    const legends = useSelector(selectLegends);
    const teams = useSelector(selectTeams);
    const currentTeamIndex = useSelector(selectCurrentTeamIndex);
    const currentRound = useSelector(selectCurrentRound);
    const numRounds = useSelector(selectNumRounds);
    const timePerTurn = useSelector(selectTimePerTurn);
    const musicEnabled = useSelector(selectMusicEnabled);
    const dispatch = useDispatch();

    const legendsForCategory = legends.filter(legend => legend.category === chosenCategory);
    const [randomLegend, setRandomLegend] = useState({ name: 'No Legend' });
    const [remainingTime, setRemainingTime] = useState(timePerTurn);
    const [isPaused, setIsPaused] = useState(false);
    const [showPauseModal, setShowPauseModal] = useState(false);
    const [showButtons, setShowButtons] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const bgSoundRef = useRef(null);
    const alarmSoundRef = useRef(null);
    const timerRef = useRef(null);

    // Вместо [musicEnabled, legendsForCategory],
    // используем пустой массив, чтобы логика отработала один раз.
    useEffect(() => {
        // Генерируем случайную легенду
        const chosen =
            legendsForCategory[Math.floor(Math.random() * legendsForCategory.length)] ||
            { name: 'No Legend' };
        setRandomLegend(chosen);

        // Запускаем музыку один раз
        if (musicEnabled) {
            bgSoundRef.current = new Sound(funkyBreak, error => {
                if (!error) {
                    bgSoundRef.current.setNumberOfLoops(-1);
                    bgSoundRef.current.play(success => {
                        if (!success) {
                            console.warn('Ошибка при воспроизведении фоновой музыки');
                        }
                    });
                } else {
                    console.error('Ошибка загрузки фоновой музыки', error);
                }
            });
        }

        // Запускаем таймер
        timerRef.current = setInterval(() => {
            setRemainingTime(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    bgSoundRef.current?.stop();

                    if (musicEnabled) {
                        alarmSoundRef.current = new Sound(cyberAlarm, err => {
                            if (!err) {
                                alarmSoundRef.current.play(ok => {
                                    if (!ok) {
                                        console.warn('Ошибка воспроизведения сигнала');
                                    }
                                });
                            } else {
                                console.error('Ошибка загрузки сигнала', err);
                            }
                        });
                    }
                    setShowButtons(true);
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }).start();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            bgSoundRef.current?.release();
            alarmSoundRef.current?.release();
            clearInterval(timerRef.current);
        };
    }, []); // <--- пустой массив зависимостей

    const handlePause = () => {
        setIsPaused(true);
        setShowPauseModal(true);
        bgSoundRef.current?.pause();
        clearInterval(timerRef.current);
    };

    const handleContinue = () => {
        setIsPaused(false);
        setShowPauseModal(false);
        bgSoundRef.current?.play();
        timerRef.current = setInterval(() => {
            setRemainingTime(t => t - 1);
        }, 1000);
    };

    const handleMainMenu = () => {
        bgSoundRef.current?.stop();
        navigation.replace('Main');
    };

    const handleFinishTurn = wasCorrect => {
        dispatch(finishTurn(wasCorrect));
        navigation.replace(
            currentTeamIndex === teams.length - 1 && currentRound === numRounds - 1
                ? 'Stats'
                : 'GameCategory'
        );
    };

    const progressPercent = ((timePerTurn - remainingTime) / timePerTurn) * 100;

    return (
        <View style={styles.background}>
            <SafeAreaView style={styles.safe}>
                <View style={styles.header}>
                    <Text style={styles.teamTitle}>{teams[currentTeamIndex]}</Text>
                    <Text style={styles.scoreText}>{currentRound + 1}/{numRounds}</Text>
                    <TouchableOpacity onPress={handlePause}>
                        <PauseSVG />
                    </TouchableOpacity>
                </View>

                <View style={styles.cardContainer}>
                    <Text style={styles.cardText}>
                        {randomLegend.name.toUpperCase()}
                    </Text>
                    <Image source={PinImage} style={styles.pinImage} />
                </View>

                <Text style={styles.categoryText}>
                    {chosenCategory.toUpperCase()}
                </Text>

                {remainingTime > 0 ? (
                    <>
                        <Text style={styles.timeText}>{remainingTime}:00</Text>
                        <View style={{ marginBottom: 32 }} />
                        <View style={styles.progressContainer}>
                            <View style={[
                                styles.progressFill,
                                { width: `${progressPercent}%` }
                            ]} />
                        </View>
                    </>
                ) : showButtons && (
                    <Animated.View style={[styles.buttonRow, { opacity: fadeAnim }]}>
                        <TouchableOpacity
                            style={styles.incorrectButton}
                            onPress={() => handleFinishTurn(false)}
                        >
                            <Text style={styles.buttonText}>incorrect</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.correctButton}
                            onPress={() => handleFinishTurn(true)}
                        >
                            <Text style={styles.buttonText}>correct</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}

                <Modal transparent visible={showPauseModal} animationType="fade">
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>Time-Out Called!</Text>
                            <Text style={styles.modalMessage}>
                                Even legends need a break. Take a moment, catch your breath,
                                and get ready to dive back into the showdown when you're ready.
                            </Text>
                            <View style={styles.modalButtonsRow}>
                                <TouchableOpacity
                                    style={styles.modalMainButton}
                                    onPress={handleMainMenu}
                                >
                                    <Text style={styles.modalMainButtonText}>Main Menu</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.modalContinueButton}
                                    onPress={handleContinue}
                                >
                                    <Text style={styles.modalContinueButtonText}>Continue</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
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
        marginHorizontal: 24,
        marginTop: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
    },
    teamTitle: {
        fontFamily: 'Montserrat Alternates',
        fontSize: 20,
        color: '#FFFFFF',
    },
    scoreText: {
        fontFamily: 'Montserrat Alternates',
        fontSize: 20,
        color: '#FFFFFF',
    },
    cardContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: 274,
        height: 354,
        borderRadius: 24,
        backgroundColor: '#0048D4',
        marginVertical: 30,
    },
    cardText: {
        fontFamily: 'Montserrat Alternates',
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
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
    categoryText: {
        fontFamily: 'Montserrat Alternates',
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 16,
    },
    timeText: {
        fontFamily: 'Montserrat Alternates',
        fontSize: 24,
        color: '#FFDDC8',
        textAlign: 'center',
    },
    progressContainer: {
        width: '100%',
        height: 6,
        backgroundColor: '#F5F5F566',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#FFDDC8',
        borderRadius: 3,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30,
    },
    incorrectButton: {
        flex: 1,
        backgroundColor: '#D41900',
        padding: 16,
        borderRadius: 12,
        marginRight: 8,
        alignItems: 'center',
    },
    correctButton: {
        flex: 1,
        backgroundColor: '#15D400',
        padding: 16,
        borderRadius: 12,
        marginLeft: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Montserrat Alternates',
        textTransform: 'uppercase',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 345,
        height: 249,
        borderRadius: 20,
        paddingVertical: 32,
        paddingHorizontal: 24,
        backgroundColor: '#FFDDC8',
        borderWidth: 1,
        borderColor: '#BABABA',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontFamily: 'Montserrat Alternates',
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 4,
        color: '#000000',
        fontWeight: '600',
    },
    modalMessage: {
        fontFamily: 'Inter',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 36,
        color: '#000000',
    },
    modalButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalMainButton: {
        flex: 1,
        height: 43,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        backgroundColor: 'transparent',
    },
    modalMainButtonText: {
        fontFamily: 'Montserrat Alternates',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '500',
        color: '#000000',
    },
    modalContinueButton: {
        flex: 1,
        height: 43,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        backgroundColor: '#0048D4',
    },
    modalContinueButtonText: {
        fontFamily: 'Montserrat Alternates',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '400',
        color: '#FFFFFF',
    },
});
