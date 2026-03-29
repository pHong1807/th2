import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CATEGORIES } from '../data/products';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 48) / 2;

export default function ExploreScreen({ navigation }) {
  const handleCategory = (cat) => {
    if (cat.screen) {
      navigation.navigate(cat.screen);
    }
  };

  const renderCategory = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.catCard,
        {
          backgroundColor: item.bg,
          borderColor: item.border,
          marginRight: index % 2 === 0 ? 6 : 0,
          marginLeft: index % 2 === 0 ? 0 : 6,
        },
      ]}
      onPress={() => handleCategory(item)}
      activeOpacity={0.82}
    >
      <Image source={item.image} style={styles.catImage} resizeMode="contain" />
      <Text style={styles.catName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Title */}
      <Text style={styles.title}>Find Products</Text>

      {/* Search */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={16} color={COLORS.gray400} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Store"
          placeholderTextColor={COLORS.gray400}
        />
      </View>

      {/* Grid */}
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderCategory}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },

  title: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.gray900,
    textAlign: 'center',
    paddingTop: 12,
    paddingBottom: 6,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray100,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 13, color: COLORS.gray800 },

  grid: { paddingHorizontal: 16, paddingBottom: 20 },

  catCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    minHeight: CARD_SIZE * 0.75,
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  catImage: {
  width: 80,
  height: 80,
  marginBottom: 8,
  alignSelf: 'flex-end',
  },
  catName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.gray900,
    lineHeight: 18,
  },
});