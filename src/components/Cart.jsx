import "./Cart.css";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, getTotal } = useCart();

  return (
    <div className="cart">
      <h2>Tu pedido</h2>

      {Object.values(cart).map(item => (
        <div key={item.id} className="cart-item">
          <span>{item.name} x{item.quantity}</span>
          <span>${item.price * item.quantity}</span>
        </div>
      ))}

      <div className="total">
        Total: ${getTotal()}
      </div>
    </div>
  );
}