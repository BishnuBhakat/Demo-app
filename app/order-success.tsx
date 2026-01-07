import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function OrderSuccess() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>🎉 Order Placed!</Text>

      <Pressable onPress={() => router.push("/(tabs)")}>
        <Text style={{ marginTop: 20 }}>Go to Home</Text>
      </Pressable>
    </View>
  );
}
