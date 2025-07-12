import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    SafeAreaView,
    StatusBar,
    Animated,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchWeatherAsync, loadPersistedState } from '../store/smartHomeSlice';
import { getGreeting } from '../utils/helpers';
import WeatherCard from '../components/WeatherCard';
import EnergyCard from '../components/EnergyCard';
import RoomCard from '../components/RoomCard';

const { width: screenWidth } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 80;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const DashboardScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const { rooms, selectedRoomId } = useAppSelector(
        (state) => state.smartHome
    );

    // Animation values
    const scrollY = useRef(new Animated.Value(0)).current;
    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
    });

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 0.8, 0.6],
        extrapolate: 'clamp',
    });

    const greetingOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const greetingScale = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
        outputRange: [1, 0.8],
        extrapolate: 'clamp',
    });

    const titleOpacity = scrollY.interpolate({
        inputRange: [HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const titleTranslateY = scrollY.interpolate({
        inputRange: [HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [20, 0],
        extrapolate: 'clamp',
    });

    useEffect(() => {
        dispatch(loadPersistedState());
        dispatch(fetchWeatherAsync());
    }, [dispatch]);

    const renderRoomCard = ({ item, index }: { item: any; index: number }) => (
        <RoomCard
            room={item}
            isSelected={selectedRoomId === item.id}
            scrollY={scrollY}
            index={index}
        />
    );

    // Navigate to room detail when a room is selected
    React.useEffect(() => {
        if (selectedRoomId) {
            navigation.navigate('RoomDetail' as never);
        }
    }, [selectedRoomId, navigation]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

            {/* Animated Header */}
            <Animated.View style={[
                styles.header,
                {
                    height: headerHeight,
                    opacity: headerOpacity,
                }
            ]}>
                {/* Collapsed Title */}
                <Animated.View style={[
                    styles.collapsedTitle,
                    {
                        opacity: titleOpacity,
                        transform: [{ translateY: titleTranslateY }],
                    }
                ]}>
                    <Text style={styles.collapsedTitleText}>🏠 Smart Home</Text>
                </Animated.View>

                {/* Expanded Greeting */}
                <Animated.View style={[
                    styles.greetingContainer,
                    {
                        opacity: greetingOpacity,
                        transform: [{ scale: greetingScale }],
                    }
                ]}>
                    <Text style={styles.greeting}>{getGreeting()}</Text>
                    <Text style={styles.subtitle}>Welcome to your Smart Home</Text>
                    <Text style={styles.dateText}>
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </Text>
                </Animated.View>
            </Animated.View>

            {/* Scrollable Content */}
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                {/* Weather and Energy Cards */}
                <View style={styles.cardsContainer}>
                    <WeatherCard scrollY={scrollY} />
                    <EnergyCard scrollY={scrollY} />
                </View>

                {/* Rooms Section */}
                <View style={styles.roomsSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Your Rooms</Text>
                        <Text style={styles.sectionSubtitle}>Tap to control devices</Text>
                    </View>
                    <FlatList
                        data={rooms}
                        renderItem={renderRoomCard}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.roomsList}
                        decelerationRate="fast"
                        snapToInterval={140}
                    />
                </View>

                {/* Quick Actions */}
                <View style={styles.quickActionsSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Quick Actions</Text>
                        <Text style={styles.sectionSubtitle}>Control multiple devices at once</Text>
                    </View>
                    <View style={styles.quickActionsGrid}>
                        <View style={styles.quickAction}>
                            <View style={styles.quickActionIcon}>
                                <Text style={styles.quickActionEmoji}>💡</Text>
                            </View>
                            <Text style={styles.quickActionText}>All Lights</Text>
                        </View>
                        <View style={styles.quickAction}>
                            <View style={styles.quickActionIcon}>
                                <Text style={styles.quickActionEmoji}>🔒</Text>
                            </View>
                            <Text style={styles.quickActionText}>Security</Text>
                        </View>
                        <View style={styles.quickAction}>
                            <View style={styles.quickActionIcon}>
                                <Text style={styles.quickActionEmoji}>🌡️</Text>
                            </View>
                            <Text style={styles.quickActionText}>Climate</Text>
                        </View>
                        <View style={styles.quickAction}>
                            <View style={styles.quickActionIcon}>
                                <Text style={styles.quickActionEmoji}>🎮</Text>
                            </View>
                            <Text style={styles.quickActionText}>Entertainment</Text>
                        </View>
                    </View>
                </View>

                {/* Bottom Spacing */}
                <View style={styles.bottomSpacing} />
            </Animated.ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        backgroundColor: '#1a1a2e',
        paddingTop: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
    },
    collapsedTitle: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    collapsedTitleText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ffffff',
        textAlign: 'center',
    },
    greetingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    greeting: {
        fontSize: 32,
        fontWeight: '800',
        color: '#ffffff',
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 18,
        color: '#e8e8e8',
        fontWeight: '500',
        marginBottom: 8,
    },
    dateText: {
        fontSize: 14,
        color: '#b0b0b0',
        fontWeight: '400',
    },
    scrollContent: {
        paddingTop: HEADER_MAX_HEIGHT + 20,
        paddingBottom: 20,
    },
    cardsContainer: {
        marginBottom: 30,
    },
    roomsSection: {
        marginBottom: 30,
    },
    sectionHeader: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1a1a2e',
        marginBottom: 4,
        letterSpacing: -0.5,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#6c757d',
        fontWeight: '500',
    },
    roomsList: {
        paddingHorizontal: 16,
    },
    quickActionsSection: {
        marginBottom: 20,
    },
    quickActionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 16,
        gap: 16,
    },
    quickAction: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        width: '47%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#f1f3f4',
    },
    quickActionIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    quickActionEmoji: {
        fontSize: 24,
    },
    quickActionText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1a1a2e',
        textAlign: 'center',
    },
    bottomSpacing: {
        height: 20,
    },
});

export default DashboardScreen; 