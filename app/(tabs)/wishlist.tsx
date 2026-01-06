import { View, Text, FlatList } from "react-native";
import { useWishlist } from "../../context/WishlistContext";

export default function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Liked Items</Text>

      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
      />
    </View>
  );
}
