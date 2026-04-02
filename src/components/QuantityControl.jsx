import "./QuantityControl.css";
import { useCart } from "../context/useCart";

export default function QuantityControl({ product }) {
  const { cart, addItem, removeItem } = useCart();

  const quantity = cart[product.id]?.quantity || 0;

  return (
    <div className="quantity">
      <button onClick={() => removeItem(product)}>-</button>
      <span style={{ fontWeight: "bold" }}>{quantity}</span>{" "}
      <button onClick={() => addItem(product)}>+</button>
    </div>
  );
}
