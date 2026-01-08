import { Stack } from "expo-router";
import { CartProvider } from "../context/CartContext";
import { HotelCartProvider } from "../context/HotelCartContext";
import { WishlistProvider } from "../context/WishlistContext";

export default function RootLayout() {
  return (
    <HotelCartProvider>
    <CartProvider>
      <WishlistProvider>
        <Stack 
        screenOptions={{headerShown:false,}}
        />
      </WishlistProvider>
    </CartProvider>
    </HotelCartProvider>
  );
}
