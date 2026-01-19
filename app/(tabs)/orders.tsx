import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import HeaderNav from "../../components/HeaderNav";
import { DEMO_ORDERS } from "../data/demoOrdersData";

// const DEMO_ORDERS = [
//   {
//     id: "OD123456",
//     status: "Delivered",
//     amount: 977,
//     date: "19 Jan 2026",
//     items: [
//       {
//         id: "p1",
//         name: "Plum Vitamin C Serum",
//         image: "https://picsum.photos/300?1",
//         price: 977,
//         qty: 1,
//         category: "Skincare",
//       },
//     ],
//     addressTitle: "Other",
//     addressLine: "MCKV Hostel 243 GT Road Liluah, Liluah",
//     customerName: "DIPTI BHOWMIK",
//     phone: "9064148052",
//   },
//   {
//     id: "OD654321",
//     status: "Shipped",
//     amount: 45999,
//     date: "18 Jan 2026",
//     items: [
//       {
//         id: "p2",
//         name: "Samsung Smart TV",
//         image: "https://picsum.photos/300?2",
//         price: 45999,
//         qty: 1,
//         category: "Electronics",
//       },
//     ],
//     addressTitle: "Home",
//     addressLine: "Kolkata, West Bengal",
//     customerName: "Demo User",
//     phone: "9876543210",
//   },
// ];

export default function Orders() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <HeaderNav />
      <Text style={styles.title}>My Orders</Text>

      <FlatList
        data={DEMO_ORDERS}
        keyExtractor={(o) => o.id}
        contentContainerStyle={{ padding: 12, paddingBottom: 30 }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/order-details",
                params: { orderId: item.id }, // ✅ pass only id (clean)
              })
            }
          >
            <Text style={styles.orderId}>{item.id}</Text>
            <Text style={styles.meta}>
              {item.status} • {item.date}
            </Text>
            <Text style={styles.amount}>₹{item.amount}</Text>
            <Text style={styles.tapHint}>Tap to view details →</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9" },
  title: { fontSize: 22, fontWeight: "900", padding: 12 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  orderId: { fontWeight: "900", fontSize: 16 },
  meta: { marginTop: 4, color: "#64748b", fontWeight: "700" },
  amount: { marginTop: 8, fontWeight: "900", fontSize: 16 },
  tapHint: { marginTop: 8, color: "#2874F0", fontWeight: "900" },
});