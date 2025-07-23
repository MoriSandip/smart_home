import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/app/HomeScreen';
import CartScreen from '../screens/app/CartScreen';
import SettingScreen from '../screens/app/SettingScreen';
import NotificationScreen from '../screens/app/NotificationScreen';
import FilterScreen from '../screens/app/FilterScreen';

export type AppTabParamList = {
    Home: undefined;
    Cart: undefined;
    Setting: undefined;
    Notification: undefined;
    Filter: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

const AppNavigator = () => (
    <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Setting" component={SettingScreen} />
        <Tab.Screen name="Notification" component={NotificationScreen} />
        <Tab.Screen name="Filter" component={FilterScreen} />
    </Tab.Navigator>
);

export default AppNavigator; 