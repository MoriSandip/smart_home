import React from 'react';
import {
    Text,
    StyleSheet,
    Animated,
} from 'react-native';
import { getGreeting } from '../../../utils/helpers';

interface DashboardHeaderProps {
    headerHeight: Animated.AnimatedInterpolation<string | number>;
    greetingOpacity: Animated.AnimatedInterpolation<string | number>;
    greetingScale: Animated.AnimatedInterpolation<string | number>;
    titleOpacity: Animated.AnimatedInterpolation<string | number>;
    titleTranslateY: Animated.AnimatedInterpolation<string | number>;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    headerHeight,
    greetingOpacity,
    greetingScale,
    titleOpacity,
    titleTranslateY,
}) => {
    return (
        <Animated.View style={[
            styles.header,
            {
                height: headerHeight,
                opacity: 1,
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
    );
};

const styles = StyleSheet.create({
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
});

export default DashboardHeader; 