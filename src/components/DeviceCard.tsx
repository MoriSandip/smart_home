import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
} from 'react-native';
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
        return device.isOn ? '#28a745' : '#6c757d';
    };

    const getIconColor = () => {
        return device.isOn ? '#007AFF' : '#6c757d';
    };

    const getBackgroundColor = () => {
        return device.isOn ? '#f8f9fa' : '#ffffff';
    };

    // Map device icons to emojis
    const getDeviceEmoji = (iconName: string) => {
        const emojiMap: { [key: string]: string } = {
            'lightbulb': '💡',
            'snowflake': '❄️',
            'tv': '📺',
            'fan': '💨',
            'door-open': '🚪',
            'video': '📹',
            'circle': '⚪',
        };
        return emojiMap[iconName] || '⚪';
    };

    return (
        <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
            {/* Header */}
            <View style={styles.header}>
                <View style={[styles.iconContainer, { backgroundColor: device.isOn ? '#e3f2fd' : '#f8f9fa' }]}>
                    <Text style={styles.deviceEmoji}>{getDeviceEmoji(device.icon)}</Text>
                </View>

                <Switch
                    value={device.isOn}
                    onValueChange={handleToggle}
                    trackColor={{ false: '#e9ecef', true: '#28a745' }}
                    thumbColor="#ffffff"
                    ios_backgroundColor="#e9ecef"
                    style={styles.switch}
                />
            </View>

            {/* Device Info */}
            <View style={styles.deviceInfo}>
                <Text style={styles.deviceName}>{device.name}</Text>

                {device.value !== undefined && (
                    <View style={styles.valueContainer}>
                        <Text style={[styles.value, { color: getStatusColor() }]}>
                            {device.value}{device.unit}
                        </Text>
                        <View style={styles.valueIndicator}>
                            <Text style={styles.valueDot}>●</Text>
                        </View>
                    </View>
                )}
            </View>

            {/* Status Bar */}
            <View style={styles.statusContainer}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
                <Text style={[styles.statusText, { color: getStatusColor() }]}>
                    {device.isOn ? 'ON' : 'OFF'}
                </Text>
                <View style={styles.statusSpacer} />
                <Text style={styles.deviceType}>{device.type.toUpperCase()}</Text>
            </View>

            {/* Active Indicator */}
            {device.isOn && (
                <View style={styles.activeIndicator}>
                    <Text style={styles.activeEmoji}>⚡</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        padding: 20,
        margin: 8,
        width: '45%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#f1f3f4',
        position: 'relative',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconContainer: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deviceEmoji: {
        fontSize: 20,
    },
    switch: {
        transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
    },
    deviceInfo: {
        marginBottom: 16,
    },
    deviceName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1a1a2e',
        marginBottom: 8,
        letterSpacing: -0.3,
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    value: {
        fontSize: 18,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    valueIndicator: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    valueDot: {
        fontSize: 8,
        color: '#28a745',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    statusSpacer: {
        flex: 1,
    },
    deviceType: {
        fontSize: 10,
        color: '#6c757d',
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    activeIndicator: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeEmoji: {
        fontSize: 8,
    },
});

export default DeviceCard; 