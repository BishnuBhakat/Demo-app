import { FlatList, View, Text, Image, Pressable } from "react-native";
import { groceryItems } from "./data/groceryData";
import { useRouter } from "expo-router";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Alert } from "react-native";
import HeaderNav from "../components/HeaderNav";

export default function Grocery() {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleLike } = useWishlist();

  return (
    <View style={{ flex: 1 }}>
      {/* 🔝 TOP HEADER */}
      <HeaderNav />
    <FlatList
      data={groceryItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ margin: 10, padding: 10, backgroundColor: "#fff", borderRadius:10 }}>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/product/[id]", // ✅ FIXED HERE
                params: { id: item.id },
              })
            }
          >
            <Image source={{ uri: item.image }} style={{ height: 120 }} />
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text>₹{item.price}</Text>
          </Pressable>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
          <Pressable   
  onPress={() => {
    addToCart(item);
    Alert.alert(
      "Added to Cart 🛒",
      `${item.name} has been added successfully!`
    );
  }}
>
  <Text style={{ color: "green",fontWeight:"600" }}>Add to Cart</Text>
</Pressable>


         <Pressable
  onPress={() => {
    toggleLike(item);
    Alert.alert("Liked ❤️", `${item.name} Added to wishlist`);
  }}
>
  <Text style={{ color: "red",fontWeight: "600" }}>♥ Like</Text>
</Pressable>
      </View>
        </View>
      )}
    />
    </View>
  );
}
