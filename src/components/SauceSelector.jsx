import "./SauceSelector.css";
import { sauces } from "../data/sauces";
import { useCart } from "../context/useCart";

export default function SauceSelector() {
  const {
    sauces: selectedSauces,
    addSauce,
    removeSauce,
    getFreeSauces,
    getTotalSauces,
    getPaidSauces,
  } = useCart();

  const free = getFreeSauces();
  const total = getTotalSauces();
  const paid = getPaidSauces();

  return (
    <div className="sauces">
      <h2>Salsas</h2>

      <p className="sauces-info">
        {total === 0
          ? `Tenés ${free} salsas gratis`
          : `Elegiste ${total} (${free} gratis)`}
      </p>

      {paid > 0 && (
        <p className="sauces-warning">
          {paid} extra (+${paid * 1500})
        </p>
      )}

      {sauces.map((sauce) => {
        const quantity = selectedSauces[sauce.id] || 0;

        return (
          <div key={sauce.id} className="sauce-item">
            <span>{sauce.name}</span>

            <div className="quantity">
              <button onClick={() => removeSauce(sauce.id)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => addSauce(sauce.id)}>+</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
