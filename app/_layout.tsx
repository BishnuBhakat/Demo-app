import { Stack } from "expo-router";
// <<<<<<< HEAD
import Toast from "react-native-toast-message";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
// =======
// import { CartProvider } from "../context/CartContext";
import { HotelCartProvider } from "./context/HotelCartContext";
// import { WishlistProvider } from "../context/WishlistContext";
// >>>>>>> arijit-hotels

export default function RootLayout() {
  return (
    <HotelCartProvider>
    <CartProvider>
      <WishlistProvider>
        <>
          <Stack screenOptions={{ headerShown: false }} />
          <Toast />
        </>
      </WishlistProvider>
    </CartProvider>
    </HotelCartProvider>
  );
}
