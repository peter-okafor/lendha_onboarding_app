export const formatNumber = (n: number) => {
  return (
    n &&
    Number(n)
      .toFixed(0)
      .replace(/./g, function (c, i, a) {
        return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c;
      })
  );
};

export const formatCurrency = (n: number) => {
  return (
    n &&
    `N${Number(n)
      .toFixed(0)
      .replace(/./g, function (c, i, a) {
        return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c;
      })}`
  );
};
