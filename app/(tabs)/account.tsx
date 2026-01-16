import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderNav from "../../components/HeaderNav";

export default function Account() {
  const router = useRouter();

  const handleLogout = async () => {
    // ❌ clear login & intro flags
    await AsyncStorage.multiRemove(["seenIntro", "loggedIn"]);

    // 🔁 redirect to intro
    router.replace("/auth/intro");
  };

  return (
    <View style={styles.container}>
      <HeaderNav />

      <Text style={styles.title}>My Account</Text>

      {/* 👤 DEMO USER CARD */}
      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>Demo User</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>demo@gmail.com</Text>

        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>+91 98765 43210</Text>
      </View>

      {/* 🚪 LOGOUT */}
      <Pressable style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>LOG OUT</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "900",
    marginVertical: 16,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
    elevation: 2,
  },

  label: {
    color: "#6b7280",
    fontSize: 14,
    marginTop: 12,
  },

  value: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
  },

  logoutBtn: {
    backgroundColor: "#ef4444",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
  },
});

