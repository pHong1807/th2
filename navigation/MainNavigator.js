import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Image } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import BeveragesScreen from '../screens/BeveragesScreen';
import { CartScreen, FavouriteScreen, AccountScreen } from '../screens/PlaceholderScreens';
import { IMAGES } from '../data/images';

const COLORS = { green: '#2E7D32', gray400: '#BDBDBD', gray200: '#EEEEEE', white: '#FFFFFF' };
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

function ExploreStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExploreMain" component={ExploreScreen} />
      <Stack.Screen name="Beverages" component={BeveragesScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

export default function MainNavigator() {
  const insets = useSafeAreaInsets(); 

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#EEEEEE',
          height: 60 + insets.bottom,     
          paddingBottom: insets.bottom,  
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: '#BDBDBD',
      }}
    >
      <Tab.Screen name="Shop" component={HomeStack}
        options={{ tabBarIcon: ({ focused, color }) => <Image source={IMAGES.icons.shop} style={{ width: 24, height: 24, tintColor: color }} resizeMode="contain"  /> }} />
      <Tab.Screen name="Explore" component={ExploreStack}
        options={{ tabBarIcon: ({ focused, color }) =>  <Image source={IMAGES.icons.explore} style={{ width: 24, height: 24, tintColor: color }} resizeMode="contain"  /> }} />
      <Tab.Screen name="Cart" component={CartScreen}
        options={{ tabBarIcon: ({ focused, color }) =>  <Image source={IMAGES.icons.cart} style={{ width: 24, height: 24, tintColor: color }} resizeMode="contain"  /> }} />
      <Tab.Screen name="Favourite" component={FavouriteScreen}
        options={{ tabBarIcon: ({ focused, color }) =>  <Image source={IMAGES.icons.favourite} style={{ width: 24, height: 24, tintColor: color }} /> }} />
      <Tab.Screen name="Account" component={AccountScreen}s
        options={{ tabBarIcon: ({ focused, color }) =>  <Image source={IMAGES.icons.account} style={{ width: 24, height: 24, tintColor: color }} /> }} />
    </Tab.Navigator>
  );
}
