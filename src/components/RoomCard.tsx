import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';
// import { FontAwesome5 } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectRoom } from '../store/smartHomeSlice';
import { Room } from '../types';

interface RoomCardProps {
    room: Room;
    isSelected: boolean;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, isSelected }) => {
    const dispatch = useAppDispatch();
    const { devices } = useAppSelector((state) => state.smartHome);

    const activeDevices = devices.filter(
        device => room.deviceIds.includes(device.id) && device.isOn
    ).length;

    const handlePress = () => {
        dispatch(selectRoom(room.id));
    };

    return (
        <TouchableOpacity
            style={[
                styles.container,
                { backgroundColor: room.backgroundColor },
                isSelected && styles.selectedContainer,
            ]}
            onPress={handlePress}
            activeOpacity={0.8}
        >
            <View style={styles.iconContainer}>
                {/* <FontAwesome5 name={room.icon} size={24} color="#FFFFFF" /> */}
            </View>

            <Text style={styles.roomName}>{room.name}</Text>

            <View style={styles.deviceCount}>
                {/* <FontAwesome5 name="circle" size={8} color="#FFFFFF" /> */}
                <Text style={styles.deviceCountText}>
                    {activeDevices} active
                </Text>
            </View>

            {isSelected && (
                <View style={styles.selectedIndicator}>
                    {/* <FontAwesome5 name="check-circle" size={16} color="#FFFFFF" /> */}
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 140,
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 8,
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    selectedContainer: {
        transform: [{ scale: 1.05 }],
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 8,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: 8,
    },
    roomName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 8,
    },
    deviceCount: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    deviceCountText: {
        fontSize: 12,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    selectedIndicator: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
});

export default RoomCard; 