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
import HeaderNav from "../../components/HeaderNav";

const OFFERS = [
  "https://picsum.photos/400/160?1",
  "https://picsum.photos/400/160?2",
  "https://picsum.photos/400/160?3",
];

const TRENDING = [
  { id: "t1", name: "Apple", price: 120, image: "https://picsum.photos/120?1" },
  { id: "t2", name: "T‑Shirt", price: 599, image: "https://picsum.photos/120?2" },
  { id: "t3", name: "Shoes", price: 2499, image: "https://picsum.photos/120?3" },
];

const RANDOM_ITEMS = [
  { id: "r1", name: "Milk", price: 60, image: "https://picsum.photos/120?4" },
  { id: "r2", name: "Kurti", price: 899, image: "https://picsum.photos/120?5" },
  { id: "r3", name: "Hotel Deal", price: 1999, image: "https://picsum.photos/120?6" },
];

export default function Home() {
  const router = useRouter();

  const goExploreMore = () => router.push("/(tabs)/explore-more");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <HeaderNav />

      {/* Address */}
      <Pressable style={styles.addressBox}>
        <Text style={styles.addressTitle}>Deliver to</Text>
        <Text style={styles.addressText}>DIPTI BHOWMIK, 711204</Text>
      </Pressable>

      {/* Search */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search for products & services"
          style={styles.searchInput}
        />
      </View>

      {/* Offers Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      >
        {OFFERS.map((img, i) => (
          <Image key={i} source={{ uri: img }} style={styles.banner} />
        ))}
      </ScrollView>

      {/* Trending */}
      <Section title="Trending for You">
        <FlatList
          data={TRENDING}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <Pressable style={styles.trendingCard}>
              <Image source={{ uri: item.image }} style={styles.trendingImg} />
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
            </Pressable>
          )}
        />
      </Section>

      {/* Today's Top Deals */}
      <Section title="Today's Top Deals">
        <FlatList
          data={TRENDING}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.dealCard}>
              <Image source={{ uri: item.image }} style={styles.dealImg} />
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
            </View>
          )}
        />
      </Section>

      {/* Explore More (FULL SECTION CLICKABLE) */}
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
    </ScrollView>
  );
}

/* ---------- Reusable Section Wrapper ---------- */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },

  addressBox: {
    padding: 14,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  addressTitle: { fontSize: 12, color: "#6b7280" },
  addressText: { fontSize: 14, fontWeight: "800" },

  searchBox: { padding: 14 },
  searchInput: {
    backgroundColor: "#e5e7eb",
    borderRadius: 14,
    padding: 12,
  },

  carousel: { paddingHorizontal: 14 },
  banner: {
    width: 320,
    height: 150,
    borderRadius: 16,
    marginRight: 12,
  },

  section: { paddingHorizontal: 14, marginTop: 18 },
  sectionTitle: { fontSize: 18, fontWeight: "900", marginBottom: 10 },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  viewAll: { color: "#2563eb", fontWeight: "900" },

  trendingCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 10,
    marginRight: 12,
    width: 120,
  },
  trendingImg: { width: 100, height: 100, borderRadius: 12 },

  dealCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginRight: 12,
    width: 140,
  },
  dealImg: { width: "100%", height: 90, borderRadius: 12 },

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
