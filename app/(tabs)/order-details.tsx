import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import HeaderNav from "../../components/HeaderNav";

type OrderItem = {
  id: string;
  name: string;
  image?: string;
  price: number;
  qty: number;
  category?: string;
};

type Order = {
  id: string;
  status: string;
  deliveredAt?: string; // e.g. "Dec 22, 2025"
  confirmedAt?: string; // e.g. "Dec 22, 2025"
  amount: number;
  items: OrderItem[];
  addressTitle?: string;
  addressLine?: string;
  customerName?: string;
  phone?: string;
};

const FLIPKART_BLUE = "#2874F0";

export default function OrderDetails() {
  const router = useRouter();
  const params = useLocalSearchParams<{ order?: string }>();

  // ⭐ local rating only (optional, just to show selected stars before navigation)
  const [rating, setRating] = useState(0);

  // ✅ order comes from params.order (JSON string)
  const order: Order | null = useMemo(() => {
    const raw = params.order;
    if (!raw || typeof raw !== "string") return null;

    try {
      return JSON.parse(raw) as Order;
    } catch (e) {
      console.warn("Invalid order JSON param", e);
      return null;
    }
  }, [params.order]);

  if (!order) {
    return (
      <View style={{ flex: 1, backgroundColor: "#f1f5f9" }}>
        <HeaderNav />
        <View style={{ padding: 16 }}>
          <Text style={{ fontWeight: "900", fontSize: 18 }}>Order not found.</Text>
          <Text style={{ marginTop: 8, color: "#64748b", fontWeight: "700" }}>
            Open this page like:
            {"\n"}router.push({"{ pathname:'/order-details', params:{ order: JSON.stringify(orderObj) } }"})
          </Text>
        </View>
      </View>
    );
  }

  const firstItem = order.items?.[0];
  const deliveredAt = order.deliveredAt ?? "Dec 22, 2025";
  const confirmedAt = order.confirmedAt ?? deliveredAt;

  const delivered = String(order.status).toLowerCase() === "delivered";

  const openRatePage = () => {
    router.push({
      pathname: "/rate-product",
      params: {
        productName: firstItem?.name ?? "Product",
        productImage: firstItem?.image ?? "",
        deliveredAt,
      },
    });
  };

  return (
    <View style={styles.screen}>
      <HeaderNav />

      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </Pressable>

        <Text style={styles.topTitle}>Order Details</Text>

        <Pressable style={styles.helpBtn} onPress={() => {}}>
          <Text style={styles.helpText}>Help</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Product row */}
        <View style={styles.productRow}>
          <Image
            source={{ uri: firstItem?.image || "https://picsum.photos/200" }}
            style={styles.productImg}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.productName} numberOfLines={1}>
              {firstItem?.name ?? "Product"}
            </Text>
            <Text style={styles.productMeta}>
              {firstItem?.qty ?? 1} item • ₹{firstItem?.price ?? order.amount}
            </Text>

            <Text style={styles.orderIdText}>Order #{order.id}</Text>
          </View>
        </View>

        {/* Status card */}
        <View style={styles.statusCard}>
          <View style={styles.statusTopRow}>
            <Text style={[styles.statusTitle, !delivered && { color: "#111827" }]}>
              {delivered ? `Delivered, ${deliveredAt}` : order.status}
            </Text>

            <View
              style={[
                styles.statusTickWrap,
                !delivered && { backgroundColor: "#64748b" },
              ]}
            >
              <Text style={styles.statusTick}>{delivered ? "✓" : "!"}</Text>
            </View>
          </View>

          <View style={styles.progressRow}>
            <View style={[styles.dotDone, !delivered && { backgroundColor: "#64748b" }]}>
              <Text style={styles.dotText}>✓</Text>
            </View>
            <View style={[styles.lineDone, !delivered && { backgroundColor: "#cbd5e1" }]} />
            <View style={[styles.dotDone, !delivered && { backgroundColor: "#cbd5e1" }]}>
              <Text style={[styles.dotText, !delivered && { color: "#64748b" }]}>
                {delivered ? "✓" : "•"}
              </Text>
            </View>
          </View>

          <View style={styles.progressLabels}>
            <View style={{ flex: 1 }}>
              <Text style={styles.progressMain}>Order Confirmed</Text>
              <Text style={styles.progressSub}>{confirmedAt}</Text>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.progressMain}>{delivered ? "Delivered" : "In progress"}</Text>
              <Text style={styles.progressSub}>{delivered ? deliveredAt : "-"}</Text>
            </View>
          </View>

          <View style={styles.returnRow}>
            <Text style={styles.infoIcon}>i</Text>
            <Text style={styles.returnText}>
              Return policy {delivered ? `ended on ${deliveredAt}` : "will be shown here"}
            </Text>
          </View>

          <Pressable onPress={() => {}} style={styles.updateBtn}>
            <Text style={styles.updateText}>See all updates</Text>
          </Pressable>
        </View>

        {/* ✅ Rate your experience */}
        <Text style={styles.rateTitle}>Rate your experience</Text>

        <View style={styles.rateCard}>
          <Pressable onPress={openRatePage} style={styles.rateHeader}>
            <Text style={styles.rateIcon}>☑</Text>
            <Text style={styles.rateHeaderText}>Rate the product</Text>
          </Pressable>

          {/* ✅ clickable stars → open rate-product page */}
          <View style={styles.starRow}>
            {Array.from({ length: 5 }).map((_, i) => {
              const starValue = i + 1;
              const filled = starValue <= rating;

              return (
                <Pressable
                  key={starValue}
                  onPress={() => {
                    setRating(starValue);
                    openRatePage();
                  }}
                  style={styles.starBtn}
                >
                  <Text style={[styles.star, filled ? styles.starFilled : styles.starEmpty]}>
                    ★
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Delivery details */}
        <Text style={styles.sectionTitle}>Delivery details</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoLine}>
            📍 <Text style={styles.bold}>{order.addressTitle ?? "Address"}</Text>{" "}
            {order.addressLine ?? ""}
          </Text>
          <Text style={[styles.infoLine, { marginTop: 10 }]}>
            👤 <Text style={styles.bold}>{order.customerName ?? "Customer"}</Text>{" "}
            {order.phone ?? ""}
          </Text>
        </View>

        {/* Price details */}
        <Text style={styles.sectionTitle}>Price details</Text>
        <View style={styles.infoCard}>
          <Row label="Order Total" value={`₹${order.amount}`} />
          <Row label="Delivery" value="FREE" green />
          <View style={styles.divider} />
          <Row label="Total Payable" value={`₹${order.amount}`} big />
        </View>

        <Pressable style={styles.primaryBtn} onPress={() => router.replace("/")}>
          <Text style={styles.primaryText}>CONTINUE SHOPPING</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function Row({
  label,
  value,
  green,
  big,
}: {
  label: string;
  value: string;
  green?: boolean;
  big?: boolean;
}) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, big && { fontSize: 16 }]}>{label}</Text>
      <Text style={[styles.rowValue, green && { color: "#16a34a" }, big && { fontSize: 16 }]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f1f5f9" },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  backBtn: { padding: 6, marginRight: 6 },
  backText: { fontSize: 22, fontWeight: "900" },
  topTitle: { flex: 1, fontSize: 18, fontWeight: "900" },
  helpBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  helpText: { fontWeight: "900", color: "#0f172a" },

  productRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
    marginHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
  },
  productImg: { width: 64, height: 64, borderRadius: 12, backgroundColor: "#e5e7eb" },
  productName: { fontWeight: "900", fontSize: 15, color: "#0f172a" },
  productMeta: { marginTop: 4, color: "#64748b", fontWeight: "700" },
  orderIdText: { marginTop: 6, color: "#64748b", fontWeight: "800" },

  statusCard: {
    marginTop: 14,
    marginHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#3b82f6",
    padding: 12,
  },
  statusTopRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  statusTitle: { fontSize: 18, fontWeight: "900", color: "#16a34a" },
  statusTickWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#16a34a",
    alignItems: "center",
    justifyContent: "center",
  },
  statusTick: { color: "#fff", fontSize: 18, fontWeight: "900" },

  progressRow: { flexDirection: "row", alignItems: "center", marginTop: 14 },
  dotDone: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#16a34a",
    alignItems: "center",
    justifyContent: "center",
  },
  dotText: { color: "#fff", fontWeight: "900" },
  lineDone: { flex: 1, height: 3, backgroundColor: "#16a34a", marginHorizontal: 10, borderRadius: 2 },

  progressLabels: { flexDirection: "row", marginTop: 10 },
  progressMain: { fontWeight: "900", color: "#111827" },
  progressSub: { marginTop: 3, color: "#6b7280", fontWeight: "700", fontSize: 12 },

  returnRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 12 },
  infoIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#9ca3af",
    color: "#6b7280",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 12,
    lineHeight: 16,
  },
  returnText: { color: "#6b7280", fontWeight: "700" },

  updateBtn: { marginTop: 12, alignItems: "center" },
  updateText: { color: "#2563eb", fontWeight: "900", fontSize: 16 },

  rateTitle: { marginTop: 18, marginHorizontal: 12, fontSize: 18, fontWeight: "900" },
  rateCard: {
    marginTop: 10,
    marginHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  rateHeader: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 4 },
  rateIcon: { fontSize: 16, color: "#6b7280" },
  rateHeaderText: { fontWeight: "900", color: "#111827" },

  starRow: {
    marginTop: 12,
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  starBtn: { paddingHorizontal: 6, paddingVertical: 2 },
  star: { fontSize: 28, fontWeight: "900" },
  starFilled: { color: "#facc15" },
  starEmpty: { color: "#d1d5db" },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    paddingHorizontal: 12,
    marginTop: 16,
    marginBottom: 10,
  },

  infoCard: {
    marginHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  infoLine: { color: "#0f172a", fontWeight: "700", lineHeight: 20 },
  bold: { fontWeight: "900" },

  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 },
  rowLabel: { color: "#334155", fontWeight: "800" },
  rowValue: { color: "#0f172a", fontWeight: "900" },
  divider: { height: 1, backgroundColor: "#eef2f7", marginVertical: 8 },

  primaryBtn: {
    marginTop: 18,
    marginHorizontal: 12,
    backgroundColor: FLIPKART_BLUE,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  primaryText: { color: "#fff", fontWeight: "900" },
});