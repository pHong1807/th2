import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import { COLORS, PRODUCTS } from '../data/products';
import { IMAGES } from '../data/images';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const exclusiveOffers = PRODUCTS.slice(0, 2);
  const bestSelling = PRODUCTS.slice(2, 4);
  const groceries = PRODUCTS.slice(4, 6);
  const handleProductPress = (item) => {
    navigation.navigate('ProductDetail', { product: item });
  };

  const categoryChips = [
    { id: '1', name: 'Pulses', image: IMAGES.categories.pulses, bg: '#FFFDE7' },
    { id: '2', name: 'Rice', image: IMAGES.categories.rice, bg: '#FFF3E0' },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
            <Image source={IMAGES.appIcon} style={styles.appIcon} />
          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={14} color={COLORS.green} />
            <Text style={styles.locationText}>Dhaka, Banassre</Text>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={16} color={COLORS.gray400} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Store"
            placeholderTextColor={COLORS.gray400}
          />
        </View>

        {/* Banner */}
        <View style={styles.banner}>
        <Image source={IMAGES.bannerVeggie} style={styles.bannerEmoji} />
          <View style={styles.bannerTextWrap}>
            <Text style={styles.bannerTitle}>{'Fresh Vegetables'}</Text>
            <Text style={styles.bannerSub}>Get Up To 40% OFF</Text>
          </View>
        </View>
        <View style={styles.bannerDots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Exclusive Offer */}
        <SectionHeader title="Exclusive Offer" />
        <View style={styles.productsRow}>
          {exclusiveOffers.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onPress={handleProductPress}
            />
          ))}
        </View>

        {/* Best Selling */}
        <SectionHeader title="Best Selling" />
        <View style={styles.productsRow}>
          {bestSelling.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onPress={handleProductPress}
            />
          ))}
        </View>

        {/* Groceries */}
        <SectionHeader title="Groceries" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipScroll}
          contentContainerStyle={styles.chipContent}
        >
            {categoryChips.map((chip) => (
  <TouchableOpacity
    key={chip.id}
    style={[styles.chip, { backgroundColor: chip.bg }]}
    activeOpacity={0.8}
  >
    <Image source={chip.image} style={styles.chipImage} />
    <Text style={styles.chipName}>{chip.name}</Text>
  </TouchableOpacity>
))}
        </ScrollView>

        <View style={[styles.productsRow, { marginBottom: 8 }]}>
          {groceries.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onPress={handleProductPress}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionHeader({ title }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity>
        <Text style={styles.seeAll}>See all</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },
  scroll: { flex: 1 },

  header: { alignItems: 'center', paddingTop: 8, paddingBottom: 4 },
  appIcon: { width: 30, height: 36, marginBottom: 2},
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationText: { fontSize: 13, fontWeight: '700', color: COLORS.gray800 },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray100,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: COLORS.gray800,
  },

  banner: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 18,
    backgroundColor: '#C8E6C9',
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  bannerTextWrap: { flex: 1 },
  badge: {
    backgroundColor: COLORS.orange,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  badgeText: { color: '#fff', fontSize: 9, fontWeight: '700', letterSpacing: 0.5 },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.green,
    lineHeight: 26,
  },
  bannerSub: { fontSize: 11, color: COLORS.green, opacity: 0.8, marginTop: 2 },
  bannerEmoji: { width: 90, height: 90, resizeMode: 'contain' },

  bannerDots: { flexDirection: 'row', justifyContent: 'center', gap: 4, marginBottom: 4 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.greenMid },
  dotActive: { width: 14, borderRadius: 3, backgroundColor: COLORS.green },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: COLORS.gray900 },
  seeAll: { fontSize: 12, fontWeight: '600', color: COLORS.green },

  productsRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    gap: 0,
    marginBottom: 4,
  },

  chipScroll: { marginBottom: 10 },
  chipContent: { paddingHorizontal: 16, gap: 10 },
  chip: {
  borderRadius: 16,
  paddingHorizontal: 16,
  paddingVertical: 12,
  flexDirection: 'row',      
  alignItems: 'center',
  minWidth: 120,            
  borderWidth: 1.5,
  borderColor: 'rgba(0,0,0,0.06)',
  gap: 10,
},
chipImage: {
  width: 50,                
  height: 50,
  resizeMode: 'contain',
},
chipName: { 
  fontSize: 13,              
  fontWeight: '600', 
  color: COLORS.gray800 
},
  chipName: { fontSize: 10, fontWeight: '600', color: COLORS.gray800, marginTop: 4 },
});