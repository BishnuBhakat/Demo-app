import { View, Text, FlatList, Image, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import HeaderNav from "../../components/HeaderNav";
import { useCart } from "../../context/CartContext";

export default function CartScreen() {
  const router = useRouter(); // ✅ add this
  const { cart, increaseQty, decreaseQty, removeFromCart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <View style={styles.container}>
        <HeaderNav />
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySub}>Add some items to see them here.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderNav />

      <Text style={styles.pageTitle}>My Cart</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => `${item.type}:${item.id}`}
        contentContainerStyle={{ padding: 12, paddingBottom: 110 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.image || "https://picsum.photos/200" }}
              style={styles.image}
            />

            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1}>
                {item.name}
              </Text>

              <Text style={styles.meta}>
                {item.type.toUpperCase()} • ₹{item.price}
              </Text>

              <View style={styles.bottomRow}>
                {/* Qty Controls */}
                <View style={styles.qtyBox}>
                  <Pressable
                    style={styles.qtyBtn}
                    onPress={() => decreaseQty(item.id, item.type)}
                  >
                    <Text style={styles.qtyBtnText}>−</Text>
                  </Pressable>

                  <Text style={styles.qtyText}>{item.quantity}</Text>

                  <Pressable
                    style={styles.qtyBtn}
                    onPress={() => increaseQty(item.id, item.type)}
                  >
                    <Text style={styles.qtyBtnText}>+</Text>
                  </Pressable>
                </View>

                {/* Line total */}
                <Text style={styles.lineTotal}>₹{item.price * item.quantity}</Text>
              </View>

              <Pressable
                onPress={() => removeFromCart(item.id, item.type)}
                style={styles.removeBtn}
              >
                <Text style={styles.removeText}>REMOVE</Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      {/* Sticky Bottom Summary */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>₹{totalPrice}</Text>
        </View>

        {/* ✅ Navigate to Checkout form */}
        <Pressable style={styles.placeBtn} onPress={() => router.push("/checkout")}>
          <Text style={styles.placeText}>PLACE ORDER</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },

  pageTitle: {
    fontSize: 22,
    fontWeight: "800",
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 4,
  },

  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyTitle: { fontSize: 20, fontWeight: "800" },
  emptySub: { marginTop: 6, color: "#6b7280" },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
  },
  image: { width: 90, height: 90, borderRadius: 12, backgroundColor: "#e5e7eb" },

  info: { flex: 1, marginLeft: 10 },
  name: { fontSize: 16, fontWeight: "800" },
  meta: { marginTop: 4, color: "#6b7280", fontWeight: "600" },

  bottomRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    overflow: "hidden",
  },
  qtyBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#e5e7eb",
  },
  qtyBtnText: { fontSize: 18, fontWeight: "900" },
  qtyText: { paddingHorizontal: 12, fontWeight: "800" },

  lineTotal: { fontWeight: "900", fontSize: 16 },

  removeBtn: { marginTop: 10, alignSelf: "flex-start" },
  removeText: { color: "#ef4444", fontWeight: "900" },

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
