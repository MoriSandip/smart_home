import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Animated,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleTemperatureUnit } from '../store/smartHomeSlice';
import { formatTemperature } from '../utils/helpers';

interface WeatherCardProps {
    scrollY?: Animated.Value;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ scrollY }) => {
    const dispatch = useAppDispatch();
    const { weather, temperatureUnit, isLoading } = useAppSelector(
        (state) => state.smartHome
    );

    // Parallax effect for weather card
    const cardTranslateY = scrollY ? scrollY.interpolate({
        inputRange: [-1, 0, 100, 101],
        outputRange: [0, 0, -5, -5],
        extrapolate: 'clamp',
    }) : 0;

    const cardScale = scrollY ? scrollY.interpolate({
        inputRange: [-1, 0, 100, 101],
        outputRange: [1, 1, 0.98, 0.98],
        extrapolate: 'clamp',
    }) : 1;

    if (isLoading) {
        return (
            <Animated.View style={[
                styles.container,
                {
                    transform: [
                        { translateY: cardTranslateY },
                        { scale: cardScale },
                    ],
                }
            ]}>
                <ActivityIndicator size="large" color="#007AFF" />
            </Animated.View>
        );
    }

    if (!weather) {
        return (
            <Animated.View style={[
                styles.container,
                {
                    transform: [
                        { translateY: cardTranslateY },
                        { scale: cardScale },
                    ],
                }
            ]}>
                <Text style={styles.errorText}>Weather data unavailable</Text>
            </Animated.View>
        );
    }

    return (
        <Animated.View style={[
            styles.container,
            {
                transform: [
                    { translateY: cardTranslateY },
                    { scale: cardScale },
                ],
            }
        ]}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>🌤️ Weather</Text>
                    <Text style={styles.location}>📍 New York, NY</Text>
                </View>
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
                    <View style={styles.temperatureIcon}>
                        <Text style={styles.temperatureEmoji}>🌡️</Text>
                    </View>
                </View>

                <View style={styles.conditionContainer}>
                    <View style={styles.conditionIcon}>
                        <Text style={styles.conditionEmoji}>☀️</Text>
                    </View>
                    <View style={styles.conditionText}>
                        <Text style={styles.condition}>{weather.condition}</Text>
                        <Text style={styles.feelsLike}>Feels like {formatTemperature(weather.temperature, temperatureUnit)}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.weatherDetails}>
                <View style={styles.detailItem}>
                    <Text style={styles.detailEmoji}>💨</Text>
                    <Text style={styles.detailText}>12 km/h</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailEmoji}>💧</Text>
                    <Text style={styles.detailText}>65%</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailEmoji}>👁️</Text>
                    <Text style={styles.detailText}>10 km</Text>
                </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 24,
        marginHorizontal: 20,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
        borderWidth: 1,
        borderColor: '#f1f3f4',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1a1a2e',
        marginBottom: 4,
    },
    location: {
        fontSize: 14,
        color: '#6c757d',
        fontWeight: '500',
    },
    toggleButton: {
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e9ecef',
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
        marginBottom: 20,
    },
    temperatureContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    temperature: {
        fontSize: 48,
        fontWeight: '800',
        color: '#1a1a2e',
        letterSpacing: -1,
    },
    temperatureIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    temperatureEmoji: {
        fontSize: 24,
    },
    conditionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    conditionIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff3cd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    conditionEmoji: {
        fontSize: 24,
    },
    conditionText: {
        alignItems: 'flex-start',
    },
    condition: {
        fontSize: 18,
        color: '#1a1a2e',
        fontWeight: '600',
        marginBottom: 2,
    },
    feelsLike: {
        fontSize: 12,
        color: '#6c757d',
        fontWeight: '500',
    },
    weatherDetails: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#f1f3f4',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    detailEmoji: {
        fontSize: 16,
    },
    detailText: {
        fontSize: 12,
        color: '#6c757d',
        fontWeight: '500',
    },
    errorText: {
        fontSize: 16,
        color: '#dc3545',
        textAlign: 'center',
        fontWeight: '500',
    },
});

export default WeatherCard; 