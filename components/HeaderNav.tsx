import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function HeaderNav() {
  const router = useRouter();

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
        <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabs}
            >
      <View style={styles.nav}>
        <Pressable onPress={() => router.push("/")} style={styles.item}>
          <Text style={styles.text}>Home</Text>
        </Pressable>

        <Pressable onPress={() => router.push("/clothingMain")} style={styles.item}>
          <Text style={styles.text}>Clothing</Text>
        </Pressable>

        <Pressable onPress={() => router.push("/groceryMain")} style={styles.item}>
          <Text style={styles.text}>Grocery</Text>
        </Pressable>

        <Pressable onPress={() => router.push("/electronicsMain")} style={styles.item}>
          <Text style={styles.text}>Electronics</Text>
        </Pressable>

        <Pressable onPress={() => router.push("/jewelleryMain")} style={styles.item}>
          <Text style={styles.text}>Jewellery</Text>
        </Pressable>

        <Pressable onPress={() => router.push("/hotelsMain")} style={styles.item}>
          <Text style={styles.text}>Hotels</Text>
        </Pressable>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: "#fff",
  },
   tabs: { flexDirection: "row",
     paddingHorizontal: 16, 
      marginTop: 12,
     marginBottom: 5,
     gap: 15,
     },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  item: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
  },
});
