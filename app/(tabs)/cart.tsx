import { View, Text, Pressable, StyleSheet } from "react-native";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../../types/cart";

export default function Cart() {
  const { cart, updateQty, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum: number, item: CartItem) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>

      {cart.length === 0 && (
        <Text style={styles.empty}>Your cart is empty</Text>
      )}

      {cart.map((item: CartItem) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>₹{item.price}</Text>

          {/* Quantity Controls */}
          <View style={styles.row}>
            <Pressable
              onPress={() =>
                updateQty(item.id, Math.max(1, item.quantity - 1))
              }
            >
              <Text style={styles.qtyBtn}>−</Text>
            </Pressable>

            <Text style={styles.qty}>{item.quantity}</Text>

            <Pressable
              onPress={() =>
                updateQty(item.id, item.quantity + 1)
              }
            >
              <Text style={styles.qtyBtn}>+</Text>
            </Pressable>
          </View>

          {/* Remove */}
          <Pressable onPress={() => removeFromCart(item.id)}>
            <Text style={styles.remove}>Remove</Text>
          </Pressable>
        </View>
      ))}

      {/* Total */}
      {cart.length > 0 && (
        <Text style={styles.total}>Total: ₹{total}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  empty: {
    marginTop: 20,
    color: "#6b7280",
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  qtyBtn: {
    fontSize: 20,
    width: 32,
    textAlign: "center",
    backgroundColor: "#e5e7eb",
    borderRadius: 6,
  },
  qty: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  remove: {
    marginTop: 6,
    color: "red",
  },
  total: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
  },
});
