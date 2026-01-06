import { View, Text, FlatList } from "react-native";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const { cart } = useCart();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>My Cart</Text>

      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{item.name} - ₹{item.price}</Text>
        )}
      />
    </View>
  );
}
