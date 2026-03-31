import "./ProductCard.css";
import QuantityControl from "./QuantityControl";

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />

      <div className="card-info">
        <h3>{product.name}</h3>
        <p>${product.price}</p>

        <QuantityControl product={product} />
      </div>
    </div>
  );
}