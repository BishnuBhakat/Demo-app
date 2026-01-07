import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import HeaderNav from "../components/HeaderNav";
import { groceryItems } from "./data/groceryData";
import { useCart } from "./context/CartContext";
import { useWishlist } from "./context/WishlistContext";

const categories = ["Fruits", "Vegetables", "Dairy", "Snacks"];

export default function Grocery() {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleLike } = useWishlist();

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {/* 🔝 HEADER */}
      <HeaderNav />

      {/* 🔍 SEARCH BAR */}
      <View style={styles.searchBox}>
        <TextInput placeholder="Search for groceries" />
      </View>

      {/* 🟢 CATEGORIES */}
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.category}
            onPress={() =>
              router.push({
                pathname: "/grocery/category/[categories]",
                params: { categories: item },
              })
            }
          >
            <Text>{item}</Text>
          </Pressable>
        )}
      />

      {/* 🛍️ PRODUCTS */}
      <FlatList
        data={groceryItems}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* PRODUCT CLICK */}
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/product/[id]",
                  params: { id: item.id },
                })
              }
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>₹{item.price}</Text>
            </Pressable>

            {/* ACTIONS */}
            <View style={styles.actions}>
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
                }}
              >
                <Text style={{ color: "#fff" }}>ADD</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  toggleLike(item);
                  Alert.alert("Liked ❤️", item.name);
                }}
              >
                <Text>❤️</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 12,
    borderRadius: 10,
  },
  category: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    margin: 6,
    flex: 1,
  },
  image: {
    height: 100,
    borderRadius: 8,
  },
  name: {
    fontSize: 14,
    marginTop: 6,
    fontWeight: "600",
  },
  price: {
    fontWeight: "bold",
    marginVertical: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addBtn: {
    backgroundColor: "#22c55e",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
});
