export const calculateSauces = (cart, saucesSelected) => {
  let freeSauces = 0;

  Object.values(cart).forEach(item => {
    freeSauces += (item.freeSauces || 0) * item.quantity;
  });

  const totalSauces = saucesSelected;

  const paidSauces = Math.max(0, totalSauces - freeSauces);

  return {
    freeSauces,
    paidSauces,
    extraCost: paidSauces * 1500
  };
};