export const extractSummaryAmounts = (sub: string, tax: string, total: string) => {
  return {
    itemTotal: parseFloat(sub.split('$')[1]),
    taxNum: parseFloat(tax.split('$')[1]),
    totalNum: parseFloat(total.split('$')[1])
  };
};