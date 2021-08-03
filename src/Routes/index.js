/* eslint-disable prettier/prettier */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeBaseProvider} from 'native-base';

import ToDoScreen from '../Screens/ToDoScreen';
import PostScreen from '../Screens/PostScreen';
import GeolocationScreen from '../Screens/GeolocationScreen';
import WeeklyForecast from '../Screens/Forecast/WeeklyForecast';

const ACTIVE_TAB_COLOR = 'teal';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTab = props => {
  return (
    <Tab.Navigator
      initialRouteName="ToDo"
      backBehavior="initialRoute"
      screenOptions={{
        labelStyle: {fontSize: 14},
        activeTintColor: '#0f4c75',
        safeAreaInsets: {bottom: 10},
      }}>
      <Tab.Screen
        name="ToDoScreen"
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarLabel: 'ToDo',
          tabBarIcon: ({color, size}) => (
            <Icon name="format-list-checks" color={color} size={size} />
          ),
        }}>
        {props2 => <ToDoScreen {...props2} data={props.data} />}
      </Tab.Screen>
      <Tab.Screen
        name="PostScreen"
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarLabel: 'Post',
          tabBarIcon: ({color, size}) => (
            <Icon name="post" color={color} size={size} />
          ),
        }}>
        {props2 => <PostScreen {...props2} data={props.data} />}
      </Tab.Screen>
      <Tab.Screen
        name="GeolocationScreen"
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarLabel: 'Forecast',
          tabBarIcon: ({color, size}) => (
            <Icon name="weather-partly-snowy-rainy" color={color} size={size} />
          ),
        }}>
        {props2 => <GeolocationScreen {...props2} data={props.data} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const Route = () => {
  return (
    <>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name={'BottomTab'}>
              {props => <BottomTab {...props} />}
            </Stack.Screen>
            <Stack.Screen
              options={{
                headerBackTitleVisible: false,
                headerTitle: 'Weekly Forecast',
                headerTintColor: ACTIVE_TAB_COLOR,
              }}
              name={'DailyForecast'}>
              {props => <WeeklyForecast {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </>
  );
};

export default Route;
