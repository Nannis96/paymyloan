export const formatCurrency = (val: number) =>
  "$" + val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

export const formatShortCurrency = (val: number) => {
  if (val >= 1000000) return "$" + (val / 1000000).toFixed(1) + "M";
  if (val >= 1000) return "$" + (val / 1000).toFixed(0) + "K";
  return "$" + val;
};