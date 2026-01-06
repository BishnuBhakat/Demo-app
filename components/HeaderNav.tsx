import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";
import type { Href } from "expo-router";

export default function HeaderNav() {
  const router = useRouter();
  const pathname = usePathname();

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
    <View style={styles.container}>
      <Item label="Home" path="/(tabs)" />
      <Item label="Clothing" path="/clothing" />
      <Item label="Grocery" path="/grocery" />
      <Item label="Hotels" path="/hotels" />
    </View>
  );
}

const styles = StyleSheet.create({
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
