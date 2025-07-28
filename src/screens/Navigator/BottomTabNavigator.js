import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'; // FontAwesome আইকন
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ionicons আইকন
import HomeScreen from '../HomeScreen';
import ProfileScreen from '../ProfileScreen';
import Notification from '../Notification';
import CartList from '../CartList';
import Wishlist from './Wishlist';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
  
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // রুটের নাম অনুযায়ী আইকন সেট করুন
          if (route.name === 'Home') {
            iconName = 'home';
            return <Icon name={iconName} size={size} color={color} />;
          } else if (route.name === 'About') {
            iconName = focused ? 'shopping-cart' : 'shopping-cart'; 
            return <Icon name={iconName} size={size} color={color} />;
          } else if (route.name === 'Project') {
            iconName = focused ? 'heart' : 'heart-o';
            return <Icon name={iconName} size={size} color={color} />;
          } else if (route.name === 'Notice') {
            iconName = focused ? 'notifications' : 'notifications-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          }

          return null;
        },
        tabBarActiveTintColor: '#FFF', // একটিভ ট্যাবের রং
        tabBarInactiveTintColor: '#d2d2d4', // ইনএকটিভ ট্যাবের রং
        headerShown: false,
            tabBarStyle: {
      backgroundColor: '#0076CE', // Set background color here
    },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="About" component={CartList} />
      <Tab.Screen name="Project" component={Wishlist} />
      <Tab.Screen name="Notice" component={Notification} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
