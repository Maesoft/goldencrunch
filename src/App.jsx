import Home from "./pages/Home";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <Home />
    </CartProvider>
  );
}