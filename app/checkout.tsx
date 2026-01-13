import { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import HeaderNav from "../components/HeaderNav";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  // ✅ only clothing items checkout
  const clothingOnly = useMemo(() => cart.filter((i) => i.type === "clothing"), [cart]);

  const totalClothingPrice = useMemo(
    () => clothingOnly.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [clothingOnly]
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [payment, setPayment] = useState<"COD" | "UPI" | "CARD">("COD");

  const placeOrder = () => {
    if (clothingOnly.length === 0) return Alert.alert("Cart", "No clothing items in cart.");

    if (!name.trim()) return Alert.alert("Missing", "Enter full name");
    if (phone.trim().length < 10) return Alert.alert("Missing", "Enter phone");
    if (pincode.trim().length < 6) return Alert.alert("Missing", "Enter pincode");
    if (!address.trim()) return Alert.alert("Missing", "Enter address");
    if (!city.trim()) return Alert.alert("Missing", "Enter city");
    if (!stateName.trim()) return Alert.alert("Missing", "Enter state");

    Alert.alert("✅ Order Placed", `Payment: ${payment}\nAmount: ₹${totalClothingPrice}`);
    clearCart();
    router.replace("/account");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f3f4f6" }}>
      <HeaderNav />

      <ScrollView contentContainerStyle={{ padding: 12, paddingBottom: 30 }}>
        <Text style={styles.title}>Delivery Address</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Enter your name" />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            placeholder="10-digit number"
            keyboardType="phone-pad"
          />

          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Pincode</Text>
              <TextInput
                value={pincode}
                onChangeText={setPincode}
                style={styles.input}
                placeholder="6 digits"
                keyboardType="number-pad"
              />
            </View>

            <View style={{ width: 10 }} />

            <View style={{ flex: 1 }}>
              <Text style={styles.label}>City</Text>
              <TextInput value={city} onChangeText={setCity} style={styles.input} placeholder="City" />
            </View>
          </View>

          <Text style={styles.label}>State</Text>
          <TextInput value={stateName} onChangeText={setStateName} style={styles.input} placeholder="State" />

          <Text style={styles.label}>Full Address</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            style={[styles.input, { height: 90, textAlignVertical: "top" }]}
            placeholder="House no, Street, Area..."
            multiline
          />
        </View>

        <Text style={styles.title}>Payment</Text>
        <View style={styles.card}>
          {(["COD", "UPI", "CARD"] as const).map((p) => (
            <Pressable
              key={p}
              onPress={() => setPayment(p)}
              style={[styles.payOption, payment === p && styles.payActive]}
            >
              <Text style={[styles.payText, payment === p && styles.payTextActive]}>
                {p === "COD" ? "Cash on Delivery" : p === "UPI" ? "UPI" : "Card"}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.summary}>
          <Text style={{ color: "#6b7280", fontWeight: "700" }}>Total Amount</Text>
          <Text style={{ fontSize: 20, fontWeight: "900" }}>₹{totalClothingPrice}</Text>
        </View>

        <Pressable style={styles.placeBtn} onPress={placeOrder}>
          <Text style={styles.placeText}>PLACE ORDER</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: "900", marginTop: 8, marginBottom: 8 },
  card: { backgroundColor: "#fff", borderRadius: 14, padding: 12, marginBottom: 10 },
  label: { fontSize: 12, color: "#6b7280", fontWeight: "800", marginTop: 10, marginBottom: 6 },
  input: { backgroundColor: "#f9fafb", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 },
  row: { flexDirection: "row" },

  payOption: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
    marginBottom: 10,
  },
  payActive: { backgroundColor: "#2563eb" },
  payText: { fontWeight: "800", color: "#111827" },
  payTextActive: { color: "#fff" },

  summary: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  placeBtn: {
    backgroundColor: "#fb923c",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
  },
  placeText: { color: "#fff", fontWeight: "900", fontSize: 16 },
});
