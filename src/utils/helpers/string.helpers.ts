export const stripSlashes = (str: string) => str.replace(/\//g, ' ');
export const stripDashes = (str: string) => str.replace(/-/g, ' ');
export const getLastPath = (str: string) => str.split('/').pop() || '';
export const stripSpaces = (str: string) => str.replace(/\s/g, '');
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
export const URL_PATTERN = new RegExp(
  '^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?'
);
export const isEmpty = (str: string) => {
  if (str === null || str === undefined || str === '' || str.length === 0) {
    return true;
  } else {
    return false;
  }
};
export const stripCommas = (n: string) => {
  return n.toString().replace(/,/g, '');
};
export const getNumbers = (str: string) => {
  return str.replace(/[^0-9]/g, '');
};
export const maskCurrency = (n: string) => {
  if (isEmpty(n)) return n;
  return getNumbers(n)
    .toString()
    .replace(/^0+/, '')
    .replace(/,/g, '')
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
