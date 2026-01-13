import { Stack } from "expo-router";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import Toast from "react-native-toast-message";


export default function RootLayout() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Stack 
        screenOptions={{headerShown:false,}}
        />
        <Toast/>
      </WishlistProvider>
    </CartProvider>
  );
}
