import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchWeatherAsync, loadPersistedState } from '../store/smartHomeSlice';
import { getGreeting } from '../utils/helpers';
import WeatherCard from '../components/WeatherCard';
import EnergyCard from '../components/EnergyCard';
import RoomCard from '../components/RoomCard';

const DashboardScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const { rooms, selectedRoomId } = useAppSelector(
        (state) => state.smartHome
    );

    useEffect(() => {
        dispatch(loadPersistedState());
        dispatch(fetchWeatherAsync());
    }, [dispatch]);

    const renderRoomCard = ({ item }: { item: any }) => (
        <RoomCard
            room={item}
            isSelected={selectedRoomId === item.id}
        />
    );

    // Navigate to room detail when a room is selected
    React.useEffect(() => {
        if (selectedRoomId) {
            navigation.navigate('RoomDetail' as never);
        }
    }, [selectedRoomId, navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.greeting}>{getGreeting()}</Text>
                    <Text style={styles.subtitle}>Welcome to your Smart Home</Text>
                </View>

                {/* Weather and Energy Cards */}
                <View style={styles.cardsContainer}>
                    <WeatherCard />
                    <EnergyCard />
                </View>

                {/* Rooms Section */}
                <View style={styles.roomsSection}>
                    <Text style={styles.sectionTitle}>Rooms</Text>
                    <FlatList
                        data={rooms}
                        renderItem={renderRoomCard}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.roomsList}
                    />
                </View>

                {/* Quick Actions */}
                <View style={styles.quickActionsSection}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.quickActionsGrid}>
                        <View style={styles.quickAction}>
                            <Text style={styles.quickActionText}>All Lights</Text>
                        </View>
                        <View style={styles.quickAction}>
                            <Text style={styles.quickActionText}>Security</Text>
                        </View>
                        <View style={styles.quickAction}>
                            <Text style={styles.quickActionText}>Climate</Text>
                        </View>
                        <View style={styles.quickAction}>
                            <Text style={styles.quickActionText}>Entertainment</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 16,
    },
    greeting: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: '#8E8E93',
        fontWeight: '500',
    },
    cardsContainer: {
        marginBottom: 24,
    },
    roomsSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1C1C1E',
        marginHorizontal: 16,
        marginBottom: 16,
    },
    roomsList: {
        paddingHorizontal: 8,
    },
    quickActionsSection: {
        marginBottom: 24,
    },
    quickActionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 16,
        gap: 12,
    },
    quickAction: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        width: '47%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    quickActionText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1C1C1E',
    },
});

export default DashboardScreen; 