import { View, Text, Pressable,Image,StyleSheet } from "react-native";
import { useLocalSearchParams} from "expo-router";
import HeaderNav from "../../components/HeaderNav";

import { groceryItems } from "../data/groceryData";
import { useCart } from "../context/CartContext";
import Toast from "react-native-toast-message";

export default function ProductDetails() {
  const params = useLocalSearchParams();
  const { addToCart } = useCart();

  // ✅ Safe ID handling
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : "";

  // ✅ ONLY grocery data
  const product = groceryItems.find((item) => item.id === id);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderNav />

      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.body}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>₹{product.price}</Text>

        {/* ✅ Description */}
        <Text style={styles.desc}>
          {product.description ||
            "Fresh and high-quality grocery product delivered to your home."}
        </Text>

        {/* ✅ Add to Cart (GROCERY ONLY) */}
        <Pressable
          style={styles.addBtn}
          onPress={() => {
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: 1,
              type: "grocery", // 🔥 IMPORTANT
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  image: { width: "100%", height: 260 },

  body: { padding: 16 },

  name: { fontSize: 22, fontWeight: "800" },
  price: { fontSize: 18, fontWeight: "900", marginVertical: 6 },

  desc: {
    fontSize: 14,
    color: "#6b7280",
    marginVertical: 10,
    lineHeight: 20,
  },

  addBtn: {
    backgroundColor: "#16a34a",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  addText: { color: "#fff", fontWeight: "900", fontSize: 16 },

  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});