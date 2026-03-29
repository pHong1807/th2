import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import { COLORS, BEVERAGES } from '../data/products';

export default function BeveragesScreen({ navigation }) {
  const rows = [];
  for (let i = 0; i < BEVERAGES.length; i += 2) {
    rows.push(BEVERAGES.slice(i, i + 2));
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={18} color={COLORS.gray800} />
        </TouchableOpacity>
        <Text style={styles.title}>Beverages</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options-outline" size={18} color={COLORS.green} />
        </TouchableOpacity>
      </View>

      {/* Product Grid */}
      <FlatList
        data={rows}
        keyExtractor={(_, i) => String(i)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item: row }) => (
          <View style={styles.row}>
            {row.map((bev) => (
              <ProductCard
                key={bev.id}
                item={bev}
                onPress={() =>
                  navigation.navigate('ProductDetail', { product: bev })
                }
              />
            ))}
            {row.length === 1 && <View style={{ flex: 1, marginHorizontal: 4 }} />}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backBtn: {
    width: 36, height: 36,
    backgroundColor: COLORS.gray100,
    borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  title: { fontSize: 18, fontWeight: '800', color: COLORS.gray900 },
  filterBtn: {
    width: 36, height: 36,
    backgroundColor: COLORS.greenPale,
    borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },

  listContent: { paddingHorizontal: 12, paddingTop: 4, paddingBottom: 20 },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});