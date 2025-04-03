import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Modal,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectLegends, removeLegend } from '../store/slices/customLegendsSlice';
import ArrowBackSVG from '../assets/game/ArrowBackSVG';
import CancelSVG from '../assets/CancelSVG';

export default function CustomLegendsScreen({ navigation }) {
    const dispatch = useDispatch();
    const legends = useSelector(selectLegends);
    const newLegends = legends.filter((legend) => legend.isCustom);

    const [modalVisible, setModalVisible] = useState(false);
    const [legendToRemove, setLegendToRemove] = useState(null);

    const promptRemove = (legend) => {
        setLegendToRemove(legend);
        setModalVisible(true);
    };

    const handleDelete = () => {
        if (legendToRemove) {
            dispatch(removeLegend(legendToRemove.id));
        }
        setModalVisible(false);
        setLegendToRemove(null);
    };

    const handleCancel = () => {
        setModalVisible(false);
        setLegendToRemove(null);
    };

    return (
        <View style={styles.background}>
            <SafeAreaView style={styles.safe}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ArrowBackSVG />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>
                        CUSTOM{'\n'}LEGENDS
                    </Text>
                    <View style={styles.rightPlaceholder} />
                </View>
                <ScrollView style={styles.content}>
                    {newLegends.map((legend) => (
                        <View style={styles.card} key={legend.id}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.legendName}>{legend.name}</Text>
                                <TouchableOpacity onPress={() => promptRemove(legend)}>
                                    <CancelSVG />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.categoryContainer}>
                                <Text style={styles.categoryText}>{legend.category}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddNewLegend')}
                >
                    <Text style={styles.addButtonText}>+ ADD NEW LEGEND</Text>
                </TouchableOpacity>
            </SafeAreaView>

            <Modal
                transparent
                visible={modalVisible}
                animationType="fade"
                onRequestClose={handleCancel}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Poof! Gone?</Text>
                        <Text style={styles.modalMessage}>
                            One tap and {legendToRemove?.name} disappears. No going back!
                        </Text>
                        <View style={styles.modalButtonsRow}>
                            <TouchableOpacity
                                style={styles.modalCancelButton}
                                onPress={handleCancel}
                            >
                                <Text style={styles.modalCancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalDeleteButton}
                                onPress={handleDelete}
                            >
                                <Text style={styles.modalDeleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#959AA4'
    },
    safe: {
        flex: 1,
        marginTop: 24,
        marginHorizontal: 24,
        paddingBottom: 16
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32
    },
    backButton: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontFamily: 'Montserrat Alternates',
        fontWeight: '600',
        fontSize: 20,
        color: '#FFFFFF',
    },
    rightPlaceholder: {
        width: 40
    },
    content: {
        flex: 1
    },
    card: {
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
        backgroundColor: '#0048D4',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 26,
    },
    legendName: {
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: 16,
        color: '#FFFFFF',
    },
    categoryContainer: {
        borderRadius: 100,
        paddingVertical: 8,
        paddingHorizontal: 24,
        backgroundColor: '#42C6CB',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        width: '100%',
    },
    categoryText: {
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: 16,
        color: '#FFFFFF',
    },
    addButton: {
        height: 58,
        backgroundColor: '#42C6CB',
        borderRadius: 100,
        paddingVertical: 18,
        paddingHorizontal: 55,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    addButtonText: {
        fontFamily: 'Montserrat Alternates',
        fontWeight: '600',
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: '#00000040',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 345,
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
        fontWeight: '600',
        fontSize: 22,
        color: '#000000',
        textAlign: 'center',
        marginBottom: 4,
    },
    modalMessage: {
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: 16,
        color: '#000000',
        textAlign: 'center',
        marginBottom: 36,
    },
    modalButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalCancelButton: {
        flex: 1,
        marginRight: 8,
        height: 43,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCancelButtonText: {
        fontFamily: 'Montserrat Alternates',
        fontWeight: '500',
        fontSize: 16,
        color: '#000000',
    },
    modalDeleteButton: {
        flex: 1,
        marginLeft: 8,
        height: 43,
        borderRadius: 40,
        backgroundColor: '#D41900',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalDeleteButtonText: {
        fontFamily: 'Montserrat Alternates',
        fontWeight: '400',
        fontSize: 16,
        color: '#FFFFFF',
    },
});
