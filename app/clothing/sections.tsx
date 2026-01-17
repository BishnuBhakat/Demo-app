import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { useMemo, useState } from "react";
import HeaderNav from "../../components/HeaderNav";
import { clothingItems } from "../data/clothingData";
import { useCart } from "../context/CartContext";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";

const SECTIONS = ["All", "Men", "Women", "Kids", "Footwear"];

export default function ClothingSections() {
  const [selectedSection, setSelectedSection] = useState("All");
  const [search, setSearch] = useState("");
  const { addToCart } = useCart();
  const router = useRouter();

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();

    return clothingItems.filter((item) => {
      const section = String(item.section ?? "").trim().toLowerCase();
      const category = String(item.category ?? "").trim().toLowerCase();
      const name = String(item.name ?? "").trim().toLowerCase();

      const sectionMatch =
        selectedSection === "All"
          ? true
          : section === selectedSection.trim().toLowerCase();

      const searchMatch =
        q.length === 0 ? true : name.includes(q) || category.includes(q) || section.includes(q);

      return sectionMatch && searchMatch;
    });
  }, [selectedSection, search]);

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <HeaderNav />

      <Text style={styles.title}>Clothing Store </Text>

      {/* 🔍 Global Search */}
      <TextInput
        placeholder="Search clothing (name / category / section)..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabs}
      >
        {SECTIONS.map((sec) => (
          <Pressable
            key={sec}
            onPress={() => setSelectedSection(sec)}
            style={[styles.tab, selectedSection === sec && styles.activeTab]}
          >
            <Text style={[styles.tabText, selectedSection === sec && styles.activeText]}>
              {sec}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Products */}
      {filteredItems.length === 0 ? (
        <Text style={{ padding: 20 }}>No items found</Text>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.list }
          columnWrapperStyle={{ gap: 12 }}
          renderItem={({ item }) => (
  <Pressable
    style={styles.card}
    onPress={() =>
      router.push({
        pathname: "/product/[id]",
        params: { id: item.id },
      })
    }
  >
    <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.cardBody}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.meta}>
                  {item.section} • {item.category}
                </Text>
                <Text style={styles.price}>₹{item.price}</Text>
              </View>
              <View style={styles.cardBody}>
    {/* ADD button stays same */}
    <Pressable
      style={styles.addBtn}
      onPress={() => {
        addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1,
          type: "clothing",
        });

        Toast.show({
          type: "success",
          text1: "Added to Cart 🛒",
          text2: `${item.name} added successfully`,
          position: "bottom",
        });
      }}
    >
      <Text style={{ color: "#fff" }}>ADD</Text>
    </Pressable>
    </View>
  </Pressable>
)}

        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "700", padding: 12 },

  search: {
    backgroundColor: "#ffffffff",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginHorizontal: 12,
    marginBottom: 8,
    fontSize: 16,
  },

  tabs: { flexDirection: "row",
     paddingHorizontal: 16, 
      marginTop: 12,
     marginBottom: 35,
     gap: 15,
     },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 90,
    backgroundColor: "#e5e7eb",
     alignItems: "center",
     justifyContent: "center",
    minHeight: 44, 
  },
  activeTab: { backgroundColor: "#2563eb" },
  tabText: { fontWeight: "600", color: "#111", textAlign: "center", lineHeight: 20, includeFontPadding: false },
  activeText: { color: "#fff" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
     overflow: "hidden",
     marginBottom: 500,
    elevation: 2,
    flex: 1,
  },
  cardBody: {
    padding: 12,
  },
   list: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },
  image: { height: 120, width: "100%", },
  name: { fontSize: 14, fontWeight: "600",marginBottom: 4, },
  meta: { fontSize: 12, color: "#6b7280", marginTop: 2 },
  price: { fontSize: 15,
    fontWeight: "700",
    marginBottom: 8, },
  addBtn: {
    backgroundColor: "#2563eb",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    
  },
});