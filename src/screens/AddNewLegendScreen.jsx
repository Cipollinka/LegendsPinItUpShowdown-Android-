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
import { useSelector, useDispatch } from 'react-redux';
import { selectCategories } from '../store/slices/categoriesSlice';
import { addLegend } from '../store/slices/customLegendsSlice';
import CancelSVG from '../assets/game/CancelSVG';
import { nanoid } from '@reduxjs/toolkit';

export default function AddNewLegendScreen({ navigation }) {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const [legendName, setLegendName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const isActive = legendName.trim() && selectedCategory;

    const categoryMap = {
        '⚽ Football (Soccer)': 'Football (Soccer)',
        '🏀 Basketball': 'Basketball',
        '🎾 Tennis': 'Tennis',
        '🏃 Athletics': 'Athletics (Track & Field)',
        '🥊 Combat Sports': 'Combat Sports (Boxing / MMA)',
        '⭐ Custom Legends': 'Custom Legends',
    };

    const handleSave = () => {
        if (!isActive) return;
        const mappedCategory = categoryMap[selectedCategory];
        dispatch(addLegend({ id: nanoid(), name: legendName.trim(), category: mappedCategory, isCustom: true }));
        navigation.goBack();
    };

    return (
        <View style={styles.background}>
            <SafeAreaView style={styles.safe}>
                <View style={styles.headerContainer}>
                    <View style={styles.leftPlaceholder} />
                    <Text style={styles.headerTitle}>CUSTOM{'\n'}LEGENDS</Text>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                        <CancelSVG />
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.content} bounces={false}>
                    <TextInput
                        style={[styles.input, legendName.length > 0 && styles.inputActive]}
                        placeholder="Legend Name"
                        placeholderTextColor="#00000040"
                        value={legendName}
                        onChangeText={setLegendName}
                    />
                    {categories.map((cat, index) => (
                        <TouchableOpacity
                            style={[
                                styles.categoryButton,
                                selectedCategory === cat && styles.categoryButtonSelected,
                            ]}
                            key={index}
                            onPress={() => setSelectedCategory(cat)}
                        >
                            <Text
                                style={[
                                    styles.categoryButtonText,
                                    selectedCategory === cat && styles.categoryButtonTextSelected,
                                ]}
                            >
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <TouchableOpacity
                    style={[styles.saveButton, isActive && styles.saveButtonActive]}
                    onPress={handleSave}
                    disabled={!isActive}
                >
                    <Text style={styles.saveButtonText}>SAVE</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1, backgroundColor: '#959AA4' },
    safe: { flex: 1, marginTop: 24, marginHorizontal: 24, paddingBottom: 16 },
    headerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 32 },
    leftPlaceholder: { width: 40 },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontFamily: 'Montserrat Alternates',
        fontWeight: '600',
        fontSize: 20,
        color: '#FFFFFF',
    },
    cancelButton: { width: 40, alignItems: 'flex-end' },
    content: { flex: 1 },
    input: {
        height: 51,
        borderRadius: 100,
        backgroundColor: '#FFFFFF59',
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 24,
        paddingRight: 24,
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: 16,
        color: '#000',
        marginBottom: 24,
    },
    inputActive: { color: '#000000' },
    categoryButton: {
        borderRadius: 100,
        backgroundColor: '#FFFFFF59',
        paddingVertical: 16,
        paddingHorizontal: 24,
        justifyContent: 'center',
        marginBottom: 8,
    },
    categoryButtonSelected: { backgroundColor: '#42C6CB' },
    categoryButtonText: {
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: 16,
        color: '#000000',
    },
    categoryButtonTextSelected: { color: '#FFFFFF' },
    saveButton: {
        height: 58,
        borderRadius: 100,
        backgroundColor: '#D9D9D9',
        paddingTop: 18,
        paddingBottom: 18,
        paddingLeft: 55,
        paddingRight: 55,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 30,
        elevation: 5,
    },
    saveButtonActive: { backgroundColor: '#FFDDC8' },
    saveButtonText: {
        fontFamily: 'Montserrat Alternates',
        fontWeight: '600',
        fontSize: 18,
        color: '#000000',
        textAlign: 'center',
    },
});
