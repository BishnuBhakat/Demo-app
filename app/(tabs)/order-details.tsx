import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import HeaderNav from "../../components/HeaderNav";
import { DEMO_ORDERS } from "../data/demoOrdersData";
import { YOU_MAY_ALSO_LIKE } from "../data/mayAlsoLikeData";

const FLIPKART_BLUE = "#2874F0";
export default function OrderDetails() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();

  const order = useMemo(() => {
    return DEMO_ORDERS.find((o) => String(o.id) === String(orderId));
  }, [orderId]);

  if (!order) {
    return (
      <View style={{ flex: 1, backgroundColor: "#f1f5f9" }}>
        <HeaderNav />
        <View style={{ padding: 16 }}>
          <Text style={{ fontWeight: "900", fontSize: 18 }}>Order not found.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <HeaderNav />

      {/* Top bar like screenshot */}
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
        {/* Small products strip on top */}
        <FlatList
          data={order.items}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(i) => i.id}
          contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 10, gap: 12 }}
          renderItem={({ item }) => (
            <View style={styles.smallCard}>
              <Image source={{ uri: item.image }} style={styles.smallImg} />
              <Text style={styles.smallOff}>Order: {order.status}</Text>
              <Text style={styles.smallName} numberOfLines={1}>
                {item.category}
              </Text>
            </View>
          )}
        />

        {/* ✅ ORDER STATUS CARD (Flipkart style) */}
        <View style={styles.statusCard}>
          <View style={styles.statusTopRow}>
            <Text style={styles.statusTitle}>Delivered, Dec 22, 2025</Text>

            <View style={styles.statusTickWrap}>
              <Text style={styles.statusTick}>✓</Text>
            </View>
          </View>

          {/* Progress row */}
          <View style={styles.progressRow}>
            <View style={styles.dotDone}>
              <Text style={styles.dotText}>✓</Text>
            </View>
            <View style={styles.lineDone} />
            <View style={styles.dotDone}>
              <Text style={styles.dotText}>✓</Text>
            </View>
          </View>

          <View style={styles.progressLabels}>
            <View style={{ flex: 1 }}>
              <Text style={styles.progressMain}>Order Confirmed</Text>
              <Text style={styles.progressSub}>Dec 22, 2025</Text>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.progressMain}>Delivered</Text>
              <Text style={styles.progressSub}>Dec 22, 2025</Text>
            </View>
          </View>

          <View style={styles.returnRow}>
            <Text style={styles.infoIcon}>i</Text>
            <Text style={styles.returnText}>Return policy ended on Dec 22, 2025</Text>
          </View>

          <Pressable onPress={() => {}} style={styles.updateBtn}>
            <Text style={styles.updateText}>See all updates</Text>
          </Pressable>
        </View>

        {/* ✅ RATE YOUR EXPERIENCE */}
        <Text style={styles.rateTitle}>Rate your experience</Text>
        <View style={styles.rateCard}>
          <View style={styles.rateHeader}>
            <Text style={styles.rateIcon}>☑</Text>
            <Text style={styles.rateHeaderText}>Rate the product</Text>
          </View>

          <View style={styles.starRow}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Pressable key={i} onPress={() => {}}>
                <Text style={styles.star}>☆</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* You may also like */}
        <Text style={styles.sectionTitle}>You May Also Like...</Text>
        <FlatList
          data={YOU_MAY_ALSO_LIKE}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(i) => i.id}
          contentContainerStyle={{ paddingHorizontal: 12, gap: 12 }}
          renderItem={({ item }) => (
            <View style={styles.likeCard}>
              <Image source={{ uri: item.image }} style={styles.likeImg} />
              <Text style={styles.likeName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.likeOff}>{item.off}</Text>
            </View>
          )}
        />

        {/* Delivery details */}
        <Text style={styles.sectionTitle}>Delivery details</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoLine}>
            📍 <Text style={styles.bold}>{order.addressTitle}</Text> {order.addressLine}
          </Text>
          <Text style={[styles.infoLine, { marginTop: 10 }]}>
            👤 <Text style={styles.bold}>{order.customerName}</Text>  {order.phone}
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

        {/* Optional: Continue shopping */}
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
      <Text
        style={[
          styles.rowValue,
          green && { color: "#16a34a" },
          big && { fontSize: 16 },
        ]}
      >
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

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    paddingHorizontal: 12,
    marginTop: 16,
    marginBottom: 10,
  },

  smallCard: {
    width: 160,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },
  smallImg: { width: "100%", height: 80 },
  smallOff: { padding: 8, fontWeight: "900", color: "#0f172a" },
  smallName: { paddingHorizontal: 8, paddingBottom: 10, color: "#64748b", fontWeight: "800" },

  /* ✅ NEW: Delivered card */
  statusCard: {
    marginTop: 14,
    marginHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#3b82f6",
    padding: 12,
  },
  statusTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
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

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },
  dotDone: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#16a34a",
    alignItems: "center",
    justifyContent: "center",
  },
  dotText: { color: "#fff", fontWeight: "900" },
  lineDone: {
    flex: 1,
    height: 3,
    backgroundColor: "#16a34a",
    marginHorizontal: 10,
    borderRadius: 2,
  },

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

  /* ✅ NEW: Rate experience */
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
  rateHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
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
  star: { fontSize: 26, color: "#6b7280" },

  likeCard: {
    width: 170,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 10,
  },
  likeImg: { width: "100%", height: 110, borderRadius: 12, backgroundColor: "#e5e7eb" },
  likeName: { marginTop: 8, fontWeight: "900" },
  likeOff: { marginTop: 4, color: "#16a34a", fontWeight: "900" },

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