import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import HomePage from './screens/HomePage';
import RestrictedPage from './screens/RestrictedPage';
import ScanPage from './screens/ScanPage';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
    return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Home'>
				<Stack.Screen name="Home" component={HomePage} />
				<Stack.Screen name="Restric" component={RestrictedPage} />
				<Stack.Screen name="Scan" component={ScanPage} />
			</Stack.Navigator>
		</NavigationContainer>
    );
}