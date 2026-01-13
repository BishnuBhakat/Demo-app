import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import HeaderNav from "../../components/HeaderNav";
import { useHotelCart } from "../../context/HotelCartContext";

const demoHotels = [
  {
    id: "h1",
    name: "Hotel Paradise",
    price: 2200,
    image: "https://picsum.photos/300?21",
    desc: "Luxury stay near Ganga river with free breakfast",
    location: "Haridwar",
  },
  {
    id: "h2",
    name: "Royal Palace",
    price: 3500,
    image: "https://picsum.photos/300?22",
    desc: "5 star hotel with pool, spa and mountain view",
    location: "Mussoorie",
  },
  {
    id: "h3",
    name: "City Inn",
    price: 1800,
    image: "https://picsum.photos/300?23",
    desc: "Budget friendly hotel in city center",
    location: "Haridwar",
  },
  {
    id: "h4",
    name: "Mountain View Resort",
    price: 4200,
    image: "https://picsum.photos/300?24",
    desc: "Resort with valley facing rooms",
    location: "Mussoorie",
  },
  {
    id: "h5",
    name: "Riverfront Stay",
    price: 2600,
    image: "https://picsum.photos/300?25",
    desc: "Peaceful stay on river bank",
    location: "Rishikesh",
  },
  {
    id: "h6",
    name: "Hotel Sunshine",
    price: 1500,
    image: "https://picsum.photos/300?26",
    desc: "Affordable hotel with clean rooms",
    location: "Haridwar",
  },
  {
    id: "h7",
    name: "Green Valley Inn",
    price: 2800,
    image: "https://picsum.photos/300?27",
    desc: "Surrounded by greenery and mountains",
    location: "Mussoorie",
  },
  {
    id: "h8",
    name: "Yoga Retreat",
    price: 3900,
    image: "https://picsum.photos/300?28",
    desc: "Wellness & yoga retreat stay",
    location: "Rishikesh",
  },
  {
    id: "h9",
    name: "Comfort Residency",
    price: 2100,
    image: "https://picsum.photos/300?29",
    desc: "Comfortable rooms near market",
    location: "Dehradun",
  },
  {
    id: "h10",
    name: "Grand Heritage",
    price: 5000,
    image: "https://picsum.photos/300?30",
    desc: "Premium heritage style hotel",
    location: "Dehradun",
  },
  {
    id: "h11",
    name: "Budget Lodge",
    price: 1200,
    image: "https://picsum.photos/300?31",
    desc: "Best budget hotel for travellers",
    location: "Haridwar",
  },
  {
    id: "h12",
    name: "Himalayan Bliss",
    price: 4600,
    image: "https://picsum.photos/300?32",
    desc: "Luxury resort in Himalayas",
    location: "Mussoorie",
  },
  {
    id: "h13",
    name: "Peace Stay",
    price: 2000,
    image: "https://picsum.photos/300?33",
    desc: "Calm and peaceful stay",
    location: "Rishikesh",
  },
  {
    id: "h14",
    name: "Urban Rooms",
    price: 1700,
    image: "https://picsum.photos/300?34",
    desc: "Modern rooms in city area",
    location: "Dehradun",
  },
  {
    id: "h15",
    name: "River Palace",
    price: 3600,
    image: "https://picsum.photos/300?35",
    desc: "Premium rooms near river",
    location: "Rishikesh",
  },
];



export default function Results() {
  const params = useLocalSearchParams();

  const location =
    typeof params.location === "string"
      ? params.location
      : Array.isArray(params.location)
      ? params.location[0]
      : "";

  const searchLocation = location.toLowerCase().trim();
  const { addHotel } = useHotelCart();
  const router = useRouter();
  const filteredHotels = demoHotels.filter((hotel) =>
  hotel.location.toLowerCase().trim().includes(searchLocation)
);

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <HeaderNav />
      <Text style={styles.title}>Stays in {location}</Text>

      {filteredHotels.length === 0 && (
        <Text style={{ padding: 20, fontSize: 16 }}>
          No hotels found in {location}
        </Text>
      )}
      <FlatList
        data={filteredHotels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>₹{item.price} / night</Text>

            {/* ADD TO HOTEL CART */}
            {/* CHECKOUT */}
            <Pressable
              style={styles.checkoutBtn}
              onPress={() =>
                router.push({
                  pathname: "/hotels/confirm",
                  params: { hotel: JSON.stringify(item) },
                })
              }
            >
              <Text style={{ color: "#fff", fontWeight: "700" }}>CHECKOUT</Text>
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
    backgroundColor: "#16a34a",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 8,
  },
  checkoutBtn: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});
