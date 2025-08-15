
export function sum(numbers: number[]): number {
  const total = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const roundedTotal = Number(total.toFixed(2));
  return roundedTotal;
}

export function roundToTwoDecimals(value: number): number {
  const roundedValue = Number(value.toFixed(2));
  return roundedValue;
}

export function calculateTax(subtotal: number, rate: number = 0.08): number {
  const taxAmount = subtotal * rate;
  const roundedTax = roundToTwoDecimals(taxAmount);
  return roundedTax;
}