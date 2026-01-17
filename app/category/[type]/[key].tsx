import { View, Text, FlatList, Image, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { groceryItems } from "../../data/groceryData";
import { clothingItems } from "../../data/clothingData";

export default function CategoryResults() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const type = params.type === "clothing" ? "clothing" : "grocery";
  const key = typeof params.key === "string" ? params.key : "";

  const data = useMemo(() => {
    if (type === "grocery") {
      return groceryItems.filter((x) => String(x.category).toLowerCase() === key.toLowerCase());
    }
    // clothing: use category OR section (you can choose one; here category)
    return clothingItems.filter((x) => String(x.category).toLowerCase() === key.toLowerCase());
  }, [type, key]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        More in {type.toUpperCase()} • {key}
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 12 }}
        columnWrapperStyle={{ gap: 12 }}
        ListEmptyComponent={<Text style={{ padding: 12 }}>No products found.</Text>}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/product/[id]",
                params: { id: item.id, type },
              })
            }
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.price}>₹{item.price}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  title: { fontSize: 18, fontWeight: "900", padding: 12 },
  card: { flex: 1, backgroundColor: "#fff", borderRadius: 14, padding: 10, marginBottom: 12 },
  image: { width: "100%", height: 120, borderRadius: 12, marginBottom: 8 },
  name: { fontWeight: "800" },
  price: { marginTop: 4, fontWeight: "900" },
});
