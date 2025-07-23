import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from './src/redux/store';
import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';

const Main = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    return (
        <NavigationContainer>
            {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};

const App = () => (
    <Provider store={store}>
        <Main />
    </Provider>
);

export default App; 