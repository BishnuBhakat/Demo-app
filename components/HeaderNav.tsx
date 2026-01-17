// import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
// import { useRouter, usePathname } from "expo-router";
// import type { Href } from "expo-router";
// import { useState } from "react";

// export default function HeaderNav() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [search, setSearch] = useState(""); // ✅ ADDED

//   const Item = ({ label, path }: { label: string; path: string }) => (
//     <Pressable onPress={() => router.push(path as Href)}>
//       <Text
//         style={[
//           styles.item,
//           pathname === path && styles.activeItem,
//         ]}
//       >
//         {label}
//       </Text>
//     </Pressable>
//   );

//   return (
//     <View>
//       {/* 🔹 EXISTING NAV (UNCHANGED) */}
//       <View style={styles.container}>
//         <Item label="Home" path="/(tabs)" />
//         <Item label="Clothing" path="/clothingMain" />
//         <Item label="Grocery" path="/groceryMain" />
//         <Item label="Hotels" path="/hotelsMain" />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   searchContainer: {
//     padding: 10,
//     backgroundColor: "#ffffff",
//     borderBottomWidth: 1,
//     borderColor: "#e5e7eb",
//   },
//   searchInput: {
//     backgroundColor: "#f1f5f9",
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     fontSize: 14,
//   },
//   container: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingVertical: 12,
//     backgroundColor: "#ffffff",
//     borderBottomWidth: 1,
//     borderColor: "#e5e7eb",
//   },
//   item: {
//     fontSize: 14,
//     color: "#6b7280",
//     fontWeight: "500",
//   },
//   activeItem: {
//     color: "#2563eb",
//     fontWeight: "700",
//   },
// });
import { View, Text, StyleSheet, Pressable, Platform, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function HeaderNav() {
  const router = useRouter();

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
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

        <Pressable onPress={() => router.push("/hotelsMain")} style={styles.item}>
          <Text style={styles.text}>Hotels</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: "#fff",
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10, // 👈 pushes nav DOWN
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

