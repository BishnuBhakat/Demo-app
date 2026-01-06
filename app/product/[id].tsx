import { View, Text, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { groceryItems } from "../data/groceryData"; // adjust if name differs

export default function ProductDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const product = groceryItems.find((p) => p.id === id);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={{ padding: 20 }}>
      <Image source={{ uri: product.image }} style={{ height: 200 }} />
      <Text style={{ fontSize: 24 }}>{product.name}</Text>
      <Text>₹{product.price}</Text>
      <Text>{product.description}</Text>
    </View>
  );
}
