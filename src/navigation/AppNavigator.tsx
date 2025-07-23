import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/Dashboard';
import RoomDetailScreen from '../screens/RoomDetail';

export type RootStackParamList = {
    Dashboard: undefined;
    RoomDetail: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Dashboard"
                screenOptions={{
                    headerShown: false,
                }}
            >
                
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                <Stack.Screen name="RoomDetail" component={RoomDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator; 