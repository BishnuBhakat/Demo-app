import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Checkout() {
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Checkout</Text>

      <Pressable
        onPress={() => router.push("../order-success")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: "green" }}>Place Order</Text>
      </Pressable>
    </View>
  );
}
