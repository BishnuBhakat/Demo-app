import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { useState } from "react";
import HeaderNav from "../components/HeaderNav";
import { groceryItems } from "./data/groceryData";
import { useCart } from "./context/CartContext";
import { useWishlist } from "./context/WishlistContext";
import Toast from "react-native-toast-message";
import { ScrollView } from "react-native";
import { useRouter } from "expo-router";
const CATEGORIES = ["All", "Fruits", "Vegetables", "Dairy", "Snacks"];

export default function Grocery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const { addToCart } = useCart();
  const { toggleLike } = useWishlist();
  const router = useRouter();


  const filteredItems = groceryItems.filter((item) => {
    const searchMatch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      selectedCategory === "All"
        ? true
        : item.category.toLowerCase() ===
          selectedCategory.toLowerCase();

    return searchMatch && categoryMatch;
  });

  return (
    <View style={styles.container}>
      <HeaderNav />
       <Text style={styles.title}>Grocery Store </Text>

      {/* 🔍 SEARCH */}
      <View style={styles.searchWrapper}>
        <TextInput
          placeholder="Search for groceries"
          value={search}
          onChangeText={setSearch}
          style={styles.search}
        />
      </View>

      {/* 🧩 CATEGORY TABS */}
<ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.tabs}
>
  {CATEGORIES.map((cat) => (
    <Pressable
      key={cat}
      onPress={() => {
        setSelectedCategory(cat);
        setSearch("");
      }}
      style={[
        styles.tab,
        selectedCategory === cat && styles.activeTab,
      ]}
    >
      <Text
        numberOfLines={1}
        style={[
          styles.tabText,
          selectedCategory === cat && styles.activeText,
        ]}
      >
        {cat}
      </Text>
    </Pressable>
  ))}
</ScrollView>


      {/* 🛒 PRODUCTS */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
                {/* 🔗 CLICKABLE PRODUCT */}
            <Pressable
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
                <Text style={styles.price}>₹{item.price}</Text>
            
              </View>
            </Pressable>
            {/* ❤️ Like */}
            <Pressable
              style={styles.heartBtn}
              onPress={() => {
                toggleLike(item);
                Toast.show({
                  type: "success",
                  text1: "Added to Wishlist ❤️",
                  text2: `${item.name} saved to wishlist`,
                  position: "bottom",
                });
              }}
            >
              <Text style={styles.heartText}>❤️</Text>
            </Pressable>

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
                    type: "grocery",
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
          </View>
        )}
      />
    </View>

  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#f9fafb",
  // paddingTop: 0, // ✅ prevents double padding on iOS
},
title: { fontSize: 22, fontWeight: "700", padding: 12 },


  /* SEARCH */
  searchWrapper: {
    paddingHorizontal: 12,
    
  },
  search: {
    backgroundColor: "#ffffffff",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    fontSize: 16,
  },

  /* TABS */
  tabs: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 35,
    gap: 15,
  },
tab: {
  paddingHorizontal: 16,
  paddingVertical: 12,     // ✅ increase vertical padding
  borderRadius: 90,
  backgroundColor: "#e5e7eb",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 44,           // ✅ critical for iOS text clipping
},
  activeTab: {
    backgroundColor: "#16a34a",
  },
tabText: {
  fontWeight: "600",
  color: "#111827",
  textAlign: "center",
  lineHeight: 20,          // ✅ prevents half-cut text
  includeFontPadding: false, // ✅ Android fix, safe on iOS
},
  activeText: {
    color: "#fff",
  },

  /* LIST */
  list: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },

  /* CARD */
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    flex: 1,
    marginBottom: 500,
    elevation: 2,
  },
  image: {
    height: 110,
    width: "100%",
  },
  cardBody: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 8,
  },
  addBtn: {
    backgroundColor: "#16a34a",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  addText: {
    color: "#fff",
    fontWeight: "700",
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
heartText: {
  fontSize: 16,
},

});
