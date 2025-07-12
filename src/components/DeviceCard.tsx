import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
} from 'react-native';
// import { FontAwesome5 } from '@expo/vector-icons';
import { useAppDispatch } from '../store/hooks';
import { toggleDevice } from '../store/smartHomeSlice';
import { Device } from '../types';

interface DeviceCardProps {
    device: Device;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device }) => {
    const dispatch = useAppDispatch();

    const handleToggle = () => {
        dispatch(toggleDevice(device.id));
    };

    const getStatusColor = () => {
        return device.isOn ? '#34C759' : '#8E8E93';
    };

    const getIconColor = () => {
        return device.isOn ? '#007AFF' : '#8E8E93';
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    {/* <FontAwesome5
                        name={device.icon}
                        size={20}
                        color={getIconColor()}
                    /> */}
                </View>

                <Switch
                    value={device.isOn}
                    onValueChange={handleToggle}
                    trackColor={{ false: '#E5E5EA', true: '#34C759' }}
                    thumbColor="#FFFFFF"
                    ios_backgroundColor="#E5E5EA"
                />
            </View>

            <Text style={styles.deviceName}>{device.name}</Text>

            {device.value !== undefined && (
                <View style={styles.valueContainer}>
                    <Text style={[styles.value, { color: getStatusColor() }]}>
                        {device.value}{device.unit}
                    </Text>
                </View>
            )}

            <View style={styles.statusContainer}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
                <Text style={[styles.statusText, { color: getStatusColor() }]}>
                    {device.isOn ? 'ON' : 'OFF'}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        margin: 8,
        width: '45%',
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
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F2F2F7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deviceName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1E',
        marginBottom: 8,
    },
    valueContainer: {
        marginBottom: 8,
    },
    value: {
        fontSize: 14,
        fontWeight: '700',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
});

export default DeviceCard; 