import { View, Text, Pressable, StyleSheet } from "react-native";
import HeaderNav from "../../components/HeaderNav";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    
    <View style={{ flex: 1 }}>
      <HeaderNav />
      <Text style={styles.title}>Multi-Service App</Text>

      <Pressable style={styles.content} onPress={() => router.push("/clothingMain")}>
        <Text style={styles.title}>👕 Clothing Store</Text>
      </Pressable>

      <Pressable style={styles.content} onPress={() => router.push("/groceryMain")}>
        <Text style={styles.title}>🛒 Grocery Store</Text>
      </Pressable>

      <Pressable style={styles.content} onPress={() => router.push("/hotelsMain")}>
        <Text style={styles.title}>🏨 Hotel Booking</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
