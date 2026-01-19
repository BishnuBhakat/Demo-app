// import { View, Text, Pressable } from "react-native";
// import { useRouter } from "expo-router";

// export default function OrderSuccess() {
//   const router = useRouter();

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text style={{ fontSize: 24 }}>🎉 Order Placed!</Text>

//       <Pressable onPress={() => router.push("/(tabs)")}>
//         <Text style={{ marginTop: 20 }}>Go to Home</Text>
//       </Pressable>
//     </View>
//   );
// }


import { View, Text, Pressable, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function OrderSuccess() {
  const router = useRouter();

  // ✅ Auto redirect after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Order Placed Successfully!</Text>

      <Text style={styles.sub}>
        Thank you for shopping with us.
        {"\n"}You will be redirected to Home shortly.
      </Text>

      <Pressable style={styles.btn} onPress={() => router.replace("/")}>
        <Text style={styles.btnText}>Go to Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 12,
  },
  sub: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 30,
  },
  btn: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
  },
  btnText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
  },
});
