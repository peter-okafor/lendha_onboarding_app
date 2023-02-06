import { friendlyFormat } from 'number-js-formatter';

export const loanPeriodSliderValueToMonth = (v: number) => {
  switch (v) {
    case 10:
      return '1 month';
    case 20:
      return '2 months';
    case 30:
      return '3 months';
    case 40:
      return '4 months';
    case 50:
      return '5 months';
    case 60:
      return '6 months';
    default:
      return '1 month';
  }
};

export const getSliderIntervals = (min: number, max: number, spaces: number) => {
  const result = [];
  const unit = (max - min) / spaces;

  for (let index = min; index <= max; index += unit) {
    result.push({ value: index, label: friendlyFormat(index).toUpperCase() });
  }

  return { intervals: result, unit };
};
