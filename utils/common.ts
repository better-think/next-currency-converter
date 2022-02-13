export const precisionNumber = (num: number, precision: number = 2) => parseFloat(num.toFixed(precision));

export const trimAddress = (str: string) => str.substr(0, 4) + '...' + str.substr(str.length - 4, str.length);
