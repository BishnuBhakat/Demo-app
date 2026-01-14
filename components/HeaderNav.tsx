import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { useRouter, usePathname } from "expo-router";
import type { Href } from "expo-router";
import { useState } from "react";

export default function HeaderNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState(""); // ✅ ADDED

  const Item = ({ label, path }: { label: string; path: string }) => (
    <Pressable onPress={() => router.push(path as Href)}>
      <Text
        style={[
          styles.item,
          pathname === path && styles.activeItem,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );

  return (
    <View>
      {/* 🔍 SEARCH BAR (ADDED)
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search grocery items..."
          value={search}
          onChangeText={(text) => {
            setSearch(text);

            // ✅ THIS IS WHAT WAS MISSING
            router.replace({
              pathname: "/grocery/search",
              params: { q: text },
            });
          }}
          style={styles.searchInput}
        />
      </View> */}

      {/* 🔹 EXISTING NAV (UNCHANGED) */}
      <View style={styles.container}>
        <Item label="Home" path="/(tabs)" />
        <Item label="Clothing" path="/clothing" />
        <Item label="Grocery" path="/groceryMain" />
        <Item label="Hotels" path="/hotelsMain" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  searchInput: {
    backgroundColor: "#f1f5f9",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 14,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  item: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  activeItem: {
    color: "#2563eb",
    fontWeight: "700",
  },
});
