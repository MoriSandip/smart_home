import React from 'react';
import {
    SafeAreaView,
    FlatList,
    StatusBar,
} from 'react-native';
import { useAppSelector } from '../../store/hooks';
import DeviceCard from '../../components/DeviceCard';
import { styles } from './RoomDetail.styles';
import { RoomDetailHeader, ProgressBar, EmptyState } from './components';

const RoomDetailScreen: React.FC = () => {
    const { rooms, devices, selectedRoomId } = useAppSelector(
        (state) => state.smartHome
    );

    const selectedRoom = rooms.find(room => room.id === selectedRoomId);
    const roomDevices = devices.filter(device =>
        selectedRoom?.deviceIds.includes(device.id)
    );

    const activeDevices = roomDevices.filter(device => device.isOn).length;
    const totalDevices = roomDevices.length;

    const renderDeviceCard = ({ item }: { item: any }) => (
        <DeviceCard device={item} />
    );

    if (!selectedRoom) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
                <EmptyState type="no-room" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            {/* Header */}
            <RoomDetailHeader
                room={selectedRoom}
                activeDevices={activeDevices}
                totalDevices={totalDevices}
            />

            {/* Progress Bar */}
            <ProgressBar
                activeDevices={activeDevices}
                totalDevices={totalDevices}
                backgroundColor={selectedRoom.backgroundColor}
            />

            {/* Devices Grid */}
            <FlatList
                data={roomDevices}
                renderItem={renderDeviceCard}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.devicesGrid}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<EmptyState type="no-devices" />}
            />
        </SafeAreaView>
    );
};

export default RoomDetailScreen; 