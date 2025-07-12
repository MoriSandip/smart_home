import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
// import { FontAwesome5 } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleTemperatureUnit } from '../store/smartHomeSlice';
import { formatTemperature } from '../utils/helpers';

const WeatherCard: React.FC = () => {
    const dispatch = useAppDispatch();
    const { weather, temperatureUnit, isLoading } = useAppSelector(
        (state) => state.smartHome
    );

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="small" color="#007AFF" />
            </View>
        );
    }

    if (!weather) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Weather data unavailable</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Weather</Text>
                <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={() => dispatch(toggleTemperatureUnit())}
                >
                    <Text style={styles.toggleText}>
                        °{temperatureUnit === 'C' ? 'F' : 'C'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.weatherInfo}>
                <View style={styles.temperatureContainer}>
                    <Text style={styles.temperature}>
                        {formatTemperature(weather.temperature, temperatureUnit)}
                    </Text>
                    {/* <FontAwesome5 name="thermometer-half" size={24} color="#007AFF" /> */}
                </View>

                <View style={styles.conditionContainer}>
                    {/* <FontAwesome5 name="cloud-sun" size={20} color="#FF9500" /> */}
                    <Text style={styles.condition}>{weather.condition}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1C1C1E',
    },
    toggleButton: {
        backgroundColor: '#F2F2F7',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#007AFF',
    },
    weatherInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    temperatureContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    temperature: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    conditionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    condition: {
        fontSize: 16,
        color: '#8E8E93',
        fontWeight: '500',
    },
    errorText: {
        fontSize: 14,
        color: '#FF3B30',
        textAlign: 'center',
    },
});

export default WeatherCard; 