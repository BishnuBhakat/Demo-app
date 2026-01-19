import React, { useMemo, useState } from "react";
import { View, Text, Pressable, StyleSheet, FlatList, Image,ScrollView } from "react-native";
import HeaderNav from "../../components/HeaderNav";
import { useCart } from "../context/CartContext";
import { useHotelCart } from "../context/HotelCartContext";
import { useRouter } from "expo-router";

type TabKey = "clothing" | "grocery" | "jewellery" | "electronics" | "hotels";

export default function CartScreen() {
  const [tab, setTab] = useState<TabKey>("clothing");
  const router = useRouter();

  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,

    clothingTotal,
    groceryTotal,
    jewelleryTotal,
    electronicsTotal,

    clothingCount,
    groceryCount,
    jewelleryCount,
    electronicsCount,
  } = useCart();

  // Hotels (optional)
  const hotel = useHotelCart?.() as any;
  const hotelItems = hotel?.cart ?? [];
  const hotelTotal = hotel?.totalPrice ?? 0;

  // ✅ Active items
  const activeItems = useMemo(() => {
    if (tab === "clothing") return cart.clothing;
    if (tab === "grocery") return cart.grocery;
    if (tab === "jewellery") return cart.jewellery;
    if (tab === "electronics") return cart.electronics;
    return hotelItems;
  }, [tab, cart, hotelItems]);

  // ✅ Active total
  const activeTotal =
    tab === "clothing"
      ? clothingTotal
      : tab === "grocery"
      ? groceryTotal
      : tab === "jewellery"
      ? jewelleryTotal
      : tab === "electronics"
      ? electronicsTotal
      : hotelTotal;

  return (
    <View style={styles.container}>
      <HeaderNav />
      <Text style={styles.title}>My Cart</Text>
      

     {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabRow}
      >
        <TabButton
          label={`Clothing (${clothingCount})`}
          active={tab === "clothing"}
          onPress={() => setTab("clothing")}
        />

        <TabButton
          label={`Grocery (${groceryCount})`}
          active={tab === "grocery"}
          onPress={() => setTab("grocery")}
        />

        <TabButton
          label={`Jewellery (${jewelleryCount})`}
          active={tab === "jewellery"}
          onPress={() => setTab("jewellery")}
        />

        <TabButton
          label={`Electronics (${electronicsCount})`}
          active={tab === "electronics"}
          onPress={() => setTab("electronics")}
        />
      </ScrollView>

      {/* Cart list */}
      <FlatList
        data={activeItems}
        keyExtractor={(item: any) => `${tab}:${item.id}`}
        contentContainerStyle={{ padding: 12, paddingBottom: 110 }}
        ListEmptyComponent={
          <Text style={{ padding: 20 }}>No items in this cart.</Text>
        }
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.image || "https://picsum.photos/200" }}
              style={styles.image}
            />

            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.name} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.meta}>₹{item.price}</Text>

              {/* Qty controls */}
              {tab !== "hotels" && (
                <View style={styles.qtyRow}>
                  <Pressable
                    style={styles.qtyBtn}
                    onPress={() => decreaseQty(item.id, tab)}
                  >
                    <Text style={styles.qtyText}>−</Text>
                  </Pressable>

                  <Text style={styles.qtyNum}>{item.quantity}</Text>

                  <Pressable
                    style={styles.qtyBtn}
                    onPress={() => increaseQty(item.id, tab)}
                  >
                    <Text style={styles.qtyText}>+</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => removeFromCart(item.id, tab)}
                    style={{ marginLeft: "auto" }}
                  >
                    <Text style={{ color: "#ef4444", fontWeight: "900" }}>
                      REMOVE
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        )}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>₹{activeTotal}</Text>
        </View>

        <Pressable
          style={styles.placeBtn}
          onPress={() =>
            router.push({
              pathname: "/checkout",
              params: { cartType: tab },
            })
          }
        >
          <Text style={styles.placeText}>
            {tab === "hotels" ? "BOOK NOW" : "PLACE ORDER"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function TabButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.tabBtn}>
      <Text style={[styles.tabText, active && styles.tabTextActive]}>
        {label}
      </Text>
      {active && <View style={styles.activeLine} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {  backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "900", padding: 12 },

tabRow: {
  flexDirection: "row",
  paddingHorizontal: 5,
  borderBottomWidth: 1,
  borderColor: "#e5e7eb",
},
  tabBtn: {
  paddingHorizontal: 16,
  paddingVertical: 12,
  alignItems: "center",
},
  tabText: { fontSize: 18, fontWeight: "700", color: "#111827" },
  tabTextActive: { color: "#2563eb" },
  activeLine: {
    height: 3,
    backgroundColor: "#2563eb",
    width: "70%",
    marginTop: 8,
    borderRadius: 2,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: "#e5e7eb",
  },
  name: { fontSize: 16, fontWeight: "800" },
  meta: { marginTop: 4, color: "#6b7280", fontWeight: "700" },

  qtyRow: { flexDirection: "row", alignItems: "center", marginTop: 10, gap: 10 },
  qtyBtn: {
    backgroundColor: "#e5e7eb",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  qtyText: { fontSize: 18, fontWeight: "900" },
  qtyNum: { fontWeight: "900" },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 14,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: { color: "#6b7280", fontWeight: "700" },
  totalValue: { fontSize: 18, fontWeight: "900", marginTop: 2 },

  placeBtn: {
    backgroundColor: "#fb923c",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  placeText: { color: "#fff", fontWeight: "900" },
});
