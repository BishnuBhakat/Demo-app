import { View, Text, Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { groceryItems } from "../../data/groceryData";
import { clothingItems } from "../../data/clothingData";

export default function ProductDetails() {
  // ✅ get id FIRST
  const params = useLocalSearchParams();

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

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>₹{product.price}</Text>

      {/* description is optional (grocery has it, clothing may not) */}
{"description" in product && product.description ? (
  <Text style={styles.desc}>{product.description}</Text>
) : null}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    height: 220,
    borderRadius: 12,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 6,
  },
  desc: {
    color: "#6b7280",
    marginTop: 8,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notFound: {
    fontSize: 18,
    fontWeight: "600",
  },
});
