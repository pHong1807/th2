import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../data/products';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen({ navigation, route }) {
  const product = route.params?.product || {
    id: '2',
    name: 'Naturel Red Apple',
    meta: '1kg',
    price: 4.99,
    image: require('../assets/redapple.png'),
    bg: ['#FCE4EC', '#F8BBD0'],
    description:
      'Apples Are Nutritious. Apples May Be Good For Weight Loss. Apples Are Good For Your Heart. As Part Of A Healthful And Varied Diet.',
    nutrition: { calories: 52, carbs: '14g', protein: '0.3g', fat: '0.2g' },
    rating: 4.9,
    reviews: 245,
  };

  const [qty, setQty] = useState(1);
  const [isFav, setIsFav] = useState(false);
  const [detailOpen, setDetailOpen] = useState(true);

  const handleFav = () => setIsFav(!isFav);

  const handleQty = (delta) => {
    setQty(prev => Math.max(1, prev + delta));
  };

  const totalPrice = (product.price * qty).toFixed(2);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={18} color={COLORS.gray800} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="share-outline" size={18} color={COLORS.gray800} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={[styles.heroWrap, { backgroundColor: product.bg?.[0] || '#F9FBE7' }]}>
          <Image source={product.image} style={styles.heroImage} resizeMode="contain" />
        </View>

        {/* Dots */}
        <View style={styles.dotRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Body */}
        <View style={styles.body}>
          {/* Title row */}
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productMeta}>{product.meta}, Price</Text>
            </View>
            <TouchableOpacity onPress={handleFav} style={styles.favBtn}>
              <Ionicons
                name={isFav ? 'heart' : 'heart-outline'}
                size={20}
                color={isFav ? '#E91E63' : COLORS.gray400}
              />
            </TouchableOpacity>
          </View>

          {/* Qty & Price */}
          <View style={styles.qtyRow}>
            <View style={styles.qtyControls}>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => handleQty(-1)}>
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyNum}>{qty}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => handleQty(1)}>
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.totalPrice}>${totalPrice}</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Product Detail Accordion */}
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => setDetailOpen(!detailOpen)}
            activeOpacity={0.8}
          >
            <Text style={styles.accordionTitle}>Product Detail</Text>
            <Ionicons
              name={detailOpen ? 'chevron-up' : 'chevron-down'}
              size={16}
              color={COLORS.gray400}
            />
          </TouchableOpacity>
          {detailOpen && (
            <Text style={styles.accordionBody}>{product.description}</Text>
          )}

          {/* Nutritions */}
          <View style={styles.divider} />
          <TouchableOpacity style={styles.linkRow} activeOpacity={0.8}>
            <View style={styles.linkLeft}>
              <Text style={styles.accordionTitle}>Nutritions</Text>
              <View style={styles.nutrBadge}>
                <Text style={styles.nutrBadgeText}>100g</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={16} color={COLORS.gray400} />
          </TouchableOpacity>

          {/* Reviews */}
          <View style={styles.divider} />
          <TouchableOpacity style={styles.linkRow} activeOpacity={0.8}>
            <Text style={styles.accordionTitle}>Review</Text>
            <View style={styles.linkRight}>
              <View style={styles.starRow}>
                {[...Array(5)].map((_, i) => (
                  <Text key={i} style={styles.star}>★</Text>
                ))}
              </View>
              <Ionicons name="chevron-forward" size={16} color={COLORS.gray400} />
            </View>
          </TouchableOpacity>
          <View style={styles.divider} />
        </View>
      </ScrollView>

      {/* Add To Basket */}
      <View style={styles.bottomArea}>
        <TouchableOpacity style={styles.addBtn} activeOpacity={0.85}>
          <Text style={styles.addBtnText}>🛒  Add To Basket</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  iconBtn: {
    width: 36,
    height: 36,
    backgroundColor: COLORS.gray100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroWrap: {
    marginHorizontal: 16,
    borderRadius: 20,
    minHeight: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: {
    width: 160,
    height: 160,
  },

  dotRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    marginTop: 12,
    marginBottom: 4,
  },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.gray200 },
  dotActive: { backgroundColor: COLORS.green },

  body: { paddingHorizontal: 16, paddingTop: 14 },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  productName: { fontSize: 20, fontWeight: '800', color: COLORS.gray900, lineHeight: 24 },
  productMeta: { fontSize: 12, color: COLORS.gray400, marginTop: 3 },

  favBtn: {
    width: 36, height: 36,
    borderWidth: 1.5, borderColor: COLORS.gray200,
    borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
    marginLeft: 8,
  },

  qtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  qtyControls: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  qtyBtn: {
    width: 32, height: 32,
    borderWidth: 1.5, borderColor: COLORS.gray200,
    borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
  },
  qtyBtnText: { fontSize: 18, fontWeight: '500', color: COLORS.gray600, lineHeight: 20 },
  qtyNum: { fontSize: 16, fontWeight: '800', color: COLORS.gray900, minWidth: 20, textAlign: 'center' },
  totalPrice: { fontSize: 22, fontWeight: '800', color: COLORS.gray900 },

  divider: { height: 1, backgroundColor: COLORS.gray100 },

  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
  },
  accordionTitle: { fontSize: 14, fontWeight: '700', color: COLORS.gray900 },
  accordionBody: {
    fontSize: 12, lineHeight: 19,
    color: COLORS.gray600,
    paddingBottom: 12,
  },

  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
  },
  linkLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  linkRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },

  nutrBadge: {
    backgroundColor: COLORS.greenPale,
    borderRadius: 5,
    paddingHorizontal: 6, paddingVertical: 2,
  },
  nutrBadgeText: { fontSize: 10, fontWeight: '700', color: COLORS.green },

  starRow: { flexDirection: 'row', gap: 1 },
  star: { color: '#FFC107', fontSize: 13 },

  bottomArea: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray100,
  },
  addBtn: {
    backgroundColor: COLORS.green,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: COLORS.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  addBtnText: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },
});