/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    TextInput,
    ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { startGame } from '../store/slices/gameSlice';
import ArrowBackSVG from '../assets/game/ArrowBackSVG';
import AddSVG from '../assets/game/AddSVG';
import DeleteSVG from '../assets/game/DeleteSVG';

export default function SetupGameScreen({ navigation }) {
    const roundsOptions = [2, 3, 5];
    const timeOptions = [60, 120, 180];
    const [teams, setTeams] = useState(['', '']);
    const [selectedRounds, setSelectedRounds] = useState(roundsOptions[0]);
    const [selectedTime, setSelectedTime] = useState(timeOptions[0]);
    const dispatch = useDispatch();

    const isActive = teams.every(team => team.trim() !== '');

    const handleNext = () => {
        const trimmedTeams = teams.map(team => team.trim());
        dispatch(
            startGame({
                teams: trimmedTeams,
                numRounds: selectedRounds,
                timePerTurn: selectedTime,
            })
        );
        navigation.navigate('GameCategory');
    };

    const addTeam = () => setTeams([...teams, '']);

    const updateTeam = (index, text) => {
        const newTeams = [...teams];
        newTeams[index] = text;
        setTeams(newTeams);
    };

    const deleteTeam = index => {
        if (teams.length > 2) {
            const newTeams = teams.filter((_, i) => i !== index);
            setTeams(newTeams);
        }
    };

    return (
        <View style={styles.background}>
            <SafeAreaView style={styles.safe}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <ArrowBackSVG />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>
                        SET UP YOUR{'\n'}GAME
                    </Text>

                    <TouchableOpacity style={styles.profileButton} onPress={addTeam}>
                        <AddSVG />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {teams.map((team, index) => (
                        <View
                            key={index}
                            style={[
                                styles.teamInputContainer,
                                { marginBottom: index === teams.length - 1 ? 32 : 16 },
                            ]}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder={`Team ${index + 1}`}
                                placeholderTextColor="#00000040"
                                value={team}
                                onChangeText={text => updateTeam(index, text)}
                            />

                            {index >= 2 && (
                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => deleteTeam(index)}
                                >
                                    <DeleteSVG />
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}

                    <View style={styles.separator} />

                    <Text style={styles.sectionTitle}>Select Number of Rounds</Text>
                    <View style={styles.optionsRow}>
                        {roundsOptions.map(option => (
                            <TouchableOpacity
                                key={option}
                                style={styles.optionLabelContainer}
                                onPress={() => setSelectedRounds(option)}
                            >
                                <View
                                    style={[
                                        styles.optionLabelBubble,
                                        selectedRounds === option && styles.optionLabelBubbleSelected,
                                    ]}
                                />
                                <Text style={styles.optionLabelText}>{option} Rounds</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.separator} />

                    <Text style={styles.sectionTitle}>Select Discussion Time</Text>
                    <View style={styles.optionsRow}>
                        {timeOptions.map(sec => (
                            <TouchableOpacity
                                key={sec}
                                style={styles.optionLabelContainer}
                                onPress={() => setSelectedTime(sec)}
                            >
                                <View
                                    style={[
                                        styles.optionLabelBubble,
                                        selectedTime === sec && styles.optionLabelBubbleSelected,
                                    ]}
                                />
                                <Text style={styles.optionLabelText}>{sec} sec</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                <TouchableOpacity
                    style={[styles.nextButton, isActive && styles.nextButtonActive]}
                    onPress={handleNext}
                    disabled={!isActive}
                >
                    <Text style={styles.nextButtonText}>next</Text>
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
        marginBottom: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    backButton: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontFamily: 'Montserrat Alternates',
        fontWeight: '600',
        fontSize: 20,
        color: '#FFFFFF',
    },
    profileButton: {
        width: 40,
        alignItems: 'flex-end',
    },
    teamInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 51,
        borderRadius: 100,
        backgroundColor: '#FFFFFF59',
        paddingHorizontal: 24,
        fontFamily: 'Inter',
        fontSize: 16,
        color: '#000',
    },
    deleteButton: {
        marginLeft: 4,
    },
    separator: {
        borderWidth: 1,
        borderColor: '#FFFFFF59',
        marginBottom: 32,
    },
    sectionTitle: {
        fontFamily: 'Inter',
        fontSize: 20,
        color: '#FFFFFF',
        marginBottom: 24,
    },
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    optionLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionLabelBubble: {
        width: 26,
        height: 26,
        borderWidth: 8,
        borderRadius: 13,
        borderColor: '#DBDDEE',
        marginRight: 4,
    },
    optionLabelBubbleSelected: {
        borderColor: '#42C6CB',
    },
    optionLabelText: {
        fontFamily: 'Inter',
        fontSize: 16,
        color: '#FFFFFF',
    },
    nextButton: {
        height: 58,
        borderRadius: 100,
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 30,
        elevation: 5,
    },
    nextButtonActive: {
        backgroundColor: '#FFDDC8',
    },
    nextButtonText: {
        fontFamily: 'Montserrat Alternates',
        fontSize: 18,
        color: '#000',
        textTransform: 'uppercase',
    },
});
