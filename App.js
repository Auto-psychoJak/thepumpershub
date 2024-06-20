import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar, Menu, Provider } from 'react-native-paper';
import { View, ScrollView } from 'react-native';
import Home from './Home';
import Profile from './Profile';
import Login from './Login';
import SignUp from './SignUp';
import MonthView from './components/MonthView';
import { AuthProvider } from './AuthContext';
import commonStyles from './styles/common';

const Stack = createStackNavigator();

function App() {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const navigationRef = React.useRef();

  const handleProfile = () => {
    setMenuVisible(false);
    navigationRef.current?.navigate('Profile');
  };

  const handleMonth = () => {
    setMenuVisible(false);
    navigationRef.current?.navigate('Month');
  };

  const handleHome = () => {
    setMenuVisible(false);
    navigationRef.current?.navigate('Home');
  };

  const handleLogout = () => {
    setMenuVisible(false);
    navigationRef.current?.navigate('Login');
  };

  return (
    <AuthProvider>
      <Provider>
        <View style={commonStyles.container}>
        <NavigationContainer ref={navigationRef}>
          <Appbar.Header>
            <Appbar.Content title="Pumpers Hub" />
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Appbar.Action icon="menu" color="white" onPress={() => setMenuVisible(true)} />
              }
            >
              <Menu.Item onPress={handleHome} title="Home" />
              <Menu.Item onPress={handleProfile} title="Profile" />
              <Menu.Item onPress={handleMonth} title="Month" />
              <Menu.Item onPress={handleLogout} title="Logout" />
            </Menu>
          </Appbar.Header>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Month" component={MonthView} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        </NavigationContainer>
        </View>
      </Provider>
    </AuthProvider>
  );
}

export default App;
