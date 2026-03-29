import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';
import { COLORS } from '../data/products';

export default function ProductCard({ item, onPress, onAddToCart }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleAddPress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.85, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1.1, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    onAddToCart && onAddToCart(item);
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: item.bg ? item.bg[0] : COLORS.gray50 },
      ]}
      onPress={() => onPress && onPress(item)}
      activeOpacity={0.85}
    >
      <View style={styles.imageWrap}>
        <Image source={item.image} style={styles.productImage} resizeMode="contain" />
      </View>
      <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.meta}>{item.meta}, Price</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity style={styles.addBtn} onPress={handleAddPress} activeOpacity={0.8}>
            <Text style={styles.addBtnText}>＋</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 4,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  imageWrap: {
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderRadius: 10,
  },
productImage: {
  width: '100%',
  height: '100%',
},
  name: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.gray900,
    marginBottom: 2,
  },
  meta: {
    fontSize: 10,
    color: COLORS.gray400,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.gray900,
  },
  addBtn: {
    width: 28,
    height: 28,
    backgroundColor: COLORS.green,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.green,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
});