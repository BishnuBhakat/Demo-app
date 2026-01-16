

import { View, Text, Image, StyleSheet,Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { groceryItems } from "../data/groceryData";
import { clothingItems } from "../data/clothingData";
import { useCart } from "../context/CartContext";
import Toast from "react-native-toast-message";
import { useWishlist } from "../context/WishlistContext";
import { use } from "react";
import { useRouter } from "expo-router";

export default function ProductDetails() {
  // ✅ get id FIRST
  const params = useLocalSearchParams();
  const {addToCart}=useCart();
  const {toggleLike}=useWishlist();
  const router = useRouter();

  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : "";

  // ✅ combine all products
  const allProducts = [...groceryItems, ...clothingItems];

  // ✅ find product safely
  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Product not found</Text>
      </View>
    );
  }

const isClothing = clothingItems.some((c) => c.id === product.id);

  return (
    <View style={styles.container}>
       <Pressable
              onPress={() =>
                router.push(isClothing ? "/clothingMain" : "/groceryMain")
              }
              style={styles.backBtn}
            >
              <Text style={styles.backText}>
                ← Back to {isClothing ? "Clothing" : "Grocery"}
              </Text>
            </Pressable>
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.body}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>₹{product.price}</Text>

        {/* ✅ Description */}
        {"description" in product && product.description ? (
          <Text style={styles.desc}>{product.description}</Text>
        ) : (
          <Text style={styles.desc}>
            Premium quality {isClothing ? "clothing" : "product"} with great comfort and style.
          </Text>
        )}
      <View style={styles.actionRow}>
      
        {/* 🛒 ADD TO CART */}
        <Pressable
          style={styles.addBtn}
          onPress={() => {
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: 1,
              type: isClothing ? "clothing" : "grocery",
            });

            Toast.show({
              type: "success",
              text1: "Added to Cart 🛒",
              text2: `${product.name} added successfully`,
              position: "bottom",
            });
          }}
        >
          <Text style={styles.addText}>ADD TO CART</Text>
        </Pressable>

        {/* ❤️ WISHLIST */}
        <Pressable
          style={styles.wishlistBtn}
          onPress={() => {
            toggleLike(product);
            Toast.show({
              type: "success",
              text1: "Added to Wishlist ❤️",
              text2: `${product.name} saved`,
              position: "bottom",
            });
          }}
        >
          <Text style={styles.wishlistText}>ADD TO WISHLIST</Text>
        </Pressable>
      </View>
       {/* QUICK NAVIGATION */}
          <View style={styles.quickNav}>
            <Pressable
              onPress={() => router.push("/cart")}
              style={styles.goCartBtn}
            >
              <Text style={styles.goCartText}>🛒 Go to Cart</Text>
            </Pressable>
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width: "100%", height: 320 },
  body: { padding: 16 },
  name: { fontSize: 22, fontWeight: "800" },
  price: { fontSize: 18, fontWeight: "900", marginVertical: 6 },
  desc: { color: "#6b7280", lineHeight: 20, marginVertical: 12 },

  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  quickNav: {
  marginTop: 18,
  gap: 10,
},
/* BACK */
backBtn: {
  paddingHorizontal: 16,
  paddingVertical: 12,
},
backText: {
  color: "#2563eb",
  fontWeight: "700",
  fontSize: 15,
},

linkText: {
  fontSize: 15,
  fontWeight: "700",
  color: "#2563eb",
},

  addBtn: {
    flex: 1,
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  addText: { color: "#fff", fontWeight: "900", fontSize: 15 },
  goCartBtn: {
  marginTop: 16,
  alignItems: "center",
},
goCartText: {
  fontSize: 15,
  fontWeight: "800",
  color: "#2563eb",
},
  wishlistBtn: {
  flex: 1,
  backgroundColor: "#ffffff", // ✅ important for iOS
  borderWidth: 1,
  borderColor: "#2563eb",
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "center",
},
  wishlistText: { color:  "#0051ffff", fontWeight: "900",fontSize: 15 },

  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  notFound: { fontSize: 18, fontWeight: "600", color: "#6b7280" },
});
  