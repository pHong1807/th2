import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../data/products';

export function CartScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.emoji}>🛒</Text>
      <Text style={styles.text}>Your cart is empty</Text>
      <Text style={styles.sub}>Add items to get started</Text>
    </View>
  );
}

export function FavouriteScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.emoji}>❤️</Text>
      <Text style={styles.text}>No favourites yet</Text>
      <Text style={styles.sub}>Items you love will appear here</Text>
    </View>
  );
}

export function AccountScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.emoji}>👤</Text>
      <Text style={styles.text}>My Account</Text>
      <Text style={styles.sub}>Sign in to access your profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    gap: 6,
  },
  emoji: { fontSize: 48, marginBottom: 8 },
  text: { fontSize: 16, fontWeight: '700', color: COLORS.gray900 },
  sub: { fontSize: 13, color: COLORS.gray400 },
});