import { View, Text, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { groceryItems } from "../data/groceryData";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const params = useLocalSearchParams();
  const { addToCart } = useCart();

  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : "";

  const product = groceryItems.find((p) => p.id === id);

  if (!product) {
    return <Text style={{ padding: 20 }}>Product not found</Text>;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>{product.name}</Text>
      <Text>₹{product.price}</Text>

      <Pressable
        onPress={() =>
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            type: "grocery",
          })
        }
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: "green" }}>Add to Cart</Text>
      </Pressable>
    </View>
  );
}
