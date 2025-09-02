import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import Ionicons from '@react-native-vector-icons/ionicons';

import HomeScreen from '../screens/HomeScreen';
import StartScreen from '../screens/StartScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PasswordScreen from '../screens/PasswordScreen';
import NameScreen from '../screens/NameScreen';
import SelectImage from '../screens/SelectImage';
import PreFinalScreen from '../screens/PreFinalScreen';
import ChecklistScreen from '../screens/ChecklistScreen';
import VenueListScreen from '../screens/VenueListScreen';
import BudgetScreen from '../screens/BudgetScreen';
import GuestListScreen from '../screens/GuestListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoadingScreen from '../screens/LoadingScreen';

import {AuthContext} from '../AuthContext';

const StackNavigator = () => {
  console.log('Stack Navigator Rendered');

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const {token, isLoading} = useContext(AuthContext);

  if (isLoading) {
    return <LoadingScreen />;
  }

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarActiveTintColor: '#C5A653',
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons name="home" size={24} color="#C5A653" />
              ) : (
                <Ionicons name="home-outline" size={24} color="#989898" />
              ),
          }}
        />
        <Tab.Screen
          name="Checklist"
          component={ChecklistScreen}
          options={{
            headerShown: false,
            tabBarActiveTintColor: '#C5A653',
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons name="checkbox" size={24} color="#C5A653" />
              ) : (
                <Ionicons name="checkbox-outline" size={24} color="#989898" />
              ),
          }}
        />
        <Tab.Screen
          name="Venues"
          component={VenueListScreen}
          options={{
            headerShown: false,
            tabBarActiveTintColor: '#C5A653',
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons name="business" size={24} color="#C5A653" />
              ) : (
                <Ionicons name="business-outline" size={24} color="#989898" />
              ),
          }}
        />
        <Tab.Screen
          name="Budget"
          component={BudgetScreen}
          options={{
            headerShown: false,
            tabBarActiveTintColor: '#C5A653',
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons name="calculator" size={24} color="#C5A653" />
              ) : (
                <Ionicons name="calculator-outline" size={24} color="#989898" />
              ),
          }}
        />
        <Tab.Screen
          name="Guests"
          component={GuestListScreen}
          options={{
            headerShown: false,
            tabBarActiveTintColor: '#C5A653',
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons name="people" size={24} color="#C5A653" />
              ) : (
                <Ionicons name="people-outline" size={24} color="#989898" />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarActiveTintColor: '#C5A653',
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons name="person" size={24} color="#C5A653" />
              ) : (
                <Ionicons name="person-outline" size={24} color="#989898" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  const AuthStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Password"
          component={PasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Name"
          component={NameScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Image"
          component={SelectImage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PreFinal"
          component={PreFinalScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };

  function MainStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {token === null || token === '' ? <AuthStack /> : <MainStack />}
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});