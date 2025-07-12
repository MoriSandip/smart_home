import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
// import { FontAwesome5 } from '@expo/vector-icons';
import { useAppSelector } from '../store/hooks';
import DeviceCard from '../components/DeviceCard';
import { useNavigation } from '@react-navigation/native';

const RoomDetailScreen: React.FC = () => {
    const navigation = useNavigation();
    const { rooms, devices, selectedRoomId } = useAppSelector(
        (state) => state.smartHome
    );

    const selectedRoom = rooms.find(room => room.id === selectedRoomId);
    const roomDevices = devices.filter(device =>
        selectedRoom?.deviceIds.includes(device.id)
    );

    const activeDevices = roomDevices.filter(device => device.isOn).length;

    if (!selectedRoom) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.emptyState}>
                    {/* <FontAwesome5 name="home" size={48} color="#8E8E93" /> */}
                    <Text style={styles.emptyStateText}>Select a room to view devices</Text>
                </View>
            </SafeAreaView>
        );
    }

    const renderDeviceCard = ({ item }: { item: any }) => (
        <DeviceCard device={item} />
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    {/* <FontAwesome5 name="arrow-left" size={20} color="#007AFF" /> */}
                </TouchableOpacity>

                <View style={styles.headerInfo}>
                    <Text style={styles.roomName}>{selectedRoom.name}</Text>
                    <Text style={styles.deviceCount}>
                        {activeDevices} of {roomDevices.length} devices active
                    </Text>
                </View>

                <View style={styles.headerIcon}>
                    {/* <FontAwesome5 name={selectedRoom.icon} size={24} color="#007AFF" /> */}
                </View>
            </View>

            {/* Devices Grid */}
            <FlatList
                data={roomDevices}
                renderItem={renderDeviceCard}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.devicesGrid}
                showsVerticalScrollIndicator={false}
            />

            {/* Empty State */}
            {roomDevices.length === 0 && (
                <View style={styles.emptyState}>
                    {/* <FontAwesome5 name="lightbulb" size={48} color="#8E8E93" /> */}
                    <Text style={styles.emptyStateText}>No devices in this room</Text>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
    backButton: {
        padding: 8,
    },
    headerInfo: {
        flex: 1,
        marginLeft: 12,
    },
    roomName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1C1C1E',
    },
    deviceCount: {
        fontSize: 14,
        color: '#8E8E93',
        marginTop: 2,
    },
    headerIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F2F2F7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    devicesGrid: {
        padding: 8,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#8E8E93',
        textAlign: 'center',
        marginTop: 16,
    },
});

export default RoomDetailScreen; 