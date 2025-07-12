import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { FontAwesome5 } from '@expo/vector-icons';
import { useAppSelector } from '../store/hooks';

const EnergyCard: React.FC = () => {
    const { energyUsage } = useAppSelector((state) => state.smartHome);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Energy Usage</Text>
                {/* <FontAwesome5 name="bolt" size={20} color="#FF9500" /> */}
            </View>

            <View style={styles.usageContainer}>
                <View style={styles.usageItem}>
                    <Text style={styles.usageLabel}>Current</Text>
                    <Text style={styles.usageValue}>
                        {energyUsage.current} {energyUsage.unit}
                    </Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.usageItem}>
                    <Text style={styles.usageLabel}>Daily</Text>
                    <Text style={styles.usageValue}>
                        {energyUsage.daily} {energyUsage.unit}
                    </Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.usageItem}>
                    <Text style={styles.usageLabel}>Monthly</Text>
                    <Text style={styles.usageValue}>
                        {energyUsage.monthly} {energyUsage.unit}
                    </Text>
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
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1C1C1E',
    },
    usageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    usageItem: {
        flex: 1,
        alignItems: 'center',
    },
    usageLabel: {
        fontSize: 12,
        color: '#8E8E93',
        marginBottom: 4,
        fontWeight: '500',
    },
    usageValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    divider: {
        width: 1,
        height: 30,
        backgroundColor: '#E5E5EA',
    },
});

export default EnergyCard; 