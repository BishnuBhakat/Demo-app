// import { View, Text, Pressable,Image,StyleSheet } from "react-native";
// import { useLocalSearchParams} from "expo-router";
// import HeaderNav from "../../components/HeaderNav";

// import { groceryItems } from "../data/groceryData";
// import { useCart } from "../context/CartContext";
// import Toast from "react-native-toast-message";

// export default function ProductDetails() {
//   const params = useLocalSearchParams();
//   const { addToCart } = useCart();

//   // ✅ Safe ID handling
//   const id =
//     typeof params.id === "string"
//       ? params.id
//       : Array.isArray(params.id)
//       ? params.id[0]
//       : "";

//   // ✅ ONLY grocery data
//   const product = groceryItems.find((item) => item.id === id);

//   if (!product) {
//     return (
//       <View style={styles.center}>
//         <Text>Product not found</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <HeaderNav />

//       <Image source={{ uri: product.image }} style={styles.image} />

//       <View style={styles.body}>
//         <Text style={styles.name}>{product.name}</Text>
//         <Text style={styles.price}>₹{product.price}</Text>

//         {/* ✅ Description */}
//         <Text style={styles.desc}>
//           {product.description ||
//             "Fresh and high-quality grocery product delivered to your home."}
//         </Text>

//         {/* ✅ Add to Cart (GROCERY ONLY) */}
//         <Pressable
//           style={styles.addBtn}
//           onPress={() => {
//             addToCart({
//               id: product.id,
//               name: product.name,
//               price: product.price,
//               image: product.image,
//               quantity: 1,
//               type: "grocery", // 🔥 IMPORTANT
//             });

//             Toast.show({
//               type: "success",
//               text1: "Added to Cart 🛒",
//               text2: `${product.name} added successfully`,
//               position: "bottom",
//             });
//           }}
//         >
//           <Text style={styles.addText}>ADD TO CART</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },

//   image: { width: "100%", height: 260 },

//   body: { padding: 16 },

//   name: { fontSize: 22, fontWeight: "800" },
//   price: { fontSize: 18, fontWeight: "900", marginVertical: 6 },

//   desc: {
//     fontSize: 14,
//     color: "#6b7280",
//     marginVertical: 10,
//     lineHeight: 20,
//   },

//   addBtn: {
//     backgroundColor: "#16a34a",
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   addText: { color: "#fff", fontWeight: "900", fontSize: 16 },

//   center: { flex: 1, alignItems: "center", justifyContent: "center" },
// });


















import { View, Text, Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { groceryItems } from "../data/groceryData";
import { clothingItems } from "../data/clothingData";

export default function ProductDetails() {
  // ✅ get id FIRST
  const params = useLocalSearchParams();

  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : "";

  // ✅ combine all products
  const allProducts = [...groceryItems, ...clothingItems];

  // ✅ find product safely
  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>₹{product.price}</Text>

      {/* description is optional (grocery has it, clothing may not) */}
{"description" in product && product.description ? (
  <Text style={styles.desc}>{product.description}</Text>
) : null}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    height: 220,
    borderRadius: 12,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 6,
  },
  desc: {
    color: "#6b7280",
    marginTop: 8,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notFound: {
    fontSize: 18,
    fontWeight: "600",
  },
});