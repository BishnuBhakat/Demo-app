import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import HeaderNav from "../../components/HeaderNav";
import { useHotelCart } from "../../context/HotelCartContext";

const demoHotels = [
  { id: "h1", name: "Hotel Paradise", price: 2200, image: "https://picsum.photos/300?21" },
  { id: "h2", name: "Royal Palace", price: 3500, image: "https://picsum.photos/300?22" },
  { id: "h3", name: "City Inn", price: 1800, image: "https://picsum.photos/300?23" },
];

export default function Results() {
  const { location } = useLocalSearchParams();
  const { addHotel } = useHotelCart(); // ✅ use HotelCart
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <HeaderNav />
      <Text style={styles.title}>Stays in {location}</Text>

      <FlatList
        data={demoHotels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>₹{item.price} / night</Text>

            {/* ADD TO HOTEL CART */}
            <Pressable
              style={styles.addBtn}
              onPress={() => {
                addHotel({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  image: item.image,
                  quantity: 1,
                  type: "hotel",
                });
                router.push("/hotels/checkout");
                Alert.alert("Hotel Added", `${item.name} added for booking`);
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>CHECKOUT</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "700", padding: 12 },
  card: { backgroundColor: "#fff", margin: 10, borderRadius: 12, padding: 10 },
  image: { height: 150, borderRadius: 10 },
  name: { fontSize: 16, fontWeight: "600", marginTop: 6 },
  price: { color: "#16a34a", fontWeight: "700", marginBottom: 8 },
  addBtn: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});
