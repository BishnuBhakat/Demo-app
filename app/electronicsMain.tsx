import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import HeaderNav from "../components/HeaderNav";
import { electronicsItems } from "./data/electronicsData";
import { useCart } from "./context/CartContext";
import { useWishlist } from "./context/WishlistContext";

const CATEGORIES = ["All", "Mobiles", "Television", "Laptops", "Accessories"];

export default function ElectronicsMain() {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleLike } = useWishlist();

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  // ✅ SEARCH + CATEGORY FILTER (COMBINED)
  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();

    return electronicsItems.filter((item) => {
      const matchCategory =
        activeCategory === "All" || item.category === activeCategory;

      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.section.toLowerCase().includes(q);

      return matchCategory && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <View style={styles.container}>
      <HeaderNav />
      <View style={styles.header}></View>
      <Text style={styles.title}>Electronics Store</Text>

      {/* 🔍 SEARCH BAR */}
      <View style={styles.searchWrap}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search electronics..."
          style={styles.search}
        />
      </View>

      {/* 🧭 CATEGORIES */}
      <FlatList
        data={CATEGORIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(x) => x}
        contentContainerStyle={styles.categoryRow}
        renderItem={({ item }) => {
          const active = item === activeCategory;
          return (
            <Pressable
              onPress={() => setActiveCategory(item)}
              style={[styles.categoryPill, active && styles.categoryActive]}
            >
              <Text
                style={[styles.categoryText, active && styles.categoryTextActive]}
              >
                {item}
              </Text>
            </Pressable>
          );
        }}
      />

      {/* 📦 PRODUCTS */}
       {filteredItems.length === 0 ? (
          <Text style={{ padding: 20 }}>No items found</Text>
        ) : (
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
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
                <Text style={styles.name} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={styles.meta}>
                  {item.section} • {item.category}
                </Text>
                <Text style={styles.price}>₹{item.price}</Text>
              </View>

              {/* ❤️ WISHLIST */}
              <Pressable
                style={styles.heartBtn}
                onPress={() => {
                  toggleLike({ ...item, type: "electronics" as any });
                  Toast.show({ type: "success",
                     text1: "Added to Wishlist ❤️" , 
                     text2: `${item.name} Added to Wishlist ❤️` ,
                     position: "bottom",
                    });
                }}
              >
                <Text style={styles.heartText}>❤️</Text>
              </Pressable>

              {/* 🛒 ADD */}
               <View style={styles.cardBody}>
              <Pressable
                style={styles.addBtn}
                onPress={() => {
                  addToCart({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    quantity: 1,
                    type: "electronics" as any,
                  });
                  Toast.show({ type: "success", text1: "Added to Cart 🛒", text2: `${item.name} added successfully` });
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "900" }}>ADD</Text>
              </Pressable>
              </View>
            </Pressable>
          </View>
        )}
      />
        )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
    header: { padding: 16 },
  title: { fontSize: 22, fontWeight: "900", padding: 12 },

  searchWrap: {
  paddingHorizontal: 12,
  paddingBottom: 8,
},

search: {
  backgroundColor: "#e5e7eb",
  borderRadius: 14,
  paddingHorizontal: 12,
  paddingVertical: 12,
  fontSize: 16,
},

  categoryRow: { paddingHorizontal: 12, paddingVertical: 10, gap: 12 },
  categoryPill: {
    minWidth: 90,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  categoryActive: { backgroundColor: "#5b5555ff" },
  categoryText: { fontWeight: "700" },
  categoryTextActive: { color: "#fff" },

  list: { paddingHorizontal: 12, paddingBottom: 100 },
  row: { justifyContent: "space-between", marginBottom: 14 },

  cardWrapper: { width: "48%" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    elevation: 2,
    position: "relative",
  },
  image: { width: "100%", height: 160, borderRadius: 12 },
  cardBody: { marginTop: 8 },
  name: { fontWeight: "800" },
  meta: { fontSize: 12, color: "#6b7280", marginTop: 4 },
  price: { fontWeight: "900", marginTop: 4 },

  addBtn: {
    marginTop: 6,
    backgroundColor: "#5b5555ff",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },

   heartBtn: {
  position: "absolute",
  top: 8,
  right: 8,
  backgroundColor: "#ffffffee",
  borderRadius: 20,
  width: 34,
  height: 34,
  alignItems: "center",
  justifyContent: "center",
  elevation: 3, // Android shadow
  shadowColor: "#000", // iOS shadow
  shadowOpacity: 0.2,
  shadowRadius: 4,
},
  heartText: { fontSize: 18 },
});
