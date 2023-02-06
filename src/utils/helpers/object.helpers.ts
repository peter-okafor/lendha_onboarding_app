export const isNullish = (obj: object) => {
  return obj === null || obj === undefined || Object.keys(obj).length === 0;
};

export const isObjectPropsEmpty = (object: object) => {
  return Object.values(object).some((x) => x === null || x === '');
};
