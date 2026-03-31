import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import { useCart } from "../context/CartContext";

export default function Home() {
  const { cart } = useCart();
  const [address, setAddress] = useState("");

  const total = Object.values(cart).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const generateWhatsAppMessage = () => {
    let message = "🍗 *Pedido Golden Crunch* 🍗\n\n";

    Object.values(cart).forEach((item) => {
      message += `- ${item.name} x${item.quantity}\n`;
    });

    message += `\n📍 Dirección: ${address}`;

    return encodeURIComponent(message);
  };

  const handleSendOrder = () => {
    if (Object.keys(cart).length === 0) {
      alert("Agregá al menos un producto");
      return;
    }

    if (!address) {
      alert("Ingresá una dirección");
      return;
    }

    const phone = "5492244469662"; // ← tu número
    const url = `https://wa.me/${phone}?text=${generateWhatsAppMessage()}`;

    window.open(url, "_blank");
  };

  return (
    <div className="container">
      <div className="header">
        <img src="/src/assets/logo.png" alt="Golden Crunch" />
      </div>

      {/* MENÚ */}
      <div className="products">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* CARRITO */}
      <Cart />

      {/* DIRECCIÓN */}
      <div className="address">
        <h3>Dirección de entrega</h3>
        <input
          type="text"
          placeholder="Ej: Calle 123, casa 4"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {/* BOTÓN FINAL */}
      <button className="floating-button" onClick={handleSendOrder}>
        {total > 0
          ? `Pedir por WhatsApp ($${total})`
          : "Agregá productos para pedir"}
      </button>
    </div>
  );
}
