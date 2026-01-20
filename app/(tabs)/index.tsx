
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import HeaderNav from "../../components/HeaderNav";
import { OFFERS } from "../data/offersData";
import { TRENDING } from "../data/trendingData";
import { RANDOM_ITEMS } from "../data/randomItemsData";

export default function Home() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const goExploreMore = () => router.push("./(tabs)/explore-more");
  const goTrending = () => router.push("./(tabs)/trending");
  const goTopDeals = () => router.push("./(tabs)/top-deals");

  const goGlobalSearch = () =>
    router.push({
      pathname: "./(tabs)/search",
      params: { q: searchText },
    });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HeaderNav />

      {/* 🔵 ADDRESS + SEARCH (AMAZON STYLE BLOCK) */}
      <View style={styles.topBlock}>
        {/* Address */}
        {/* Address (THINNER & NOT BOLD) */}
        <Pressable style={styles.addressWrap}>
          <Text style={styles.addressLabel}>Deliver to</Text>
          <Text style={styles.addressText}>
            DIPTI BHOWMIK, 711204
          </Text>
        </Pressable>

        {/* Search (WIDER + ICON) */}
        <View style={styles.searchRow}>
          <View style={styles.searchInputWrap}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search any product"
              style={styles.searchInput}
              returnKeyType="search"
              onSubmitEditing={goGlobalSearch}
            />
          </View>

          <Pressable onPress={goGlobalSearch} style={styles.searchBtn}>
            <Text style={styles.searchBtnText}>Search</Text>
          </Pressable>
        </View>
      </View>

      {/* OFFERS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      >
        {OFFERS.map((img, i) => (
          <Image key={i} source={{ uri: img }} style={styles.banner} />
        ))}
      </ScrollView>

      {/* TRENDING */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending for You</Text>
          <Pressable onPress={goTrending}>
            <Text style={styles.viewAll}>View All</Text>
          </Pressable>
        </View>

        <FlatList
          data={TRENDING}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingRight: 12 }}
          renderItem={({ item }) => (
            <Pressable style={styles.trendingCard} onPress={goTrending}>
              <Image source={{ uri: item.image }} style={styles.trendingImg} />
              <Text style={styles.itemName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
            </Pressable>
          )}
        />
      </View>

      {/* TOP DEALS */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Deals</Text>
          <Pressable onPress={goTopDeals}>
            <Text style={styles.viewAll}>View All</Text>
          </Pressable>
        </View>

        <FlatList
          data={TRENDING}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingRight: 12 }}
          renderItem={({ item }) => (
            <Pressable style={styles.trendingCard} onPress={goTopDeals}>
              <Image source={{ uri: item.image }} style={styles.trendingImg} />
              <Text style={styles.itemName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
            </Pressable>
          )}
        />
      </View>

      {/* EXPLORE MORE */}
      <Pressable onPress={goExploreMore} style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore More</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>

        {RANDOM_ITEMS.map((item) => (
          <View key={item.id} style={styles.listItem}>
            <Image source={{ uri: item.image }} style={styles.listImg} />
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
            </View>
          </View>
        ))}
      </Pressable>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },

  /* 🔵 TOP BLOCK */
  topBlock: {
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },

  addressWrap: {
    backgroundColor: "#eef2f7",
    paddingVertical: 8,        // 👈 thinner
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,           // 👈 less gap
  },

  addressLabel: {
    fontSize: 11,
    color: "#6b7280",
    fontWeight: "500",         // 👈 not bold
  },

  addressText: {
    fontSize: 14,
    fontWeight: "600",         // 👈 lighter than before
    color: "#111827",
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  searchInputWrap: {
    flex: 1,                   // 👈 makes search bar wider
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e5e7eb",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 46,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 6,
    color: "#6b7280",
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },

  searchBtn: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
  },

  searchBtnText: {
    color: "#fff",
    fontWeight: "900",
  },


  carousel: { paddingHorizontal: 14, marginTop: 14 },
  banner: {
    width: 320,
    height: 150,
    borderRadius: 16,
    marginRight: 12,
  },

  section: { paddingHorizontal: 14, marginTop: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: "900" },
  viewAll: { color: "#2563eb", fontWeight: "900" },

  trendingCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 10,
    marginRight: 12,
    width: 120,
  },
  trendingImg: { width: 100, height: 100, borderRadius: 12 },

  listItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
  },
  listImg: { width: 70, height: 70, borderRadius: 12, marginRight: 12 },

  itemName: { fontWeight: "700" },
  itemPrice: { fontWeight: "900", marginTop: 4 },
});