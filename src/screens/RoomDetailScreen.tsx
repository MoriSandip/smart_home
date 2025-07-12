import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
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
    const totalDevices = roomDevices.length;

    // Map room icons to emojis
    const getRoomEmoji = (iconName: string) => {
        const emojiMap: { [key: string]: string } = {
            'sofa': '🛋️',
            'bed': '🛏️',
            'utensils': '🍽️',
            'bath': '🛁',
            'laptop': '💻',
            'car': '🚗',
            'home': '🏠',
        };
        return emojiMap[iconName] || '🏠';
    };

    if (!selectedRoom) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
                <View style={styles.emptyState}>
                    <View style={styles.emptyIconContainer}>
                        <Text style={styles.emptyEmoji}>🏠</Text>
                    </View>
                    <Text style={styles.emptyStateTitle}>No Room Selected</Text>
                    <Text style={styles.emptyStateText}>
                        Go back to the dashboard and select a room to view its devices
                    </Text>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonEmoji}>←</Text>
                        <Text style={styles.backButtonText}>Back to Dashboard</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    const renderDeviceCard = ({ item }: { item: any }) => (
        <DeviceCard device={item} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonEmoji}>←</Text>
                </TouchableOpacity>

                <View style={styles.headerInfo}>
                    <View style={styles.roomInfo}>
                        <View style={[styles.roomIcon, { backgroundColor: selectedRoom.backgroundColor }]}>
                            <Text style={styles.roomEmoji}>{getRoomEmoji(selectedRoom.icon)}</Text>
                        </View>
                        <View style={styles.roomText}>
                            <Text style={styles.roomName}>{selectedRoom.name}</Text>
                            <Text style={styles.deviceCount}>
                                {activeDevices} of {totalDevices} devices active
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionEmoji}>⚙️</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                    <View
                        style={[
                            styles.progressFill,
                            {
                                width: `${totalDevices > 0 ? (activeDevices / totalDevices) * 100 : 0}%`,
                                backgroundColor: selectedRoom.backgroundColor
                            }
                        ]}
                    />
                </View>
                <Text style={styles.progressText}>
                    {Math.round((activeDevices / totalDevices) * 100)}% active
                </Text>
            </View>

            {/* Devices Grid */}
            <FlatList
                data={roomDevices}
                renderItem={renderDeviceCard}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.devicesGrid}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <View style={styles.emptyIconContainer}>
                            <Text style={styles.emptyEmoji}>💡</Text>
                        </View>
                        <Text style={styles.emptyStateTitle}>No Devices Found</Text>
                        <Text style={styles.emptyStateText}>
                            This room doesn't have any smart devices configured yet
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f3f4',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    backButton: {
        padding: 8,
        marginRight: 12,
    },
    backButtonEmoji: {
        fontSize: 20,
        color: '#007AFF',
    },
    headerInfo: {
        flex: 1,
    },
    roomInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    roomIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    roomEmoji: {
        fontSize: 24,
    },
    roomText: {
        flex: 1,
    },
    roomName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1a1a2e',
        marginBottom: 2,
    },
    deviceCount: {
        fontSize: 14,
        color: '#6c757d',
        fontWeight: '500',
    },
    headerActions: {
        flexDirection: 'row',
        gap: 8,
    },
    actionButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionEmoji: {
        fontSize: 18,
    },
    progressContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f3f4',
    },
    progressBar: {
        height: 6,
        backgroundColor: '#e9ecef',
        borderRadius: 3,
        marginBottom: 8,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 3,
    },
    progressText: {
        fontSize: 12,
        color: '#6c757d',
        fontWeight: '600',
        textAlign: 'center',
    },
    devicesGrid: {
        padding: 8,
        flexGrow: 1,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingVertical: 40,
    },
    emptyIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    emptyEmoji: {
        fontSize: 48,
    },
    emptyStateTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1a1a2e',
        textAlign: 'center',
        marginBottom: 8,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#6c757d',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 24,
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        marginLeft: 8,
    },
});

export default RoomDetailScreen; 