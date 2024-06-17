import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import CreateProfile from './CreateProfile';
import EditProfile from './EditProfile';
import Finance from './Finance';
import MonthView from './MonthView';
import { AuthProvider } from './AuthContext';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Finance" component={Finance} />
      <Stack.Screen name="MonthView" component={MonthView} />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={AppNavigator} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="CreateProfile" component={CreateProfile} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
      <Drawer.Screen name="Finance" component={Finance} />
      <Drawer.Screen name="MonthView" component={MonthView} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <DrawerNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
