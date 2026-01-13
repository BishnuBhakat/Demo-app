import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

export default function RootLayout() {
  return (
    <CartProvider>
      <WishlistProvider>
        <>
          <Stack screenOptions={{ headerShown: false }} />
          <Toast />
        </>
      </WishlistProvider>
    </CartProvider>
  );
}
