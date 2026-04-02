import "./Cart.css";
import { useCart } from "../context/useCart";

export default function Cart() {
  const { cart, getFinalTotal, getFreeSauces, getPaidSauces } = useCart();
  return (
    <div className="cart">
      <h2>Tu pedido</h2>

      {Object.values(cart).map((item) => (
        <div key={item.id} className="cart-item">
          <span>
            {item.name} x{item.quantity}
          </span>
          <span>${item.price * item.quantity}</span>
        </div>
      ))}

      <p>Salsas gratis: {getFreeSauces()}</p>
      <p>Salsas extra: {getPaidSauces()}</p>

      <div className="total">Total: ${getFinalTotal()}</div>
    </div>
  );
}
